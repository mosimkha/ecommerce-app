import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getProductDetails } from "../services/api"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useCart } from "../context/CartContext";
import ProductDetailSkeleton from "../Components/ProductDetailSkeleton";

export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    description: string;
    rating: {
        rate: number;
        count: number;
    };
}


function ProducDetilsPage() {

    const { id } = useParams()
    const [productDetails, setProductDetails] = useState<Product | null>(null)
    const [loading, setLoading] = useState(false);
    const { addToCart } = useCart();
    const fetchData = async () => {
        setLoading(true)
        try {

            const data = await getProductDetails(Number(id))
            setProductDetails(data)
        } catch (error) {
            console.error("Error fetching productsDetails:", error);

        } finally {

            setLoading(false)
        }


    }
    const handleAddToCart = () => {


        if (productDetails) {
            addToCart({

                id: productDetails.id,
                title: productDetails.title,
                price: productDetails.price,
                image: productDetails.image,
                quantity: 1,

            })
        }
    }

    useEffect(() => {

        fetchData()
    }, [id])
    return (
        <>
            {loading ? <ProductDetailSkeleton /> :

                <div className="w-full max-w-4xl mx-auto p-4 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-center mb-8">Product Details</h1>
                    <div className="bg-white-100  p-4 flex justify-center">
                        <img
                            src={productDetails?.image}
                            alt={productDetails?.title}
                            className="max-h-60 object-contain"
                        />
                    </div>

                    <div className="flex justify-center my-4">
                        <Link to="/Cart">
                            <button className="rounded-none bg-amber-400 hover:bg-amber-500 p-3 text-2xl font-bold text-neutral-50 flex items-center gap-2" onClick={handleAddToCart}>
                                <FontAwesomeIcon icon={faCartShopping} />

                                ADD TO CART</button>
                        </Link>
                    </div>

                    <div className="bg-white  p-6 space-y-4">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Title: <span className="font-normal">{productDetails?.title}</span>
                        </h1>

                        <p className="text-gray-700">
                            <b>Price:</b> ${productDetails?.price}
                        </p>
                        <p className="text-gray-700">
                            <b>Category:</b> {productDetails?.category}
                        </p>
                        <p className="text-gray-700">
                            <b>Rating Count:</b> {productDetails?.rating?.count}
                        </p>
                        <p className="text-gray-700">
                            <b>Rating Rate:</b> {productDetails?.rating?.rate}
                        </p>
                        <p className="text-gray-700">
                            <b>Description:</b> {productDetails?.description}
                        </p>
                    </div>
                </div>
            }



        </>
    )
}

export default ProducDetilsPage
