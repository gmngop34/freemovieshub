import { MovieCard } from "@/components/shared/MovieCard";
import { Navbar } from "@/components/shared/Navbar";
import { MOVIES, QUALITY_COLORS } from "@/data/movies";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  Calendar,
  ChevronLeft,
  Clock,
  Download,
  Film,
  Mail,
  Star,
  Tag,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

function isYouTubeUrl(url: string): boolean {
  return (
    url.includes("youtube.com/embed/") ||
    url.includes("youtu.be/") ||
    url.includes("youtube.com/watch")
  );
}

function toEmbedUrl(url: string): string {
  if (url.includes("youtube.com/embed/")) return url;
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  if (ytMatch)
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  return url;
}

export function PlayerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { id } = useParams({ from: "/player/$id" });
  const navigate = useNavigate();

  const movieId = BigInt(id ?? "1");
  const movie = MOVIES.find((m) => m.id === movieId) ?? MOVIES[0];

  // Related movies (same genre keywords, different id)
  const related = MOVIES.filter(
    (m) => m.id !== movie.id && m.category === movie.category,
  ).slice(0, 6);

  const qualityClass = QUALITY_COLORS[movie.quality] ?? "bg-gray-600";

  const isYT = isYouTubeUrl(movie.videoUrl);
  const embedSrc = isYT ? toEmbedUrl(movie.videoUrl) : movie.videoUrl;

  return (
    <div className="min-h-screen bg-background">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate({ to: "/" })}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-5 transition-colors group"
        >
          <ChevronLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Home
        </motion.button>

        {/* Video Player */}
        <motion.div
          data-ocid="player.video_player"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full rounded-xl overflow-hidden"
          style={{
            border: "1px solid oklch(0.25 0.01 240)",
            boxShadow: "0 0 40px oklch(0 0 0 / 0.6)",
            aspectRatio: "16/9",
            background: "oklch(0.06 0.008 240)",
          }}
        >
          {isYT ? (
            <iframe
              src={embedSrc}
              title={movie.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              style={{ border: "none" }}
            />
          ) : (
            <video
              src={movie.videoUrl}
              controls
              autoPlay
              className="w-full h-full"
              style={{ background: "black" }}
            >
              <track kind="captions" />
              Your browser does not support the video tag.
            </video>
          )}
        </motion.div>

        {/* Movie Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6"
        >
          {/* Title */}
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
            {movie.title}
          </h1>

          {/* Meta badges */}
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border border-border text-muted-foreground">
              <Calendar size={14} />
              <span>{movie.releaseDate}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border border-border text-muted-foreground">
              <Clock size={14} />
              <span>{movie.runtime}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border border-border text-muted-foreground">
              <Tag size={14} />
              <span>{movie.genre}</span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold text-white ${qualityClass}`}
            >
              {movie.quality}
            </span>
          </div>

          {/* Star decoration */}
          <div className="flex items-center gap-1 mb-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={14}
                fill={i <= 4 ? "oklch(0.68 0.2 142)" : "none"}
                className="text-brand"
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">8.4 / 10</span>
          </div>

          {/* Divider */}
          <div className="h-px bg-border mb-5" />

          {/* Description */}
          <div className="flex items-start gap-2 mb-6">
            <Film size={18} className="text-brand flex-shrink-0 mt-0.5" />
            <p
              className="text-base leading-relaxed"
              style={{ color: "oklch(0.75 0.005 240)" }}
            >
              {movie.description}
            </p>
          </div>

          {/* Download Button */}
          <motion.a
            data-ocid="player.download_button"
            href={movie.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full font-bold text-sm text-black transition-all"
            style={{
              background: "oklch(0.68 0.2 142)",
              boxShadow: "0 0 20px oklch(0.68 0.2 142 / 0.4)",
            }}
          >
            <Download size={18} />
            Download Movie
          </motion.a>
        </motion.div>

        {/* Related Movies */}
        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 rounded-full bg-brand" />
              <h2 className="font-display text-xl font-bold">More Like This</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {related.map((m, idx) => (
                <MovieCard key={String(m.id)} movie={m} index={idx} />
              ))}
            </div>
          </motion.section>
        )}
      </main>

      {/* Floating Contact Button */}
      <motion.button
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
        className="border-t border-border py-6 mt-10"
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
