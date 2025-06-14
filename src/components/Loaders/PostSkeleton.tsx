const PostSkeleton = () => (
  <div className="p-2 pb-3 mb-6 bg-[#00000008] rounded-2xl animate-pulse">
    <div className="flex gap-4 bg-white p-3 shadow-[0px_4px_9px_0px_#0000000D] rounded-2xl border border-[#0000001A]">
      {/* Profile Photo Skeleton */}
      <div className="flex-shrink-0">
        <div className="w-11 h-11 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Content Skeleton */}
      <div className="flex-1">
        {/* Header Skeleton */}
        <div className="flex flex-col items-start gap-1 mb-3">
          <div className="h-5 bg-gray-200 rounded w-32"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>

        {/* Post Content Skeleton */}
        <div className="mb-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Action Buttons Skeleton */}
    <div className="flex items-center gap-6 mx-3 mt-3">
      <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
      <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
      <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
    </div>
  </div>
);

export default PostSkeleton;
