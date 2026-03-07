import { Link, useRouterState } from "@tanstack/react-router";
import { Film, Home, Sparkles, Star, TrendingUp, X } from "lucide-react";
import { useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect?: (category: string) => void;
}

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home, ocid: "sidebar.link.1" },
  {
    label: "Trending",
    href: "/movies?category=Most+Favorite",
    icon: TrendingUp,
    ocid: "sidebar.link.2",
  },
  {
    label: "Top IMDb",
    href: "/movies?category=Top+IMDb",
    icon: Star,
    ocid: "sidebar.link.3",
  },
  {
    label: "New Release",
    href: "/movies?category=New+Release",
    icon: Sparkles,
    ocid: "sidebar.link.4",
  },
  { label: "All Movies", href: "/movies", icon: Film, ocid: "sidebar.link.5" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll when sidebar open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-hidden="true"
        role="presentation"
      />

      {/* Sidebar panel */}
      <aside
        data-ocid="sidebar.panel"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-sidebar border-r border-border shadow-cinema transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-border/50">
          <Link to="/" onClick={onClose} className="flex items-center gap-2">
            <Film className="w-5 h-5 text-green" />
            <span
              className="font-display font-black text-base"
              style={{ color: "oklch(0.72 0.22 148)" }}
            >
              FreeMoviesHUB
            </span>
          </Link>
          <button
            type="button"
            data-ocid="sidebar.close_button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="px-3 py-4 space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-3 pb-2">
            Browse
          </p>
          {NAV_ITEMS.map((item) => {
            const isActive =
              currentPath === item.href ||
              currentPath === item.href.split("?")[0];
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.href as "/"}
                data-ocid={item.ocid}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-accent text-green"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <Icon
                  className={`w-4.5 h-4.5 flex-shrink-0 ${isActive ? "text-green" : ""}`}
                  style={{ width: "18px", height: "18px" }}
                />
                {item.label}
                {isActive && (
                  <div
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ background: "oklch(0.72 0.22 148)" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer note */}
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-border/50">
          <p className="text-xs text-muted-foreground text-center">
            Powered by OMDB API
          </p>
        </div>
      </aside>
    </>
  );
}
