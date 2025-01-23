import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { options } from "../services/omdbApi";
import { FaPlay, FaPlayCircle, FaYoutube } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Recommendations from "../components/Recommendations";
import Skeleton from "react-loading-skeleton";
import backGroundImage from "../assets/images/felix-mooneeram-evlkOfkQ5rE-unsplash.jpg";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const tvPath = pathname.includes("tv");
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const url = `https://api.themoviedb.org/3/${
        tvPath ? "tv" : "movie"
      }/${id}?language=en-US`;
      setLoading(true);
      try {
        const response = await axios.get(url, options);
        setMovie(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchMovieDetails();
  }, [id, tvPath]);

  return (
    <div className="flex flex-col h-full items-center ">
      <div className="relative items-center">
        <img
          src={
            loading
              ? backGroundImage
              : `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`
          }
          alt={movie?.title || movie?.name || "Movie backdrop"}
          className="w-screen"
        />
        <FaPlayCircle className="absolute p-4 h-20 w-20 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-900/50 hover:cursor-pointer hover:scale-125 hover:bg-red-700/70 text-5xl" />

        {loading ? (
          <Skeleton containerClassName="flex gap-10  w-[85%]  bg-slate-100 text-black p-8 rounded-lg mt-4 absolute top-[83%] left-1/2 transform -translate-x-1/2 -translate-y-1/2  h-[30rem]" />
        ) : (
          <div className="flex gap-10  w-[85%] bg-white  text-black p-8 rounded-lg mt-4 absolute top-[83%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {loading ? (
              <Skeleton baseColor="#202020"  height={250} width={200} count={1} />
            ) : (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="h-64 rounded-xl"
                alt=""
              />
            )}

            <div>
              <div className="flex items-center justify-between">
                <button className="bg-red-500 font-semibold rounded-lg px-3 py-2 capitalize flex items-center gap-2">
                  <FaPlay /> watch now
                </button>
                <button className=" bg-gray-500/20 font-semibold rounded-lg px-3 py-2 capitalize flex items-center gap-2 ">
                  <FaPlus /> add to favorite
                </button>
              </div>
              <div className="flex flex-col items-start gap-3 mt-2">
                <div className="flex flex-col items-start gap-3">
                  <h2 className="text-3xl font-semibold">
                    {movie?.title || movie?.name}
                  </h2>
                  <span className="flex items-center gap-3">
                    <button className=" border border-black flex items-center gap-2 px-2 py-1 rounded ">
                      <FaYoutube />
                      Trailer
                    </button>
                    <button className="font-semibold px-2 py-1 rounded border border-black">
                      HD
                    </button>
                    <p className="text-yellow-700 font-semibold">
                      IMDB:{movie?.vote_average}
                    </p>
                  </span>
                </div>
                <p className="w-[100%]"> {movie?.overview}</p>
                <ul className="grid grid-cols-2 gap-1">
                  <li>
                    <span className="font-semibold">Released:</span>{" "}
                    {movie?.release_date || movie?.first_air_date}
                  </li>
                  <li>
                    <span className="font-semibold">Runtime:</span>{" "}
                    {movie?.runtime} mins
                  </li>
                  <li>
                    <span className="font-semibold">Genre:</span>{" "}
                    {movie?.genres.map((genre, index) => (
                      <span key={genre.id}>
                        {genre.name}
                        {index !== movie.genres.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </li>
                  <li>
                    <span className="font-semibold">Country:</span>{" "}
                    {movie?.production_countries.map((country, index) => (
                      <span key={country.iso_3166_1}>
                        {" "}
                        {country.name}
                        {index !== movie.production_countries.length - 1
                          ? ", "
                          : ""}
                      </span>
                    ))}
                  </li>
                  <li>
                    <span className="font-semibold">Casts:</span>{" "}
                  </li>
                  <li>
                    <span className="font-semibold">Language:</span>{" "}
                    {movie?.spoken_languages.map((lang, index) => (
                      <span key={lang.id}>
                        {" "}
                        {lang.english_name}
                        {index !== movie.spoken_languages.length - 1
                          ? ", "
                          : ""}
                      </span>
                    ))}
                  </li>
                  <li>
                    <span className="font-semibold">Production:</span>{" "}
                    {movie?.production_companies.map((prodCom, index) => (
                      <span key={prodCom.id}>
                        {" "}
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
      </div>
      <Recommendations id={id} tvPath={tvPath} />
    </div>
  );
};

export default MovieDetails;
