import { Skeleton } from "@/components/ui/skeleton";
import type { Movie } from "../../backend.d";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  onMovieClick?: (movie: Movie) => void;
  emptyMessage?: string;
}

function MovieSkeleton() {
  return (
    <div
      className="rounded-xl overflow-hidden bg-card border border-border/40"
      style={{ aspectRatio: "2/3" }}
    >
      <Skeleton className="w-full h-full" data-ocid="movie.loading_state" />
    </div>
  );
}

export default function MovieGrid({
  movies,
  isLoading,
  onMovieClick,
  emptyMessage,
}: MovieGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
        {Array.from({ length: 12 }, (_, i) => `skeleton-${i}`).map((key) => (
          <MovieSkeleton key={key} />
        ))}
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div
        data-ocid="movie.empty_state"
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div
          className="text-6xl mb-4"
          style={{ filter: "grayscale(0.5) opacity(0.6)" }}
        >
          🎬
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No movies found
        </h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          {emptyMessage ??
            "Try a different category or search for movies using the search bar."}
        </p>
      </div>
    );
  }

  return (
    <div
      data-ocid="movie.list"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4"
    >
      {movies.map((movie, idx) => (
        <MovieCard
          key={String(movie.id)}
          movie={movie}
          index={idx + 1}
          onClick={onMovieClick}
        />
      ))}
    </div>
  );
}
