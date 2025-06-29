export default function ProductSkeleton() {
  const skeletonArray = new Array(8).fill(null); 

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {skeletonArray.map((_, index) => (
        <div
          key={index}
          className="p-6 w-64 bg-white border border-gray-300 shadow-sm rounded text-center animate-pulse"
        >
          <div className="h-32 bg-gray-300 rounded mb-4"></div>
          <div className="h-5 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      ))}
    </div>
  );
}
