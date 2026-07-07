const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 animate-pulse">
      <div className="h-6 w-1/3 bg-gray-200 rounded mb-5"></div>

      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>

        <div className="h-4 bg-gray-200 rounded w-5/6"></div>

        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;