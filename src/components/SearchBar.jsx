import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { options } from "../services/omdbApi";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
      searchTerm
    )}&include_adult=false&language=en-US&page=1`;

    try {
      const response = await axios.get(url, options);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error(error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 500); // Debounce by 500ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="relative font-source">
      <input
        onChange={handleChange}
        type="text"
        placeholder="Search for movies..."
        className="w-full px-4 py-2 rounded-lg border bg-gray-800/10 placeholder:text-white text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="absolute right-3 top-2">
        <FaSearch className="w-6 h-6 text-white" />
      </button>

      {(loading || searchResults.length > 0) && (
        <div className="bg-slate-300 absolute w-full text-black flex flex-col gap-2 p-3 mt-1 rounded-lg max-h-60 overflow-y-auto">
          {loading ? (
            <div className="text-center text-slate-900">Loading...</div>
          ) : (
            searchResults.map((movie) => (
              <Link
                onClick={() => setSearchResults([])}
                to={
                  !movie
                    ? "/"
                    : movie.media_type === "movie"
                    ? `/movie/${movie.id}`
                    : `/tv/${movie.id}`
                }
                key={movie.id}
                className="flex gap-4 items-center hover:bg-gray-400/50 p-2 rounded-md"
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/50x75?text=No+Image"
                  }
                  alt={movie.title || movie.name}
                  className="h-14 w-10 object-cover rounded"
                />
                <div className="flex flex-col">
                  <h2 className="text-sm">
                    {movie.title || movie.name || "Untitled"}
                  </h2>
                  <p className="text-xs text-gray-700">
                    {movie.media_type === "movie"
                      ? new Date(movie.release_date || Date.now()).getFullYear()
                      : new Date(
                          movie.first_air_date || Date.now()
                        ).getFullYear()}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
