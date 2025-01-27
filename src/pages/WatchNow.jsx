import { useEffect, useState } from "react";
import MovieDetailsCard from "../components/MovieDetailsCard";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { options } from "../services/omdbApi";

const WatchNow = () => {
  const [movie, setMovie] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setMovie(response?.data);
        console.log(response?.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchMovieDetails();
    console.log(tvPath, id);
  }, []);

  return (
    <div className="h-full mt-24   w-screen flex flex-col items-center justify-center ">
      <iframe
        src={`https://vidsrc.to/embed/movie/${id}`}
        className="w-full  h-[80vh] md:h-[90vh] px-20 py-8 rounded-lg"
      />

      <MovieDetailsCard movie={movie} absolute={false} />
    </div>
  );
};

export default WatchNow;
