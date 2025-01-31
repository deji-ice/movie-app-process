import axios from "axios";
import { useEffect, useState } from "react";
import { options } from "../services/tmdbApi";
import { FaPlayCircle } from "react-icons/fa";

const SideBar = () => {
  const [latestTvShows, setLatestTvShows] = useState([]);
  const [tvGenresMap, setTvGenresMap] = useState({});
  const [loading, setLoading] = useState(true);

  //TODO: ON HOVER, show the overview of the series, let it slide up and cover like 50% of the image
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch TV genres (returns array of objects { id, name })
        const genreRes = await axios.get(
          "https://api.themoviedb.org/3/genre/tv/list?language=en-US",
          options
        );
        // Create a lookup map { genreId: genreName }
        const genresObj = genreRes.data.genres.reduce((acc, g) => {
          acc[g.id] = g.name;
          return acc;
        }, {});
        setTvGenresMap(genresObj);

        // Fetch TV shows airing today (returns array of shows with genre_ids)
        const showsRes = await axios.get(
          "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1",
          options
        );
        setLatestTvShows(showsRes.data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <aside className="items-center bg rounded-lg h-[43rem] hidden lg:flex flex-col mt-[7rem] mb-2 py-5 w-full max-w-64 sticky top-0 p-1">
      <h4 className="flex self-start pl-5 font-source">
        Shows Airing Today 🔥
      </h4>
      <div className="overflow-y-auto scrollbar scroll-smooth flex flex-col w-full items-center gap-4 p-5 mt-3">
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          latestTvShows.map((show) => (
            <div
              key={show.id}
              className="relative w-full rounded-2xl hover:cursor-pointer"
            >
              {/* Display genre names from tvGenresMap */}
              <div className="flex flex-wrap gap-1 absolute left-1 top-1">
                {show.genre_ids?.map((id) => (
                  <span
                    key={id}
                    className="text-[10px] font-source bg rounded-md px-1 py-0.5 "
                  >
                    {tvGenresMap[id]}
                  </span>
                ))}
              </div>
              <img
                src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
                alt={show.name}
                loading="lazy"
                className="w-full h-36 object-cover object-top rounded-lg"
              />
              <div className="bg flex items-center justify-between absolute bottom-0 rounded-b-lg max-h-20 h-10 w-full py-3 px-4">
                <div>
                  <p className="text-xs font-source font-semibold max-w-40">
                    {show.name}
                  </p>
                </div>
                <FaPlayCircle className="text-2xl hover:cursor-pointer" />
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};

export default SideBar;
