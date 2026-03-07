import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Plus, Search, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAddMovie } from "../../hooks/useQueries";
import {
  OMDB_API_KEY,
  type OmdbSearchResult,
  getMovieDetail,
  searchMovies,
} from "../../omdb";
import { CATEGORIES } from "../../sampleMovies";

const QUALITY_OPTIONS = [
  "BluRay",
  "WebRip",
  "HDTC",
  "HDRip",
  "DVDRip",
  "WEB-DL",
  "4K",
];

interface AddMoviePanelProps {
  onClose?: () => void;
}

export default function AddMoviePanel({ onClose }: AddMoviePanelProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<OmdbSearchResult[]>([]);
  const [selected, setSelected] = useState<OmdbSearchResult | null>(null);
  const [quality, setQuality] = useState("BluRay");
  const [category, setCategory] = useState("Featured");
  const [isSearching, setIsSearching] = useState(false);

  const addMovie = useAddMovie();
  const isApiConfigured = OMDB_API_KEY !== "YOUR_API_KEY_HERE";

  const handleSearch = async () => {
    if (!query.trim() || !isApiConfigured) return;
    setIsSearching(true);
    const data = await searchMovies(query);
    setResults(data);
    setIsSearching(false);
  };

  const handleAdd = async () => {
    if (!selected || !isApiConfigured) return;
    const detail = await getMovieDetail(selected.imdbID);
    const description = detail?.Plot ?? "A movie worth watching.";
    const poster = selected.Poster !== "N/A" ? selected.Poster : "";
    try {
      await addMovie.mutateAsync({
        omdbId: selected.imdbID,
        title: selected.Title,
        quality,
        category,
        description,
        year: selected.Year,
        poster,
      });
      toast.success(`"${selected.Title}" added successfully!`);
      setSelected(null);
      setQuery("");
      setResults([]);
      onClose?.();
    } catch {
      toast.error("Failed to add movie. Please try again.");
    }
  };

  if (!isApiConfigured) {
    return (
      <div className="p-5 rounded-xl bg-muted/30 border border-border/50">
        <h3 className="text-sm font-bold text-foreground mb-2">
          Add Movie via OMDB
        </h3>
        <p className="text-xs text-muted-foreground">
          Configure your OMDB API key in{" "}
          <code className="font-mono text-foreground/70 bg-muted px-1 rounded">
            src/omdb.ts
          </code>{" "}
          to enable this feature.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Get a free key at:{" "}
          <a
            href="https://www.omdbapi.com/apikey.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green hover:underline"
          >
            omdbapi.com/apikey.aspx
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-xl bg-card border border-border/50 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Plus className="w-4 h-4 text-green" />
          Add Movie via OMDB
        </h3>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <Input
          data-ocid="addmovie.search_input"
          placeholder="Search movie title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && void handleSearch()}
          className="h-9 text-sm bg-muted/50 border-border/50"
        />
        <Button
          data-ocid="addmovie.button"
          onClick={() => void handleSearch()}
          disabled={isSearching || !query.trim()}
          size="sm"
          className="h-9 px-3"
          style={{
            background: "oklch(0.72 0.22 148)",
            color: "oklch(0.08 0 0)",
          }}
        >
          {isSearching ? (
            <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Results */}
      {results.length > 0 && !selected && (
        <ul className="space-y-1 max-h-40 overflow-y-auto rounded-lg border border-border/40">
          {results.map((r) => (
            <li key={r.imdbID}>
              <button
                type="button"
                onClick={() => setSelected(r)}
                className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-muted/60 transition-colors"
              >
                <img
                  src={r.Poster !== "N/A" ? r.Poster : ""}
                  alt={r.Title}
                  className="w-7 h-10 object-cover rounded bg-muted flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.visibility = "hidden";
                  }}
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">
                    {r.Title}
                  </p>
                  <p className="text-xs text-muted-foreground">{r.Year}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Selected movie */}
      {selected && (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-green/30">
          <CheckCircle className="w-4 h-4 text-green flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-foreground truncate">
              {selected.Title}
            </p>
            <p className="text-xs text-muted-foreground">{selected.Year}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelected(null);
              setResults([]);
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Options */}
      {selected && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Quality</p>
            <Select value={quality} onValueChange={setQuality}>
              <SelectTrigger
                data-ocid="addmovie.select"
                className="h-8 text-xs bg-muted/50"
                aria-label="Select quality"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {QUALITY_OPTIONS.map((q) => (
                  <SelectItem key={q} value={q} className="text-xs">
                    {q}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Category</p>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger
                data-ocid="addmovie.select"
                className="h-8 text-xs bg-muted/50"
                aria-label="Select category"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.filter((c) => c !== "All").map((c) => (
                  <SelectItem key={c} value={c} className="text-xs">
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {selected && (
        <Button
          data-ocid="addmovie.submit_button"
          onClick={() => void handleAdd()}
          disabled={addMovie.isPending}
          className="w-full h-9 text-sm font-bold"
          style={{
            background: "oklch(0.72 0.22 148)",
            color: "oklch(0.08 0 0)",
          }}
        >
          {addMovie.isPending ? "Adding..." : `Add "${selected.Title}"`}
        </Button>
      )}
    </div>
  );
}
