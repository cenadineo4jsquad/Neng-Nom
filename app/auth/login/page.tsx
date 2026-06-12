'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, Stethoscope, Check } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function LoginPage() {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      window.location.href = '/dashboard/farmer';
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-2/5 bg-brand-800 flex-col justify-between p-12">
        <AuthLeftPanel />
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col bg-sand-100">
        <div className="p-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-brand-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.common.backToHome}
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <h1 className="font-heading font-bold text-2xl text-brand-900">{t.auth.login}</h1>
              <p className="text-neutral-600 text-sm mt-1">
                {t.auth.noAccount}{' '}
                <Link href="/auth/register" className="text-brand-700 font-medium hover:text-brand-900 transition-colors">
                  {t.auth.signUp}
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-2 uppercase tracking-wide">
                  {t.auth.phone}
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-white border border-r-0 border-sand-300 rounded-l-lg text-sm text-neutral-600 font-medium">
                    +237
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="6XX XXX XXX"
                    className="flex-1 bg-white border border-sand-300 rounded-r-lg px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-brand-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-medium text-neutral-600 uppercase tracking-wide">
                    {t.auth.password}
                  </label>
                  <Link href="#" className="text-xs text-brand-700 hover:text-brand-900 font-medium transition-colors">
                    {t.auth.forgotPassword}
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    className="w-full bg-white border border-sand-300 rounded-lg px-4 py-3 pr-11 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-brand-600 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-800 text-white font-medium text-sm py-3 rounded-lg hover:bg-brand-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t.auth.signingIn}
                  </>
                ) : (
                  t.auth.signIn
                )}
              </button>

              <div className="relative flex items-center gap-3 py-2">
                <div className="flex-1 h-px bg-sand-200" />
                <span className="text-xs text-neutral-400">{t.common.or}</span>
                <div className="flex-1 h-px bg-sand-200" />
              </div>

              <button
                type="button"
                className="w-full bg-white border border-sand-200 text-neutral-700 font-medium text-sm py-3 rounded-lg hover:bg-sand-100 hover:border-sand-300 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                {t.auth.continueWithGoogle}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthLeftPanel() {
  const { t } = useLanguage();
  return (
    <>
      <div>
        <div className="flex items-center gap-2 mb-16">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <Stethoscope className="w-4 h-4 text-white" />
          </div>
          <span className="font-heading font-bold text-white text-lg">Neng-Nom</span>
        </div>

        <h2 className="font-heading font-bold text-3xl text-white mb-4 leading-tight">
          {t.auth.heroTitle}
        </h2>
        <p className="text-brand-400 text-sm leading-relaxed mb-8">
          {t.auth.heroDesc}
        </p>

        <ul className="space-y-4">
          {t.auth.features.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-white">
              <div className="w-5 h-5 bg-brand-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <svg viewBox="0 0 320 160" className="w-full" fill="none">
          <rect width="320" height="160" fill="#1B4332" />
          <rect y="110" width="320" height="50" fill="#2D6A4F" />
          <rect x="100" y="70" width="80" height="50" fill="#40916C" />
          <polygon points="90,70 180,70 135,35" fill="#74C69D" />
          <rect x="125" y="90" width="20" height="30" fill="#1B4332" />
          <rect x="50" y="85" width="6" height="25" fill="#D4C9B8" />
          <circle cx="53" cy="78" r="16" fill="#2D6A4F" />
          <rect x="240" y="85" width="6" height="25" fill="#D4C9B8" />
          <circle cx="243" cy="78" r="16" fill="#2D6A4F" />
          <circle cx="270" cy="30" r="14" fill="#D4831A" opacity="0.7" />
          <ellipse cx="80" cy="118" rx="6" ry="4" fill="#FEF3C7" />
          <circle cx="85" cy="114" r="3" fill="#FEF3C7" />
          <ellipse cx="200" cy="120" rx="6" ry="4" fill="#FEF3C7" />
          <circle cx="205" cy="116" r="3" fill="#FEF3C7" />
        </svg>
      </div>
    </>
  );
}
