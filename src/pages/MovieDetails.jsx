import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { options } from "../services/omdbApi";
import { FaPlay, FaPlayCircle, FaYoutube } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Recommendations from "../components/Recommendations";

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
          <FaPlayCircle className="absolute p-4 h-20 w-20 rounded-full top-72 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-900/70 hover:cursor-pointer hover:scale-125 hover:bg-red-700/70 text-5xl" />
        )}

        {/* Details Section Placeholder */}
        {loading ? (
          <>
            {/* Backdrop Placeholder */}
            <div className="w-screen h-screen bg-gray-700 animate-pulse"></div>

            {/* Details Placeholder */}
            <div className="flex gap-10 w-[85%] min-h-[25rem] bg-slate-100 p-8 rounded-lg mt-4 absolute top-[35rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {/* Poster Placeholder */}
              <div className="w-56 h-72 bg-gray-200 animate-pulse rounded-xl"></div>

              {/* Textual Content Placeholder */}
              <div className="flex flex-col gap-5 flex-1">
                <div className="w-3/5 h-10 bg-gray-200 mb-4 rounded"></div>
                <div className="w-1/2 h-5 bg-gray-200 rounded"></div>
                <div className="space-y-5">
                  <div className="w-full h-4 bg-gray-200 rounded"></div>
                  <div className="w-full h-4 bg-gray-200 rounded"></div>
                  <div className="w-11/12 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="flex gap-5">
                  <div className="w-1/4 h-5 bg-gray-200 rounded"></div>
                  <div className="w-1/4 h-5 bg-gray-200 rounded"></div>
                  <div className="w-1/4 h-5 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Details Section */
          <div className="flex gap-10 w-[85%] text-black max-h-[30rem] min-h-[25rem] items-center p-8 rounded-lg mt-4 absolute top-[35rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
              className="h-80 rounded-xl object-cover"
              alt={movie?.title || movie?.name}
              loading="lazy"
            />

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <button className="bg-red-500 font-oswald font-semibold rounded-lg px-3 py-2 capitalize flex items-center gap-2 transition-transform transform hover:scale-105">
                  <FaPlay /> Watch Now
                </button>
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
                    <Link target="_blank" to={movie?.homepage} className="border border-black flex items-center gap-2 px-2 py-1 rounded transition-transform transform hover:scale-105">
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
                        {index !== movie.production_countries.length - 1
                          ? ", "
                          : ""}
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
                        {index !== movie.spoken_languages.length - 1
                          ? ", "
                          : ""}
                      </span>
                    ))}
                  </li>
                  <li>
                    <span className="font-semibold font-oswald">
                      Production:
                    </span>{" "}
                    {movie?.production_companies.map((prodCom, index) => (
                      <span key={prodCom.id}>
                        {prodCom.name}
                        {index !== movie.production_companies.length - 1
                          ? ", "
                          : ""}
                      </span>
                    ))}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {!loading && <Recommendations id={id} tvPath={tvPath} />}
      </div>
    </div>
  );
};

export default MovieDetails;
