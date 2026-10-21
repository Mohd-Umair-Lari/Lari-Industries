const fs = require('fs');
const path = require('path');
const parser = require('next/dist/compiled/babel/parser');

function stripJsComments(content) {
  let ast;
  try {
    ast = parser.parse(content, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
      ranges: true,
      tokens: true,
    });
  } catch (err) {
    console.error('Parse error:', err.message);
    return content;
  }

  // 1. Collect all JSX comment containers: {/* comment */}
  const jsxContainers = [];
  function findJsxContainers(node) {
    if (!node || typeof node !== 'object') return;
    if (
      node.type === 'JSXExpressionContainer' &&
      node.expression &&
      node.expression.type === 'JSXEmptyExpression'
    ) {
      jsxContainers.push({ start: node.start, end: node.end });
    }
    for (const key of Object.keys(node)) {
      if (key === 'loc' || key === 'comments') continue;
      const child = node[key];
      if (Array.isArray(child)) {
        child.forEach(findJsxContainers);
      } else if (child && typeof child === 'object') {
        findJsxContainers(child);
      }
    }
  }
  findJsxContainers(ast);

  // 2. Collect all comments
  const comments = ast.comments || [];

  // Combine ranges to remove
  // Notice: comments inside JSX containers are covered if we remove the JSX container
  const removeRanges = [];

  for (const container of jsxContainers) {
    removeRanges.push({ start: container.start, end: container.end, isJsx: true });
  }

  for (const comment of comments) {
    // If this comment is inside an already targeted JSX container, skip it
    const insideJsx = jsxContainers.some(
      (c) => comment.start >= c.start && comment.end <= c.end
    );
    if (!insideJsx) {
      removeRanges.push({ start: comment.start, end: comment.end, isJsx: false });
    }
  }

  // Sort ranges descending by start position
  removeRanges.sort((a, b) => b.start - a.start);

  let result = content;

  for (const range of removeRanges) {
    let { start, end } = range;

    // Check if the comment spans the entire line
    // Find preceding newline/start of line
    const lastNewlineBefore = result.lastIndexOf('\n', start - 1);
    const lineStart = lastNewlineBefore === -1 ? 0 : lastNewlineBefore + 1;
    const preText = result.slice(lineStart, start);

    // Find following newline/end of line
    let nextNewlineAfter = result.indexOf('\n', end);
    let lineEnd = nextNewlineAfter === -1 ? result.length : nextNewlineAfter;
    if (nextNewlineAfter !== -1 && result[nextNewlineAfter - 1] === '\r') {
      // account for CRLF
    }

    const postText = result.slice(end, lineEnd).replace(/\r$/, '');

    // If only whitespace exists before and after on this line
    if (/^\s*$/.test(preText) && /^\s*$/.test(postText)) {
      // Remove whole line including newline
      let removeStart = lineStart;
      let removeEnd = nextNewlineAfter === -1 ? result.length : nextNewlineAfter + 1;
      result = result.slice(0, removeStart) + result.slice(removeEnd);
    } else if (/^\s*$/.test(postText)) {
      // Trailing comment on a line with code before it
      // Trim preceding whitespace up to the code
      const trailingWhitespaceMatch = preText.match(/\s+$/);
      const wsLength = trailingWhitespaceMatch ? trailingWhitespaceMatch[0].length : 0;
      result = result.slice(0, start - wsLength) + result.slice(end);
    } else {
      // Inline comment (code before AND code after)
      result = result.slice(0, start) + result.slice(end);
    }
  }

  // Normalize excessive blank lines (more than 2 consecutive blank lines -> 1 blank line)
  result = result.replace(/(\r?\n\s*){3,}\r?\n/g, '\n\n');

  return result;
}

// Test on sample
const sample = `
// Header comment
import React from 'react'; // inline import

/*
 * Multi-line comment
 */
export default function Component() {
  // statement comment
  const x = 42; // trailing comment
  const str = "This is // not a comment";
  const regex = /test\\/\\//g;

  return (
    <div>
      {/* JSX comment on its own line */}
      <h1 className="text-xl">Title</h1>
    </div>
  );
}
`;

console.log('--- BEFORE ---');
console.log(sample);
console.log('--- AFTER ---');
console.log(stripJsComments(sample));
