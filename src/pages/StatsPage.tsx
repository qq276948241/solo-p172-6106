import { useCoffeeStore } from "@/store/coffeeStore";
import StatsCard from "@/components/StatsCard";
import {
  Coffee,
  CalendarPlus,
  Star,
  Map,
  TrendingUp,
  Award,
} from "lucide-react";
import { averageRating, countByCity, isThisMonth } from "@/utils/helpers";

export default function StatsPage() {
  const { shops } = useCoffeeStore();

  const total = shops.length;
  const monthlyNew = shops.filter((s) => isThisMonth(s.visitDate)).length;
  const avgRating = averageRating(shops);
  const favoritesCount = shops.filter((s) => s.isFavorite).length;
  const cityData = countByCity(shops);
  const maxCityCount = Math.max(...cityData.map((c) => c.count), 1);

  const highestRatedCity =
    cityData.length > 0
      ? (() => {
          const cityRatings = cityData.map(({ city }) => {
            const cityShops = shops.filter((s) => s.city === city);
            return { city, avg: averageRating(cityShops) };
          });
          return cityRatings.sort((a, b) => b.avg - a.avg)[0];
        })()
      : null;

  return (
    <div className="app-container animate-fade-in">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-cream-100/90 backdrop-blur-md px-5 pt-6 pb-4">
        <h1 className="font-serif text-2xl font-bold text-coffee-900 leading-tight">
          数据统计
        </h1>
        <p className="text-xs text-mocha-500 mt-0.5">
          回顾你的咖啡足迹
        </p>
      </header>

      <main className="px-4 space-y-5 pb-8">
        {/* Stats Grid */}
        <section className="grid grid-cols-2 gap-3 animate-slide-up">
          <StatsCard
            label="探店总数"
            value={total}
            icon={<Coffee size={18} strokeWidth={2} />}
            accent
          />
          <StatsCard
            label="本月新增"
            value={monthlyNew}
            icon={<CalendarPlus size={18} strokeWidth={2} />}
          />
          <StatsCard
            label="平均评分"
            value={avgRating > 0 ? avgRating.toFixed(1) : "–"}
            icon={<Star size={18} strokeWidth={2} />}
          />
          <StatsCard
            label="常去店铺"
            value={favoritesCount}
            icon={<Award size={18} strokeWidth={2} />}
          />
        </section>

        {/* Highlight */}
        {highestRatedCity && highestRatedCity.avg > 0 && (
          <section className="card-base p-4 animate-slide-up bg-gradient-to-br from-caramel-500/10 to-cream-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-coffee-900 text-caramel-400">
                <TrendingUp size={16} strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-coffee-900 text-sm">
                  最高评分城市
                </h3>
                <p className="text-xs text-mocha-500 mt-0.5">
                  综合平均分最高
                </p>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="font-serif text-3xl font-bold text-coffee-900 leading-none mb-1">
                  {highestRatedCity.city}
                </div>
                <div className="text-xs text-mocha-500">
                  平均 {highestRatedCity.avg.toFixed(1)} 星
                </div>
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    className={
                      s <= Math.round(highestRatedCity.avg)
                        ? "text-caramel-500 fill-caramel-500"
                        : "text-mocha-400/30"
                    }
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* City Distribution Chart */}
        <section className="card-base p-5 animate-slide-up">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-2 rounded-lg bg-coffee-900 text-caramel-400">
              <Map size={16} strokeWidth={2} />
            </div>
            <h3 className="font-serif font-bold text-coffee-900">
              城市分布
            </h3>
            {cityData.length > 0 && (
              <span className="ml-auto text-xs text-mocha-500">
                共 {cityData.length} 个城市
              </span>
            )}
          </div>

          {cityData.length === 0 ? (
            <div className="py-8 text-center text-sm text-mocha-500">
              暂无数据
            </div>
          ) : (
            <div className="space-y-4">
              {cityData.map((item, idx) => {
                const percent = (item.count / maxCityCount) * 100;
                return (
                  <div key={item.city} className="animate-slide-up"
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-coffee-900">
                        {item.city}
                      </span>
                      <span className="text-xs font-semibold text-caramel-500 bg-caramel-500/10 px-2 py-0.5 rounded-full">
                        {item.count} 家
                      </span>
                    </div>
                    <div className="h-3 bg-cream-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-caramel-500 to-caramel-400 transition-all duration-700 ease-out"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Rating Distribution */}
        {total > 0 && (
          <section className="card-base p-5 animate-slide-up">
            <div className="flex items-center gap-2 mb-5">
              <div className="p-2 rounded-lg bg-coffee-900 text-caramel-400">
                <Star size={16} strokeWidth={2} className="fill-caramel-400" />
              </div>
              <h3 className="font-serif font-bold text-coffee-900">
                评分分布
              </h3>
            </div>

            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = shops.filter((s) => s.rating === rating).length;
                const percent = total > 0 ? (count / total) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center gap-3">
                    <div className="w-10 flex items-center gap-1">
                      <Star
                        size={14}
                        className="text-caramel-500 fill-caramel-500"
                      />
                      <span className="text-sm font-semibold text-coffee-900">
                        {rating}
                      </span>
                    </div>
                    <div className="flex-1 h-3 bg-cream-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-coffee-900 to-coffee-700 transition-all duration-700 ease-out"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="w-12 text-right text-xs text-mocha-500 font-medium">
                      {count} ({Math.round(percent)}%)
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
