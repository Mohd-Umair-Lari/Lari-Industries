import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="bg-stone-50 min-h-screen py-16 px-4">
      <article className="max-w-3xl mx-auto bg-white rounded-3xl border border-stone-200 p-8 sm:p-12">
        <Link href="/" className="text-sm font-bold text-brand-500 hover:text-brand-600">← Back to home</Link>
        <h1 className="mt-6 text-3xl font-serif font-black text-stone-900">Terms of Service</h1>
        <p className="mt-4 text-stone-600">By using Lari Industries, you agree to provide accurate account and delivery information and to use our services lawfully.</p>
        <p className="mt-4 text-stone-600">Orders, payment authorization, delivery timelines, returns, and export requirements are confirmed with our team before fulfilment. Contact us if you need clarification about an order or quotation.</p>
        <p className="mt-4 text-stone-600">These terms may be updated as our services change. Continued use of the site after an update means you accept the revised terms.</p>
      </article>
    </main>
  );
}
