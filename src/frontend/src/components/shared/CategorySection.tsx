import type { Movie } from "@/data/movies";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { MovieCard } from "./MovieCard";

interface CategorySectionProps {
  title: string;
  movies: Movie[];
  showViewMore?: boolean;
  limit?: number;
}

export function CategorySection({
  title,
  movies,
  showViewMore = false,
  limit,
}: CategorySectionProps) {
  const displayedMovies = limit ? movies.slice(0, limit) : movies;

  if (displayedMovies.length === 0) return null;

  return (
    <section className="mb-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 rounded-full bg-brand" />
          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
            {title}
          </h2>
        </div>
        {showViewMore && (
          <Link
            to="/movies"
            search={{ category: title }}
            data-ocid="home.view_more_button"
            className="flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-bright transition-colors"
          >
            View More
            <ChevronRight size={16} />
          </Link>
        )}
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {displayedMovies.map((movie, idx) => (
          <MovieCard key={String(movie.id)} movie={movie} index={idx} />
        ))}
      </div>
    </section>
  );
}
