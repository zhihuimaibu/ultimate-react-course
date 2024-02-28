import { useEffect, useRef, useState } from "react";
import { useKey } from "../useKey";

export default function Search({ query, setQuery }) {
  const queryRef = useRef();

  useKey("Enter", function () {
    if (document.activeElement === queryRef.current) return;
    queryRef.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={queryRef}
    />
  );
}
