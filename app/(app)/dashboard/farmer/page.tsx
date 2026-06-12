'use client';

import Link from 'next/link';
import {
  Bird,
  AlertTriangle,
  MessageSquare,
  Syringe,
  Plus,
  FlaskConical,
  ClipboardList,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { mockAiSuggestions } from '@/lib/mock-data';
import { useLanguage } from '@/lib/i18n';

export default function FarmerDashboard() {
  const { t } = useLanguage();
  const suggestion = mockAiSuggestions[0];

  return (
    <div className="max-w-content mx-auto space-y-6">
      {/* AI Suggestion */}
      <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-5 shadow-elevation-sm hover:shadow-elevation-md transition-all duration-250 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
        <div className="flex items-start justify-between gap-4 relative">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-9 h-9 bg-amber-100 border border-amber-200 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">{t.dashboard.dailySuggestion}</p>
              <p className="font-semibold text-sm text-neutral-900 mb-1">{suggestion.title}</p>
              <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2">{suggestion.content}</p>
              <p className="text-xs text-amber-700 mt-2 font-medium">{suggestion.context}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-shrink-0">
            <button aria-label={t.common.yes} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-amber-200 hover:bg-amber-50 hover:scale-110 hover:shadow-elevation-sm text-amber-600 transition-all duration-200 cursor-pointer">
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>
            <button aria-label={t.common.no} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-amber-200 hover:bg-amber-50 hover:scale-110 hover:shadow-elevation-sm text-neutral-400 transition-all duration-200 cursor-pointer">
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className="mt-3 relative">
          <Link href="/ai-suggestions" className="group text-xs font-medium text-amber-700 hover:text-amber-900 transition-all duration-200 flex items-center gap-1">
            {t.dashboard.allSuggestions} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Bird className="w-5 h-5 text-brand-700" />}
          label={t.dashboard.totalLivestock}
          value="2 450"
          sub={`+12 ${t.dashboard.thisWeek}`}
          subColor="text-brand-600"
          bg="bg-brand-50"
          border="border-brand-100"
        />
        <StatCard
          icon={<AlertTriangle className="w-5 h-5 text-red-500" />}
          label={t.dashboard.mortality}
          value="3"
          sub={t.dashboard.watchClosely}
          subColor="text-red-500"
          bg="bg-red-50"
          border="border-red-100"
        />
        <StatCard
          icon={<MessageSquare className="w-5 h-5 text-blue-600" />}
          label={t.dashboard.consultationsLabel}
          value={`1 ${t.dashboard.ongoing}`}
          sub={t.dashboard.seeDetails}
          subColor="text-neutral-500"
          bg="bg-blue-50"
          border="border-blue-100"
          href="/consultations"
        />
        <StatCard
          icon={<Syringe className="w-5 h-5 text-amber-600" />}
          label={t.dashboard.nextVaccine}
          value={`${t.dashboard.inDays.replace('{n}', '7')}`}
          sub="Gumboro — 15 juin"
          subColor="text-amber-600"
          bg="bg-amber-50"
          border="border-amber-100"
        />
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/consultations/new"
          className="group inline-flex items-center gap-2 px-5 py-2.5 bg-brand-800 text-white text-sm font-medium rounded-xl hover:bg-brand-700 hover:shadow-elevation-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
          {t.dashboard.newConsultation}
        </Link>
        <Link
          href="/lab/new"
          className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-brand-700 text-brand-800 text-sm font-medium rounded-xl hover:bg-brand-50 hover:shadow-elevation-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
        >
          <FlaskConical className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
          {t.dashboard.orderLabTest}
        </Link>
        <Link
          href="/farm-records"
          className="group inline-flex items-center gap-2 px-5 py-2.5 text-brand-700 text-sm font-medium rounded-xl hover:bg-brand-50 hover:shadow-elevation-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
        >
          <ClipboardList className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
          {t.dashboard.recordData}
        </Link>
      </div>

      {/* Two column */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent activity */}
        <div className="bg-white border border-sand-200 rounded-2xl p-5 shadow-elevation-sm hover:shadow-elevation-md transition-all duration-250">
          <h3 className="font-heading font-semibold text-sm text-neutral-900 mb-4">{t.dashboard.recentActivity}</h3>
          <div className="space-y-3">
            {[
              { icon: <MessageSquare className="w-4 h-4 text-blue-600" />, text: 'Consultation urgente — Dr. Aminata Diallo', time: 'Il y a 30 min', bg: 'bg-blue-50' },
              { icon: <AlertTriangle className="w-4 h-4 text-red-500" />, text: '2 d\u00e9c\u00e8s enregistr\u00e9s — Poulets de chair', time: 'Aujourd\'hui 08:15', bg: 'bg-red-50' },
              { icon: <FlaskConical className="w-4 h-4 text-brand-600" />, text: 'Test labo planifi\u00e9 — Technicien Pierre Ekotto', time: 'Hier 16:40', bg: 'bg-brand-50' },
              { icon: <CheckCircle2 className="w-4 h-4 text-green-600" />, text: 'R\u00e9sultats qualit\u00e9 eau — Conformes', time: 'Il y a 5 jours', bg: 'bg-green-50' },
              { icon: <Syringe className="w-4 h-4 text-amber-600" />, text: 'Vaccination Newcastle — 2 459 sujets', time: '3 juin 2026', bg: 'bg-amber-50' },
            ].map((item, i) => (
              <div key={i} className="group flex items-start gap-3 p-2 -mx-2 rounded-xl hover:bg-sand-100 transition-all duration-200 cursor-default">
                <div className={`w-8 h-8 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-neutral-800 leading-snug">{item.text}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming reminders */}
        <div className="bg-white border border-sand-200 rounded-2xl p-5 shadow-elevation-sm hover:shadow-elevation-md transition-all duration-250">
          <h3 className="font-heading font-semibold text-sm text-neutral-900 mb-4">{t.dashboard.upcomingReminders}</h3>
          <div className="space-y-3">
            {[
              { label: 'Rappel vaccin Gumboro', detail: '2 459 sujets', date: '15 juin 2026', daysLeft: 5, urgent: true },
              { label: 'Vermifugation g\u00e9n\u00e9rale', detail: 'Tout l\'effectif', date: '22 juin 2026', daysLeft: 12, urgent: false },
              { label: 'Rappel Newcastle (La Sota)', detail: '2 450 sujets', date: '3 juillet 2026', daysLeft: 23, urgent: false },
            ].map((r, i) => (
              <div key={i} className={`group flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevation-sm ${
                r.urgent ? 'border-amber-200 bg-amber-50 hover:border-amber-300' : 'border-sand-200 bg-sand-100 hover:border-brand-300'
              }`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200 ${
                  r.urgent ? 'bg-amber-100' : 'bg-white border border-sand-200'
                }`}>
                  <Clock className={`w-4 h-4 ${r.urgent ? 'text-amber-600' : 'text-neutral-400'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-neutral-900">{r.label}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{r.detail}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    r.urgent ? 'bg-amber-200 text-amber-800' : 'bg-sand-200 text-neutral-600'
                  }`}>
                    {r.daysLeft}{t.dashboard.daysShort}
                  </span>
                  <p className="text-xs text-neutral-400 mt-1">{r.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon, label, value, sub, subColor, bg, border, href,
}: {
  icon: React.ReactNode; label: string; value: string; sub: string; subColor: string; bg: string; border: string; href?: string;
}) {
  const inner = (
    <div className={`group bg-white border ${border} rounded-2xl p-4 shadow-elevation-sm hover:shadow-elevation-md hover:-translate-y-1 hover:border-brand-400/50 transition-all duration-250 ${href ? 'cursor-pointer' : ''}`}>
      <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
        {icon}
      </div>
      <p className="font-heading font-semibold text-lg text-neutral-900 leading-none">{value}</p>
      <p className="text-xs text-neutral-600 mt-1">{label}</p>
      <p className={`text-xs mt-0.5 font-medium ${subColor}`}>{sub}</p>
    </div>
  );
  if (href) return <Link href={href}>{inner}</Link>;
  return inner;
}
