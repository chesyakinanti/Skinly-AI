'use client';

import React, { useState, useMemo } from 'react';
import { getIngredients } from '@/data/knowledgeData';
import { IngredientCard } from '@/components/knowledge/IngredientCard';
import { EmptyState } from '@/components/common/EmptyState';
import { Card } from '@/components/common/Card';
import {
  Search,
  BookOpen,
  ShieldCheck,
  X,
  Sparkles,
  Droplets,
  Sparkle,
  Clock,
  Heart,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import { SkinType } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

const QUICK_SUGGESTIONS = [
  'Niacinamide',
  'Hyaluronic Acid',
  'Ceramide',
  'Retinol',
  'Salicylic Acid',
  'Centella Asiatica',
];

export default function KnowledgePage() {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedSkinType, setSelectedSkinType] = useState<SkinType | 'ALL'>('ALL');

  const allIngredients = useMemo(() => {
    return getIngredients(language);
  }, [language]);

  const categories = useMemo(() => {
    const list =
      language === 'id'
        ? [
            { label: 'Semua Kategori', value: 'ALL', icon: Sparkles },
            { label: 'Sawar Kulit', value: 'Barrier Repair', icon: ShieldCheck },
            { label: 'Hidrasi', value: 'Hydration', icon: Droplets },
            { label: 'Eksfoliasi', value: 'Exfoliant', icon: Sparkle },
            { label: 'Anti-Aging', value: 'Anti-Aging', icon: Clock },
            { label: 'Menenangkan', value: 'Soothing', icon: Heart },
          ]
        : [
            { label: 'All Categories', value: 'ALL', icon: Sparkles },
            { label: 'Barrier Repair', value: 'Barrier Repair', icon: ShieldCheck },
            { label: 'Hydration', value: 'Hydration', icon: Droplets },
            { label: 'Exfoliant', value: 'Exfoliant', icon: Sparkle },
            { label: 'Anti-Aging', value: 'Anti-Aging', icon: Clock },
            { label: 'Soothing', value: 'Soothing', icon: Heart },
          ];

    return list.map((cat) => {
      const count =
        cat.value === 'ALL'
          ? allIngredients.length
          : allIngredients.filter((ing) => ing.category === cat.value).length;
      return { ...cat, count };
    });
  }, [language, allIngredients]);

  const skinTypeFilters = useMemo(() => {
    const filters: {
      label: string;
      value: SkinType | 'ALL';
      color: string;
      activeClass: string;
    }[] = [
      {
        label: t.knowledge.allTypes,
        value: 'ALL',
        color: 'bg-[#A4556B]',
        activeClass: 'bg-gradient-to-r from-[#A4556B] to-[#8F475B] text-white shadow-soft',
      },
      {
        label: t.skinBadges.Normal,
        value: 'Normal',
        color: 'bg-[#A9B8A2]',
        activeClass: 'bg-[#A9B8A2] text-[#24351F] shadow-soft',
      },
      {
        label: t.skinBadges.Dry,
        value: 'Dry',
        color: 'bg-[#7A9BB3]',
        activeClass: 'bg-[#7A9BB3] text-white shadow-soft',
      },
      {
        label: t.skinBadges.Oily,
        value: 'Oily',
        color: 'bg-[#D58B9B]',
        activeClass: 'bg-[#D58B9B] text-[#541625] shadow-soft',
      },
      {
        label: t.skinBadges.Combination,
        value: 'Combination',
        color: 'bg-[#9882B3]',
        activeClass: 'bg-[#9882B3] text-white shadow-soft',
      },
    ];

    return filters.map((st) => {
      const count =
        st.value === 'ALL'
          ? allIngredients.length
          : allIngredients.filter((ing) => ing.suitableSkinTypes.includes(st.value as SkinType))
              .length;
      return { ...st, count };
    });
  }, [t, allIngredients]);

  const filteredIngredients = useMemo(() => {
    return allIngredients.filter((item) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        item.name.toLowerCase().includes(query) ||
        item.inciName.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.functions.some((f) => f.toLowerCase().includes(query));

      const matchesCategory =
        selectedCategory === 'ALL' || item.category === selectedCategory;

      const matchesSkinType =
        selectedSkinType === 'ALL' || item.suitableSkinTypes.includes(selectedSkinType);

      return matchesSearch && matchesCategory && matchesSkinType;
    });
  }, [allIngredients, searchQuery, selectedCategory, selectedSkinType]);

  const hasActiveFilters =
    searchQuery.trim() !== '' || selectedCategory !== 'ALL' || selectedSkinType !== 'ALL';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedSkinType('ALL');
  };

  return (
    <div className="space-y-10 sm:space-y-14 max-w-6xl mx-auto animate-fadeInUp">
      {/* Header */}
      <div className="text-center space-y-3.5">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#F3E3E7] border border-[#E9D2D8] text-xs font-bold tracking-[0.05em] uppercase text-[#A4556B] shadow-xs">
          <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{t.knowledge.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#64424D] tracking-[-0.035em] leading-[1.14]">
          {t.knowledge.title}
        </h1>
        <p className="text-sm sm:text-base text-[#64424D]/80 max-w-2xl mx-auto leading-relaxed tracking-[-0.01em]">
          {t.knowledge.subtitle}
        </p>
      </div>

      {/* Ultra-Modern Filter & Curation Command Hub */}
      <div className="rounded-3xl bg-white/95 backdrop-blur-xl border border-[#F3E3E7] p-6 sm:p-8 shadow-[0_10px_35px_-5px_rgba(100,66,77,0.07)] space-y-6">
        {/* Search Bar + Quick Suggestions */}
        <div className="space-y-3">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.knowledge.searchPlaceholder}
              className="w-full pl-12 pr-10 py-3.5 rounded-full bg-[#FCF8F6] border border-[#E2C3CB] focus:border-[#A4556B] focus:bg-white focus:ring-4 focus:ring-[#A4556B]/15 text-xs sm:text-sm text-[#64424D] placeholder-[#64424D]/50 shadow-inner transition-all duration-200"
              aria-label={t.knowledge.searchPlaceholder}
            />
            <Search
              className="w-5 h-5 text-[#A4556B] absolute left-4 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-[#64424D]/60 hover:text-[#A4556B] hover:bg-[#F3E3E7] transition-all"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Quick Search Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 text-xs text-[#64424D]/70">
            <span className="text-[11px] font-semibold text-[#64424D]/60 mr-1 flex items-center space-x-1">
              <Sparkle className="w-3 h-3 text-[#A4556B]" aria-hidden="true" />
              <span>{t.knowledge.popularSearchesLabel || 'Pencarian Cepat:'}</span>
            </span>
            {QUICK_SUGGESTIONS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSearchQuery(item)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-150 ${
                  searchQuery.toLowerCase() === item.toLowerCase()
                    ? 'bg-[#A4556B] text-white shadow-xs'
                    : 'bg-[#FCF8F6] text-[#64424D] hover:bg-[#F3E3E7] border border-[#F3E3E7]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Segmented Tabs */}
        <div className="pt-4 border-t border-[#F3E3E7] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64424D]/70 flex items-center space-x-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#A4556B]" aria-hidden="true" />
              <span>{t.knowledge.categoryLabel}</span>
            </span>
            <span className="text-[11px] text-[#64424D]/60 font-medium">
              {categories.length - 1} {language === 'id' ? 'Kategori Medis' : 'Categories'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.value;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`group inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#A4556B] to-[#8F475B] text-white shadow-soft scale-[1.02]'
                      : 'bg-[#FCF8F6] hover:bg-[#F3E3E7] text-[#64424D] border border-[#F3E3E7] hover:border-[#E2C3CB]'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-[#A4556B]'
                    }`}
                    aria-hidden="true"
                  />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white text-[#64424D]/70 border border-[#F3E3E7]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skin Type Swatches */}
        <div className="pt-4 border-t border-[#F3E3E7] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64424D]/70 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#A4556B]" aria-hidden="true" />
              <span>{t.knowledge.skinTypeLabel}</span>
            </span>
            <span className="text-[11px] text-[#64424D]/60 font-medium">
              {language === 'id' ? 'Kesesuaian Formula' : 'Formula Suitability'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {skinTypeFilters.map((st) => {
              const isActive = selectedSkinType === st.value;
              return (
                <button
                  key={st.value}
                  type="button"
                  onClick={() => setSelectedSkinType(st.value)}
                  className={`inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? st.activeClass + ' scale-[1.02]'
                      : 'bg-[#FCF8F6] hover:bg-[#F3E3E7] text-[#64424D] border border-[#F3E3E7] hover:border-[#E2C3CB]'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${st.color} shadow-xs`} />
                  <span>{st.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-black/15 text-current' : 'bg-white text-[#64424D]/70 border border-[#F3E3E7]'
                    }`}
                  >
                    {st.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filters Tag Strip & Live Count Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#F3E3E7] text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#64424D]/80 font-medium">
              {language === 'id'
                ? `Menampilkan ${filteredIngredients.length} dari ${allIngredients.length} bahan aktif`
                : `Showing ${filteredIngredients.length} of ${allIngredients.length} active ingredients`}
            </span>

            {/* Individual active chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-1.5 pl-0 sm:pl-2">
                {searchQuery && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#F3E3E7] text-[#A4556B] text-[11px] font-semibold">
                    <span>&ldquo;{searchQuery}&rdquo;</span>
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="hover:text-[#64424D]"
                      aria-label="Remove search filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedCategory !== 'ALL' && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#A4556B]/15 text-[#A4556B] text-[11px] font-semibold">
                    <span>
                      {categories.find((c) => c.value === selectedCategory)?.label || selectedCategory}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('ALL')}
                      className="hover:text-[#64424D]"
                      aria-label="Remove category filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedSkinType !== 'ALL' && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#64424D]/15 text-[#64424D] text-[11px] font-semibold">
                    <span>{t.skinBadges[selectedSkinType as keyof typeof t.skinBadges]}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedSkinType('ALL')}
                      className="hover:text-[#A4556B]"
                      aria-label="Remove skin type filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#A4556B] hover:text-[#7D3B4E] transition-colors self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.knowledge.resetFilterBtn}</span>
            </button>
          )}
        </div>
      </div>

      {/* Ingredients Grid or Empty State */}
      {filteredIngredients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredIngredients.map((ingredient) => (
            <IngredientCard key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={t.knowledge.noResultsTitle}
          description={t.knowledge.noResultsDesc}
          actionLabel={t.knowledge.resetFilterBtn}
          onAction={handleResetFilters}
        />
      )}

      {/* Safety & Protocol Guide */}
      <Card variant="blush" className="p-6 sm:p-8 space-y-4 shadow-card">
        <div className="flex items-center space-x-2 text-sm font-bold text-[#64424D] uppercase tracking-wider font-heading">
          <ShieldCheck className="w-5 h-5 text-[#A4556B]" aria-hidden="true" />
          <span>{t.knowledge.patchTestTitle}</span>
        </div>
        <p className="text-xs sm:text-sm text-[#64424D]/80 leading-relaxed">
          {t.knowledge.patchTestDesc}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-2xl bg-white border border-[#F3E3E7] space-y-1 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all">
            <span className="font-bold text-[#A4556B] block">1. {t.knowledge.patchStep1Title}</span>
            <p className="text-[#64424D]/75 leading-relaxed">{t.knowledge.patchStep1Desc}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#F3E3E7] space-y-1 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all">
            <span className="font-bold text-[#A4556B] block">2. {t.knowledge.patchStep2Title}</span>
            <p className="text-[#64424D]/75 leading-relaxed">{t.knowledge.patchStep2Desc}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#F3E3E7] space-y-1 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all">
            <span className="font-bold text-[#A4556B] block">3. {t.knowledge.patchStep3Title}</span>
            <p className="text-[#64424D]/75 leading-relaxed">{t.knowledge.patchStep3Desc}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
