export interface CoffeeShop {
  id: string;
  name: string;
  city: string;
  address: string;
  visitDate: string;
  rating: 1 | 2 | 3 | 4 | 5;
  order: string;
  flavorNotes: string;
  image: string;
  isFavorite: boolean;
  createdAt: string;
}

export interface AppStore {
  shops: CoffeeShop[];
  filterFavoritesOnly: boolean;
  searchQuery: string;
  sortRating: number | null;
  filterCity: string;
  addShop: (shop: Omit<CoffeeShop, "id" | "createdAt">) => void;
  deleteShop: (id: string) => void;
  toggleFavorite: (id: string) => void;
  updateShop: (shop: CoffeeShop) => void;
  toggleFilter: () => void;
  setSearchQuery: (q: string) => void;
  setSortRating: (r: number | null) => void;
  setFilterCity: (c: string) => void;
  clearAll: () => void;
  importData: (shops: CoffeeShop[]) => void;
  getShopById: (id: string) => CoffeeShop | undefined;
  getCities: () => string[];
  getFilteredShops: () => CoffeeShop[];
}
