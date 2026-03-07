import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

actor {
  type Movie = {
    id : Nat;
    omdbId : Text;
    title : Text;
    quality : Text;
    category : Text;
    description : Text;
    year : Text;
    poster : Text;
  };

  var nextId = 13;

  let movies = Map.fromIter<Nat, Movie>([
    (
      1,
      {
        id = 1;
        omdbId = "tt0111161";
        title = "The Shawshank Redemption";
        quality = "BluRay";
        category = "Top IMDb";
        description = "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.";
        year = "1994";
        poster = "https://example.com/shawshank.jpg";
      },
    ),
    (
      2,
      {
        id = 2;
        omdbId = "tt0068646";
        title = "The Godfather";
        quality = "WebRip";
        category = "Featured";
        description = "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.";
        year = "1972";
        poster = "https://example.com/godfather.jpg";
      },
    ),
    (
      3,
      {
        id = 3;
        omdbId = "tt0468569";
        title = "The Dark Knight";
        quality = "HDTC";
        category = "Trending";
        description = "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.";
        year = "2008";
        poster = "https://example.com/darkknight.jpg";
      },
    ),
    (
      4,
      {
        id = 4;
        omdbId = "tt0108052";
        title = "Schindler's List";
        quality = "WebRip";
        category = "Top IMDb";
        description = "In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.";
        year = "1993";
        poster = "https://example.com/schindlerslist.jpg";
      },
    ),
    (
      5,
      {
        id = 5;
        omdbId = "tt1375666";
        title = "Inception";
        quality = "BluRay";
        category = "New Release";
        description = "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.";
        year = "2010";
        poster = "https://example.com/inception.jpg";
      },
    ),
    (
      6,
      {
        id = 6;
        omdbId = "tt0137523";
        title = "Fight Club";
        quality = "WebRip";
        category = "Featured";
        description = "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much, much more.";
        year = "1999";
        poster = "https://example.com/fightclub.jpg";
      },
    ),
    (
      7,
      {
        id = 7;
        omdbId = "tt0167260";
        title = "The Lord of the Rings: The Return of the King";
        quality = "BluRay";
        category = "Top IMDb";
        description = "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.";
        year = "2003";
        poster = "https://example.com/lotr3.jpg";
      },
    ),
    (
      8,
      {
        id = 8;
        omdbId = "tt0080684";
        title = "Star Wars: Episode V - The Empire Strikes Back";
        quality = "WebRip";
        category = "Trending";
        description = "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by Darth Vader and bounty hunter Boba Fett all over the galaxy.";
        year = "1980";
        poster = "https://example.com/starwars5.jpg";
      },
    ),
    (
      9,
      {
        id = 9;
        omdbId = "tt0073486";
        title = "One Flew Over the Cuckoo's Nest";
        quality = "HDTC";
        category = "Featured";
        description = "A criminal pleads insanity and is admitted to a mental institution, where he rebels against the oppressive nurse and rallies up the scared patients.";
        year = "1975";
        poster = "https://example.com/cuckoosnest.jpg";
      },
    ),
    (
      10,
      {
        id = 10;
        omdbId = "tt0110912";
        title = "Pulp Fiction";
        quality = "WebRip";
        category = "New Release";
        description = "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.";
        year = "1994";
        poster = "https://example.com/pulpfiction.jpg";
      },
    ),
    (
      11,
      {
        id = 11;
        omdbId = "tt0120737";
        title = "The Lord of the Rings: The Fellowship of the Ring";
        quality = "BluRay";
        category = "Top IMDb";
        description = "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.";
        year = "2001";
        poster = "https://example.com/lotr1.jpg";
      },
    ),
    (
      12,
      {
        id = 12;
        omdbId = "tt0109830";
        title = "Forrest Gump";
        quality = "WebRip";
        category = "Featured";
        description = "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other history unfold through the perspective of an Alabama man with an IQ of 75.";
        year = "1994";
        poster = "https://example.com/forrestgump.jpg";
      },
    ),
  ].values());

  public query ({ caller }) func getMovies() : async [Movie] {
    movies.values().toArray();
  };

  public query ({ caller }) func getMoviesByCategory(category : Text) : async [Movie] {
    let filtered = movies.values().toArray().filter(
      func(movie) { movie.category == category }
    );
    filtered;
  };

  public shared ({ caller }) func addMovie(omdbId : Text, title : Text, quality : Text, category : Text, description : Text, year : Text, poster : Text) : async Nat {
    let id = nextId;
    let movie : Movie = {
      id;
      omdbId;
      title;
      quality;
      category;
      description;
      year;
      poster;
    };
    movies.add(id, movie);
    nextId += 1;
    id;
  };

  public shared ({ caller }) func removeMovie(id : Nat) : async () {
    if (not movies.containsKey(id)) {
      Runtime.trap("No movie with this id to remove. ");
    };
    movies.remove(id);
  };
};
