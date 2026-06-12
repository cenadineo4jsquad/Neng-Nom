'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Plus, Star, Clock, MessageSquare, CheckCircle2, AlertTriangle } from 'lucide-react';
import { mockConsultations } from '@/lib/mock-data';
import type { Consultation } from '@/lib/mock-data';
import { useLanguage } from '@/lib/i18n';

type Tab = 'active' | 'pending' | 'closed';

export default function ConsultationsPage() {
  const [tab, setTab] = useState<Tab>('active');
  const { t } = useLanguage();

  const filtered = mockConsultations.filter((c) => {
    if (tab === 'active') return c.status === 'active';
    if (tab === 'pending') return c.status === 'pending';
    return c.status === 'closed';
  });

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'active', label: t.consultations.active, count: mockConsultations.filter((c) => c.status === 'active').length },
    { id: 'pending', label: t.consultations.pending, count: mockConsultations.filter((c) => c.status === 'pending').length },
    { id: 'closed', label: t.consultations.history, count: mockConsultations.filter((c) => c.status === 'closed').length },
  ];

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-2xl text-brand-900">{t.consultations.title}</h1>
          <p className="text-sm text-neutral-600 mt-1">{t.consultations.subtitle}</p>
        </div>
        <Link
          href="/consultations/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-800 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t.consultations.new}
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white border border-sand-200 rounded-xl p-1 w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
              tab === t.id ? 'bg-brand-800 text-white' : 'text-neutral-600 hover:text-neutral-900 hover:bg-sand-100'
            }`}
          >
            {t.label}
            {t.count > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                tab === t.id ? 'bg-brand-700 text-white' : 'bg-sand-200 text-neutral-600'
              }`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-sand-200 rounded-xl p-12 text-center">
          <MessageSquare className="w-12 h-12 text-sand-300 mx-auto mb-4" />
          <p className="font-semibold text-neutral-700 mb-1">{t.consultations.noConsultations}</p>
          <p className="text-sm text-neutral-500">{t.consultations.noConsultationsDesc}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((consult) => (
            <ConsultationCard key={consult.id} consult={consult} />
          ))}
        </div>
      )}
    </div>
  );
}

function ConsultationCard({ consult }: { consult: Consultation }) {
  const { t } = useLanguage();
  return (
    <div className="bg-white border border-sand-200 rounded-xl p-5 hover:border-brand-400 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center text-brand-800 font-semibold text-sm flex-shrink-0">
          {consult.vet.fullName.split(' ').slice(-1)[0][0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-sm text-neutral-900">{consult.vet.fullName}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{consult.vet.specialization}</p>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <StatusBadge status={consult.status} />
              {consult.type === 'urgent' && (
                <span className="text-xs bg-red-100 text-red-600 font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  {t.consultations.urgent}
                </span>
              )}
            </div>
          </div>
          <p className="text-xs text-neutral-600 mt-2 line-clamp-2">{consult.symptoms}</p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1 text-xs text-neutral-400">
              <Clock className="w-3 h-3" />
              {new Date(consult.startedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-neutral-600">{consult.fee.toLocaleString('fr-FR')} FCFA</span>
              <Link
                href={`/consultations/${consult.id}`}
                className="text-xs font-medium text-brand-800 hover:text-brand-600 flex items-center gap-1 px-3 py-1.5 bg-brand-50 rounded-lg hover:bg-brand-100 transition-colors"
              >
                {t.consultations.open} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Consultation['status'] }) {
  const { t } = useLanguage();
  const configs = {
    active: { label: t.consultations.active, cls: 'bg-green-100 text-green-700' },
    pending: { label: t.consultations.pending, cls: 'bg-amber-100 text-amber-700' },
    closed: { label: t.consultations.completed, cls: 'bg-sand-200 text-neutral-600' },
  };
  const { label, cls } = configs[status];
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cls}`}>{label}</span>
  );
}
