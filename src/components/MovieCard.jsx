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
              ? `/movie/${movie?.title}.${movie?.id}`
              : `/tv/${movie?.name}.${movie?.id}`
          }
          className="flex flex-col gap-2  hover:cursor-pointer  bg-slate-100/10 p-5 rounded-lg"
        >
          <div className="relative">
            <img
              src={
                movie?.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/placeholder.jpg"
              }
              className="h-[17rem] w-full rounded"
              alt={movie?.title || movie?.name || "Movie poster"}
              loading="lazy"
            />
            <p
              className={`font-semibold font-source absolute border text-xs right-1 bottom-1 bg-black/60 rounded-full p-2 ${
                (movie?.vote_average || 0) >= 7
                  ? "border-green-600"
                  : (movie?.vote_average || 0) >= 5
                  ? "border-yellow-600"
                  : "border-red-600"
              }`}
            >
              {(movie?.vote_average || 0).toFixed(1)}
            </p>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <h2 className=" font-bold font-oswald">
              {movie.title || movie.name}
            </h2>
            <span className="text-sm text-slate-200 font-source flex items-center justify-between gap-2">
              <p>
                {movie?.media_type === "movie"
                  ? new Date(movie?.release_date || Date.now()).getFullYear()
                  : new Date(movie?.first_air_date || Date.now()).getFullYear()}
              </p>
            </span>
          </div>
        </Link>
      )}
    </>
  );
};

export default MovieCard;
