
function ProductDetailSkeleton() {
    return (
        <div>
            <div className="w-full max-w-4xl mx-auto p-4 rounded-lg shadow-md">


                <div className="bg-gray-100 p-4 flex justify-center animate-pulse">
                    <div className="bg-gray-300 h-60 w-60 rounded"></div>
                </div>


                <div className="my-4 flex justify-center animate-pulse">
                    <div className="bg-gray-300 w-48 h-12 rounded"></div>
                </div>


                <div className="bg-gray-100 p-6 space-y-4 animate-pulse">
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-24 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailSkeleton
