import Movie from "./Movie";

export default function MovieList({ movies, setSelectedId }) {
  return (
    <ul className='list'>
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          setSelectedId={setSelectedId}></Movie>
      ))}
    </ul>
  );
}
