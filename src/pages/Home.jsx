import { useEffect, useRef, useState } from "react";
import TrendingMovieCard from "../components/TrendingMovieCard";
import { options } from "../services/omdbApi";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { TrendingMovieCardSkeleton } from "../components/Skelentons";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [activeTrendingCardIndex, setActiveTrendingCardIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const trendingCardRef = useRef(null);

  useEffect(() => {
    const trendingMoviesUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`;
    const moviesUrl = `https://api.themoviedb.org/3/trending/all/week?language=en-US`;
    setActiveTrendingCardIndex(0);

    const fetchTrendingMovies = async () => {
      setTrendingLoading(true);
      try {
        const response = await axios.get(trendingMoviesUrl, options);

        setTrendingMovies(response.data.results.slice(0, 5));
      } catch (error) {
        console.error(error);
      }
      setTrendingLoading(false);
    };
    const fetchAllMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(moviesUrl, options);
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
    const container = trendingCardRef.current;
    if (!container) return;

    // Define the scroll amount based on card width and gap
    // Adjust these values according to your design
    const cardWidth = 1160; // Example: w-56 in Tailwind (56 * 4 = 224px)
    const gap = 10; // Example: gap-20 in Tailwind (20 * 4 = 80px)
    const scrollAmount = cardWidth + gap;

    // Determine the scroll direction
    const directionMultiplier = direction === "left" ? -1 : 1;
    // Calculate the new active index
    setActiveTrendingCardIndex((prevIndex) => {
      let newIndex = prevIndex + directionMultiplier;
      if (newIndex < 0) newIndex = 0;
      if (newIndex >= trendingMovies.length)
        newIndex = trendingMovies.length - 1;
      return newIndex;
    });
    // Scroll the container smoothly by the calculated amount
    container.scrollBy({
      left: directionMultiplier * scrollAmount,
      behavior: "smooth",
    });
  };
  return (
    <div className="relative overflow-hidden  ml-60 mt-20">
      <div
        ref={trendingCardRef}
        className="w-full relative overflow-x-hidden  mt-5"
      >
        {trendingLoading ? (
          <TrendingMovieCardSkeleton />
        ) : (
          <div className="relative flex w-fit justify-center items-center  drop-shadow-xl scroll-smooth snap-x snap-mandatory ">
            {trendingMovies?.map((movie, index) => {
              return (
                <TrendingMovieCard
                  key={movie.id}
                  loading={trendingLoading}
                  movie={movie}
                  handleScroll={handleScroll}
                  index={index}
                />
              );
            })}
          </div>
        )}

        <div className="flex top-[32rem] right-20 fixed  items-center gap-3 *:bg-slate-800/70  *:rounded-full *:p-5  *:justify-between">
          <button onClick={() => handleScroll("left")}>
            <FaChevronLeft />
          </button>
          <button onClick={() => handleScroll("right")}>
            <FaChevronRight />
          </button>
        </div>

        <div className="flex  gap-2  fixed left-[55vw] top-[82vh]  z-50">
          {trendingMovies?.map((movie, index) => (
            <div
              key={index}
              className={`${
                activeTrendingCardIndex === index
                  ? "w-10 h-1 bg-white"
                  : "w-2 h-1 bg-white"
              } rounded-full transition-all duration-300`}
            ></div>
          ))}
        </div>
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
