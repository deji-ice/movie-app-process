import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import WatchNow from "./pages/WatchNow";
import { useEffect } from "react";

const App = () => {
  const pathname = useLocation().pathname;

  const hideSideBar =
    pathname.includes("watch-movie") || pathname.includes("watch-tv");

  // useEffect(() => {
  //   if (hideSideBar) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // }, [hideSideBar]);

  return (
    <div className="text-[#e2e2e2] bg h-full flex flex-col m-0 ">
      <Header />
      <div className="flex">
        {/* <SideBar /> */}
        {!hideSideBar && <SideBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/tv/:id" element={<MovieDetails />} />
          <Route path="/watch-movie/:id" element={<WatchNow />} />
          <Route path="/watch-tv/:id" element={<WatchNow />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
