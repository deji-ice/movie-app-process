import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const TrendingMovieCardSkeleton = () => {
  return (
    <div className="relative h-[58rem] rounded-xl w-[70rem] text-[#e2e2e2]">
      <div className="absolute top-4 left-5 px-4 py-1 rounded-2xl bg-slate-200/20">
        <Skeleton width={100} height={20} />
      </div>
      <Skeleton
        height={300}
        width="100%"
        className="object-cover rounded-3xl"
      />

      <div className="absolute bottom-0 w-full p-4 flex items-end justify-between">
        <div>
          <div className="flex gap-2 items-center">
            <Skeleton height={20} width={50} />
            <Skeleton height={20} width={50} />
          </div>
          <div className="mt-2 flex flex-col items-start gap-3">
            <Skeleton height={30} width={200} />
            <Skeleton count={3} height={15} width={300} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingMovieCardSkeleton;