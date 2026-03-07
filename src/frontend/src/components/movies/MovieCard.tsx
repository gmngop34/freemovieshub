import { Play } from "lucide-react";
import { useState } from "react";
import type { Movie } from "../../backend.d";

interface MovieCardProps {
  movie: Movie;
  index: number;
  onClick?: (movie: Movie) => void;
}

function getQualityClass(quality: string): string {
  const q = quality.toUpperCase();
  if (q.includes("BLURAY") || q.includes("BLU-RAY") || q.includes("BD"))
    return "badge-bluray";
  if (q.includes("WEBRIP") || q.includes("WEB-RIP")) return "badge-webrip";
  if (q.includes("HDTC") || q.includes("HD-TC") || q.includes("HDCAM"))
    return "badge-hdtc";
  if (q.includes("HDRIP") || q.includes("HDTRIP")) return "badge-hdrip";
  if (q.includes("DVDRIP") || q.includes("DVDRip")) return "badge-dvdrip";
  if (q.includes("WEBD") || q.includes("WEBDL")) return "badge-bluray";
  return "badge-default";
}

export default function MovieCard({ movie, index, onClick }: MovieCardProps) {
  const [imgError, setImgError] = useState(false);

  const handleClick = () => onClick?.(movie);

  return (
    <button
      type="button"
      data-ocid={`movie.card.${index}`}
      aria-label={`${movie.title} (${movie.year})`}
      onClick={handleClick}
      className="relative cursor-pointer rounded-xl overflow-hidden bg-card border border-border/40 card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green w-full text-left"
      style={{ aspectRatio: "2/3" }}
    >
      {/* Poster image */}
      <div className="absolute inset-0 bg-muted">
        {!imgError && movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.15 0.04 148) 0%, oklch(0.1 0 0) 100%)",
            }}
          >
            <div className="text-4xl opacity-30">🎬</div>
            <p className="text-xs text-muted-foreground text-center px-2 line-clamp-2">
              {movie.title}
            </p>
          </div>
        )}
      </div>

      {/* Quality badge — top right */}
      <div className="absolute top-2 right-2 z-10">
        <span
          className={`text-xs font-bold px-1.5 py-0.5 rounded ${getQualityClass(movie.quality)}`}
          style={{ fontSize: "10px", letterSpacing: "0.05em" }}
        >
          {movie.quality}
        </span>
      </div>

      {/* Bottom gradient overlay with title + description */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{
          background:
            "linear-gradient(to top, oklch(0.08 0 0 / 0.97) 0%, oklch(0.08 0 0 / 0.7) 50%, transparent 100%)",
          padding: "1rem 0.75rem 0.75rem",
        }}
      >
        <h3 className="text-sm font-bold text-foreground line-clamp-1 mb-0.5">
          {movie.title}
        </h3>
        <p className="text-xs text-foreground/60 line-clamp-2 leading-snug">
          {movie.description}
        </p>
      </div>

      {/* Year badge — top left */}
      <div className="absolute top-2 left-2 z-10">
        <span className="text-xs font-semibold text-foreground/70 bg-background/60 backdrop-blur-sm px-1.5 py-0.5 rounded">
          {movie.year}
        </span>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 bg-background/20">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: "oklch(0.72 0.22 148)",
            boxShadow: "0 0 20px oklch(0.72 0.22 148 / 0.6)",
          }}
        >
          <Play
            className="w-5 h-5 fill-current"
            style={{ color: "oklch(0.08 0 0)" }}
          />
        </div>
      </div>
    </button>
  );
}
