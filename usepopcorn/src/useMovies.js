import { useState, useEffect } from "react";

const key = "c4c57a2b";

export function useMovies(query, callback) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // callback?.(); 不能用 为什么 里面有useState
    const controller = new AbortController();

    async function fetchMovie() {
      setLoading(true);
      setMessage("");

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&s=${query}`,
          {
            signal: controller.signal,
          }
        );
        if (!res.ok) throw new Error("something went wrong with");

        const data = await res.json();
        if (data.Response === "False") throw new Error(data.Error);

        setMovies(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") {
          setMessage(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setLoading(false);
      return;
    }

    fetchMovie();
    // handleBack();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { loading, message, movies };
}
