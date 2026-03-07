import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const CATEGORIES = [
  "All",
  "Featured",
  "Most Favorite",
  "Top IMDb",
  "New Release",
];

interface CategoryFiltersProps {
  active: string;
  onChange: (category: string) => void;
}

export default function CategoryFilters({
  active,
  onChange,
}: CategoryFiltersProps) {
  return (
    <div className="w-full">
      <ScrollArea className="w-full">
        <div className="flex items-center gap-2 pb-1">
          {CATEGORIES.map((cat, idx) => {
            const isActive = active === cat;
            return (
              <button
                type="button"
                key={cat}
                data-ocid={`filter.tab.${idx + 1}`}
                onClick={() => onChange(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? "border-green bg-accent text-green shadow-glow"
                    : "border-border/60 bg-muted/30 text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted/60"
                }`}
                style={
                  isActive
                    ? {
                        borderColor: "oklch(0.72 0.22 148)",
                        background: "oklch(0.72 0.22 148 / 0.15)",
                        color: "oklch(0.72 0.22 148)",
                        boxShadow: "0 0 12px oklch(0.72 0.22 148 / 0.25)",
                      }
                    : {}
                }
              >
                {cat}
              </button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
