import { useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { useOutletContext } from 'react-router-dom';
import CheckoutNavigation from "./CheckoutNavigation";

const Cart = () => {
    const [token] = useOutletContext();
    const { username } = jwt_decode(token);

    // will need data from animals
    useEffect(() => {
        try {
            
        } catch (error) {
            console.error(error);
        }
    })

    return (
        <div>
            <h1>{username}'s Cart</h1>

            <form>
                <h2>Product</h2>
                <img /> want image here
                <h3>{}</h3>
                <button>Remove Item</button>

                <h2>Quantity</h2>
                <h3>{}</h3>

                <h2>Each</h2>
                <h3>${}</h3>

                {/* Needs button for removing items, do in form or outside? */}

                <h2>Order Summary</h2>
                <h3>Subtotal: ${}</h3>
                <h3>Shipping Fee: ${}</h3>
                <h3>Total: ${}</h3>

                <CheckoutNavigation />
            </form>
        </div>
    )
}

export default Cart;