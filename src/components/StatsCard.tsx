import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent?: boolean;
  className?: string;
}

export default function StatsCard({
  label,
  value,
  icon,
  accent = false,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "card-base p-4 transition-all duration-200 hover:shadow-card-hover",
        accent && "bg-gradient-to-br from-caramel-400/15 to-cream-200 border border-caramel-500/20",
        className
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <span
          className={cn(
            "p-2 rounded-lg",
            accent ? "bg-caramel-500 text-white" : "bg-cream-200 text-coffee-900"
          )}
        >
          {icon}
        </span>
      </div>
      <div className="font-serif text-3xl font-bold text-coffee-900 leading-none mb-1">
        {value}
      </div>
      <div className="text-xs text-mocha-500 font-medium">{label}</div>
    </div>
  );
}
