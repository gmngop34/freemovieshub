import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import type { Movie } from "../backend.d";
import CategoryFilters from "../components/movies/CategoryFilters";
import HeroBanner from "../components/movies/HeroBanner";
import MovieDetailModal from "../components/movies/MovieDetailModal";
import MovieGrid from "../components/movies/MovieGrid";
import { useGetMovies } from "../hooks/useQueries";
import { SAMPLE_MOVIES } from "../sampleMovies";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: backendMovies, isLoading } = useGetMovies();

  // Use backend movies if available, fall back to samples
  const allMovies =
    backendMovies && backendMovies.length > 0 ? backendMovies : SAMPLE_MOVIES;

  const filteredMovies =
    activeCategory === "All"
      ? allMovies
      : allMovies.filter((m) => m.category === activeCategory);

  // Hero: first featured or first movie
  const heroMovie =
    allMovies.find((m) => m.category === "Featured") ?? allMovies[0] ?? null;

  // Homepage shows first 8 movies
  const homepageMovies = filteredMovies.slice(0, 8);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <HeroBanner movie={heroMovie} onInfoClick={handleMovieClick} />

      {/* Main content */}
      <main className="px-4 md:px-8 lg:px-12 pb-20">
        {/* Section header */}
        <div className="flex items-center justify-between mt-8 mb-4">
          <h2 className="font-display font-black text-xl md:text-2xl text-foreground tracking-tight">
            <span style={{ color: "oklch(0.72 0.22 148)" }}>Browse</span> Movies
          </h2>
        </div>

        {/* Category filters */}
        <div className="mb-6">
          <CategoryFilters
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        {/* Movie grid */}
        <MovieGrid
          movies={homepageMovies}
          isLoading={isLoading}
          onMovieClick={handleMovieClick}
          emptyMessage="No movies in this category yet."
        />

        {/* View More */}
        {filteredMovies.length > 8 && (
          <div className="flex justify-center mt-8">
            <Link
              to="/movies"
              data-ocid="home.link"
              className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 px-6 py-2.5 rounded-full border"
              style={{
                color: "oklch(0.72 0.22 148)",
                borderColor: "oklch(0.72 0.22 148 / 0.4)",
                background: "oklch(0.72 0.22 148 / 0.08)",
              }}
            >
              View All Movies
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {filteredMovies.length <= 8 && filteredMovies.length > 0 && (
          <div className="flex justify-center mt-8">
            <Link
              to="/movies"
              data-ocid="home.link"
              className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 px-6 py-2.5 rounded-full border"
              style={{
                color: "oklch(0.72 0.22 148)",
                borderColor: "oklch(0.72 0.22 148 / 0.4)",
                background: "oklch(0.72 0.22 148 / 0.08)",
              }}
            >
              Explore More Movies
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </main>

      {/* Movie detail modal */}
      <MovieDetailModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
