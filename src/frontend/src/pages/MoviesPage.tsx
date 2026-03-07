import { CategorySection } from "@/components/shared/CategorySection";
import { MovieCard } from "@/components/shared/MovieCard";
import { Navbar } from "@/components/shared/Navbar";
import { CATEGORIES, MOVIES } from "@/data/movies";
import { useSearch } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const searchParams = useSearch({ from: "/movies" });
  const urlCategory =
    searchParams &&
    typeof searchParams === "object" &&
    "category" in searchParams
      ? ((searchParams as { category?: string }).category ?? "All")
      : "All";

  const [activeCategory, setActiveCategory] = useState<string>(urlCategory);

  const isSearching = searchQuery.trim().length > 0;
  const searchResults = isSearching
    ? MOVIES.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  const filterTabs = ["All", ...CATEGORIES];

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

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold">
            All Movies
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Browse {MOVIES.length} titles across all categories
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          {filterTabs.map((tab) => (
            <button
              type="button"
              key={tab}
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

        {/* Content */}
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.section
              key="search"
              data-ocid="search.results_section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="font-display text-lg font-bold mb-4">
                Search: &ldquo;{searchQuery}&rdquo;
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
                    No results for &ldquo;{searchQuery}&rdquo;
                  </p>
                </div>
              )}
            </motion.section>
          ) : (
            <motion.div
              key="categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredSections.map((section) => (
                <CategorySection
                  key={section.category}
                  title={section.category}
                  movies={section.movies}
                  showViewMore={false}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Contact Button */}
      <motion.button
        type="button"
        data-ocid="home.contact_button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center"
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
        className="border-t border-border py-6 mt-8"
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
