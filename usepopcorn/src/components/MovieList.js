import Movie from "./Movie";

export default function MovieList({ movies, onSetSelectedId }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          setSelectedId={onSetSelectedId}
        ></Movie>
      ))}
    </ul>
  );
}
