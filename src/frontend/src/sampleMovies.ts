import type { Movie } from "./backend.d";

// Sample movies for demonstration — shown when backend returns no movies
export const SAMPLE_MOVIES: Movie[] = [
  {
    id: BigInt(1),
    title: "Oppenheimer",
    quality: "BluRay",
    year: "2023",
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    omdbId: "tt15398776",
    category: "Featured",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
  },
  {
    id: BigInt(2),
    title: "Barbie",
    quality: "WebRip",
    year: "2023",
    description:
      "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.",
    omdbId: "tt1517268",
    category: "Most Favorite",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
  },
  {
    id: BigInt(3),
    title: "The Dark Knight",
    quality: "BluRay",
    year: "2008",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    omdbId: "tt0468569",
    category: "Top IMDb",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
  },
  {
    id: BigInt(4),
    title: "Dune: Part Two",
    quality: "HDTC",
    year: "2024",
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    omdbId: "tt15239678",
    category: "New Release",
    poster:
      "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg",
  },
  {
    id: BigInt(5),
    title: "Inception",
    quality: "BluRay",
    year: "2010",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    omdbId: "tt1375666",
    category: "Top IMDb",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    id: BigInt(6),
    title: "Interstellar",
    quality: "BluRay",
    year: "2014",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival as Earth faces catastrophic climate change.",
    omdbId: "tt0816692",
    category: "Most Favorite",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
  },
  {
    id: BigInt(7),
    title: "The Shawshank Redemption",
    quality: "HDRip",
    year: "1994",
    description:
      "Over the course of several years, two convicts form a friendship, seeking consolation and eventual redemption through basic compassion.",
    omdbId: "tt0111161",
    category: "Top IMDb",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NiYyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg",
  },
  {
    id: BigInt(8),
    title: "Avengers: Endgame",
    quality: "BluRay",
    year: "2019",
    description:
      "After the devastating events of Infinity War, the Avengers assemble once more in order to reverse Thanos's actions and restore balance to the universe.",
    omdbId: "tt4154796",
    category: "Most Favorite",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
  },
  {
    id: BigInt(9),
    title: "Joker",
    quality: "WebRip",
    year: "2019",
    description:
      "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.",
    omdbId: "tt7286456",
    category: "Most Favorite",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
  },
  {
    id: BigInt(10),
    title: "Spider-Man: No Way Home",
    quality: "HDTC",
    year: "2021",
    description:
      "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
    omdbId: "tt10872600",
    category: "New Release",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg",
  },
  {
    id: BigInt(11),
    title: "Top Gun: Maverick",
    quality: "BluRay",
    year: "2022",
    description:
      "After more than thirty years of service as one of the Navy's top aviators, Pete Mitchell is pushed to the limits in a dangerous mission.",
    omdbId: "tt1745960",
    category: "Featured",
    poster:
      "https://m.media-amazon.com/images/M/MV5BOWQwMzFkNDItZTgxNC00ZTQ0LWI5NTQtZjNmZjc3OTNmZjZiXkEyXkFqcGdeQXVyNjE5NTg3Njk@._V1_SX300.jpg",
  },
  {
    id: BigInt(12),
    title: "Everything Everywhere All at Once",
    quality: "WebRip",
    year: "2022",
    description:
      "An aging Chinese immigrant is swept up in an insane adventure, in which she alone can save what's important to her by connecting with the lives she could have led.",
    omdbId: "tt6710474",
    category: "Featured",
    poster:
      "https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_SX300.jpg",
  },
];

export const CATEGORIES = [
  "All",
  "Featured",
  "Most Favorite",
  "Top IMDb",
  "New Release",
];
