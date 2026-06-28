import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ChevronLeft,
  MapPin,
  Calendar,
  ShoppingBag,
  Sparkles,
  Star,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useCoffeeStore } from "@/store/coffeeStore";
import StarRating from "@/components/StarRating";
import { formatDate } from "@/utils/helpers";

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getShopById, deleteShop, toggleFavorite } = useCoffeeStore();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const shop = id ? getShopById(id) : undefined;

  if (!shop) {
    return (
      <div className="app-container flex flex-col items-center justify-center py-20 px-4 text-center">
        <h3 className="font-serif font-bold text-coffee-900 text-lg mb-2">
          找不到这家店
        </h3>
        <p className="text-sm text-mocha-500 mb-6">可能已被删除</p>
        <Link to="/" className="btn-primary">
          返回首页
        </Link>
      </div>
    );
  }

  const confirmDelete = () => {
    deleteShop(shop.id);
    navigate("/");
  };

  return (
    <div className="app-container animate-fade-in">
      {/* Top bar */}
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-40 p-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-card text-coffee-900 active:scale-95 transition-all"
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavorite(shop.id)}
            className={
              "p-2.5 backdrop-blur-sm rounded-full shadow-card active:scale-95 transition-all " +
              (shop.isFavorite
                ? "bg-caramel-500 text-white"
                : "bg-white/90 text-mocha-400")
            }
          >
            <Star
              size={18}
              strokeWidth={2}
              className={shop.isFavorite ? "fill-white" : ""}
            />
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-card text-red-500 active:scale-95 transition-all"
          >
            <Trash2 size={18} strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* Hero image */}
      <div className="relative h-[320px] w-full overflow-hidden bg-cream-200">
        {shop.image ? (
          <img
            src={shop.image}
            alt={shop.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-mocha-400/50">
            <Pencil size={64} strokeWidth={1} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <div className="flex items-center gap-2 mb-2">
            <StarRating value={shop.rating} readonly size={16} />
            <span className="text-xs opacity-80">{shop.rating}.0</span>
            {shop.isFavorite && (
              <span className="ml-auto inline-flex items-center gap-1 text-[11px] px-2 py-0.5 bg-caramel-500 rounded-full">
                <Star size={10} className="fill-white" />
                常去
              </span>
            )}
          </div>
          <h1 className="font-serif text-2xl font-bold leading-tight mb-1">
            {shop.name}
          </h1>
          {shop.city && (
            <div className="flex items-center gap-1.5 text-sm opacity-90">
              <MapPin size={14} />
              {shop.city}
              {shop.address && <span>· {shop.address}</span>}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <main className="px-4 py-5 space-y-4 -mt-3 relative z-10">
        {/* Info cards */}
        <InfoCard
          icon={<Calendar size={16} strokeWidth={2} />}
          label="探店日期"
          value={formatDate(shop.visitDate)}
        />

        {shop.order && (
          <InfoCard
            icon={<ShoppingBag size={16} strokeWidth={2} />}
            label="点了什么"
            value={shop.order}
          />
        )}

        {shop.flavorNotes && (
          <div className="card-base p-4 animate-slide-up">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-caramel-500/15 text-caramel-500">
                <Sparkles size={16} strokeWidth={2} />
              </div>
              <h3 className="font-serif font-bold text-coffee-900">
                风味笔记
              </h3>
            </div>
            <p className="text-[14px] leading-relaxed text-coffee-900/80 whitespace-pre-wrap">
              {shop.flavorNotes}
            </p>
          </div>
        )}

        {/* Spacer */}
        <div className="h-4" />
      </main>

      {/* Delete confirm modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-coffee-900/40 backdrop-blur-sm animate-fade-in p-4">
          <div className="bg-white rounded-2xl p-5 max-w-xs w-full shadow-2xl animate-slide-up">
            <h4 className="font-serif font-bold text-coffee-900 text-lg mb-2">
              删除确认
            </h4>
            <p className="text-sm text-mocha-500 mb-5">
              确定要删除「{shop.name}」吗？删除后无法恢复哦。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 btn-secondary py-2.5 text-sm"
              >
                取消
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-500 text-white rounded-btn font-medium py-2.5 text-sm hover:bg-red-600 active:scale-[0.97] transition-all"
              >
                确定删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="card-base p-4 animate-slide-up">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-cream-200 text-coffee-900 flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] text-mocha-500 font-medium mb-1">
            {label}
          </div>
          <div className="text-sm font-medium text-coffee-900 break-words">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}
