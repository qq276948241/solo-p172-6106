import type { CoffeeShop } from "@/types";

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}年${m}月${d}日`;
};

export const formatDateInput = (isoString: string): string => {
  const date = new Date(isoString);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const todayISO = (): string => new Date().toISOString();

export const todayInput = (): string => formatDateInput(new Date().toISOString());

export const isThisMonth = (isoString: string): boolean => {
  const d = new Date(isoString);
  const now = new Date();
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
};

export const generateId = (): string => {
  return `shop_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
};

export const averageRating = (shops: CoffeeShop[]): number => {
  if (shops.length === 0) return 0;
  const sum = shops.reduce((acc, s) => acc + s.rating, 0);
  return Math.round((sum / shops.length) * 10) / 10;
};

export const countByCity = (
  shops: CoffeeShop[]
): { city: string; count: number }[] => {
  const map = new Map<string, number>();
  shops.forEach((s) => {
    const city = s.city.trim() || "未标注";
    map.set(city, (map.get(city) || 0) + 1);
  });
  return Array.from(map.entries())
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count);
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const downloadJSON = (data: unknown, filename: string): void => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
