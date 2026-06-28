import type { CoffeeShop } from "@/types";

const STORAGE_KEY = "coffee-shops-data";
const FILTER_KEY = "coffee-shops-filter";

export const loadShops = (): CoffeeShop[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CoffeeShop[];
  } catch {
    return [];
  }
};

export const saveShops = (shops: CoffeeShop[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shops));
  } catch (e) {
    console.error("Failed to save shops:", e);
  }
};

export const loadFilter = (): boolean => {
  try {
    return localStorage.getItem(FILTER_KEY) === "true";
  } catch {
    return false;
  }
};

export const saveFilter = (filter: boolean): void => {
  try {
    localStorage.setItem(FILTER_KEY, String(filter));
  } catch (e) {
    console.error("Failed to save filter:", e);
  }
};
