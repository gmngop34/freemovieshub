import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import { Film, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { OMDB_API_KEY, type OmdbSearchResult, searchMovies } from "../../omdb";

interface NavbarProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

export default function Navbar({ onMenuToggle, isSidebarOpen }: NavbarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<OmdbSearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<OmdbSearchResult | null>(
    null,
  );
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  const isApiConfigured = OMDB_API_KEY !== "YOUR_API_KEY_HERE";

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    if (!isApiConfigured) {
      setShowDropdown(false);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setIsSearching(true);
      const data = await searchMovies(query);
      setResults(data);
      setShowDropdown(true);
      setIsSearching(false);
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, isApiConfigured]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (movie: OmdbSearchResult) => {
    setSelectedMovie(movie);
    setQuery(movie.Title);
    setShowDropdown(false);
    void navigate({ to: "/movies" });
  };

  void selectedMovie; // used in future

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16">
      <div className="absolute inset-0 bg-background/95 backdrop-blur-md border-b border-border/50" />
      <nav className="relative h-full flex items-center px-4 md:px-6 gap-3 md:gap-4">
        {/* Hamburger */}
        <button
          type="button"
          data-ocid="nav.toggle"
          onClick={onMenuToggle}
          aria-label="Toggle sidebar"
          className="flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors flex-shrink-0"
        >
          {isSidebarOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        {/* Logo */}
        <Link
          to="/"
          data-ocid="nav.link"
          className="flex items-center gap-2 flex-shrink-0 group"
        >
          <Film className="w-6 h-6 text-green" />
          <span
            className="font-display font-black text-lg md:text-xl tracking-tight"
            style={{ color: "oklch(0.72 0.22 148)" }}
          >
            FreeMovies
            <span style={{ color: "oklch(0.85 0.22 148)" }}>HUB</span>
          </span>
        </Link>

        {/* Search */}
        <div
          ref={searchRef}
          className="flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg relative"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              data-ocid="nav.search_input"
              type="text"
              placeholder={
                isApiConfigured ? "Search movies..." : "Search (add API key)"
              }
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => results.length > 0 && setShowDropdown(true)}
              className="pl-9 pr-4 h-9 bg-muted/50 border-border/50 text-sm focus:border-green/60 focus:ring-green/20 rounded-full"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-3.5 h-3.5 border-2 border-green/50 border-t-green rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Search Dropdown */}
          {showDropdown && (
            <div
              data-ocid="nav.dropdown_menu"
              className="absolute top-full mt-2 left-0 right-0 z-50 bg-popover border border-border rounded-lg shadow-cinema overflow-hidden"
            >
              {results.length === 0 ? (
                <p className="text-muted-foreground text-sm p-3 text-center">
                  No results found
                </p>
              ) : (
                <ul className="max-h-72 overflow-y-auto">
                  {results.map((movie, idx) => (
                    <li key={movie.imdbID}>
                      <button
                        type="button"
                        data-ocid={`nav.item.${idx + 1}`}
                        onClick={() => handleResultClick(movie)}
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted/60 transition-colors text-left"
                      >
                        <img
                          src={
                            movie.Poster !== "N/A"
                              ? movie.Poster
                              : "/assets/generated/placeholder-poster.jpg"
                          }
                          alt={movie.Title}
                          className="w-8 h-12 object-cover rounded flex-shrink-0 bg-muted"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {movie.Title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {movie.Year}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Nav links — desktop */}
        <div className="hidden lg:flex items-center gap-1 ml-auto">
          <Link
            to="/"
            data-ocid="nav.link"
            className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
          >
            Home
          </Link>
          <Link
            to="/movies"
            data-ocid="nav.link"
            className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
          >
            All Movies
          </Link>
        </div>
      </nav>
    </header>
  );
}
