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
}));
