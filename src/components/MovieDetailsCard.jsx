/* eslint-disable react/prop-types */

import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlay, FaPlus, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { options } from "../services/omdbApi";

/**
 * MovieDetailsCard Component - Displays detailed information about a movie or TV show
 * @param {Object} movie - The movie/TV show object containing all details
 * @param {boolean} absolute - Determines if the card should have absolute positioning
 */
const MovieDetailsCard = ({ movie, absolute }) => {
  // State to store cast members information
  const [cast, setCast] = useState([]);

  // Fetch cast details when movie ID changes
  useEffect(() => {
    const fetchCast = async () => {
      const url = ` https://api.themoviedb.org/3/movie/${movie?.id}/credits`;
      try {
        const response = await axios.get(url, options);
        // Limit cast to first 5 members for better UI
        setCast(response.data.cast.slice(0, 5));
        console.log(response.data.cast.slice(0, 5));
      } catch (error) {
        console.error(error);
      }
    };
    fetchCast();
  }, [movie?.id]);

  return (
    // Main container with conditional positioning
    <div
      className={`flex gap-10 w-[85%] text-black max-h-[30rem] min-h-[25rem] items-center p-8 rounded-lg mt-4 ${
        absolute
          ? "absolute top-[35rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          : "static"
      }  bg-white/80 backdrop-blur-md`}
    >
      {/* Movie poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
        className="h-80 rounded-xl object-cover"
        alt={movie?.title || movie?.name}
        loading="lazy"
      />

      <div className="flex-1">
        {/* Action buttons section */}
        <div className="flex items-center justify-between">
          {/* Watch Now button with conditional link based on content type */}
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

        {/* Movie details section */}
        <div className="flex flex-col items-start gap-3 mt-2">
          {/* Title and quick actions */}
          <div className="flex flex-col items-start gap-3">
            <h2 className="text-3xl font-semibold font-oswald">
              {movie?.title || movie?.name}
            </h2>
            <span className="flex items-center gap-3 font-oswald">
              {/* External links and rating */}
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

          {/* Movie overview with character limit */}
          <p className="w-full font-source text-gray-700">
            {movie?.overview.length > 300
              ? movie?.overview.slice(0, 300) + "..."
              : movie?.overview}
          </p>

          {/* Detailed information grid */}
          <ul className="grid grid-cols-2 gap-1 font-source">
            {/* Release date */}
            <li>
              <span className="font-semibold font-oswald">Released:</span>{" "}
              {movie?.release_date || movie?.first_air_date}
            </li>
            {/* Runtime */}
            <li>
              <span className="font-semibold font-oswald">Runtime:</span>{" "}
              {movie?.runtime} mins
            </li>
            {/* Genres list */}
            <li>
              <span className="font-semibold font-oswald">Genre:</span>{" "}
              {movie?.genres.map((genre, index) => (
                <span key={genre.id}>
                  {genre.name}
                  {index !== movie.genres.length - 1 ? ", " : ""}
                </span>
              ))}
            </li>
            {/* Production countries */}
            <li>
              <span className="font-semibold font-oswald">Country:</span>{" "}
              {movie?.production_countries.map((country, index) => (
                <span key={country.iso_3166_1}>
                  {country.name}
                  {index !== movie.production_countries.length - 1 ? ", " : ""}
                </span>
              ))}
            </li>
            {/* Cast members */}
            <li>
              <span className="font-semibold font-oswald">Casts:</span>{" "}
              {cast?.map((actor, index) => (
                <span key={actor.id} className="cursor-pointer">
                  {actor.name}
                  {index !== cast.length - 1 ? ", " : ""}
                </span>
              ))}
            </li>
            {/* Languages */}
            <li>
              <span className="font-semibold font-oswald">Language:</span>{" "}
              {movie?.spoken_languages.map((lang, index) => (
                <span key={lang.iso_639_1}>
                  {lang.english_name}
                  {index !== movie.spoken_languages.length - 1 ? ", " : ""}
                </span>
              ))}
            </li>
            {/* Production companies */}
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
