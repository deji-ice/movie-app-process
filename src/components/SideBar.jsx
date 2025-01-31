import axios from "axios";
import { useEffect, useState } from "react";
import { options } from "../services/tmdbApi";

const SideBar = () => {
  const [latestMovies, setLatestMovies] = useState([]);
  const [latestTvShows, setLatestTvShows] = useState([]);

  useEffect(() => {
    const fetchLatestMovies = async () => {
      try {
        const url = "https://api.themoviedb.org/3/movie/latest";
        const response = await axios(url, options);
        setLatestMovies(response.data.results);
        console.log(response.data);
        // Fetch the latest movies
      } catch (error) {
        console.error(error);
      }
    };

    const fetchLatestTvShows = async () => {
      try {
        const url =
          "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1";
        const response = await axios(url, options);
        setLatestTvShows(response.data.results);
        console.log(response.data.results);
        // Fetch the latest TV shows
      } catch (error) {
        console.error(error);
      }
    };

    fetchLatestMovies();
    fetchLatestTvShows();
  }, []);
  return (
    <aside className=" items-center bg  rounded-lg h-[43rem] hidden lg:flex flex-col mt-[7rem] mb-2 py-5 w-full sticky top-0  bg-[#1a1a1a] p-1  ">
      {/* <h2 className="font-oswald text-2xl tracking-wider text-center">
        Latest
      </h2> */}

      <h4 className="flex self-start pl-5 font-source">
        Shows Airing Today 🔥
      </h4>
      <div className="overflow-y-auto flex flex-col w-full items-center gap-4 p-2 mt-3">
        {latestTvShows?.map((show) => (
          <div
            key={show.id}
            className="relative w-full bg-red-900 rounded-2xl hover:cursor-pointer"
          >
            <img
              src={`https://image.tmdb.org/t/p/original${show.poster_path}`}
              alt={show.name}
              className="w-full h-36 object-cover rounded-lg"
            />
            <div className="bg flex items-center justify-between absolute bottom-0 rounded-b-lg max-h-20 h-10 w-full p-2 ">
              <p className="text-xs font-source font-semibold ">{show.name}</p>
              <p
                className={`font-semibold font-source w-fit h-fit border text-xs right-1 top-0 bg-black/60 rounded-full p-2 ${
                  (show?.vote_average || 0) >= 7
                    ? "border-green-600"
                    : (show?.vote_average || 0) >= 5
                    ? "border-yellow-600"
                    : "border-red-600"
                }`}
              >
                {(show?.vote_average || 0).toFixed(1)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
