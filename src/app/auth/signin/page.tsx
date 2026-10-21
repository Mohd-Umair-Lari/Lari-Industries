'use client';

import React, { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Loader2, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const error = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(error ? 'Invalid email or password' : null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setFormError('Invalid email or password');
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-sm border border-stone-200/80 p-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <Image src="/static/images/logo.jpg" alt="Lari Industries" className="w-16 h-16 mx-auto rounded-2xl" />
            </Link>
            <h1 className="text-3xl font-serif font-black text-stone-900">Welcome Back</h1>
            <p className="text-stone-500 mt-2">Sign in to access your account and orders</p>
          </div>

          {formError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-stone-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-stone-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-stone-300 text-brand-500 focus:ring-brand-500" />
                <span className="text-sm text-stone-600">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-sm font-bold text-brand-500 hover:text-brand-600">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full py-3.5" isLoading={isLoading}>
              <Loader2 className="w-5 h-5 mr-2" />
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-stone-600">
            <span>Don&apos;t have an account? </span>
            <Link href="/auth/signup" className="font-bold text-brand-500 hover:text-brand-600">
              Create one
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-stone-400 mt-6">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="underline hover:text-stone-600">Terms of Service</Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline hover:text-stone-600">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="bg-stone-50 min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-500" /></div>}>
      <SignInContent />
    </Suspense>
  );
}