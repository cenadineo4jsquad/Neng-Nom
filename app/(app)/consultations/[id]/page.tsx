'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Paperclip, Star } from 'lucide-react';
import { mockConsultations } from '@/lib/mock-data';
import { useLanguage } from '@/lib/i18n';

export default function ConsultationDetailPage({ params }: { params: { id: string } }) {
  const { t, locale } = useLanguage();
  const consult = mockConsultations.find((c) => c.id === params.id) ?? mockConsultations[0];
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(consult.messages);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        senderId: 'farmer-1',
        senderRole: 'farmer' as const,
        content: message,
        timestamp: new Date().toISOString(),
      },
    ]);
    setMessage('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Chat */}
      <div className="flex-1 flex flex-col bg-white border border-sand-200 rounded-xl overflow-hidden min-w-0">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-sand-200">
          <Link href="/consultations" className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-sand-100 transition-colors text-neutral-600">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="w-9 h-9 bg-brand-100 rounded-xl flex items-center justify-center text-brand-800 font-semibold text-sm flex-shrink-0">
            {consult.vet.fullName.split(' ').slice(-1)[0][0]}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-neutral-900">{consult.vet.fullName}</p>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              <p className="text-xs text-neutral-500">{t.consultDetail.online}</p>
            </div>
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            consult.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-sand-200 text-neutral-600'
          }`}>
            {consult.status === 'active' ? t.consultations.activeStatus : t.consultations.completed}
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.senderRole === 'farmer' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md rounded-2xl px-4 py-3 ${
                msg.senderRole === 'farmer'
                  ? 'bg-brand-50 border border-brand-100 rounded-tr-sm'
                  : 'bg-white border border-sand-200 rounded-tl-sm'
              }`}>
                {msg.mediaUrl && (
                  <img src={msg.mediaUrl} alt="" className="w-full rounded-xl mb-2 object-cover max-h-40" />
                )}
                <p className="text-sm text-neutral-800 leading-relaxed">{msg.content}</p>
                <p className="text-xs text-neutral-400 mt-1.5 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString(locale === 'fr' ? 'fr-FR' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {consult.status === 'active' && (
            <div className="flex justify-start">
              <div className="bg-white border border-sand-200 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-brand-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-brand-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-brand-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        {consult.status === 'active' && (
          <form onSubmit={handleSend} className="p-4 border-t border-sand-200">
            <div className="flex items-center gap-2 bg-sand-100 border border-sand-200 rounded-xl px-3 py-2">
              <button type="button" className="text-neutral-400 hover:text-neutral-600 transition-colors">
                <Paperclip className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.consultations.yourMessage}
                className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="w-8 h-8 bg-brand-800 text-white rounded-lg flex items-center justify-center hover:bg-brand-700 disabled:opacity-50 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Right panel */}
      <div className="hidden xl:flex w-72 flex-col gap-4 flex-shrink-0">
        {/* Vet card */}
        <div className="bg-white border border-sand-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-brand-800 font-bold text-base">
              {consult.vet.fullName.split(' ').slice(-1)[0][0]}
            </div>
            <div>
              <p className="font-semibold text-sm text-neutral-900">{consult.vet.fullName}</p>
              <p className="text-xs text-neutral-500">{consult.vet.specialization}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="text-xs font-medium text-neutral-700">{consult.vet.rating}</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-neutral-600 space-y-1">
            <div className="flex justify-between">
              <span>{t.consultDetail.type}</span>
              <span className="font-medium text-neutral-900">{consult.type === 'urgent' ? t.consultations.urgent : t.newConsult.normal}</span>
            </div>
            <div className="flex justify-between">
              <span>{t.consultDetail.group}</span>
              <span className="font-medium text-neutral-900">{consult.animalGroup}</span>
            </div>
            <div className="flex justify-between">
              <span>{t.consultDetail.rate}</span>
              <span className="font-medium text-neutral-900">{consult.fee.toLocaleString('fr-FR')} FCFA</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white border border-sand-200 rounded-xl p-5 flex-1">
          <p className="font-semibold text-xs text-neutral-600 uppercase tracking-wide mb-3">{t.consultations.caseNotes}</p>
          <textarea
            rows={5}
            placeholder={t.consultations.notesPlaceholder}
            className="w-full bg-sand-100 border border-sand-200 rounded-lg px-3 py-2 text-xs text-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:border-brand-600 transition-colors resize-none"
          />
        </div>

        {consult.status === 'active' && (
          <button className="w-full bg-red-50 border border-red-200 text-red-600 font-medium text-sm py-3 rounded-lg hover:bg-red-100 transition-colors">
            {t.consultations.endConsultation}
          </button>
        )}
      </div>
    </div>
  );
}
