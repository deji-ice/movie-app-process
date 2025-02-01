import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { options } from "../services/tmdbApi";
import { FaPlayCircle } from "react-icons/fa";
import Recommendations from "../components/Recommendations";
import { MovieDetailsCardSkelenton } from "../components/Skelentons";
import MovieDetailsCard from "../components/MovieDetailsCard";
// import SeasonsList from "../components/SeasonsList";
import { extractSuffixAfterDot } from "../utils/helpers";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const tvPath = pathname.includes("tv");
  const { id } = useParams();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const url = `https://api.themoviedb.org/3/${
        tvPath ? "tv" : "movie"
      }/${extractSuffixAfterDot(id)}?language=en-US`;
      setLoading(true);
      try {
        const response = await axios.get(url, options);
        setMovie(response?.data);
        console.log(response?.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchMovieDetails();
  }, [id, tvPath]);

  return (
 <div className="flex flex-col h-full items-center w-[80%]">
      <div className="relative w-full max-w-7xl px-4">
        {/* Backdrop Image Placeholder */}
        {loading || !imageLoaded ? (
          <div className="w-full aspect-video bg-gray-700 animate-pulse rounded-lg"></div>
        ) : null}

        {/* Backdrop Image */}
        <img
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt={movie?.title || movie?.name || "Movie backdrop"}
          className={`w-full aspect-video object-cover rounded-lg transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Play Circle Button */}
        {!loading && (
          <Link
            to={movie?.seasons ? `/watch-tv/${movie?.id}` : `/watch-movie/${movie?.id}`}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <FaPlayCircle className="h-20 w-20 p-4 rounded-full bg-red-900/70 hover:scale-125 hover:bg-red-700/70 transition-all duration-300" />
          </Link>
        )}

        {/* Details Section */}
        {loading ? (
          <MovieDetailsCardSkelenton />
        ) : (
          <MovieDetailsCard movie={movie} absolute={true} />
        )}

        {/* Recommendations */}
        {!loading && (
          <div className="mt-8">
            <Recommendations id={id} tvPath={tvPath} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
