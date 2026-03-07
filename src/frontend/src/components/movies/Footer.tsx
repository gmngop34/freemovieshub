import { Film } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="border-t border-border/30 py-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Film className="w-5 h-5 text-green" />
          <span
            className="font-display font-black text-base"
            style={{ color: "oklch(0.72 0.22 148)" }}
          >
            FreeMoviesHUB
          </span>
        </div>

        {/* Attribution */}
        <p className="text-xs text-muted-foreground text-center">
          © {year}. Built with{" "}
          <span style={{ color: "oklch(0.72 0.22 148)" }}>♥</span> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-foreground transition-colors underline underline-offset-2"
          >
            caffeine.ai
          </a>
        </p>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground">Powered by OMDB API</p>
      </div>
    </footer>
  );
}
