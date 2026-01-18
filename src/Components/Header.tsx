
import { NavLink } from "react-router-dom"
import { useCart } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";


function Header() {
    const [toggle, setToggle] = useState(true)
    const { cartItems } = useCart();
  
    return (<><nav
        className={`flex items-center justify-between gap-2 px-4 py-2  text-white hover:bg-gray-400 transition ${toggle ? "bg-orange-600" : "bg-blue-600"}`}>



        <NavLink to="/" className="p-3 text-2xl font-bold" data-testid="nav-home" >Home</NavLink>
        <NavLink to="/cart" data-testid="nav-cart">
            <span>Cart </span>
            <FontAwesomeIcon icon={faShoppingCart} />{cartItems.length == 0 ? "" :
                <span className="ml-1 bg-red-600 text-white rounded-full px-2 py-0.5 text-sm font-semibold">
                    {cartItems.length}
                </span>}
        </NavLink>
    </nav>

        <button
            onClick={() => setToggle((prev) => !prev)}
            className={`w-14 h-7 flex items-center rounded-full p-1 
justify-around m-2 flex-row-reverse
                hover:bg-gray-400 transition
                ${toggle ? "bg-orange-600" : "bg-blue-600"} 
                
                `}
        >click</button>

    </>
    )
}

export default Header
