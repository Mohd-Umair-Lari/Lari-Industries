import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="bg-stone-50 min-h-screen py-16 px-4">
      <article className="max-w-3xl mx-auto bg-white rounded-3xl border border-stone-200 p-8 sm:p-12">
        <Link href="/" className="text-sm font-bold text-brand-500 hover:text-brand-600">← Back to home</Link>
        <h1 className="mt-6 text-3xl font-serif font-black text-stone-900">Privacy Policy</h1>
        <p className="mt-4 text-stone-600">We use the information you provide to manage accounts, addresses, quotations, orders, and customer support. We do not sell your personal information.</p>
        <p className="mt-4 text-stone-600">Payment details are handled by our payment provider. Account and order data is stored securely and is accessed only to provide and improve our services.</p>
        <p className="mt-4 text-stone-600">For privacy questions or data requests, please contact Lari Industries through our <Link href="/contact" className="font-bold text-brand-500">contact page</Link>.</p>
      </article>
    </main>
  );
}
