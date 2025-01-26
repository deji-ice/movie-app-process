export const Skelentons = () => {
  return <div>Skelentons</div>;
};

export const TrendingMovieCardSkeleton = () => {
  return (
    <div className="relative flex h-[30rem] rounded-xl animate-pulse bg-gray-100 w-[70rem] text-[#e2e2e2]">
      {/* <div className="absolute top-4 left-5 px-4 py-1 rounded-2xl bg-slate-200/20">
          <div className="w-[100px] h-[20px] bg-gray-300 animate-pulse rounded" />
        </div>
        <div
          className="h-[300px] w-full bg-gray-300 animate-pulse object-cover rounded-3xl"
        /> */}

      <div className="absolute  bottom-0 w-full p-6 flex items-end justify-between">
        <div>
          <div className="flex gap-2 items-center">
            <div className="h-[20px] w-[50px] bg-gray-300 animate-pulse rounded" />
            <div className="h-[20px] w-[50px] bg-gray-300 animate-pulse rounded" />
          </div>
          <div className="mt-2 flex flex-col items-start gap-3">
            <div className="h-[30px] w-[200px] bg-gray-300 animate-pulse rounded" />
            <div className="h-[15px] w-[300px] bg-gray-300 animate-pulse rounded" />
            <div className="h-[15px] w-[300px] bg-gray-300 animate-pulse rounded" />
            <div className="h-[15px] w-[300px] bg-gray-300 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};


export const MovieDetailsCardSkelenton = () => {
  return (
    <>
      {/* Backdrop Placeholder */}
      <div className="w-screen h-screen bg-gray-700 animate-pulse"></div>

      {/* Details Placeholder */}
      <div className="flex gap-10 w-[85%] min-h-[25rem] bg-slate-100 p-8 rounded-lg mt-4 absolute top-[35rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {/* Poster Placeholder */}
        <div className="w-56 h-72 bg-gray-200 animate-pulse rounded-xl"></div>

        {/* Textual Content Placeholder */}
        <div className="flex flex-col gap-5 flex-1">
          <div className="w-3/5 h-10 bg-gray-200 mb-4 rounded"></div>
          <div className="w-1/2 h-5 bg-gray-200 rounded"></div>
          <div className="space-y-5">
            <div className="w-full h-4 bg-gray-200 rounded"></div>
            <div className="w-full h-4 bg-gray-200 rounded"></div>
            <div className="w-11/12 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="flex gap-5">
            <div className="w-1/4 h-5 bg-gray-200 rounded"></div>
            <div className="w-1/4 h-5 bg-gray-200 rounded"></div>
            <div className="w-1/4 h-5 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </>
  );
};
