import { useRef } from "react";
import { useKey } from "../hooks/useKey";
import { useMoviesContext } from "../hooks/useMovieContext";

export default function Search() {
  const { query, setQuery } = useMoviesContext();

  // 🚨 NOT GOOD PRACTICE
  // useEffect(() => {
  //   const el: HTMLInputElement | null = document.querySelector(".search");
  //   el?.focus();
  // }, []);

  // 🚀 GOOD PRACTICE
  // const inputEl = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   function callback(e: KeyboardEvent) {
  //     if (document.activeElement === inputEl.current) return;

  //     inputEl.current?.focus();
  //     if (e.code === "Enter") {
  //       inputEl.current?.focus();
  //       setQuery("");
  //     }
  //   }

  //   document.addEventListener("keydown", callback);
  //   return () => document.addEventListener("keydown", callback);
  // }, [setQuery]);

  const inputEl = useRef<HTMLInputElement>(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current?.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
