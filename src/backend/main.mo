import Map "mo:core/Map";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";

actor {
  type Movie = {
    id : Nat;
    title : Text;
    description : Text;
    releaseDate : Text;
    runtime : Text;
    genre : Text;
    quality : Text;
    posterUrl : Text;
    videoUrl : Text;
    downloadUrl : Text;
    category : Text;
  };

  let movies = Map.fromIter<Nat, Movie>([
    (
      1,
      {
        id = 1;
        title = "Inception";
        description = "A skilled thief leads a team into people's dreams to steal secrets.";
        releaseDate = "2010-07-16";
        runtime = "148 minutes";
        genre = "Science Fiction";
        quality = "BluRay";
        posterUrl = "https://picsum.photos/200/300?random=1";
        videoUrl = "https://www.youtube.com/embed/8hP9D6kZseM";
        downloadUrl = "https://example.com/inception-download";
        category = "Featured";
      },
    ),
    (
      2,
      {
        id = 2;
        title = "The Shawshank Redemption";
        description = "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.";
        releaseDate = "1994-09-23";
        runtime = "142 minutes";
        genre = "Drama";
        quality = "BluRay";
        posterUrl = "https://picsum.photos/200/300?random=2";
        videoUrl = "https://www.youtube.com/embed/NmzuHjWmXOc";
        downloadUrl = "https://example.com/shawshank-download";
        category = "Top IMDb";
      },
    ),
    (
      3,
      {
        id = 3;
        title = "Avengers: Endgame";
        description = "The Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.";
        releaseDate = "2019-04-26";
        runtime = "181 minutes";
        genre = "Action";
        quality = "WebRip";
        posterUrl = "https://picsum.photos/200/300?random=3";
        videoUrl = "https://www.youtube.com/embed/TcMBFSGVi1c";
        downloadUrl = "https://example.com/endgame-download";
        category = "Trending";
      },
    ),
    (
      4,
      {
        id = 4;
        title = "The Dark Knight";
        description = "Batman faces off against the Joker, a criminal mastermind who seeks to create chaos in Gotham City.";
        releaseDate = "2008-07-18";
        runtime = "152 minutes";
        genre = "Action";
        quality = "BluRay";
        posterUrl = "https://picsum.photos/200/300?random=4";
        videoUrl = "https://www.youtube.com/embed/EXeTwQWrcwY";
        downloadUrl = "https://example.com/darkknight-download";
        category = "Top IMDb";
      },
    ),
    (
      5,
      {
        id = 5;
        title = "Interstellar";
        description = "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.";
        releaseDate = "2014-11-07";
        runtime = "169 minutes";
        genre = "Science Fiction";
        quality = "BluRay";
        posterUrl = "https://picsum.photos/200/300?random=5";
        videoUrl = "https://www.youtube.com/embed/zSWdZVtXT7E";
        downloadUrl = "https://example.com/interstellar-download";
        category = "Featured";
      },
    ),
    (
      6,
      {
        id = 6;
        title = "Joker";
        description = "A mentally troubled comedian's descent into madness becomes the start of his criminal career as the clown-faced criminal.";
        releaseDate = "2019-10-04";
        runtime = "122 minutes";
        genre = "Crime";
        quality = "WebRip";
        posterUrl = "https://picsum.photos/200/300?random=6";
        videoUrl = "https://www.youtube.com/embed/zAGVQLHvwOY";
        downloadUrl = "https://example.com/joker-download";
        category = "Trending";
      },
    ),
    (
      7,
      {
        id = 7;
        title = "Pulp Fiction";
        description = "The lives of two mob hitmen, a boxer, a gangster's wife, and police's tale intertwine in crime.";
        releaseDate = "1994-10-14";
        runtime = "154 minutes";
        genre = "Crime";
        quality = "BluRay";
        posterUrl = "https://picsum.photos/200/300?random=7";
        videoUrl = "https://www.youtube.com/embed/s7EdQ4FqbhY";
        downloadUrl = "https://example.com/pulpfiction-download";
        category = "Top IMDb";
      },
    ),
    (
      8,
      {
        id = 8;
        title = "Tenet";
        description = "A secret agent embarks on a dangerous, time-bending mission to prevent the start of World War III.";
        releaseDate = "2020-08-26";
        runtime = "150 minutes";
        genre = "Action";
        quality = "HDTC";
        posterUrl = "https://picsum.photos/200/300?random=8";
        videoUrl = "https://www.youtube.com/embed/LdOM0x0XDMo";
        downloadUrl = "https://example.com/tenet-download";
        category = "New Release";
      },
    ),
    (
      9,
      {
        id = 9;
        title = "Parasite";
        description = "A poor South Korean family schemes to become employed by a wealthy family by infiltrating their household.";
        releaseDate = "2019-05-30";
        runtime = "132 minutes";
        genre = "Drama";
        quality = "BluRay";
        posterUrl = "https://picsum.photos/200/300?random=9";
        videoUrl = "https://www.youtube.com/embed/5xH0HfJHsaY";
        downloadUrl = "https://example.com/parasite-download";
        category = "Featured";
      },
    ),
    (
      10,
      {
        id = 10;
        title = "1917";
        description = "During World War I, two British soldiers receive seemingly impossible orders.";
        releaseDate = "2019-12-25";
        runtime = "119 minutes";
        genre = "War";
        quality = "WebRip";
        posterUrl = "https://picsum.photos/200/300?random=10";
        videoUrl = "https://www.youtube.com/embed/YqNYrYUiMfg";
        downloadUrl = "https://example.com/1917-download";
        category = "Trending";
      },
    ),
    (
      11,
      {
        id = 11;
        title = "Soul";
        description = "A musician who has lost his passion for music is transported out of his body and must find his way back.";
        releaseDate = "2020-12-25";
        runtime = "100 minutes";
        genre = "Animation";
        quality = "HDTC";
        posterUrl = "https://picsum.photos/200/300?random=11";
        videoUrl = "https://www.youtube.com/embed/xOsLIiBStEs";
        downloadUrl = "https://example.com/soul-download";
        category = "New Release";
      },
    ),
    (
      12,
      {
        id = 12;
        title = "No Time to Die";
        description = "James Bond returns to face new challenges and dangerous criminals in his latest adventure.";
        releaseDate = "2021-10-08";
        runtime = "163 minutes";
        genre = "Action";
        quality = "HDTC";
        posterUrl = "https://picsum.photos/200/300?random=12";
        videoUrl = "https://www.youtube.com/embed/BIhNsAtPbPI";
        downloadUrl = "https://example.com/notimetodie-download";
        category = "New Release";
      },
    ),
  ].values());

  public query ({ caller }) func getMovies() : async [Movie] {
    movies.values().toArray();
  };

  public query ({ caller }) func getMovieById(id : Nat) : async Movie {
    switch (movies.get(id)) {
      case (null) { Runtime.trap("Movie not found") };
      case (?movie) { movie };
    };
  };

  public query ({ caller }) func getMoviesByCategory(category : Text) : async [Movie] {
    let filteredMovies = movies.filter(
      func(_id, movie) {
        movie.category == category;
      }
    );
    filteredMovies.values().toArray();
  };

  func getNextId() : Nat {
    let existingIds = movies.keys().toArray();
    if (existingIds.size() == 0) { return 1 };
    let maxId = existingIds.foldLeft(
      0,
      func(acc, current) { if (current > acc) { current } else { acc } },
    );
    maxId + 1;
  };

  public shared ({ caller }) func addMovie(movie : Movie) : async () {
    let newMovie : Movie = { movie with id = getNextId() };
    movies.add(newMovie.id, newMovie);
  };

  public shared ({ caller }) func updateMovie(id : Nat, movie : Movie) : async () {
    if (not movies.containsKey(id)) {
      Runtime.trap("Movie not found");
    };
    let updatedMovie : Movie = { movie with id };
    movies.add(id, updatedMovie);
  };

  public shared ({ caller }) func deleteMovie(id : Nat) : async () {
    if (not movies.containsKey(id)) {
      Runtime.trap("Movie not found");
    };
    movies.remove(id);
  };
};
