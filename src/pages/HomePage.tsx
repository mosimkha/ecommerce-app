import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts, getProductsByCategory, getProductsSorted } from "../services/api";
import { Link } from "react-router-dom";

import ProductSkeleton from "../Components/ProductSkeleton";

function HomePage() {
    const [productList, setProductList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedCategories = searchParams.getAll('category');
    const sortOrder = searchParams.get('sort') || '';

    const fetchProducts = async () => {
        setLoading(true);
        try {
            let data;
            console.log("selectedCategories", selectedCategories)
            if (selectedCategories.length > 0) {
                // Fetch products for each category and combine
                const promises = selectedCategories.map(category =>
                    getProductsByCategory(category)
                );
                const results = await Promise.all(promises);
                data = results.flat();

                if (sortOrder) {
                    data.sort((a, b) =>
                        sortOrder === 'asc' ? a.price - b.price : b.price - a.price
                    )
                }
            } else {
                // data = await getProducts();
                data = sortOrder
                    ? await getProductsSorted(sortOrder as 'asc' | 'desc')
                    : await getProducts();
            }
            setProductList(data);

        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await getProducts();
            const allcateories = data.map((element: any) => {
                return element.category;
            });
            const uniqueCategories: any = [...new Set(allcateories)];
            setCategoriesList(uniqueCategories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleCategoryToggle = (category: string) => {
        const newParams = new URLSearchParams(searchParams);
        const categories = newParams.getAll('category');

        if (categories.includes(category)) {
            newParams.delete('category');
            categories.filter(c => c !== category).forEach(c => {
                newParams.append('category', c);
            });
        } else {
            newParams.append('category', category);
        }

        setSearchParams(newParams);
    };
    const handleSortChange = (order: 'asc' | 'desc' | '') => {
        const newParams = new URLSearchParams(searchParams);

        if (order) {
            newParams.set('sort', order);
        } else {
            newParams.delete('sort');
        }

        setSearchParams(newParams);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [searchParams]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Product List</h1>
            <div
                className="flex flex-col md:flex-row justify-around gap-6"
            >
                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                    <div>
                        <h3 className="font-semibold mb-2">Filter by Category:</h3>
                        <div className="flex flex-wrap gap-2">
                            {categoriesList.map((category) => (
                                <label key={category} className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleCategoryToggle(category)}
                                        className="mr-2"
                                    />
                                    {category}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>


                {/* sorting */}
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                    <div>
                        <h3 className="font-semibold mb-2">Sort by Price:</h3>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleSortChange('asc')}
                                className={`px-3 py-1 rounded-full ${sortOrder === 'asc' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                            >
                                Low to High
                            </button>
                            <button
                                onClick={() => handleSortChange('desc')}
                                className={`px-3 py-1 rounded-full ${sortOrder === 'desc' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                            >
                                High to Low
                            </button>
                            <button
                                onClick={() => handleSortChange('')}
                                className="px-3 py-1 rounded-full bg-gray-100"
                            >
                                Clear
                            </button>
                        </div>

                    </div>
                </div>

            </div>

            {
                loading ? (
                    <ProductSkeleton />
                ) : (
                    <div className="flex flex-wrap justify-center gap-6">
                        {productList.map((element: any) => (
                            <Link to={`/products/${element.id}`} data-testid="nav-cart" key={element.id}>
                                <div className="p-6 w-64 bg-white border border-gray-300 shadow-sm rounded text-center hover:shadow-lg transition">
                                    <img
                                        src={element?.image}
                                        alt={element?.title}
                                        className="h-32 object-contain mb-4 mx-auto"
                                    />
                                    <h2 className="font-semibold text-lg mb-1 truncate">{element?.title}</h2>
                                    <p className="text-sm text-gray-700 mb-1">
                                        <b>Category:</b> {element?.category}
                                    </p>
                                    <p className="text-sm text-gray-900">
                                        <b>Price:</b> ${element?.price}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )
            }
        </div >
    );
}

export default HomePage;