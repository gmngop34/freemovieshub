import { Link } from "@tanstack/react-router";
import { Film, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Sidebar } from "./Sidebar";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function Navbar({ searchQuery, onSearchChange }: NavbarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <header
        className="sticky top-0 z-30 w-full"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.06 0.008 240 / 0.98) 0%, oklch(0.06 0.008 240 / 0.85) 100%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid oklch(0.2 0.01 240 / 0.5)",
        }}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          {/* Hamburger */}
          <button
            type="button"
            data-ocid="nav.menu_button"
            onClick={() => setSidebarOpen(true)}
            className="flex-shrink-0 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Brand */}
          <Link
            to="/"
            data-ocid="nav.brand_link"
            className="flex items-center gap-2 flex-shrink-0"
          >
            <div className="w-7 h-7 rounded-md bg-brand/20 border border-brand/40 flex items-center justify-center">
              <Film size={16} className="text-brand" />
            </div>
            <span className="font-display text-lg sm:text-xl font-extrabold text-brand brand-glow tracking-tight">
              FreeMoviesHUB
            </span>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Desktop search */}
          <div className="hidden sm:flex items-center gap-2 w-full max-w-xs">
            <div className="relative w-full">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <input
                data-ocid="nav.search_input"
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full text-sm bg-accent border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Mobile search toggle */}
          <button
            type="button"
            className="sm:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Toggle search"
          >
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </button>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="sm:hidden px-4 pb-3">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <input
                data-ocid="search.input"
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full text-sm bg-accent border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/50 transition-colors"
              />
            </div>
          </div>
        )}
      </header>
    </>
  );
}
