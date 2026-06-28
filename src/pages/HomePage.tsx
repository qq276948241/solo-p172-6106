import { Star, Plus, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useCoffeeStore } from "@/store/coffeeStore";
import CoffeeCard from "@/components/CoffeeCard";
import FilterBar from "@/components/FilterBar";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const { shops, filterFavoritesOnly, toggleFilter, getFilteredShops } =
    useCoffeeStore();

  const filteredShops = getFilteredShops();

  const leftColumn = filteredShops.filter((_, i) => i % 2 === 0);
  const rightColumn = filteredShops.filter((_, i) => i % 2 === 1);

  const hasActiveFilters = filteredShops.length !== shops.length;

  return (
    <div className="app-container animate-fade-in">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-cream-100/90 backdrop-blur-md px-5 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-coffee-900 leading-tight">
              咖啡足迹
            </h1>
            <p className="text-xs text-mocha-500 mt-0.5">
              {filteredShops.length > 0
                ? `显示 ${filteredShops.length} / ${shops.length} 家`
                : shops.length > 0
                ? `已记录 ${shops.length} 家咖啡店`
                : "开启你的咖啡探店之旅"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleFilter}
              className={cn(
                "p-2.5 rounded-xl transition-all duration-200",
                filterFavoritesOnly
                  ? "bg-caramel-500 text-white shadow-md"
                  : "bg-white text-mocha-500 border border-mocha-400/20 hover:bg-cream-200"
              )}
              title="筛选常去"
            >
              <Filter size={18} strokeWidth={1.8} />
            </button>
            <Link
              to="/add"
              className="p-2.5 rounded-xl bg-coffee-900 text-white shadow-md hover:bg-coffee-800 active:scale-95 transition-all"
              title="添加记录"
            >
              <Plus size={18} strokeWidth={2} />
            </Link>
          </div>
        </div>

        {filterFavoritesOnly && (
          <div className="mt-3 flex items-center gap-2 text-xs text-caramel-500 bg-caramel-500/10 px-3 py-2 rounded-lg">
            <Star size={12} className="fill-caramel-500" />
            <span>只显示常去店铺</span>
            <button
              onClick={toggleFilter}
              className="ml-auto text-coffee-700 underline underline-offset-2"
            >
              取消
            </button>
          </div>
        )}

        {/* Filter Bar */}
        <div className="mt-4">
          <FilterBar />
        </div>
      </header>

      {/* Content */}
      <main className="px-4">
        {filteredShops.length === 0 ? (
          <EmptyState
            filterOn={filterFavoritesOnly}
            hasSearch={hasActiveFilters}
          />
        ) : (
          <div
            key={`${leftColumn.length}-${rightColumn.length}`}
            className="flex gap-3 animate-fade-in"
          >
            <div className="flex-1 flex flex-col gap-3">
              {leftColumn.map((shop, i) => (
                <CoffeeCard key={shop.id} shop={shop} index={i * 2} />
              ))}
            </div>
            <div className="flex-1 flex flex-col gap-3">
              {rightColumn.map((shop, i) => (
                <CoffeeCard key={shop.id} shop={shop} index={i * 2 + 1} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function EmptyState({
  filterOn,
  hasSearch,
}: {
  filterOn: boolean;
  hasSearch: boolean;
}) {
  if (hasSearch) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
        <div className="w-24 h-24 rounded-full bg-mocha-500/15 flex items-center justify-center mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8B6F54"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            className="w-12 h-12"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <h3 className="font-serif font-bold text-coffee-900 text-lg mb-2">
          没有找到匹配的店
        </h3>
        <p className="text-sm text-mocha-500 mb-6 max-w-xs">
          试试换个关键词，或者清除筛选条件
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
      <div className="w-24 h-24 rounded-full bg-caramel-500/15 flex items-center justify-center mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#D4A574"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          className="w-12 h-12"
        >
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
          <line x1="6" x2="6" y1="2" y2="4" />
          <line x1="10" x2="10" y1="2" y2="4" />
          <line x1="14" x2="14" y1="2" y2="4" />
        </svg>
      </div>
      <h3 className="font-serif font-bold text-coffee-900 text-lg mb-2">
        {filterOn ? "还没有常去的店铺" : "还没有咖啡店记录"}
      </h3>
      <p className="text-sm text-mocha-500 mb-6 max-w-xs">
        {filterOn
          ? "先去取消筛选，把喜欢的店标记为常去吧！"
          : "记录下每一杯咖啡的味道，留下美好的探店回忆。"}
      </p>
      <Link to="/add" className="btn-primary inline-flex items-center gap-2">
        <Plus size={18} strokeWidth={2} />
        添加第一家店
      </Link>
    </div>
  );
}
