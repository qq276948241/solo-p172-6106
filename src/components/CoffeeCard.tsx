import { useRef, useState } from "react";
import { Star, Trash2, MapPin, Coffee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCoffeeStore } from "@/store/coffeeStore";
import StarRating from "./StarRating";
import { formatDate } from "@/utils/helpers";
import type { CoffeeShop } from "@/types";

interface CoffeeCardProps {
  shop: CoffeeShop;
  index: number;
}

export default function CoffeeCard({ shop, index }: CoffeeCardProps) {
  const navigate = useNavigate();
  const { deleteShop, toggleFavorite } = useCoffeeStore();
  const cardRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const SWIPE_THRESHOLD = 80;
  const MAX_OFFSET = 88;

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX - offset);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    let next = clientX - startX;
    if (next > MAX_OFFSET) next = MAX_OFFSET + (next - MAX_OFFSET) * 0.2;
    if (next < -MAX_OFFSET) next = -MAX_OFFSET + (next + MAX_OFFSET) * 0.2;
    setOffset(next);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (offset >= SWIPE_THRESHOLD) {
      setOffset(MAX_OFFSET);
    } else if (offset <= -SWIPE_THRESHOLD) {
      setOffset(-MAX_OFFSET);
    } else {
      setOffset(0);
    }
  };

  const handleClick = () => {
    if (Math.abs(offset) > 10) {
      setOffset(0);
      return;
    }
    navigate(`/detail/${shop.id}`);
  };

  const handleDelete = () => setShowDeleteConfirm(true);

  const confirmDelete = () => {
    deleteShop(shop.id);
    setShowDeleteConfirm(false);
  };

  const handleFavorite = () => {
    toggleFavorite(shop.id);
    setOffset(0);
  };

  const heights = [
    "h-48",
    "h-56",
    "h-52",
    "h-60",
    "h-48",
    "h-56",
    "h-52",
    "h-64",
  ];
  const imgHeight = heights[index % heights.length];

  return (
    <div className="relative animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
      {/* Left: Favorite action area */}
      <button
        onClick={handleFavorite}
        className="absolute left-0 top-0 bottom-0 w-22 bg-caramel-500 rounded-card flex items-center justify-center z-0"
      >
        <Star
          size={24}
          className={cn(
            "text-white transition-all",
            shop.isFavorite ? "fill-white" : ""
          )}
        />
      </button>

      {/* Right: Delete action area */}
      <button
        onClick={handleDelete}
        className="absolute right-0 top-0 bottom-0 w-22 bg-red-500 rounded-card flex items-center justify-center z-0"
      >
        <Trash2 size={22} className="text-white" />
      </button>

      {/* Main card */}
      <div
        ref={cardRef}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        className={cn(
          "card-base relative z-10 cursor-pointer select-none",
          "transition-transform duration-200 ease-out",
          "hover:shadow-card-hover active:scale-[0.98]"
        )}
        style={{
          transform: `translateX(${offset}px)`,
          transitionDuration: isDragging ? "0ms" : "300ms",
          touchAction: "pan-y",
        }}
      >
        {/* Image */}
        <div className={cn("relative overflow-hidden bg-cream-200", imgHeight)}>
          {shop.image ? (
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-mocha-400/50">
              <Coffee size={48} strokeWidth={1.2} />
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Favorite badge */}
          {shop.isFavorite && (
            <div className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-sm">
              <Star size={14} className="text-caramel-500 fill-caramel-500" />
            </div>
          )}

          {/* Date on image bottom */}
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-white/90">
            <span className="truncate">{formatDate(shop.visitDate)}</span>
          </div>
        </div>

        {/* Info */}
        <div className="p-3 space-y-1.5">
          <h3 className="font-serif font-semibold text-coffee-900 text-[15px] leading-tight line-clamp-1">
            {shop.name}
          </h3>

          <div className="flex items-center gap-1.5">
            <StarRating value={shop.rating} readonly size={13} />
          </div>

          {shop.city && (
            <div className="flex items-center gap-1 text-[11px] text-mocha-500">
              <MapPin size={11} />
              <span className="truncate">{shop.city}</span>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirm Modal */}
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
