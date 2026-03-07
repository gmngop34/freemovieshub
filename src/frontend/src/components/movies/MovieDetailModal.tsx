import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Film, Globe, Play, Star, Tag, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Movie } from "../../backend.d";
import { OMDB_API_KEY, type OmdbMovieDetail, getMovieDetail } from "../../omdb";

interface MovieDetailModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MovieDetailModal({
  movie,
  isOpen,
  onClose,
}: MovieDetailModalProps) {
  const [detail, setDetail] = useState<OmdbMovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isApiConfigured = OMDB_API_KEY !== "YOUR_API_KEY_HERE";

  useEffect(() => {
    if (!isOpen || !movie) {
      setDetail(null);
      setImgError(false);
      return;
    }
    if (!isApiConfigured || !movie.omdbId) return;

    setIsLoading(true);
    getMovieDetail(movie.omdbId).then((data) => {
      setDetail(data);
      setIsLoading(false);
    });
  }, [isOpen, movie, isApiConfigured]);

  const handleWatch = () => {
    if (!movie) return;
    const q = encodeURIComponent(`${movie.title} ${movie.year} full movie`);
    window.open(
      `https://www.youtube.com/results?search_query=${q}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const posterUrl =
    !imgError &&
    (detail?.Poster && detail.Poster !== "N/A" ? detail.Poster : movie?.poster)
      ? ((detail?.Poster && detail.Poster !== "N/A"
          ? detail.Poster
          : movie?.poster) ?? "")
      : "";

  const imdbRating =
    detail?.imdbRating && detail.imdbRating !== "N/A"
      ? detail.imdbRating
      : null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        data-ocid="movie.modal"
        className="max-w-2xl w-full p-0 overflow-hidden bg-popover border-border/60"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Close button */}
        <button
          type="button"
          data-ocid="movie.modal.close_button"
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero area */}
        <div className="relative h-52 md:h-64 overflow-hidden bg-muted">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie?.title}
              className="w-full h-full object-cover object-top"
              style={{ filter: "brightness(0.4) saturate(1.2)" }}
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="w-full h-full"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.12 0.04 148) 0%, oklch(0.08 0 0) 100%)",
              }}
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, oklch(0.16 0 0 / 0.9) 80%, oklch(0.16 0 0) 100%)",
            }}
          />

          {/* Floating poster */}
          <div className="absolute bottom-4 left-5 flex items-end gap-4">
            <div className="w-20 md:w-24 rounded-lg overflow-hidden shadow-cinema flex-shrink-0 border border-border/40">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={movie?.title}
                  className="w-full"
                  style={{ aspectRatio: "2/3", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="w-full flex items-center justify-center"
                  style={{
                    aspectRatio: "2/3",
                    background: "oklch(0.2 0 0)",
                  }}
                >
                  <Film className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="pb-1">
              <DialogHeader>
                <DialogTitle className="text-foreground font-display font-black text-xl md:text-2xl leading-tight">
                  {movie?.title}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Movie details for {movie?.title}
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center flex-wrap gap-2 mt-1">
                <span className="text-sm font-semibold text-green">
                  {movie?.year}
                </span>
                {imdbRating && (
                  <span className="flex items-center gap-1 text-xs text-foreground/80">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {imdbRating}/10
                  </span>
                )}
                {movie?.quality && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded badge-bluray">
                    {movie.quality}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 py-5 space-y-4">
          {isLoading ? (
            <div className="space-y-3" data-ocid="movie.loading_state">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ) : (
            <>
              {/* Plot */}
              <p className="text-sm text-foreground/80 leading-relaxed">
                {detail?.Plot ??
                  movie?.description ??
                  "No description available."}
              </p>

              {/* Details grid */}
              {detail && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {detail.Genre && detail.Genre !== "N/A" && (
                    <DetailRow
                      icon={<Tag className="w-3.5 h-3.5" />}
                      label="Genre"
                      value={detail.Genre}
                    />
                  )}
                  {detail.Runtime && detail.Runtime !== "N/A" && (
                    <DetailRow
                      icon={<Clock className="w-3.5 h-3.5" />}
                      label="Runtime"
                      value={detail.Runtime}
                    />
                  )}
                  {detail.Director && detail.Director !== "N/A" && (
                    <DetailRow
                      icon={<Film className="w-3.5 h-3.5" />}
                      label="Director"
                      value={detail.Director}
                    />
                  )}
                  {detail.Actors && detail.Actors !== "N/A" && (
                    <DetailRow
                      icon={<Users className="w-3.5 h-3.5" />}
                      label="Cast"
                      value={detail.Actors}
                    />
                  )}
                  {detail.Language && detail.Language !== "N/A" && (
                    <DetailRow
                      icon={<Globe className="w-3.5 h-3.5" />}
                      label="Language"
                      value={detail.Language}
                    />
                  )}
                </div>
              )}

              {!isApiConfigured && (
                <div className="rounded-lg p-3 bg-muted/50 border border-border/50">
                  <p className="text-xs text-muted-foreground text-center">
                    ⚠️ Add your OMDB API key in{" "}
                    <code className="font-mono text-foreground/70">
                      src/omdb.ts
                    </code>{" "}
                    to see full movie details.
                  </p>
                </div>
              )}
            </>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-1">
            <Button
              data-ocid="movie.modal.primary_button"
              onClick={handleWatch}
              className="flex-1 flex items-center justify-center gap-2 font-bold h-10 rounded-full"
              style={{
                background: "oklch(0.72 0.22 148)",
                color: "oklch(0.08 0 0)",
              }}
            >
              <Play className="w-4 h-4 fill-current" />
              Watch on YouTube
            </Button>
            <Button
              data-ocid="movie.modal.cancel_button"
              variant="outline"
              onClick={onClose}
              className="px-5 h-10 rounded-full"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-green mt-0.5 flex-shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
        <p className="text-xs text-foreground/90 mt-0.5 leading-snug">
          {value}
        </p>
      </div>
    </div>
  );
}
