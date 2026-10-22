import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <main className="bg-stone-50 min-h-screen flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-stone-200 p-8 text-center">
        <h1 className="text-2xl font-serif font-black text-stone-900">Password Help</h1>
        <p className="mt-3 text-stone-500">Please contact Lari Industries to reset your account password securely.</p>
        <Link href="/contact" className="inline-block mt-6 rounded-xl bg-brand-500 px-5 py-3 font-bold text-white hover:bg-brand-600">Contact support</Link>
        <p className="mt-4"><Link href="/auth/signin" className="text-sm font-bold text-brand-500">Back to sign in</Link></p>
      </div>
    </main>
  );
}
