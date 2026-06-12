'use client';

import { useState } from 'react';
import { Heart, MessageSquare, AlertTriangle, Plus, X, Image as ImageIcon } from 'lucide-react';
import { mockCommunityPosts } from '@/lib/mock-data';
import { useLanguage } from '@/lib/i18n';
import type { CommunityPost, PostCategory } from '@/lib/mock-data';

const getCategoryConfig = (t: any): Record<PostCategory, { label: string; cls: string }> => ({
  question: { label: t.community.questions, cls: 'bg-blue-100 text-blue-700' },
  alert: { label: t.community.alerts, cls: 'bg-red-100 text-red-700' },
  tip: { label: t.community.tips, cls: 'bg-brand-100 text-brand-700' },
  sale: { label: t.community.sale, cls: 'bg-amber-100 text-amber-700' },
});

type Filter = 'all' | PostCategory;

export default function CommunityPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>('all');
  const [showModal, setShowModal] = useState(false);

  const filtered = filter === 'all' ? mockCommunityPosts : mockCommunityPosts.filter((p) => p.category === filter);
  const hasAlert = mockCommunityPosts.some((p) => p.category === 'alert' && p.region === 'Littoral');
  const categoryConfig = getCategoryConfig(t);

  return (
    <div className="max-w-2xl mx-auto space-y-5 relative">
      {/* Disease alert banner */}
      {hasAlert && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-red-800">{t.community.diseaseAlert} · Région du Littoral</p>
            <p className="text-xs text-red-700 mt-0.5">Maladie de Newcastle · Sévérité : ÉLEVÉE</p>
          </div>
          <button className="text-xs font-medium text-red-700 bg-red-100 px-3 py-1.5 rounded-lg hover:bg-red-200 transition-colors flex-shrink-0">
            {t.community.seeDetails}
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-2xl text-brand-900">{t.community.title}</h1>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {([
          { id: 'all', label: t.community.all },
          { id: 'question', label: t.community.questions },
          { id: 'alert', label: t.community.alerts },
          { id: 'tip', label: t.community.tips },
          { id: 'sale', label: t.community.sale },
        ] as { id: Filter; label: string }[]).map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${
              filter === f.id ? 'bg-brand-800 text-white border-brand-800' : 'bg-white border-sand-200 text-neutral-600 hover:border-brand-400'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} categoryConfig={categoryConfig} t={t} />
        ))}
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-brand-800 text-white rounded-full shadow-lg hover:bg-brand-700 transition-all duration-200 flex items-center justify-center hover:scale-105 z-30"
      >
        <Plus className="w-5 h-5" />
      </button>

      {/* New post modal */}
      {showModal && <NewPostModal onClose={() => setShowModal(false)} categoryConfig={categoryConfig} t={t} />}
    </div>
  );
}

function PostCard({ post, categoryConfig, t }: { post: CommunityPost; categoryConfig: Record<PostCategory, { label: string; cls: string }>; t: any }) {
  const [liked, setLiked] = useState(false);
  const config = categoryConfig[post.category];

  return (
    <div className={`bg-white border rounded-xl p-5 ${post.category === 'alert' ? 'border-red-200' : 'border-sand-200'}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-800 text-xs font-semibold flex-shrink-0">
            {post.anonymous ? '?' : post.authorName[0]}
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-900">{post.authorName}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-xs text-neutral-400">{post.region}</p>
              <span className="text-neutral-300">·</span>
              <p className="text-xs text-neutral-400">
                {new Date(post.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
              </p>
            </div>
          </div>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${config.cls}`}>{config.label}</span>
      </div>

      <p className="text-sm text-neutral-800 leading-relaxed">{post.content}</p>

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt=""
          className="w-full rounded-xl mt-3 object-cover max-h-56"
        />
      )}

      <div className="flex flex-wrap gap-1.5 mt-3">
        {post.tags.map((tag) => (
          <span key={tag} className="text-xs text-neutral-500 bg-sand-100 px-2 py-0.5 rounded-full">#{tag}</span>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-sand-100">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${liked ? 'text-red-500' : 'text-neutral-500 hover:text-red-500'}`}
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-red-500' : ''}`} />
          {post.likes + (liked ? 1 : 0)}
        </button>
        <button className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-brand-700 transition-colors">
          <MessageSquare className="w-4 h-4" />
          {post.replies} {t.community.replies}
        </button>
      </div>
    </div>
  );
}

function NewPostModal({ onClose, categoryConfig, t }: { onClose: () => void; categoryConfig: Record<PostCategory, { label: string; cls: string }>; t: any }) {
  const [category, setCategory] = useState<PostCategory>('question');
  const [content, setContent] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-brand-900/50 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-heading font-semibold text-base text-neutral-900">{t.community.newPost}</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-sand-100 transition-colors text-neutral-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-2 uppercase tracking-wide">{t.community.category}</label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(categoryConfig) as PostCategory[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    category === cat ? 'bg-brand-800 text-white border-brand-800' : 'border-sand-200 text-neutral-600 hover:border-brand-400'
                  }`}
                >
                  {categoryConfig[cat].label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-2 uppercase tracking-wide">{t.community.message}</label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t.community.messagePlaceholder}
              className="w-full bg-sand-100 border border-sand-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-brand-600 transition-colors resize-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <button type="button" className="flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-700 transition-colors">
              <ImageIcon className="w-4 h-4" />
              {t.community.addPhoto}
            </button>
            <label className="flex items-center gap-2 text-xs text-neutral-600 cursor-pointer">
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="w-4 h-4 rounded border-sand-300 accent-brand-800"
              />
              {t.community.publishAnonymously}
            </label>
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 bg-white border border-sand-200 text-neutral-700 font-medium text-sm py-3 rounded-lg hover:bg-sand-100 transition-colors">
              {t.common.cancel}
            </button>
            <button type="submit" disabled={!content} className="flex-1 bg-brand-800 text-white font-medium text-sm py-3 rounded-lg hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              {t.common.publish}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
