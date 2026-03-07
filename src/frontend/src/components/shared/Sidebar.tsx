import { Link, useRouter } from "@tanstack/react-router";
import { Film, Home, Sparkles, Star, TrendingUp, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  category?: string;
  ocid: string;
}

const navItems: NavItem[] = [
  { label: "Home", icon: Home, path: "/", ocid: "sidebar.home_link" },
  {
    label: "Trending",
    icon: TrendingUp,
    path: "/movies",
    category: "Trending",
    ocid: "sidebar.trending_link",
  },
  {
    label: "Top IMDb",
    icon: Star,
    path: "/movies",
    category: "Top IMDb",
    ocid: "sidebar.topimdb_link",
  },
  {
    label: "New Release",
    icon: Sparkles,
    path: "/movies",
    category: "New Release",
    ocid: "sidebar.newrelease_link",
  },
  {
    label: "All Movies",
    icon: Film,
    path: "/movies",
    ocid: "sidebar.movies_link",
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sidebar Panel */}
          <motion.aside
            key="sidebar"
            data-ocid="sidebar.panel"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed top-0 left-0 z-50 h-full w-72 flex flex-col"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.1 0.012 240) 0%, oklch(0.08 0.008 240) 100%)",
              borderRight: "1px solid oklch(0.25 0.01 240)",
            }}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <span className="font-display text-xl font-bold text-brand">
                FreeMoviesHUB
              </span>
              <button
                type="button"
                data-ocid="sidebar.close_button"
                onClick={onClose}
                className="rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;

                if (item.category) {
                  return (
                    <Link
                      key={item.ocid}
                      to="/movies"
                      search={{ category: item.category }}
                      data-ocid={item.ocid}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-brand/20 text-brand border border-brand/30"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={isActive ? "text-brand" : ""}
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.ocid}
                    to={item.path}
                    data-ocid={item.ocid}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-brand/20 text-brand border border-brand/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    <Icon size={18} className={isActive ? "text-brand" : ""} />
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-brand"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                © {new Date().getFullYear()} FreeMoviesHUB
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
