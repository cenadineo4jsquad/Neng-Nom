'use client';

import { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, ClipboardList } from 'lucide-react';
import { mockAiSuggestions } from '@/lib/mock-data';
import { useLanguage } from '@/lib/i18n';
import type { AiSuggestion } from '@/lib/mock-data';

export default function AiSuggestionsPage() {
  const { t, locale } = useLanguage();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, 'useful' | 'not_useful'>>({});

  const priorityConfig = {
    high: { label: t.aiSuggestions.priority.high, cls: 'bg-red-100 text-red-700 border-red-200' },
    medium: { label: t.aiSuggestions.priority.medium, cls: 'bg-amber-100 text-amber-700 border-amber-200' },
    low: { label: t.aiSuggestions.priority.low, cls: 'bg-brand-100 text-brand-700 border-brand-200' },
  };

  const featured = mockAiSuggestions[0];
  const history = mockAiSuggestions.slice(1);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-heading font-bold text-2xl text-brand-900">{t.aiSuggestions.title}</h1>
        <p className="text-sm text-neutral-500 mt-1">
          {t.aiSuggestions.lastUpdated} : {new Date().toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      {/* Featured suggestion */}
      <div className="bg-amber-100 border border-amber-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">{t.aiSuggestions.featuredLabel}</span>
          <span className="ml-auto text-xs font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-full border border-red-200">
            {priorityConfig.high.label}
          </span>
        </div>

        <h2 className="font-heading font-semibold text-base text-neutral-900 mb-3">{featured.title}</h2>
        <p className="text-sm text-neutral-700 leading-relaxed mb-4">{featured.content}</p>

        <div className="bg-white/60 rounded-lg px-4 py-3 mb-4">
          <p className="text-xs font-medium text-amber-800">{t.aiSuggestions.basedOn}</p>
          <p className="text-xs text-amber-700 mt-0.5">{featured.context}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-600 font-medium">{t.aiSuggestions.wasUseful}</span>
          <button
            onClick={() => setFeedback({ ...feedback, [featured.id]: 'useful' })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              feedback[featured.id] === 'useful'
                ? 'bg-brand-600 text-white border-brand-600'
                : 'bg-white border-sand-200 text-neutral-600 hover:border-brand-400'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            {t.common.yes}
          </button>
          <button
            onClick={() => setFeedback({ ...feedback, [featured.id]: 'not_useful' })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              feedback[featured.id] === 'not_useful'
                ? 'bg-neutral-600 text-white border-neutral-600'
                : 'bg-white border-sand-200 text-neutral-600 hover:border-neutral-400'
            }`}
          >
            <ThumbsDown className="w-3.5 h-3.5" />
            {t.common.no}
          </button>
        </div>
      </div>

      {/* History */}
      <div>
        <h3 className="font-heading font-semibold text-sm text-neutral-700 uppercase tracking-wide mb-3">{t.aiSuggestions.last7Days}</h3>
        {history.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {history.map((s) => (
              <SuggestionHistoryCard
                key={s.id}
                suggestion={s}
                isExpanded={expanded === s.id}
                onToggle={() => setExpanded(expanded === s.id ? null : s.id)}
                feedback={feedback[s.id]}
                onFeedback={(f) => setFeedback({ ...feedback, [s.id]: f })}
                priorityConfig={priorityConfig}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SuggestionHistoryCard({
  suggestion,
  isExpanded,
  onToggle,
  feedback,
  onFeedback,
  priorityConfig,
}: {
  suggestion: AiSuggestion;
  isExpanded: boolean;
  onToggle: () => void;
  feedback?: 'useful' | 'not_useful';
  onFeedback: (f: 'useful' | 'not_useful') => void;
  priorityConfig: Record<string, { label: string; cls: string }>;
}) {
  const { t, locale } = useLanguage();
  const config = priorityConfig[suggestion.priority];

  return (
    <div className="bg-white border border-sand-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-start gap-3 text-left hover:bg-sand-100 transition-colors"
      >
        <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="font-medium text-sm text-neutral-900 leading-snug">{suggestion.title}</p>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${config.cls}`}>{config.label}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
            </div>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            {new Date(suggestion.generatedAt).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long' })}
          </p>
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-sand-100">
          <p className="text-sm text-neutral-700 leading-relaxed mt-3 mb-3">{suggestion.content}</p>
          <div className="bg-sand-100 rounded-lg px-3 py-2 mb-3">
            <p className="text-xs font-medium text-neutral-600">{t.aiSuggestions.context}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{suggestion.context}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">{t.aiSuggestions.useful}</span>
            <button
              onClick={() => onFeedback('useful')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs border transition-all ${
                feedback === 'useful' ? 'bg-brand-600 text-white border-brand-600' : 'border-sand-200 text-neutral-500 hover:border-brand-400'
              }`}
            >
              <ThumbsUp className="w-3 h-3" /> {t.common.yes}
            </button>
            <button
              onClick={() => onFeedback('not_useful')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs border transition-all ${
                feedback === 'not_useful' ? 'bg-neutral-600 text-white border-neutral-600' : 'border-sand-200 text-neutral-500 hover:border-neutral-400'
              }`}
            >
              <ThumbsDown className="w-3 h-3" /> {t.common.no}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  const { t } = useLanguage();
  return (
    <div className="bg-white border border-sand-200 rounded-xl p-10 text-center">
      <div className="w-16 h-16 bg-sand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <ClipboardList className="w-8 h-8 text-sand-300" />
      </div>
      <p className="font-semibold text-neutral-700 mb-2">{t.aiSuggestions.noSuggestions}</p>
      <p className="text-sm text-neutral-500 max-w-xs mx-auto">
        {t.aiSuggestions.noSuggestionsDesc}
      </p>
    </div>
  );
}
