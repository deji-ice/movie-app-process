import { useEffect, useState } from "react";
import MovieDetailsCard from "../components/MovieDetailsCard";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { options } from "../services/omdbApi";

const WatchNow = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [embedError, setEmbedError] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [manifestError, setManifestError] = useState(false);
  const isChromiumBased = /chrome|edge/i.test(navigator.userAgent);

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
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchMovieDetails();
  }, [id, tvPath]);

  const handleWatchInNewWindow = () => {
    window.open(
      `https://vidsrc.to/embed/movie/${id}`,
      "_blank",
      "width=1000,height=600"
    );
  };

  const handleOverlayClick = (e) => {
    e.preventDefault();
    setClickCount((prev) => prev + 1);
  };

  const handleIframeError = () => {
    if (isChromiumBased) {
      setManifestError(true);
    } else {
      setEmbedError(true);
    }
  };

  return (
    <div className="h-full mt-24 w-screen flex flex-col items-center justify-center">
      {loading ? (
        <div className="w-full h-[80vh] md:h-[90vh] px-20 py-8 rounded-lg bg-gray-900 animate-pulse" />
      ) : manifestError ? (
        <div className="w-full h-[80vh] md:h-[90vh] px-20 py-8 flex flex-col items-center justify-center gap-4">
          <p className="text-white text-xl font-source text-center">
            This content cannot be embedded in Chrome/Edge.
            <br />
            Please use the button below to watch in a new window.
          </p>
          <button
            onClick={handleWatchInNewWindow}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-oswald hover:bg-red-700 transition-colors"
          >
            Watch in New Window
          </button>
        </div>
      ) : embedError ? (
        <div className="w-full h-[80vh] md:h-[90vh] px-20 py-8 flex flex-col items-center justify-center gap-4">
          <p className="text-white text-xl font-source">
            This video cannot be embedded directly.
          </p>
          <button
            onClick={handleWatchInNewWindow}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-oswald hover:bg-red-700 transition-colors"
          >
            Watch in New Window
          </button>
        </div>
      ) : (
        <div className="relative w-full z-20 aspect-video max-w-7xl mx-auto px-4">
          {clickCount < 2 && (
            <div
              className="absolute inset-0 z-30 cursor-pointer"
              onClick={handleOverlayClick}
            />
          )}
          <iframe
            src={`https://vidsrc.to/embed/${tvPath ? "tv" : "movie"}/${id}`}
            className="absolute inset-0 w-full h-full rounded-xl shadow-2xl"
            // sandbox={
            //   isChromiumBased
            //     ? ``
            //     : `allow-scripts allow-same-origin allow-forms allow-presentation allow-popups allow-popups-to-escape-sandbox allow-modals`
            // }
            allowFullScreen
            referrerPolicy="no-referrer"
            onError={handleIframeError}
            loading="lazy"
            title={movie?.title || movie?.name || "Video Player"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      )}

      <MovieDetailsCard movie={movie} absolute={false} />
    </div>
  );
};

export default WatchNow;
