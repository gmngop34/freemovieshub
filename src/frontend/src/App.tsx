import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useState } from "react";
import FloatingContactButton from "./components/movies/FloatingContactButton";
import Footer from "./components/movies/Footer";
import Navbar from "./components/movies/Navbar";
import Sidebar from "./components/movies/Sidebar";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";

// Root layout
function RootLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      style={{ colorScheme: "dark" }}
    >
      <Navbar
        onMenuToggle={() => setIsSidebarOpen((v) => !v)}
        isSidebarOpen={isSidebarOpen}
      />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col pt-16">
        <Outlet />
        <Footer />
      </div>
      <FloatingContactButton />
      <Toaster theme="dark" position="bottom-center" richColors />
    </div>
  );
}

// Routes
const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const moviesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/movies",
  component: MoviesPage,
});

const routeTree = rootRoute.addChildren([indexRoute, moviesRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
