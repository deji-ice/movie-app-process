import { useEffect, useState } from "react";
import TrendingMovieCard from "../components/TrendingMovieCard";
import TrendingMovieCardSkeleton from "../components/TrendingMovieCardSkeleton";
import { options } from "../services/omdbApi";
import MovieCard from "../components/MovieCard";
import axios from "axios";

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const trendingMoviesUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`;
    const moviesUrl = `https://api.themoviedb.org/3/trending/all/week?language=en-US`;

    const fetchTrendingMovies = async () => {
      setTrendingLoading(true);
      try {
        const response = await axios.get(trendingMoviesUrl, options);
        console.log(response.data.results);
        setTrendingMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
      setTrendingLoading(false);
    };
    const fetchAllMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(moviesUrl, options);
        console.log(response.data.results);
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchAllMovies();
    fetchTrendingMovies(); // Call the fetch function to get the data
  }, []);

  const handleScroll = (direction) => {
    const container = document.querySelector(".overflow-x-hidden");
    const scrollAmount = container.clientWidth;

    if (direction === "left") {
      container.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    } else {
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative overflow-hidden  ml-56 mt-20">
      <div
        className="w-full overflow-x-hidden scroll-smooth mt-5 "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {trendingLoading ? (
          <TrendingMovieCardSkeleton />
        ) : (
          <div
            className="flex justify-around w-fit gap-20 drop-shadow-xl px-10"
            onWheel={(e) => e.preventDefault()}
            onScroll={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
          >
            {trendingMovies?.map((movie) => (
              <TrendingMovieCard
                key={movie.id}
                movie={movie}
                handleScroll={handleScroll}
              />
            ))}
          </div>
        )}
      </div>

      <div className="px-8 mt-8">
        <h2 className="font-oswald text-2xl">Trending</h2>
        <div className="grid grid-cols-5 place-items-center my-8 gap-4">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} loading={loading} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
