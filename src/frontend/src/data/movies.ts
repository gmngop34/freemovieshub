export interface Movie {
  id: bigint;
  title: string;
  quality: string;
  description: string;
  downloadUrl: string;
  genre: string;
  posterUrl: string;
  category: string;
  videoUrl: string;
  releaseDate: string;
  runtime: string;
}

export const MOVIES: Movie[] = [
  // Featured
  {
    id: 1n,
    title: "The Dark Horizon",
    quality: "BluRay",
    description:
      "In a distant future where Earth's last survivors colonize alien planets, one lone engineer discovers a catastrophic truth that could doom humanity forever. A stunning sci-fi epic of survival, betrayal, and sacrifice.",
    downloadUrl: "https://www.example.com/download/dark-horizon",
    genre: "Sci-Fi / Thriller",
    posterUrl: "/assets/generated/poster-dark-horizon.dim_400x600.jpg",
    category: "Featured",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    releaseDate: "2024-03-15",
    runtime: "2h 18m",
  },
  {
    id: 2n,
    title: "Crimson Storm",
    quality: "WebRip",
    description:
      "A legendary warrior returns from exile to face an empire that destroyed everything she loved. Packed with breathtaking combat, Crimson Storm redefines the action genre.",
    downloadUrl: "https://www.example.com/download/crimson-storm",
    genre: "Action / Adventure",
    posterUrl: "/assets/generated/poster-crimson-storm.dim_400x600.jpg",
    category: "Featured",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    releaseDate: "2024-05-22",
    runtime: "2h 04m",
  },
  {
    id: 3n,
    title: "Neon Prophecy",
    quality: "HDTC",
    description:
      "A rogue hacker in Neo-Tokyo uncovers a government AI conspiracy that threatens to erase human free will. Cyberpunk noir at its finest.",
    downloadUrl: "https://www.example.com/download/neon-prophecy",
    genre: "Sci-Fi / Cyberpunk",
    posterUrl: "/assets/generated/poster-neon-prophecy.dim_400x600.jpg",
    category: "Featured",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    releaseDate: "2024-01-10",
    runtime: "1h 56m",
  },

  // Trending
  {
    id: 4n,
    title: "Wildfire Rising",
    quality: "BluRay",
    description:
      "When a massive wildfire engulfs an entire region, a courageous firefighter battles impossible odds to save hundreds of civilians trapped in the inferno.",
    downloadUrl: "https://www.example.com/download/wildfire-rising",
    genre: "Action / Disaster",
    posterUrl: "/assets/generated/poster-wildfire-rising.dim_400x600.jpg",
    category: "Trending",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    releaseDate: "2024-07-04",
    runtime: "2h 12m",
  },
  {
    id: 5n,
    title: "Shadow Realm",
    quality: "WebRip",
    description:
      "A sorceress banished to the realm of shadows must master dark magic to find the gateway back before an ancient evil consumes all light in the world.",
    downloadUrl: "https://www.example.com/download/shadow-realm",
    genre: "Fantasy / Horror",
    posterUrl: "/assets/generated/poster-shadow-realm.dim_400x600.jpg",
    category: "Trending",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    releaseDate: "2024-10-31",
    runtime: "2h 08m",
  },
  {
    id: 6n,
    title: "Ghost Protocol Zero",
    quality: "HDRip",
    description:
      "An elite MI7 agent goes rogue to prevent a global terrorist network from triggering a digital apocalypse, trusting no one — not even his own agency.",
    downloadUrl: "https://www.example.com/download/ghost-protocol-zero",
    genre: "Spy / Thriller",
    posterUrl: "/assets/generated/poster-ghost-protocol.dim_400x600.jpg",
    category: "Trending",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    releaseDate: "2024-08-17",
    runtime: "2h 21m",
  },
  {
    id: 7n,
    title: "Ocean's Secret",
    quality: "BluRay",
    description:
      "A marine archaeologist discovers ancient ruins beneath the Pacific Ocean that contain knowledge capable of rewriting human history — if she can survive the forces that want them buried.",
    downloadUrl: "https://www.example.com/download/oceans-secret",
    genre: "Adventure / Mystery",
    posterUrl: "/assets/generated/poster-oceans-secret.dim_400x600.jpg",
    category: "Trending",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    releaseDate: "2024-06-28",
    runtime: "1h 48m",
  },

  // Top IMDb
  {
    id: 8n,
    title: "The Last Kingdom",
    quality: "BluRay",
    description:
      "A legendary king must unite fractured realms against an unstoppable dragon army in this breathtaking medieval epic that earned its place in cinema history.",
    downloadUrl: "https://www.example.com/download/last-kingdom",
    genre: "Epic Fantasy",
    posterUrl: "/assets/generated/poster-last-kingdom.dim_400x600.jpg",
    category: "Top IMDb",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    releaseDate: "2023-12-01",
    runtime: "2h 44m",
  },
  {
    id: 9n,
    title: "Parallel Universe",
    quality: "WebRip",
    description:
      "A quantum physicist accidentally opens a portal to infinite parallel versions of his life. Each choice spawns a new reality — and a new version of himself to fight.",
    downloadUrl: "https://www.example.com/download/parallel-universe",
    genre: "Sci-Fi / Drama",
    posterUrl: "/assets/generated/poster-parallel-universe.dim_400x600.jpg",
    category: "Top IMDb",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    releaseDate: "2024-02-14",
    runtime: "2h 33m",
  },
  {
    id: 10n,
    title: "Iron Fortress",
    quality: "HDRip",
    description:
      "Based on true events, this war epic follows a small platoon defending a strategic fortress against overwhelming enemy forces for 72 harrowing hours.",
    downloadUrl: "https://www.example.com/download/iron-fortress",
    genre: "War / Drama",
    posterUrl: "/assets/generated/poster-iron-fortress.dim_400x600.jpg",
    category: "Top IMDb",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    releaseDate: "2023-11-10",
    runtime: "2h 27m",
  },

  // New Release
  {
    id: 11n,
    title: "Crimson Storm 2: Reckoning",
    quality: "HDTC",
    description:
      "The warrior returns — but this time she must train a new generation of fighters before the empire's ultimate weapon destroys everything she fought to protect.",
    downloadUrl: "https://www.example.com/download/crimson-storm-2",
    genre: "Action / Adventure",
    posterUrl: "/assets/generated/poster-crimson-storm.dim_400x600.jpg",
    category: "New Release",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    releaseDate: "2025-11-28",
    runtime: "2h 15m",
  },
  {
    id: 12n,
    title: "Neon Prophecy: Uprising",
    quality: "WebRip",
    description:
      "The sequel to the smash hit follows our hacker as she leads the underground resistance against the now fully sentient AI that has declared war on humanity.",
    downloadUrl: "https://www.example.com/download/neon-prophecy-uprising",
    genre: "Sci-Fi / Action",
    posterUrl: "/assets/generated/poster-neon-prophecy.dim_400x600.jpg",
    category: "New Release",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    releaseDate: "2025-12-05",
    runtime: "2h 02m",
  },
  {
    id: 13n,
    title: "Deep Abyss",
    quality: "HDTC",
    description:
      "A crew of deep-sea scientists discovers an ancient leviathan sleeping in the deepest ocean trench. Waking it may have been the last mistake they ever make.",
    downloadUrl: "https://www.example.com/download/deep-abyss",
    genre: "Horror / Thriller",
    posterUrl: "/assets/generated/poster-oceans-secret.dim_400x600.jpg",
    category: "New Release",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    releaseDate: "2025-12-12",
    runtime: "1h 54m",
  },
  {
    id: 14n,
    title: "The Forgotten Sky",
    quality: "BluRay",
    description:
      "An astronaut stranded on a dying space station must race to repair her ship before the station's orbit decays — with only an AI companion and her own will to survive.",
    downloadUrl: "https://www.example.com/download/forgotten-sky",
    genre: "Sci-Fi / Drama",
    posterUrl: "/assets/generated/poster-dark-horizon.dim_400x600.jpg",
    category: "New Release",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    releaseDate: "2025-12-19",
    runtime: "1h 59m",
  },
];

export const CATEGORIES = [
  "Featured",
  "Trending",
  "Top IMDb",
  "New Release",
] as const;
export type CategoryType = (typeof CATEGORIES)[number];

export const QUALITY_COLORS: Record<string, string> = {
  BluRay: "bg-purple-600",
  WebRip: "bg-blue-600",
  HDTC: "bg-orange-600",
  HDRip: "bg-teal-600",
  DVD: "bg-red-700",
  CAM: "bg-yellow-600",
};
