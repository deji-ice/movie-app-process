/* eslint-disable react/prop-types */

import { FaPlay, FaPlus, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";

const MovieDetailsCard = ({ movie, absolute }) => {
  return (
    <div
      className={`flex gap-10 w-[85%] text-black max-h-[30rem] min-h-[25rem] items-center p-8 rounded-lg mt-4 ${
        absolute ? "absolute top-[35rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2" : "static"
      }  bg-white/80 backdrop-blur-md`}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
        className="h-80 rounded-xl object-cover"
        alt={movie?.title || movie?.name}
        loading="lazy"
      />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <Link
            to={
              movie?.seasons
                ? `/watch-tv/${movie?.id}`
                : `/watch-movie/${movie?.id}`
            }
            className="bg-red-500 font-oswald font-semibold rounded-lg px-3 py-2 capitalize flex items-center gap-2 transition-transform transform hover:scale-105"
          >
            <FaPlay /> Watch Now
          </Link>
          <button className="bg-gray-500/20 font-oswald font-semibold rounded-lg px-3 py-2 capitalize flex items-center gap-2 transition-transform transform hover:scale-105">
            <FaPlus /> Add to Favorite
          </button>
        </div>
        <div className="flex flex-col items-start gap-3 mt-2">
          <div className="flex flex-col items-start gap-3">
            <h2 className="text-3xl font-semibold font-oswald">
              {movie?.title || movie?.name}
            </h2>
            <span className="flex items-center gap-3 font-oswald">
              <Link
                target="_blank"
                to={movie?.homepage}
                className="border border-black flex items-center gap-2 px-2 py-1 rounded transition-transform transform hover:scale-105"
              >
                <FaYoutube />
                Trailer
              </Link>
              <button className="font-semibold px-2 py-1 rounded border border-black transition-transform transform hover:scale-105">
                HD
              </button>
              <p className="text-yellow-700 font-semibold font-oswald">
                IMDB: {movie?.vote_average.toFixed(1)}
              </p>
            </span>
          </div>
          <p className="w-full font-source text-gray-700">
            {movie?.overview.length > 300 // Limit the overview to 300 characters for better UI
              ? movie?.overview.slice(0, 300) + "..."
              : movie?.overview}
          </p>
          <ul className="grid grid-cols-2 gap-1 font-source">
            <li>
              <span className="font-semibold font-oswald">Released:</span>{" "}
              {movie?.release_date || movie?.first_air_date}
            </li>
            <li>
              <span className="font-semibold font-oswald">Runtime:</span>{" "}
              {movie?.runtime} mins
            </li>
            <li>
              <span className="font-semibold font-oswald">Genre:</span>{" "}
              {movie?.genres.map((genre, index) => (
                <span key={genre.id}>
                  {genre.name}
                  {index !== movie.genres.length - 1 ? ", " : ""}
                </span>
              ))}
            </li>
            <li>
              <span className="font-semibold font-oswald">Country:</span>{" "}
              {movie?.production_countries.map((country, index) => (
                <span key={country.iso_3166_1}>
                  {country.name}
                  {index !== movie.production_countries.length - 1 ? ", " : ""}
                </span>
              ))}
            </li>
            <li>
              <span className="font-semibold font-oswald">Casts:</span>{" "}
              {/* Add casts details here */}
            </li>
            <li>
              <span className="font-semibold font-oswald">Language:</span>{" "}
              {movie?.spoken_languages.map((lang, index) => (
                <span key={lang.iso_639_1}>
                  {lang.english_name}
                  {index !== movie.spoken_languages.length - 1 ? ", " : ""}
                </span>
              ))}
            </li>
            <li>
              <span className="font-semibold font-oswald">Production:</span>{" "}
              {movie?.production_companies.map((prodCom, index) => (
                <span key={prodCom.id}>
                  {prodCom.name}
                  {index !== movie.production_companies.length - 1 ? ", " : ""}
                </span>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsCard;
