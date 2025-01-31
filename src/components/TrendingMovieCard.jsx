/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaPlay, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";

const NowPlayingInTheaterCard = ({ movie, loading }) => {
  const [imageLoaded, setImageLoaded] = useState(false);


  return (
    <div className="snap-center relative w-[70rem]  mr-14 text-[#e2e2e2] ">
      {loading || !imageLoaded ? (
        <div className="w-screen absolute top-0 max-h-screen max-w-full bg-gray-700 animate-pulse"></div>
      ) : null}
      <button className=" absolute top-4 left-5 px-4 py-1 rounded-2xl bg-slate-200/40 text-gray-900 font-source">
        Playing In Theaters 🔥
      </button>
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        className={`w-full object-cover rounded-3xl h-[30rem] ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        alt={movie.title || movie.name || "Movie backdrop"}
        onLoad={() => setImageLoaded(true)}
        loading="lazy"
      />

      <div className="absolute bottom-0 w-full p-4 flex items-end justify-between">
        <div>
          <div className="flex gap-2 items-center">
            {/* {movie.genres.map((genre, index) => (
              <span
                key={index}
                className="text-xs bg-slate-200/20 px-2 py-1 rounded-2xl"
              >
                {genre}
              </span>
            ))} */}
          </div>
          <div className="mt-2 flex flex-col items-start gap-3">
            <h2 className="text-3xl font-bold mt-2 font-oswald">{movie.title}</h2>
            <p className="text-sm w-[50%] font-source text-slate-200">{movie.overview}</p>
          </div>

          <div className="mt-4 flex gap-4 items-center *:rounded-2xl font-source *:py-1 *:px-3 ">
            <Link
              to={!movie ? "/" : `/movie/${movie?.id}`}
              className="bg-white  text-black flex items-center gap-2 "
            >
              <FaPlay />
              Watch
            </Link>
            <button 
              className="bg-gray-500/20 flex items-center gap-2 border border-white "
            >
              <FaYoutube />
              Trailer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingInTheaterCard;
