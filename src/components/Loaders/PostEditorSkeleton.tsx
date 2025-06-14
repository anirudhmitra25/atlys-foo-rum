// Shimmer/Loading Components
const PostEditorSkeleton = () => (
  <div className="p-6 mb-6 bg-white rounded-2xl border border-[#0000001A] shadow-[0px_4px_9px_0px_#0000000D] animate-pulse">
    <div className="flex gap-4">
      <div className="w-11 h-11 bg-gray-200 rounded-lg"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
        <div className="h-20 bg-gray-200 rounded-lg mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-16"></div>
          <div className="h-8 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  </div>
);

export default PostEditorSkeleton;
