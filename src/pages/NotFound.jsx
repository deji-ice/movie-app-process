import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center w-screen h-screen text-white gap-4">
      <h1 className="font-oswald text-9xl font-bold text-red-600">404</h1>
      <p className="font-source text-2xl">Page Not Found</p>
      <p className="font-source text-gray-400 max-w-md text-center">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="mt-8 bg-red-600 hover:bg-red-700 font-oswald px-6 py-3 rounded-lg transition-colors duration-300"
      >
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;