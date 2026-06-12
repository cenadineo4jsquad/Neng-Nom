'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Clock, CheckCircle2, ArrowRight, FlaskConical } from 'lucide-react';
import { mockLabRequests } from '@/lib/mock-data';
import type { LabRequest } from '@/lib/mock-data';
import { CardSkeleton, EmptyState } from '@/components/shared/PagePrimitives';
import { useLanguage } from '@/lib/i18n';

const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  received: { label: 'Reçue', cls: 'bg-sand-200 text-neutral-600' },
  scheduled: { label: 'Planifiée', cls: 'bg-blue-100 text-blue-700' },
  technician_en_route: { label: 'Technicien en route', cls: 'bg-amber-100 text-amber-700' },
  samples_collected: { label: 'Échantillons collectés', cls: 'bg-brand-100 text-brand-700' },
  analysis: { label: 'Analyse en cours', cls: 'bg-blue-100 text-blue-700' },
  results_ready: { label: 'Résultats prêts', cls: 'bg-green-100 text-green-700' },
  delivered: { label: 'Livré', cls: 'bg-sand-200 text-neutral-600' },
};

export default function LabPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="max-w-3xl space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading font-bold text-2xl text-brand-900">{t.lab.title}</h1>
          <p className="text-sm text-neutral-500 mt-1">{t.lab.subtitle}</p>
        </div>
        <Link
          href="/lab/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-800 text-white text-sm font-medium rounded-xl hover:bg-brand-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          {t.lab.orderTest}
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : mockLabRequests.length === 0 ? (
        <EmptyState
          icon={<FlaskConical size={28} />}
          title={t.lab.noTests}
          message={t.lab.noTestsDesc}
          action={
            <Link
              href="/lab/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-800 text-white text-sm font-medium rounded-xl hover:bg-brand-700 transition-colors"
            >
              <Plus size={14} />
              {t.lab.orderTest}
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {mockLabRequests.map((req) => (
            <LabCard key={req.id} req={req} />
          ))}
        </div>
      )}
    </div>
  );
}

function LabCard({ req }: { req: LabRequest }) {
  const { t } = useLanguage();
  const config = STATUS_CONFIG[req.status];
  return (
    <article className="bg-white border border-sand-200 rounded-xl p-5 hover:border-brand-400 transition-all duration-150 group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <p className="font-semibold text-sm text-neutral-900">{req.testType}</p>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.cls}`}>{config.label}</span>
          </div>
          <p className="text-xs text-neutral-500">{req.location}</p>
          {req.technician && <p className="text-xs text-brand-700 mt-1 font-medium">{req.technician}</p>}
          <div className="flex items-center gap-4 mt-3">
            <time className="flex items-center gap-1 text-xs text-neutral-400">
              <Clock className="w-3 h-3" />
              {new Date(req.scheduledAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
            </time>
            <span className="text-xs font-semibold text-neutral-700">{req.price.toLocaleString('fr-FR')} FCFA</span>
          </div>
          {req.results && (
            <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                <p className="text-xs font-semibold text-green-700">{t.lab.results}</p>
              </div>
              <p className="text-xs text-neutral-700">{req.results}</p>
            </div>
          )}
        </div>
        <Link
          href={`/lab/${req.id}`}
          className="flex-shrink-0 text-xs font-semibold text-brand-800 px-3 py-1.5 bg-brand-50 rounded-lg hover:bg-brand-100 transition-colors flex items-center gap-1 border border-brand-100 group-hover:bg-brand-100"
        >
          {t.lab.track} <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </article>
  );
}
