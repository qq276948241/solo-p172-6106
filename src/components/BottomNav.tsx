import { Home, PlusCircle, BarChart3, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: Home, label: "首页" },
  { to: "/add", icon: PlusCircle, label: "添加" },
  { to: "/stats", icon: BarChart3, label: "统计" },
  { to: "/settings", icon: Settings, label: "设置" },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50">
      <div className="mx-3 mb-3 bg-white/95 backdrop-blur-sm rounded-2xl shadow-card border border-mocha-400/10">
        <div className="grid grid-cols-4 py-2 px-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center gap-1 py-2 rounded-xl transition-all duration-200",
                  isActive
                    ? "text-coffee-900 bg-caramel-500/15"
                    : "text-mocha-400 hover:text-coffee-700 hover:bg-cream-200/50"
                )
              }
            >
              <Icon size={22} strokeWidth={1.8} />
              <span className="text-[11px] font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
