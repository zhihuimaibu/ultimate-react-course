import { useState, useEffect, useRef } from "react";
import Nav from "./components/Nav";
import Main from "./components/Main";
import Result from "./components/Result";
import Search from "./components/Search";
import MovieList from "./components/MovieList";
import WatchedMovie from "./components/WatchedMovie";
import Button from "./components/Button";
import Summary from "./components/Summary";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import useLocalStorageState from "./useLocalStorageState";
import { useKey } from "./useKey";

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

function WatchedMovieList({ watched, onDeleteMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteMovie={onDeleteMovie}
        ></WatchedMovie>
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

function MovieDetail({ selectedId, onBack, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [loading, setIsLoading] = useState(false);
  const [rating, setRating] = useState();
  useKey("Escape", onBack);

  const countRef = useRef(0);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  const isWatched = watched.find((movie) => movie.imdbID === selectedId);

  useEffect(() => {
    countRef.current++;
  }, [rating]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovieDetail(selectedId) {
      setIsLoading(true);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${key}&i=${selectedId}`,
        {
          signal: controller.signal,
        }
      );
      const movie = await res.json();
      setMovie(movie);
      setIsLoading(false);
    }
    fetchMovieDetail(selectedId);
  }, [selectedId]);

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
    imdbID,
  } = movie;

  useEffect(() => {
    if (!title) return;
    document.querySelector("title").innerHTML = `movie | ${title}`;

    return () => {
      document.querySelector("title").innerHTML = "usePopCorn";
    };
  }, [title]);

  function handleAddWatched() {
    const watchedMovie = {
      title,
      poster,
      runtime: Number(runtime.split(" ")[0]),
      imdbRating: Number(imdbRating),
      userRating: rating,
      imdbID,
      count: countRef.current,
    };
    onAddWatched(watchedMovie);
  }

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
            <img src={poster} alt={title}></img>
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
              {isWatched ? (
                <p>{isWatched.userRating}</p>
              ) : (
                <>
                  <StarRating
                    length="10"
                    onSetRating={setRating}
                    defaultIndex={watchedUserRating}
                  />
                  {rating >= 0 && (
                    <button className="btn-add" onClick={handleAddWatched}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
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
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const { movies, loading, message } = useMovies(query, handleBack);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleBack() {
    setSelectedId("");
  }

  function handleAddWatched(movie) {
    setSelectedId("");
    setWatched([...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched(watched.filter((movie) => movie.imdbID !== id));
  }

  function handleSetSelectedId(id) {
    if (id === selectedId) {
      setSelectedId("");
    } else {
      setSelectedId(id);
    }
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
              onSetSelectedId={handleSetSelectedId}
            ></MovieList>
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetail
              selectedId={selectedId}
              onBack={handleBack}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched}></Summary>
              <WatchedMovieList
                watched={watched}
                onDeleteMovie={handleDeleteWatched}
              ></WatchedMovieList>
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
