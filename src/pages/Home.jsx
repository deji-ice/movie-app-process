import { useEffect, useRef, useState } from "react";
import TrendingMovieCard from "../components/TrendingMovieCard";
import { options } from "../services/tmdbApi";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { NowPlayingInTheaterCardSkeleton, TrendingMovieCardSkeleton } from "../components/Skelentons";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import NowPlayingInTheaterCard from "../components/TrendingMovieCard";

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [nowPlayingInTheater, setNowPlayingInTheater] = useState([]);
  const [activeTab, setActiveTab] = useState("movies");
  const [activeNowPlayingCardIndex, setActiveNowPlayingCardIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [nowPlayingLoading, setNowPlayingLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const nowPlayingInTheaterRef = useRef(null);

  useEffect(() => {
    const nowPlayingInTheaterUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`;
    const trendingMoviesUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`;
    const moviesUrl = `https://api.themoviedb.org/3/trending/all/week?language=en-US`;
    setActiveNowPlayingCardIndex(0);

    const fetchNowPlayingInTheater = async () => {
      setNowPlayingLoading(true);
      try {
        const response = await axios.get(nowPlayingInTheaterUrl, options);

        setNowPlayingInTheater(response.data.results.slice(0, 5));
      } catch (error) {
        console.error(error);
      }
      setNowPlayingLoading(false);
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
    fetchNowPlayingInTheater(); // Call the fetch function to get the data
  }, []);

  const handleScroll = (direction) => {
    const container = nowPlayingInTheaterRef.current;
    if (!container) return;

    // Define the scroll amount based on card width and gap
    // Adjust these values according to your design
    const cardWidth = 1160; // Example: w-56 in Tailwind (56 * 4 = 224px)
    const gap = 10; // Example: gap-20 in Tailwind (20 * 4 = 80px)
    const scrollAmount = cardWidth + gap;

    // Determine the scroll direction
    const directionMultiplier = direction === "left" ? -1 : 1;
    // Calculate the new active index
    setActiveNowPlayingCardIndex((prevIndex) => {
      let newIndex = prevIndex + directionMultiplier;
      if (newIndex < 0) newIndex = 0;
      if (newIndex >= nowPlayingInTheater.length)
        newIndex = nowPlayingInTheater.length - 1;
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
        ref={nowPlayingInTheaterRef}
        className="w-full relative overflow-x-hidden  mt-5"
      >
        {nowPlayingLoading ? (
          <NowPlayingInTheaterCardSkeleton />
        ) : (
          <div className="relative flex w-fit justify-center items-center  drop-shadow-xl scroll-smooth snap-x snap-mandatory ">
            {nowPlayingInTheater?.map((movie, index) => {
              return (
                <NowPlayingInTheaterCard
                  key={movie.id}
                  loading={nowPlayingLoading}
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
          {nowPlayingInTheater?.map((movie, index) => (
            <div
              key={index}
              className={`${
                activeNowPlayingCardIndex === index
                  ? "w-10 h-1 bg-white"
                  : "w-2 h-1 bg-white"
              } rounded-full transition-all duration-300`}
            ></div>
          ))}
        </div>
      </div>

      <div className="px-8 mt-8">
        <h2 className="font-oswald text-3xl">Trending</h2>

        <div className="mt-4 mb-8">
          <div className="flex gap-4 border-b w-fit border-gray-700">
            <button
              onClick={() => setActiveTab("movies")}
              className={`pb-2 px-4 text-lg font-oswald transition-colors ${
                activeTab === "movies"
                  ? "text-white border-b-2 font-semibold border-white"
                  : "text-black hover:text-gray-200"
              }`}
            >
              Movies
            </button>
            <button
              onClick={() => setActiveTab("tv")}
              className={`pb-2 px-4 text-lg font-oswald  transition-colors ${
                activeTab === "tv"
                  ? "text-white font-semibold border-b-2 border-white"
                  : "text-black hover:text-gray-200"
              }`}
            >
              TV Shows
            </button>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies
              .filter((item) =>
                activeTab === "movies"
                  ? item.media_type === "movie"
                  : item.media_type === "tv"
              )
              .map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
