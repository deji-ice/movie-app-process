const Footer = () => {
  return (
    <div className="relative z-40  bg-[#0f172a] mt-10 flex items-center justify-around h-20 w-full px-24 ">
      <div>
        <p className="text-white text-center py-4">
          &copy; 2021 MovieApp. All rights reserved.
        </p>
      </div>
      <div>
        <p className="text-white text-center py-4">
          Made with ❤️ by{" "}
          <a
            href="
          https://www.twitter.com/dejixice"
            className="text-blue-500"
          >
            Ayodeji
          </a>
        </p>
      </div>
      <div>
        <p className="text-white text-center py-4">
          Images from{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.themoviedb.org/"
            className="text-blue-500"
          >
            OMDB
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
