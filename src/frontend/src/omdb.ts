// ============================================================
// OMDB API Configuration
// ============================================================
//
// ⚠️  IMPORTANT: Replace the placeholder below with YOUR OMDB API key.
//
//     Get a free key at: https://www.omdbapi.com/apikey.aspx
//
//     After getting your key, replace "YOUR_API_KEY_HERE" below with
//     the actual key (e.g., "abc12345").
//
//     Example: export const OMDB_API_KEY = "abc12345";
//
// ============================================================

export const OMDB_API_KEY = "YOUR_API_KEY_HERE";

export const OMDB_BASE_URL = "https://www.omdbapi.com/";

export interface OmdbSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface OmdbSearchResponse {
  Search?: OmdbSearchResult[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

export interface OmdbMovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{ Source: string; Value: string }>;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  Response: string;
}

export async function searchMovies(query: string): Promise<OmdbSearchResult[]> {
  if (!query.trim() || OMDB_API_KEY === "YOUR_API_KEY_HERE") return [];
  try {
    const url = `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&type=movie`;
    const res = await fetch(url);
    const data: OmdbSearchResponse = await res.json();
    if (data.Response === "True" && data.Search) {
      return data.Search;
    }
  } catch (e) {
    console.error("OMDB search error:", e);
  }
  return [];
}

export async function getMovieDetail(
  imdbId: string,
): Promise<OmdbMovieDetail | null> {
  if (!imdbId || OMDB_API_KEY === "YOUR_API_KEY_HERE") return null;
  try {
    const url = `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${imdbId}&plot=full`;
    const res = await fetch(url);
    const data: OmdbMovieDetail = await res.json();
    if (data.Response === "True") {
      return data;
    }
  } catch (e) {
    console.error("OMDB detail error:", e);
  }
  return null;
}
