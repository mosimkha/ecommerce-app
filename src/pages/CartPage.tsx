import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
  const { cartItems, removeFromCart, totalPrice } = useCart();
  // const cartItems=[{quantity:2,id:3,title:"apple",price:22}]
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {cartItems?.length === 0 ? (
        <>

          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4"> Your cart is empty.</p>
            <Link to="/">
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded">
                Go Shopping!
              </button>
            </Link>
          </div>

        </>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-2">
              <Link to={`/products/${item.id}`} >

                <div className="flex items-center space-x-4">
                  <img src={item.image} className="w-16 h-16 object-contain" alt={item.title} />
                  <div>
                    <h2 className="font-semibold">{item.title}</h2>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                  </div>


                </div>
              </Link>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 font-bold"
              >
                Remove
              </button>


            </div>


          ))}
          <div className="text-right text-xl font-bold">
            Total:
            ${totalPrice.toFixed(2)}

          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
