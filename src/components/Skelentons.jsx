export const Skelentons = () => {
  return (
    <div>Skelentons</div>
  )
}

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