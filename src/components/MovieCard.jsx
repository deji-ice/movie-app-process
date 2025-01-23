/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const MovieCard = ({ movie, loading }) => {
  console.log(movie);
  return (
    <>
      {loading ? (
        <Skeleton containerClassName="animate-pulse h-64 bg-slate-800 rounded-lg" />
      ) : (
        <Link
          to={
            movie?.media_type === "movie"
              ? `/movie/${movie.id}`
              : `/tv/${movie.id}`
          }
          className="flex flex-col gap-4 hover:cursor-pointer bg-slate-100/10 p-5 rounded-lg"
        >
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            className="h-64 rounded-xl"
            alt=""
          />
          <div className="flex flex-col text-sm">
            <h2 className=" font-bold">{movie.title || movie.name}</h2>
            <span className="text-xs text-slate-200">
              {movie.vote_average} | {movie.release_date || "N/A"}
            </span>
          </div>
        </Link>
      )}
    </>
  );
};

export default MovieCard;
