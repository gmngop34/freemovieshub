import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import type { Movie } from "../backend.d";
import CategoryFilters from "../components/movies/CategoryFilters";
import MovieDetailModal from "../components/movies/MovieDetailModal";
import MovieGrid from "../components/movies/MovieGrid";
import { useGetMovies } from "../hooks/useQueries";
import { SAMPLE_MOVIES } from "../sampleMovies";

const PAGE_SIZE = 24;

export default function MoviesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { data: backendMovies, isLoading } = useGetMovies();
  const allMovies =
    backendMovies && backendMovies.length > 0 ? backendMovies : SAMPLE_MOVIES;

  const filteredMovies = useMemo(() => {
    return activeCategory === "All"
      ? allMovies
      : allMovies.filter((m) => m.category === activeCategory);
  }, [allMovies, activeCategory]);

  const paginatedMovies = filteredMovies.slice(0, page * PAGE_SIZE);
  const hasMore = paginatedMovies.length < filteredMovies.length;

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <main className="px-4 md:px-8 lg:px-12 pb-20">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6 mt-4">
          <div>
            <h1 className="font-display font-black text-2xl md:text-3xl text-foreground tracking-tight">
              <span style={{ color: "oklch(0.72 0.22 148)" }}>All</span> Movies
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredMovies.length}{" "}
              {filteredMovies.length === 1 ? "movie" : "movies"} available
            </p>
          </div>
        </div>

        {/* Category filters */}
        <div className="mb-6">
          <CategoryFilters
            active={activeCategory}
            onChange={handleCategoryChange}
          />
        </div>

        {/* Movie grid */}
        <MovieGrid
          movies={paginatedMovies}
          isLoading={isLoading}
          onMovieClick={handleMovieClick}
          emptyMessage="No movies in this category yet."
        />

        {/* Load More */}
        {hasMore && !isLoading && (
          <div className="flex justify-center mt-10">
            <Button
              data-ocid="movies.pagination_next"
              onClick={() => setPage((p) => p + 1)}
              variant="outline"
              className="px-8 h-11 rounded-full font-semibold border-border/60 hover:border-green/40 hover:bg-accent/50"
            >
              Load More ({filteredMovies.length - paginatedMovies.length}{" "}
              remaining)
            </Button>
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
