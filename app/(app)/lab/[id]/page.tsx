'use client';

import Link from 'next/link';
import { ArrowLeft, Check, Phone } from 'lucide-react';
import { mockLabRequests } from '@/lib/mock-data';
import { useLanguage } from '@/lib/i18n';

const STATUS_ORDER = ['received', 'scheduled', 'technician_en_route', 'samples_collected', 'analysis', 'results_ready', 'delivered'];

const STEP_KEYS: Array<'received' | 'scheduled' | 'techEnRoute' | 'samplesCollected' | 'analysis' | 'resultsReady' | 'delivered'> = [
  'received', 'scheduled', 'techEnRoute', 'samplesCollected', 'analysis', 'resultsReady', 'delivered',
];

export default function LabDetailPage({ params }: { params: { id: string } }) {
  const { t, locale } = useLanguage();
  const req = mockLabRequests.find((r) => r.id === params.id) ?? mockLabRequests[0];
  const currentIdx = STATUS_ORDER.indexOf(req.status);

  const steps = STEP_KEYS.map((key) => ({
    key,
    label: t.lab.steps[key],
    desc: t.lab.stepDescs[key],
  }));

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/lab"
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-sand-200 transition-colors text-neutral-600"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="font-heading font-bold text-xl text-brand-900">{req.testType}</h1>
          <p className="text-xs text-neutral-500 mt-0.5">{req.location}</p>
        </div>
      </div>

      {/* Progress tracker */}
      <section className="bg-white border border-sand-200 rounded-2xl p-6">
        <ol className="space-y-0">
          {steps.map((s, i) => {
            const isDone = i < currentIdx;
            const isActive = i === currentIdx;
            return (
              <li key={s.key} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative ${
                      isDone ? 'bg-brand-600' : isActive ? 'bg-brand-800' : 'bg-sand-200'
                    }`}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-brand-800 animate-pulse-ring" aria-hidden="true" />
                    )}
                    {isDone ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <span className={`w-3 h-3 rounded-full ${isActive ? 'bg-white' : 'bg-sand-300'}`} />
                    )}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-0.5 h-8 mt-1 ${isDone ? 'bg-brand-400' : 'bg-sand-200'}`} aria-hidden="true" />
                  )}
                </div>
                <div className="flex-1 pt-1 pb-7">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={`text-sm font-medium ${isActive ? 'text-brand-800' : isDone ? 'text-neutral-900' : 'text-neutral-400'}`}>
                      {s.label}
                    </p>
                    {isActive && (
                      <span className="text-xs bg-amber-100 text-amber-700 font-medium px-2 py-0.5 rounded-full">{t.lab.inProgress}</span>
                    )}
                  </div>
                  {(isDone || isActive) && (
                    <p className="text-xs text-neutral-500 mt-0.5">{s.desc}</p>
                  )}
                  {isActive && req.technician && (
                    <p className="text-xs text-brand-600 font-medium mt-1">{req.technician}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Info */}
      <section className="mt-4 bg-brand-50 border border-brand-100 rounded-2xl p-5">
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-xs text-neutral-500">{t.lab.appointment}</dt>
            <dd className="font-semibold text-neutral-900 mt-0.5">
              <time>{new Date(req.scheduledAt).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long' })}</time>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-neutral-500">{t.lab.amount}</dt>
            <dd className="font-semibold text-neutral-900 mt-0.5">{req.price.toLocaleString('fr-FR')} FCFA</dd>
          </div>
        </dl>
        {req.technician && (
          <div className="mt-4 pt-4 border-t border-brand-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-500">{t.lab.assignedTech}</p>
              <p className="text-sm font-medium text-neutral-900 mt-0.5">{req.technician}</p>
            </div>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-brand-200 text-brand-800 text-xs font-medium rounded-lg hover:bg-brand-100 transition-colors">
              <Phone className="w-3 h-3" />
              {t.lab.call}
            </button>
          </div>
        )}
      </section>

      {req.results && (
        <section className="mt-4 bg-green-50 border border-green-200 rounded-2xl p-5">
          <p className="text-sm font-semibold text-green-700 mb-2">{t.lab.resultsAvailable}</p>
          <p className="text-sm text-neutral-700 leading-relaxed">{req.results}</p>
          <button className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors">
            {t.lab.downloadReport}
          </button>
        </section>
      )}
    </div>
  );
}
