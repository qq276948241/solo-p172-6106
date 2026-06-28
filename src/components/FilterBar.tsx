import { Search, ChevronDown } from "lucide-react";
import type { UseShopFilterReturn } from "@/hooks/useShopFilter";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  shopFilter: UseShopFilterReturn;
}

export default function FilterBar({ shopFilter }: FilterBarProps) {
  const {
    filter,
    setSearchQuery,
    setSortRating,
    setFilterCity,
    clearAllFilters,
    cities,
  } = shopFilter;

  const { searchQuery, sortRating, filterCity } = filter;

  return (
    <div className="space-y-3 animate-fade-in">
      <div className="relative">
        <Search
          size={16}
          strokeWidth={2}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-mocha-400 pointer-events-none"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索店名..."
          className="w-full pl-11 pr-4 py-3 bg-white rounded-xl shadow-card border border-mocha-400/10
            text-sm text-coffee-900 placeholder-mocha-400/60
            focus:outline-none focus:border-caramel-500 focus:ring-2 focus:ring-caramel-500/20
            transition-all duration-200"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-mocha-400 hover:text-coffee-900 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <select
            value={sortRating ?? ""}
            onChange={(e) =>
              setSortRating(e.target.value ? Number(e.target.value) : null)
            }
            className="w-full appearance-none bg-white pl-4 pr-9 py-2.5 rounded-xl shadow-card
              border border-mocha-400/10 text-sm text-coffee-900
              focus:outline-none focus:border-caramel-500 focus:ring-2 focus:ring-caramel-500/20
              transition-all duration-200 cursor-pointer"
          >
            <option value="">全部评分</option>
            <option value="5">★★★★★ 5星</option>
            <option value="4">★★★★☆ 4星</option>
            <option value="3">★★★☆☆ 3星</option>
            <option value="2">★★☆☆☆ 2星</option>
            <option value="1">★☆☆☆☆ 1星</option>
          </select>
          <ChevronDown
            size={14}
            strokeWidth={2}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-mocha-400 pointer-events-none"
          />
        </div>

        <div className="relative flex-1">
          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="w-full appearance-none bg-white pl-4 pr-9 py-2.5 rounded-xl shadow-card
              border border-mocha-400/10 text-sm text-coffee-900
              focus:outline-none focus:border-caramel-500 focus:ring-2 focus:ring-caramel-500/20
              transition-all duration-200 cursor-pointer"
          >
            <option value="">全部城市</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            strokeWidth={2}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-mocha-400 pointer-events-none"
          />
        </div>
      </div>

      {(searchQuery || sortRating !== null || filterCity) && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {searchQuery && (
            <Chip label={`搜索: ${searchQuery}`} onClear={() => setSearchQuery("")} />
          )}
          {sortRating !== null && (
            <Chip label={`${sortRating}星`} onClear={() => setSortRating(null)} />
          )}
          {filterCity && (
            <Chip label={filterCity} onClear={() => setFilterCity("")} />
          )}
          <button
            onClick={clearAllFilters}
            className="text-xs text-mocha-500 hover:text-coffee-900 underline underline-offset-2 py-1"
          >
            清除全部
          </button>
        </div>
      )}
    </div>
  );
}

function Chip({
  label,
  onClear,
}: {
  label: string;
  onClear: () => void;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1",
        "bg-caramel-500/15 text-caramel-500 rounded-full text-xs font-medium",
        "animate-fade-in"
      )}
    >
      {label}
      <button onClick={onClear} className="hover:text-coffee-900 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.2}
          className="w-3 h-3"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </span>
  );
}
