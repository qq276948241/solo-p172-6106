import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Upload,
  X,
  Store,
  MapPin,
  Calendar,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react";
import { useCoffeeStore } from "@/store/coffeeStore";
import StarRating from "@/components/StarRating";
import { fileToBase64, todayInput } from "@/utils/helpers";
import type { CoffeeShop } from "@/types";

type Rating = 1 | 2 | 3 | 4 | 5;

interface FormState {
  name: string;
  city: string;
  address: string;
  visitDate: string;
  rating: Rating;
  order: string;
  flavorNotes: string;
  image: string;
  isFavorite: boolean;
}

const initialState: FormState = {
  name: "",
  city: "",
  address: "",
  visitDate: todayInput(),
  rating: 5,
  order: "",
  flavorNotes: "",
  image: "",
  isFavorite: false,
};

export default function AddPage() {
  const navigate = useNavigate();
  const { addShop } = useCoffeeStore();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<{ name?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useState<HTMLInputElement | null>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "name" && errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await fileToBase64(file);
      update("image", base64);
    } catch (e) {
      console.error("图片上传失败:", e);
    }
  };

  const removeImage = () => update("image", "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setErrors({ name: "请填写店名" });
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 300));

      const visitDateISO = new Date(form.visitDate).toISOString();
      const shopData: Omit<CoffeeShop, "id" | "createdAt"> = {
        name: form.name.trim(),
        city: form.city.trim(),
        address: form.address.trim(),
        visitDate: visitDateISO,
        rating: form.rating,
        order: form.order.trim(),
        flavorNotes: form.flavorNotes.trim(),
        image: form.image,
        isFavorite: form.isFavorite,
      };
      addShop(shopData);

      setTimeout(() => navigate("/"), 200);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container animate-fade-in">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-cream-100/90 backdrop-blur-md px-5 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-xl text-coffee-900 hover:bg-cream-200 active:scale-95 transition-all"
          >
            <ChevronLeft size={24} strokeWidth={2} />
          </button>
          <h1 className="font-serif text-xl font-bold text-coffee-900">
            添加记录
          </h1>
          <div className="w-10" />
        </div>
      </header>

      <form onSubmit={handleSubmit} className="px-4 pb-6">
        {/* Image Upload */}
        <section className="mb-5 animate-slide-up">
          <label className="label-text">店铺照片</label>
          <div
            onClick={() =>
              !form.image && fileInputRef[0]?.click()
            }
            className="relative aspect-[4/3] rounded-2xl border-2 border-dashed border-mocha-400/30 bg-cream-50 overflow-hidden transition-all hover:border-caramel-500/60"
          >
            <input
              ref={(el) => (fileInputRef[0] = el)}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {form.image ? (
              <>
                <img
                  src={form.image}
                  alt="预览"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white active:scale-90 transition-all"
                >
                  <X size={16} strokeWidth={2} />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef[0]?.click()}
                className="absolute inset-0 flex flex-col items-center justify-center text-mocha-400 gap-2"
              >
                <div className="p-4 rounded-full bg-caramel-500/15 text-caramel-500">
                  <Upload size={28} strokeWidth={1.8} />
                </div>
                <span className="text-sm font-medium">点击上传图片</span>
                <span className="text-xs opacity-70">支持 JPG / PNG</span>
              </button>
            )}
          </div>
        </section>

        {/* Basic Info */}
        <section className="space-y-4 mb-5">
          <FormField
            icon={<Store size={16} strokeWidth={2} />}
            label="店名 *"
            error={errors.name}
          >
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="例如：Seesaw Coffee"
              className={"input-base " + (errors.name ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : "")}
              maxLength={50}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField icon={<MapPin size={16} strokeWidth={2} />} label="城市">
              <input
                type="text"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                placeholder="上海"
                className="input-base"
                maxLength={20}
              />
            </FormField>

            <FormField icon={<Calendar size={16} strokeWidth={2} />} label="日期">
              <input
                type="date"
                value={form.visitDate}
                onChange={(e) => update("visitDate", e.target.value)}
                className="input-base"
              />
            </FormField>
          </div>

          <FormField icon={<MapPin size={16} strokeWidth={2} />} label="详细地址">
            <input
              type="text"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="静安区愚园路..."
              className="input-base"
              maxLength={100}
            />
          </FormField>
        </section>

        {/* Rating */}
        <section className="card-base p-4 mb-5 animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-caramel-500/15 text-caramel-500">
                <Star size={16} strokeWidth={2} />
              </div>
              <span className="font-serif font-bold text-coffee-900">
                整体评分
              </span>
            </div>
            <span className="text-sm font-medium text-caramel-500">
              {form.rating}.0
            </span>
          </div>
          <StarRating
            value={form.rating}
            onChange={(v) => update("rating", v)}
            size={32}
          />
        </section>

        {/* Order */}
        <section className="space-y-4 mb-5">
          <FormField icon={<ShoppingBag size={16} strokeWidth={2} />} label="点了什么">
            <input
              type="text"
              value={form.order}
              onChange={(e) => update("order", e.target.value)}
              placeholder="燕麦拿铁 + 可颂..."
              className="input-base"
              maxLength={80}
            />
          </FormField>

          <FormField icon={<Sparkles size={16} strokeWidth={2} />} label="风味描述">
            <textarea
              value={form.flavorNotes}
              onChange={(e) => update("flavorNotes", e.target.value)}
              placeholder="入口的酸度、苦味、甜度，尾韵的风味，整体感受..."
              className="input-base min-h-[120px] resize-none"
              rows={5}
              maxLength={500}
            />
            <div className="text-right text-[11px] text-mocha-400 mt-1">
              {form.flavorNotes.length}/500
            </div>
          </FormField>
        </section>

        {/* Favorite Toggle */}
        <section className="card-base p-4 mb-6 animate-slide-up">
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-caramel-500/15 text-caramel-500">
                <Star size={16} strokeWidth={2} className="fill-caramel-500" />
              </div>
              <div>
                <div className="font-medium text-coffee-900 text-sm">
                  标记为常去店铺
                </div>
                <div className="text-xs text-mocha-500 mt-0.5">
                  在首页可筛选只看常去
                </div>
              </div>
            </div>
            <ToggleSwitch
              checked={form.isFavorite}
              onChange={(v) => update("isFavorite", v)}
            />
          </label>
        </section>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary text-base py-3.5 flex items-center justify-center gap-2 mb-8"
        >
          {isSubmitting ? (
            <>
              <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              保存中...
            </>
          ) : (
            "保存记录"
          )}
        </button>
      </form>
    </div>
  );
}

function FormField({
  icon,
  label,
  error,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-slide-up">
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-mocha-500">{icon}</span>
        <label className="text-sm font-medium text-coffee-900">{label}</label>
      </div>
      {children}
      {error && (
        <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
          <X size={12} /> {error}
        </p>
      )}
    </div>
  );
}

function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={
        "relative w-12 h-7 rounded-full transition-all duration-300 flex-shrink-0 " +
        (checked ? "bg-caramel-500" : "bg-mocha-400/30")
      }
    >
      <span
        className={
          "absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 " +
          (checked ? "translate-x-5" : "translate-x-0")
        }
      />
    </button>
  );
}
