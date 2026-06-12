'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MessageSquare,
  FlaskConical,
  ClipboardList,
  Users,
  Sparkles,
  User,
  LogOut,
  Stethoscope,
  Bell,
  Wifi,
  WifiOff,
  Menu,
  X,
  Globe,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { useLanguage } from '@/lib/i18n';

export function AppSidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const NAV_ITEMS = [
    { href: '/dashboard/farmer', icon: LayoutDashboard, label: t.nav.home },
    { href: '/consultations', icon: MessageSquare, label: t.nav.consultations },
    { href: '/lab', icon: FlaskConical, label: t.nav.lab },
    { href: '/farm-records', icon: ClipboardList, label: t.nav.farmRecords },
    { href: '/community', icon: Users, label: t.nav.community },
    { href: '/ai-suggestions', icon: Sparkles, label: t.nav.aiSuggestions },
    { href: '/profile', icon: User, label: t.nav.profile },
  ];

  return (
    <aside className="w-60 bg-brand-800 flex-shrink-0 flex flex-col h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-700/10 via-transparent to-brand-900/20 pointer-events-none" />

      <div className="px-5 py-4 border-b border-brand-700/60 relative z-10">
        <Link href="/dashboard/farmer" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center group-hover:shadow-glow-brand transition-shadow duration-300">
            <Stethoscope className="w-4 h-4 text-white" />
          </div>
          <span className="font-heading font-bold text-white text-base tracking-tight">Neng-Nom</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto relative z-10">
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-700/80 text-white shadow-elevation-sm border-l-2 border-brand-400 pl-[10px]'
                    : 'text-brand-300 hover:bg-brand-700/50 hover:text-white hover:translate-x-0.5'
                }`}
              >
                <item.icon className={`flex-shrink-0 transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`} size={17} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="px-3 py-4 border-t border-brand-700/60 relative z-10">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-brand-700/40 transition-colors duration-200">
          <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 ring-2 ring-brand-500/30">
            EF
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">Emmanuel Fodieng</p>
            <p className="text-brand-400 text-xs truncate">Éleveur · Littoral</p>
          </div>
        </div>
        <Link
          href="/"
          className="mt-1 flex items-center gap-2 px-3 py-2 text-brand-400 hover:text-white hover:bg-brand-700/50 rounded-xl text-xs font-medium transition-all duration-200"
        >
          <LogOut size={14} />
          {t.nav.logout}
        </Link>
      </div>
    </aside>
  );
}

export function AppTopbar() {
  const { isOnline } = useNetworkStatus();
  const { locale, setLocale, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="h-14 bg-white/95 backdrop-blur-sm border-b border-sand-200/80 flex items-center justify-between px-6 flex-shrink-0">
      <span className="font-heading font-semibold text-brand-900 text-sm">
        {t.topbar.greeting} 👋
      </span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-sand-200 hover:border-brand-400 hover:bg-brand-50 hover:shadow-elevation-sm hover:-translate-y-px transition-all duration-200 text-neutral-700 cursor-pointer"
          aria-label={locale === 'fr' ? 'Switch to English' : 'Passer en français'}
        >
          <Globe size={13} />
          {locale === 'fr' ? 'EN' : 'FR'}
        </button>

        {mounted && (
          <div className={`flex items-center gap-1.5 text-xs font-medium ${isOnline ? 'text-green-600' : 'text-orange-500'}`}>
            {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
            {isOnline ? t.common.online : t.common.offline}
          </div>
        )}
        <button className="group relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-sand-100 transition-all duration-200 cursor-pointer">
          <Bell size={16} className="text-neutral-600 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-200" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-600 rounded-full shadow-glow-amber" />
        </button>
      </div>
    </header>
  );
}

export function MobileSidebarToggle() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-9 h-9 bg-brand-800 rounded-xl flex items-center justify-center text-white shadow-elevation-md hover:shadow-elevation-lg hover:scale-105 transition-all duration-200 cursor-pointer"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={16} />
      </button>
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-brand-900/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-60 h-full shadow-elevation-lg animate-slide-in">
            <AppSidebar />
            <button
              className="absolute top-4 right-4 text-brand-400 hover:text-white transition-colors duration-200 cursor-pointer"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function NetworkBanner() {
  const { isOnline, isSyncing } = useNetworkStatus();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || (isOnline && !isSyncing)) return null;

  return (
    <div
      className={`w-full px-4 py-2.5 text-xs font-medium flex items-center justify-center gap-2 animate-fade-in ${
        !isOnline ? 'bg-amber-50 text-amber-800 border-b border-amber-200' : 'bg-blue-50 text-blue-700 border-b border-blue-100'
      }`}
    >
      {!isOnline ? (
        <>
          <WifiOff size={13} className="flex-shrink-0" />
          {t.topbar.offlineBanner}
        </>
      ) : (
        <>
          <span className="w-3 h-3 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin flex-shrink-0" />
          {t.topbar.syncBanner}
        </>
      )}
    </div>
  );
}
