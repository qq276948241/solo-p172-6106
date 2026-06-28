import { useState, useMemo, useCallback } from "react";
import { useCoffeeStore } from "@/store/coffeeStore";
import type { CoffeeShop } from "@/types";

export interface ShopFilterState {
  searchQuery: string;
  sortRating: number | null;
  filterCity: string;
}

export interface UseShopFilterReturn {
  filter: ShopFilterState;
  setSearchQuery: (q: string) => void;
  setSortRating: (r: number | null) => void;
  setFilterCity: (c: string) => void;
  clearAllFilters: () => void;
  cities: string[];
  filteredShops: CoffeeShop[];
  hasActiveFilters: boolean;
}

export function useShopFilter(): UseShopFilterReturn {
  const shops = useCoffeeStore((s) => s.shops);
  const filterFavoritesOnly = useCoffeeStore((s) => s.filterFavoritesOnly);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortRating, setSortRating] = useState<number | null>(null);
  const [filterCity, setFilterCity] = useState("");

  const clearAllFilters = useCallback(() => {
    setSearchQuery("");
    setSortRating(null);
    setFilterCity("");
  }, []);

  const cities = useMemo(() => {
    const set = new Set(shops.map((s) => s.city.trim()).filter(Boolean));
    return Array.from(set).sort();
  }, [shops]);

  const filteredShops = useMemo(() => {
    let result = shops;

    if (filterFavoritesOnly) {
      result = result.filter((s) => s.isFavorite);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((s) => s.name.toLowerCase().includes(q));
    }

    if (filterCity) {
      result = result.filter((s) => s.city === filterCity);
    }

    if (sortRating !== null) {
      result = result.filter((s) => s.rating === sortRating);
    }

    return result;
  }, [shops, filterFavoritesOnly, searchQuery, sortRating, filterCity]);

  const hasActiveFilters = filteredShops.length !== shops.length;

  return {
    filter: { searchQuery, sortRating, filterCity },
    setSearchQuery,
    setSortRating,
    setFilterCity,
    clearAllFilters,
    cities,
    filteredShops,
    hasActiveFilters,
  };
}
