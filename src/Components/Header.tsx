
import { NavLink } from "react-router-dom"
import { useCart } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


function Header() {
    const { cartItems } = useCart();
    return (<nav
        className="flex items-center justify-between gap-2 px-4 py-2  bg-blue-600 text-white hover:bg-blue-700 transition">
        <NavLink to="/" className="p-3 text-2xl font-bold"  data-testid="nav-home" >Home</NavLink>
        <NavLink to="/cart"   data-testid="nav-cart">
            <span>Cart </span>
            <FontAwesomeIcon icon={faShoppingCart} />{cartItems.length == 0 ? "" :
                <span className="ml-1 bg-red-600 text-white rounded-full px-2 py-0.5 text-sm font-semibold">
                    {cartItems.length}
                </span>}
        </NavLink>
    </nav>)
}

export default Header
