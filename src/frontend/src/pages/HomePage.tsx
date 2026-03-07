import { CategorySection } from "@/components/shared/CategorySection";
import { MovieCard } from "@/components/shared/MovieCard";
import { Navbar } from "@/components/shared/Navbar";
import { CATEGORIES, MOVIES } from "@/data/movies";
import { Link, useNavigate } from "@tanstack/react-router";
import { Info, Mail, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const HOMEPAGE_LIMIT = 6;

const HERO_MOVIE = MOVIES[0];

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const navigate = useNavigate();

  // Search results
  const searchResults = searchQuery.trim()
    ? MOVIES.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];
  const isSearching = searchQuery.trim().length > 0;

  // Category filter tabs (for section navigation)
  const filterTabs = ["All", ...CATEGORIES];

  // Movies grouped by category
  const moviesByCategory = CATEGORIES.map((cat) => ({
    category: cat,
    movies: MOVIES.filter((m) => m.category === cat),
  }));

  const filteredSections =
    activeCategory === "All"
      ? moviesByCategory
      : moviesByCategory.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main>
        {/* Search Results */}
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.section
              key="search"
              data-ocid="search.results_section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8"
            >
              <h2 className="font-display text-xl font-bold mb-4">
                Search results for &ldquo;{searchQuery}&rdquo;
                <span className="text-muted-foreground text-base font-normal ml-2">
                  ({searchResults.length} found)
                </span>
              </h2>
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                  {searchResults.map((movie, idx) => (
                    <MovieCard
                      key={String(movie.id)}
                      movie={movie}
                      index={idx}
                    />
                  ))}
                </div>
              ) : (
                <div
                  data-ocid="search.empty_state"
                  className="text-center py-20 text-muted-foreground"
                >
                  <p className="text-lg">
                    No movies found for &ldquo;{searchQuery}&rdquo;
                  </p>
                  <p className="text-sm mt-2">
                    Try searching with different keywords.
                  </p>
                </div>
              )}
            </motion.section>
          ) : (
            <motion.div
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero Banner */}
              <section className="relative h-[60vh] min-h-[380px] max-h-[560px] overflow-hidden">
                <img
                  src="/assets/generated/hero-banner.dim_1200x500.jpg"
                  alt={HERO_MOVIE.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to right, oklch(0.06 0.008 240 / 0.95) 0%, oklch(0.06 0.008 240 / 0.7) 50%, transparent 100%), linear-gradient(to top, oklch(0.06 0.008 240) 0%, transparent 50%)",
                  }}
                />

                {/* Hero Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-[1600px] mx-auto px-4 sm:px-6 w-full">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="max-w-lg"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded text-xs font-bold text-white bg-brand/90">
                          Featured
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {HERO_MOVIE.genre}
                        </span>
                      </div>
                      <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3">
                        {HERO_MOVIE.title}
                      </h1>
                      <p
                        className="text-sm sm:text-base leading-relaxed mb-6 line-clamp-3"
                        style={{ color: "oklch(0.8 0.005 240)" }}
                      >
                        {HERO_MOVIE.description}
                      </p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() =>
                            navigate({
                              to: "/player/$id",
                              params: { id: String(HERO_MOVIE.id) },
                            })
                          }
                          className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-black transition-all"
                          style={{
                            background: "oklch(0.68 0.2 142)",
                            boxShadow: "0 0 20px oklch(0.68 0.2 142 / 0.5)",
                          }}
                        >
                          <Play size={18} fill="black" />
                          Watch Now
                        </motion.button>
                        <Link
                          to="/player/$id"
                          params={{ id: String(HERO_MOVIE.id) }}
                          className="flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm text-foreground border border-border hover:border-brand/50 hover:bg-accent transition-all"
                        >
                          <Info size={16} />
                          More Info
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* Category Filter Tabs */}
              <div className="max-w-[1600px] mx-auto px-4 sm:px-6 pt-8 pb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  {filterTabs.map((tab) => (
                    <button
                      type="button"
                      key={tab}
                      data-ocid={
                        tab === "Featured"
                          ? "home.featured_tab"
                          : tab === "Most Favorite"
                            ? "home.favorite_tab"
                            : tab === "Top IMDb"
                              ? "home.topimdb_tab"
                              : undefined
                      }
                      onClick={() => setActiveCategory(tab)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeCategory === tab
                          ? "text-black"
                          : "text-muted-foreground border border-border hover:border-brand/40 hover:text-foreground"
                      }`}
                      style={
                        activeCategory === tab
                          ? {
                              background: "oklch(0.68 0.2 142)",
                              boxShadow: "0 0 12px oklch(0.68 0.2 142 / 0.4)",
                            }
                          : {}
                      }
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Movie Sections */}
              <div className="max-w-[1600px] mx-auto px-4 sm:px-6 pb-20">
                {filteredSections.map((section) => (
                  <CategorySection
                    key={section.category}
                    title={section.category}
                    movies={section.movies}
                    showViewMore={section.movies.length > HOMEPAGE_LIMIT}
                    limit={HOMEPAGE_LIMIT}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Contact Button */}
      <motion.button
        data-ocid="home.contact_button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: "oklch(0.68 0.2 142)",
          boxShadow: "0 0 25px oklch(0.68 0.2 142 / 0.55)",
        }}
        aria-label="Contact us"
        onClick={() => window.open("mailto:contact@freemovieshub.com")}
      >
        <Mail size={22} className="text-black" />
      </motion.button>

      {/* Footer */}
      <footer
        className="border-t border-border py-6"
        style={{ background: "oklch(0.07 0.006 240)" }}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}.{" "}
            <span className="text-brand font-semibold">FreeMoviesHUB</span>.
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
