import { Skeleton } from '@components/ui/skeleton';

export default function ContacDetailsSkeletion() {
  return (
    <div>
      <p className="flex items-center gap-2 pb-10">
        <Skeleton className="h-8 w-8 rounded-lg bg-blue-200" />
        <Skeleton className="h-10 w-48 rounded-lg bg-blue-200" />
      </p>
      <div>
        <Skeleton className="h-10 w-32 rounded-lg bg-blue-200" />
        <div className="flex gap-3 p-5">
          <Skeleton className="h-32 w-32 rounded-lg bg-blue-200" />
          <div className="flex flex-col gap-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-lg bg-blue-200" />
              <Skeleton className="h-8 w-48 rounded-lg bg-blue-200" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-lg bg-blue-200" />
              <Skeleton className="h-8 w-48 rounded-lg bg-blue-200" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-lg bg-blue-200" />
              <Skeleton className="h-8 w-48 rounded-lg bg-blue-200" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-lg bg-blue-200" />
              <Skeleton className="h-8 w-48 rounded-lg bg-blue-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
