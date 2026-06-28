import { create } from "zustand";
import type { CoffeeShop, AppStore } from "@/types";
import {
  loadShops,
  saveShops,
  loadFilter,
  saveFilter,
} from "@/utils/storage";
import { generateId } from "@/utils/helpers";
import { mockShops } from "@/data/mockShops";

const getInitialShops = (): CoffeeShop[] => {
  const stored = loadShops();
  if (stored.length > 0) return stored;
  saveShops(mockShops);
  return mockShops;
};

export const useCoffeeStore = create<AppStore>((set, get) => ({
  shops: getInitialShops(),
  filterFavoritesOnly: loadFilter(),
  searchQuery: "",
  sortRating: null,
  filterCity: "",

  addShop: (shopData) => {
    const newShop: CoffeeShop = {
      ...shopData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    const shops = [newShop, ...get().shops];
    set({ shops });
    saveShops(shops);
  },

  deleteShop: (id) => {
    const shops = get().shops.filter((s) => s.id !== id);
    set({ shops });
    saveShops(shops);
  },

  toggleFavorite: (id) => {
    const shops = get().shops.map((s) =>
      s.id === id ? { ...s, isFavorite: !s.isFavorite } : s
    );
    set({ shops });
    saveShops(shops);
  },

  updateShop: (updatedShop) => {
    const shops = get().shops.map((s) =>
      s.id === updatedShop.id ? updatedShop : s
    );
    set({ shops });
    saveShops(shops);
  },

  toggleFilter: () => {
    const next = !get().filterFavoritesOnly;
    set({ filterFavoritesOnly: next });
    saveFilter(next);
  },

  setSearchQuery: (q) => set({ searchQuery: q }),

  setSortRating: (r) => set({ sortRating: r }),

  setFilterCity: (c) => set({ filterCity: c }),

  clearAll: () => {
    set({ shops: [] });
    saveShops([]);
  },

  importData: (data) => {
    set({ shops: data });
    saveShops(data);
  },

  getShopById: (id) => {
    return get().shops.find((s) => s.id === id);
  },

  getCities: () => {
    const set = new Set(get().shops.map((s) => s.city.trim()).filter(Boolean));
    return Array.from(set).sort();
  },

  getFilteredShops: () => {
    const { shops, filterFavoritesOnly, searchQuery, sortRating, filterCity } = get();
    let result = [...shops];

    if (filterFavoritesOnly) {
      result = result.filter((s) => s.isFavorite);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((s) =>
        s.name.toLowerCase().includes(q)
      );
    }

    if (filterCity) {
      result = result.filter((s) => s.city === filterCity);
    }

    if (sortRating !== null) {
      result = result.filter((s) => s.rating === sortRating);
    }

    return result;
  },
}));
