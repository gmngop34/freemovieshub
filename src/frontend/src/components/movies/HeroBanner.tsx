import { Button } from "@/components/ui/button";
import { Info, Play } from "lucide-react";
import { useState } from "react";
import type { Movie } from "../../backend.d";

interface HeroBannerProps {
  movie: Movie | null;
  onInfoClick?: (movie: Movie) => void;
}

export default function HeroBanner({ movie, onInfoClick }: HeroBannerProps) {
  const [imgError, setImgError] = useState(false);

  if (!movie) {
    return (
      <div className="relative w-full h-[50vh] md:h-[70vh] bg-muted animate-pulse rounded-none" />
    );
  }

  const handleWatch = () => {
    const query = encodeURIComponent(`${movie.title} ${movie.year} full movie`);
    window.open(
      `https://www.youtube.com/results?search_query=${query}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section
      data-ocid="hero.section"
      className="relative w-full h-[55vh] md:h-[75vh] overflow-hidden"
    >
      {/* Backdrop image */}
      <div className="absolute inset-0">
        {!imgError ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover object-top scale-105"
            style={{ filter: "brightness(0.45) saturate(1.1)" }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.12 0.04 148) 0%, oklch(0.08 0 0) 50%, oklch(0.14 0.02 240) 100%)",
            }}
          />
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Side gradient for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, oklch(0.1 0 0 / 0.9) 0%, oklch(0.1 0 0 / 0.3) 50%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end pb-10 md:pb-16 px-6 md:px-12 lg:px-20">
        {/* Category badge */}
        <div className="mb-3">
          <span
            className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{
              background: "oklch(0.72 0.22 148 / 0.2)",
              color: "oklch(0.72 0.22 148)",
              border: "1px solid oklch(0.72 0.22 148 / 0.4)",
            }}
          >
            {movie.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-foreground mb-3 max-w-2xl leading-tight">
          {movie.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-semibold text-green">{movie.year}</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
          <span
            className="text-xs font-bold px-2 py-0.5 rounded"
            style={{
              background: "oklch(0.6 0.18 240 / 0.8)",
              color: "white",
            }}
          >
            {movie.quality}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm md:text-base text-foreground/75 max-w-lg mb-6 line-clamp-2 md:line-clamp-3 leading-relaxed">
          {movie.description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            data-ocid="hero.primary_button"
            onClick={handleWatch}
            className="flex items-center gap-2 font-bold px-6 h-11 rounded-full"
            style={{
              background: "oklch(0.72 0.22 148)",
              color: "oklch(0.08 0 0)",
            }}
          >
            <Play className="w-4 h-4 fill-current" />
            Watch Now
          </Button>
          {onInfoClick && (
            <Button
              data-ocid="hero.secondary_button"
              variant="outline"
              onClick={() => onInfoClick(movie)}
              className="flex items-center gap-2 font-medium px-6 h-11 rounded-full border-foreground/30 bg-foreground/10 backdrop-blur-sm hover:bg-foreground/20 text-foreground"
            >
              <Info className="w-4 h-4" />
              More Info
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
