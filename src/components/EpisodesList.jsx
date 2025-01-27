/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useState } from "react";

const EpisodesList = ({ selectedSeason, seasons, id, episodes }) => {
  //   const [selectedEpisode, setSelectedEpisode] = useState(1);
  //   const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     const url = `https://api.themoviedb.org/3/tv/${id}/season/${selectedSeason}/episode/${selectedEpisode}?language=en-US`;
  //     // const fetch
  //   }, [id, selectedSeason, selectedEpisode]);
  return (
    <div className="bg-slate-200 text-slate-900 p-2 flex items-baseline rounded gap-2 w-[calc(33.33%-2rem)] hover:cursor-pointer">
      <p className="font-oswald font-semibold">
        Eps {episodes.episode_number}:{" "}
      </p>
      <p className="font-source">
        {episodes.name.length > 25
          ? episodes.name.substring(0, 25) + "..."
          : episodes.name}
      </p>
    </div>
  );
};

export default EpisodesList;
