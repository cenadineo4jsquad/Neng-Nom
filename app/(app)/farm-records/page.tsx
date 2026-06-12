'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Syringe, Pill, Heart } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { mockFarmRecords, mockHealthEvents, mockWeeklyMortality, mockEffectifHistory } from '@/lib/mock-data';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function FarmRecordsPage() {
  const { t } = useLanguage();
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    totalAnimals: '',
    mortality: '',
    feedKg: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const totalMortality = mockFarmRecords.slice(0, 7).reduce((acc, r) => acc + r.mortality, 0);

  return (
    <div className="max-w-content space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-2xl text-brand-900">{t.farmRecords.title}</h1>
          <p className="text-sm text-neutral-600 mt-1">{t.farmRecords.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-white border border-sand-200 rounded-lg px-3 py-2 text-sm text-neutral-700 focus:outline-none focus:border-brand-600">
            <option>Juin 2026</option>
            <option>Mai 2026</option>
            <option>Avril 2026</option>
          </select>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-sand-200 rounded-xl p-5">
          <h3 className="font-heading font-semibold text-sm text-neutral-900 mb-1">{t.farmRecords.weeklyMortality}</h3>
          <p className="text-xs text-neutral-500 mb-4">{t.farmRecords.last5Weeks}</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={mockWeeklyMortality} barSize={28}>
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={20} />
              <Tooltip
                contentStyle={{ background: '#fff', border: '1px solid #EDE7DC', borderRadius: '8px', fontSize: '12px' }}
                cursor={{ fill: '#F5F0E8' }}
                formatter={(value: number) => [`${value} décès`, 'Mortalité']}
              />
              <Bar dataKey="mortality" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-sand-200 rounded-xl p-5">
          <h3 className="font-heading font-semibold text-sm text-neutral-900 mb-1">{t.farmRecords.livestockEvolution}&apos;effectif</h3>
          <p className="text-xs text-neutral-500 mb-4">{t.farmRecords.last40Days}</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={mockEffectifHistory}>
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={40} domain={['dataMin - 20', 'dataMax + 20']} />
              <Tooltip
                contentStyle={{ background: '#fff', border: '1px solid #EDE7DC', borderRadius: '8px', fontSize: '12px' }}
                formatter={(value: number) => [`${value.toLocaleString('fr-FR')} animaux`, 'Effectif']}
              />
              <Line type="monotone" dataKey="effectif" stroke="#40916C" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick entry form */}
      <div className="bg-white border border-sand-200 rounded-xl p-5">
        <h3 className="font-heading font-semibold text-sm text-neutral-900 mb-4">{t.farmRecords.quickEntry}</h3>
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-5 gap-3">
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">{t.farmRecords.date}</label>
            <input
              type="date"
              value={newEntry.date}
              onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
              className="w-full bg-sand-100 border border-sand-200 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-brand-600 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">{t.farmRecords.livestock}</label>
            <input
              type="number"
              value={newEntry.totalAnimals}
              onChange={(e) => setNewEntry({ ...newEntry, totalAnimals: e.target.value })}
              placeholder="2 450"
              className="w-full bg-sand-100 border border-sand-200 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-brand-600 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">{t.farmRecords.mortalityLabel}</label>
            <input
              type="number"
              value={newEntry.mortality}
              onChange={(e) => setNewEntry({ ...newEntry, mortality: e.target.value })}
              placeholder="0"
              className="w-full bg-sand-100 border border-sand-200 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-brand-600 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">{t.farmRecords.feed}</label>
            <input
              type="number"
              value={newEntry.feedKg}
              onChange={(e) => setNewEntry({ ...newEntry, feedKg: e.target.value })}
              placeholder="245"
              className="w-full bg-sand-100 border border-sand-200 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-brand-600 transition-colors"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-brand-800 text-white font-medium text-sm py-2 rounded-lg hover:bg-brand-700 transition-colors"
            >
              {t.common.save}
            </button>
          </div>
        </form>
      </div>

      {/* Records table */}
      <div className="bg-white border border-sand-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-sand-200">
          <h3 className="font-heading font-semibold text-sm text-neutral-900">{t.farmRecords.records}</h3>
        </div>
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-sand-100">
                {[t.farmRecords.date, t.farmRecords.livestock, t.farmRecords.mortalityLabel, t.farmRecords.feed, t.farmRecords.notes].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-100">
              {mockFarmRecords.map((r) => (
                <tr key={r.id} className="hover:bg-sand-100 transition-colors">
                  <td className="px-5 py-3 text-sm text-neutral-700">
                    {new Date(r.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                  </td>
                  <td className="px-5 py-3 text-sm font-medium text-neutral-900">{r.totalAnimals.toLocaleString('fr-FR')}</td>
                  <td className="px-5 py-3">
                    <span className={`text-sm font-medium ${r.mortality > 2 ? 'text-red-500' : r.mortality > 0 ? 'text-amber-600' : 'text-brand-600'}`}>
                      {r.mortality}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-neutral-700">{r.feedKg}</td>
                  <td className="px-5 py-3 text-xs text-neutral-500">{r.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-sand-100">
          {mockFarmRecords.slice(0, 5).map((r) => (
            <div key={r.id} className="px-5 py-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-900">{new Date(r.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{r.totalAnimals.toLocaleString('fr-FR')} {t.farmRecords.entries} · {r.feedKg} kg aliment</p>
              </div>
              <span className={`text-sm font-semibold ${r.mortality > 2 ? 'text-red-500' : r.mortality > 0 ? 'text-amber-600' : 'text-brand-600'}`}>
                {r.mortality} décès
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Health Events */}
      <div className="bg-white border border-sand-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-heading font-semibold text-sm text-neutral-900">{t.farmRecords.healthEvents}</h3>
          <button className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-800 hover:text-brand-600 px-3 py-1.5 bg-brand-50 rounded-lg hover:bg-brand-100 transition-colors">
            <Plus className="w-3.5 h-3.5" />
            {t.common.add}
          </button>
        </div>
        <div className="relative">
          <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-sand-200" />
          <div className="space-y-5">
            {mockHealthEvents.map((event) => {
              const icons: Record<string, React.ReactNode> = {
                vaccination: <Syringe className="w-4 h-4 text-brand-700" />,
                deworming: <Pill className="w-4 h-4 text-amber-600" />,
                treatment: <Heart className="w-4 h-4 text-red-500" />,
              };
              const colors: Record<string, string> = {
                vaccination: 'bg-brand-50 border-brand-100',
                deworming: 'bg-amber-50 border-amber-100',
                treatment: 'bg-red-50 border-red-100',
              };
              return (
                <div key={event.id} className="flex items-start gap-4 relative">
                  <div className={`w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 z-10 bg-white ${colors[event.type] ?? 'bg-sand-100 border-sand-200'}`}>
                    {icons[event.type] ?? <Heart className="w-4 h-4 text-neutral-400" />}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <p className="text-sm font-medium text-neutral-900">{event.description}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {event.animalCount.toLocaleString('fr-FR')} animaux · {new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
