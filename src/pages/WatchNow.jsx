import { useEffect, useState } from "react";
import MovieDetailsCard from "../components/MovieDetailsCard";
import { useLocation, useParams } from "react-router-dom";

const WatchNow = () => {
  const [movie, setMovie] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const { pathname } = useLocation();
  const tvPath = pathname.includes("tv");
  const { id } = useParams();

  useEffect(() => {
    console.log(tvPath, id);
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-orange-500">
      WatchNow
      {/* <MovieDetailsCard /> */}
    </div>
  );
};

export default WatchNow;
