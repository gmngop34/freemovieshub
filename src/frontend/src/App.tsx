import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { HomePage } from "./pages/HomePage";
import { MoviesPage } from "./pages/MoviesPage";
import { PlayerPage } from "./pages/PlayerPage";

// Root layout
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const moviesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/movies",
  validateSearch: (search: Record<string, unknown>) => ({
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  component: MoviesPage,
});

const playerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/player/$id",
  component: PlayerPage,
});

const routeTree = rootRoute.addChildren([homeRoute, moviesRoute, playerRoute]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
