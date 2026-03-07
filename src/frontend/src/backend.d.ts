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
    year: string;
    description: string;
    omdbId: string;
    category: string;
    poster: string;
}
export interface backendInterface {
    addMovie(omdbId: string, title: string, quality: string, category: string, description: string, year: string, poster: string): Promise<bigint>;
    getMovies(): Promise<Array<Movie>>;
    getMoviesByCategory(category: string): Promise<Array<Movie>>;
    removeMovie(id: bigint): Promise<void>;
}
