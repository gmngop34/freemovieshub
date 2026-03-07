import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Movie } from "../backend.d";
import { useActor } from "./useActor";

export function useGetMovies() {
  const { actor, isFetching } = useActor();
  return useQuery<Movie[]>({
    queryKey: ["movies"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMovies();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetMoviesByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Movie[]>({
    queryKey: ["movies", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      if (!category || category === "All") return actor.getMovies();
      return actor.getMoviesByCategory(category);
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAddMovie() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      omdbId,
      title,
      quality,
      category,
      description,
      year,
      poster,
    }: {
      omdbId: string;
      title: string;
      quality: string;
      category: string;
      description: string;
      year: string;
      poster: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addMovie(
        omdbId,
        title,
        quality,
        category,
        description,
        year,
        poster,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
}

export function useRemoveMovie() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.removeMovie(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
}
