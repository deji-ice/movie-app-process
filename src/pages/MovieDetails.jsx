import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { options } from "../services/omdbApi";
import { FaPlayCircle } from "react-icons/fa";
import Recommendations from "../components/Recommendations";
import { MovieDetailsCardSkelenton } from "../components/Skelentons";
import MovieDetailsCard from "../components/MovieDetailsCard";
import SeasonsList from "../components/SeasonsList";

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
      }/${id}?language=en-US`;
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
    <div className="flex flex-col h-full items-center">
      <div className="relative items-center  w-full">
        {/* Backdrop Image Placeholder */}
        {loading || !imageLoaded ? (
          <div className="w-screen absolute top-0 max-h-screen max-w-full bg-gray-700 animate-pulse"></div>
        ) : null}

        {/* Backdrop Image */}
        <img
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`} // Changed from 'original' to 'w500' for faster loading
          alt={movie?.title || movie?.name || "Movie backdrop"}
          className={`w-screen  object-cover transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Play Circle Button */}
        {!loading && (
          <Link
            to={
              movie?.seasons
                ? `/watch-tv/${movie.id}`
                : `/watch-movie/${movie.id}`
            }
          >
            <FaPlayCircle className="absolute p-4 h-20 w-20 rounded-full top-72 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-900/70 hover:cursor-pointer hover:scale-125 hover:bg-red-700/70 text-5xl" />
          </Link>
        )}

        {/* Details Section Placeholder */}
        {loading ? (
          <MovieDetailsCardSkelenton />
        ) : (
          /* Details Section */
          <MovieDetailsCard movie={movie} absolute={true} />
        )}

        {/* Recommendations */}
        {!loading && <Recommendations id={id} tvPath={tvPath} />}
      </div>
    </div>
  );
};

export default MovieDetails;
