/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const MovieCard = ({ movie, loading }) => {
  return (
    <>
      {loading ? (
        [1, 2, 3, 5, 6, 7, 8, 9, 10]?.map((item) => (
          <div
            key={item}
            className="flex flex-col gap-4 hover:cursor-pointer  bg-slate-100/10 p-5 rounded-lg"
          >
            <SkeletonTheme key={item} baseColor="#202020" highlightColor="#444">
              <Skeleton height={250} width={200} count={1} />
              <Skeleton height={20} width={200} count={1} />
            </SkeletonTheme>
          </div>
        ))
      ) : (
        <Link
          to={
            !movie
              ? "/"
              : movie?.media_type === "movie"
              ? `/movie/${movie?.id}`
              : `/tv/${movie?.id}`
          }
          className="flex flex-col gap-4 hover:cursor-pointer  bg-slate-100/10 p-5 rounded-lg"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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
