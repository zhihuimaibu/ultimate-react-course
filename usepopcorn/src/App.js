import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Main from "./components/Main";
import Result from "./components/Result";
import Search from "./components/Search";
import MovieList from "./components/MovieList";
import WatchedMovie from "./components/WatchedMovie";
import Button from "./components/Button";
import Summary from "./components/Summary";
import StarRating from "./StarRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <Button onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </Button>
      {isOpen && <>{children}</>}
    </div>
  );
}

function WatchedMovieList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID}></WatchedMovie>
      ))}
    </ul>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function Message({ message }) {
  return <p className="error">{message}</p>;
}

const key = "c4c57a2b";

function MovieDetail({ selectedId, onBack }) {
  const [movie, setMovie] = useState({});
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchMovieDetail(selectedId) {
      setIsLoading(true);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
      );
      const movie = await res.json();
      setMovie(movie);
      setIsLoading(false);
    }

    fetchMovieDetail(selectedId);
  }, [selectedId]);

  console.log(movie, selectedId);

  const {
    Title: title,
    Released: released,
    Genre: genre,
    imdbRating,
    Poster: poster,
    Plot: plot,
    Runtime: runtime,
    Actors: actors,
    Director: director,
  } = movie;

  return (
    <div className="details">
      {loading ? (
        <Loader />
      ) : (
        <>
          <button className="btn-back" onClick={onBack}>
            &larr;
          </button>
          <header>
            <img src={poster}></img>
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating length="10" />
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Director by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [query, setQuery] = useState("friends");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      setMessage("");
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&s=${query}`
        );
        if (!res.ok) throw new Error("something went wrong with");

        const data = await res.json();
        if (data.Response === "False") throw new Error(data.Error);

        setMovies(data.Search);
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setLoading(false);
      return;
    } else {
      fetchMovie();
    }
  }, [query]);

  function handleBack() {
    setSelectedId("");
  }
  return (
    <>
      <Nav>
        <Search query={query} setQuery={setQuery}></Search>
        <Result movies={movies}></Result>
      </Nav>
      <Main>
        <Box>
          {loading && <Loader />}
          {message && <Message message={message} />}
          {!loading && !message && (
            <MovieList
              movies={movies}
              setSelectedId={setSelectedId}
            ></MovieList>
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetail selectedId={selectedId} onBack={handleBack} />
          ) : (
            <>
              <Summary watched={watched}></Summary>
              <WatchedMovieList watched={watched}></WatchedMovieList>
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
