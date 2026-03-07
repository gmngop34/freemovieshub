# FreeMoviesHUB

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Homepage with Netflix-style dark theme layout
- Top navigation bar with "FreeMoviesHUB" brand name in bold green
- Hamburger menu button opening a sidebar with category links (Home, Trending, Top IMDb, New Release)
- Search bar in the nav to filter movies
- Category filter buttons: Featured, Most Favorite, Top IMDb (rounded rectangle style)
- Movie grid showing 6-8 cards on homepage per category section
- Movie cards: poster image, quality tag (WebRip/BluRay/HDTC) top-right corner, title + description at bottom, hover zoom effect
- "View More" link per category section leading to full Movies page
- Floating contact button bottom-right
- Movies page showing all movies organized by category with full grid
- Player page with 16:9 video player (supports YouTube embed, direct video URLs, iframe embed)
- Player page: movie name, release date, runtime, movie type, description below player
- Player page: same nav/sidebar/search as homepage
- Download button below movie description on player page
- Backend: movies data store with fields: id, title, description, releaseDate, runtime, genre, quality, posterUrl, videoUrl, downloadUrl, category

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend: Motoko actor with Movie type, stable storage, CRUD functions (getMovies, getMovieById, getMoviesByCategory, addMovie, updateMovie)
2. Seed sample movies across categories: Featured, Trending, Top IMDb, New Release
3. Frontend pages: HomePage, MoviesPage, PlayerPage
4. Shared components: Navbar (with sidebar + search), MovieCard, Sidebar, FloatingContactButton
5. Routing: / (home), /movies (all movies), /player/:id (player)
6. Category filter logic on homepage and movies page
7. Video player component supporting YouTube embeds and direct URLs
8. Responsive grid layout, hover effects, quality badges
