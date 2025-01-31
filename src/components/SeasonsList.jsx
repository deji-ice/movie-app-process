import { useEffect, useState } from "react";
import EpisodesList from "./EpisodesList";
import axios from "axios";
import { options } from "../services/tmdbApi";

/* eslint-disable react/prop-types */
const SeasonsList = ({
  seasons,
  id,
  selectedSeason,
  setSelectedSeason,
  setSelectedEpisode,
}) => {
  const [episodesList, setEpisodesList] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleSelect = (e) => {
    setSelectedSeason(e.target.value);
  };

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/tv/${id}/season/${selectedSeason}?language=en-US`;

    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url, options);
        setEpisodesList(response?.data.episodes);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchEpisodes();
  }, [id, selectedSeason]);

  return (
    <div className="bg flex gap-10 p-10 items-start w-full h-fit z-[200] top-0 ">
      <div>
        <select
          onChange={handleSelect}
          className="bg-black text-white p-2 rounded"
          name="seasons"
          id="seasons"
          value={selectedSeason} 
        >
          {seasons.map((season) => (
            <option className="" key={season.id} value={season.season_number}>
              {season.name}
            </option>
          ))}
        </select>
      </div>
      {episodesList && (
        <div className="bg-slate-900/50 rounded-lg flex gap-8 py-7 pl-8  flex-wrap w-full justify-start content-start">
          {episodesList?.map((episode) => (
            <EpisodesList
              key={episode.id}
              episodes={episode}
              selectedSeason={selectedSeason}
              setSelectedEpisode={setSelectedEpisode}
              seasons={seasons}
              id={id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SeasonsList;
