import type { Movie } from "@/data/movies";
import { QUALITY_COLORS } from "@/data/movies";
import { useNavigate } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { motion } from "motion/react";

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const navigate = useNavigate();
  const qualityClass = QUALITY_COLORS[movie.quality] ?? "bg-gray-600";

  const ocid = `movie.card.${index + 1}`;

  return (
    <motion.div
      data-ocid={ocid}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={() =>
        navigate({ to: "/player/$id", params: { id: String(movie.id) } })
      }
      className="group relative cursor-pointer rounded-lg overflow-hidden card-glow-hover"
      style={{
        background: "oklch(0.12 0.008 240)",
        border: "1px solid oklch(0.22 0.01 240)",
        aspectRatio: "2/3",
      }}
    >
      {/* Poster Image */}
      <img
        src={movie.posterUrl}
        alt={movie.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Quality Badge */}
      <div
        className={`absolute top-2 right-2 z-10 px-2 py-0.5 rounded text-xs font-bold text-white ${qualityClass}`}
        style={{ fontSize: "0.65rem", letterSpacing: "0.05em" }}
      >
        {movie.quality}
      </div>

      {/* Play button on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: "oklch(0.68 0.2 142 / 0.9)",
            boxShadow: "0 0 30px oklch(0.68 0.2 142 / 0.7)",
          }}
        >
          <Play size={24} fill="white" className="text-white ml-1" />
        </div>
      </div>

      {/* Bottom overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 p-3"
        style={{
          background:
            "linear-gradient(to top, oklch(0.06 0.008 240 / 0.98) 0%, oklch(0.06 0.008 240 / 0.8) 60%, transparent 100%)",
        }}
      >
        <h3
          className="font-display font-bold text-white text-sm leading-tight line-clamp-2 mb-1"
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
        >
          {movie.title}
        </h3>
        <p
          className="text-xs line-clamp-2 leading-snug"
          style={{ color: "oklch(0.65 0.005 240)" }}
        >
          {movie.description}
        </p>
        <div
          className="mt-1.5 flex items-center gap-2 text-xs"
          style={{ color: "oklch(0.55 0.005 240)" }}
        >
          <span>{movie.releaseDate.slice(0, 4)}</span>
          <span>•</span>
          <span>{movie.runtime}</span>
        </div>
      </div>
    </motion.div>
  );
}
