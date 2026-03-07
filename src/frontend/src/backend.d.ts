import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
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
export interface backendInterface {
    addMovie(movie: Movie): Promise<void>;
    deleteMovie(id: bigint): Promise<void>;
    getMovieById(id: bigint): Promise<Movie>;
    getMovies(): Promise<Array<Movie>>;
    getMoviesByCategory(category: string): Promise<Array<Movie>>;
    updateMovie(id: bigint, movie: Movie): Promise<void>;
}
