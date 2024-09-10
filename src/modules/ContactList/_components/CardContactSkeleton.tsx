import { Skeleton } from '@components/ui/skeleton';

interface CardContactSkeletonProps {
  count?: number;
}

export default function CardContactSkeleton({ count = 1 }: CardContactSkeletonProps) {
  return (
    <div
      className={
        count > 1 &&
        'mx-auto my-5 grid grid-cols-1 gap-8 px-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
      }>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="w-full rounded-xl bg-white p-5">
          <div className="flex flex-col items-center justify-center">
            <Skeleton className="h-20 w-20 rounded-lg bg-blue-200" />
            <Skeleton className="my-3 h-[20px] w-[100px] rounded-lg bg-blue-200" />
          </div>
          <div className="flex flex-col gap-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-lg bg-blue-200" />
              <Skeleton className="h-[20px] w-[100px] rounded-lg bg-blue-200" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 min-w-8 rounded-lg bg-blue-200" />
              <Skeleton className="h-[20px] min-w-40 rounded-lg bg-blue-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
