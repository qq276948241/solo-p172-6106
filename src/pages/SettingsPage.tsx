import { useState } from "react";
import {
  Download,
  Trash2,
  Info,
  Coffee,
  FileDown,
  AlertTriangle,
  Heart,
} from "lucide-react";
import { useCoffeeStore } from "@/store/coffeeStore";
import { downloadJSON } from "@/utils/helpers";

export default function SettingsPage() {
  const { shops, clearAll } = useCoffeeStore();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExport = () => {
    const data = {
      app: "咖啡足迹 Coffee Journal",
      version: "1.0.0",
      exportedAt: new Date().toISOString(),
      shopCount: shops.length,
      shops,
    };
    const filename = `咖啡足迹_${new Date().toISOString().slice(0, 10)}.json`;
    downloadJSON(data, filename);
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 2500);
  };

  const handleClear = () => {
    clearAll();
    setShowClearConfirm(false);
  };

  return (
    <div className="app-container animate-fade-in">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-cream-100/90 backdrop-blur-md px-5 pt-6 pb-4">
        <h1 className="font-serif text-2xl font-bold text-coffee-900 leading-tight">
          设置
        </h1>
        <p className="text-xs text-mocha-500 mt-0.5">
          管理你的数据
        </p>
      </header>

      <main className="px-4 space-y-4 pb-8">
        {/* Brand card */}
        <section className="card-base p-5 bg-gradient-to-br from-coffee-900 to-coffee-700 text-white animate-slide-up overflow-hidden relative">
          <div className="absolute -right-6 -bottom-6 opacity-10">
            <Coffee size={140} strokeWidth={1} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-caramel-500/25 backdrop-blur-sm">
                <Coffee size={22} strokeWidth={2} className="text-caramel-400" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-xl leading-tight">
                  咖啡足迹
                </h2>
                <p className="text-xs text-white/60 mt-0.5">
                  Coffee Journal
                </p>
              </div>
            </div>
            <p className="text-sm text-white/75 leading-relaxed">
              记录每一次咖啡探店，留存每一杯独特风味。
            </p>
          </div>
        </section>

        {/* Data Section */}
        <section className="overflow-hidden rounded-card bg-white shadow-card animate-slide-up">
          <div className="px-4 pt-4 pb-2 text-xs font-semibold text-mocha-500 uppercase tracking-wider">
            数据管理
          </div>

          <button
            onClick={handleExport}
            className="w-full flex items-center gap-3 px-4 py-4 hover:bg-cream-100 transition-colors border-t border-mocha-400/10 group"
          >
            <div
              className={
                "p-2 rounded-lg transition-colors " +
                (exportSuccess
                  ? "bg-green-500/15 text-green-600"
                  : "bg-caramel-500/15 text-caramel-500 group-hover:bg-caramel-500/25")
              }
            >
              {exportSuccess ? (
                <FileDown size={18} strokeWidth={2} />
              ) : (
                <Download size={18} strokeWidth={2} />
              )}
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-coffee-900">
                {exportSuccess ? "导出成功 ✓" : "导出全部数据"}
              </div>
              <div className="text-xs text-mocha-500 mt-0.5">
                {shops.length > 0
                  ? `包含 ${shops.length} 条记录 · JSON 格式`
                  : "暂无数据"}
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4 text-mocha-400 transition-transform group-hover:translate-x-0.5"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <button
            onClick={() => shops.length > 0 && setShowClearConfirm(true)}
            disabled={shops.length === 0}
            className={
              "w-full flex items-center gap-3 px-4 py-4 transition-colors border-t border-mocha-400/10 group " +
              (shops.length === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-red-50")
            }
          >
            <div className="p-2 rounded-lg bg-red-500/15 text-red-500 group-hover:bg-red-500/25 transition-colors">
              <Trash2 size={18} strokeWidth={2} />
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-red-600">
                清空所有记录
              </div>
              <div className="text-xs text-mocha-500 mt-0.5">
                {shops.length > 0
                  ? "此操作不可撤销，建议先导出备份"
                  : "暂无数据可清除"}
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4 text-mocha-400"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </section>

        {/* About Section */}
        <section className="overflow-hidden rounded-card bg-white shadow-card animate-slide-up">
          <div className="px-4 pt-4 pb-2 text-xs font-semibold text-mocha-500 uppercase tracking-wider">
            关于
          </div>

          <div className="flex items-center gap-3 px-4 py-4 border-t border-mocha-400/10">
            <div className="p-2 rounded-lg bg-cream-200 text-coffee-900">
              <Info size={18} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-coffee-900">
                版本信息
              </div>
              <div className="text-xs text-mocha-500 mt-0.5">
                v1.0.0
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-4 border-t border-mocha-400/10">
            <div className="p-2 rounded-lg bg-caramel-500/15 text-caramel-500">
              <Heart size={18} strokeWidth={2} fill="currentColor" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-coffee-900">
                用心制作
              </div>
              <div className="text-xs text-mocha-500 mt-0.5">
                用热爱记录每一杯咖啡
              </div>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="px-2 py-4 text-center animate-slide-up">
          <p className="text-[11px] text-mocha-500/70 leading-relaxed">
            数据均保存在本地浏览器中
            <br />
            清理浏览器数据前请记得导出备份
          </p>
        </section>
      </main>

      {/* Clear Confirm Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-coffee-900/40 backdrop-blur-sm animate-fade-in p-4">
          <div className="bg-white rounded-2xl p-5 max-w-xs w-full shadow-2xl animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-red-500/15 text-red-500">
                <AlertTriangle size={22} strokeWidth={2} />
              </div>
              <h4 className="font-serif font-bold text-coffee-900 text-lg">
                确认清空？
              </h4>
            </div>
            <p className="text-sm text-mocha-500 mb-5 leading-relaxed">
              即将删除 <b className="text-red-500">{shops.length}</b> 条咖啡店记录。
              <br />
              此操作不可撤销，建议先导出备份。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 btn-secondary py-2.5 text-sm"
              >
                取消
              </button>
              <button
                onClick={handleClear}
                className="flex-1 bg-red-500 text-white rounded-btn font-medium py-2.5 text-sm hover:bg-red-600 active:scale-[0.97] transition-all"
              >
                确认清空
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
