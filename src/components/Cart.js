import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';

const Cart = () => {
    const { username } = jwt_decode(token);
    const [quantity, setQuantity] = useState();

    // will need data from animals
    useEffect(() => {
        try {
            
        } catch (error) {
            console.error(error);
        }
    })

    async function submitCart(event) {
        try {
            event.preventDefault();

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>{username}'s Cart</h1>

            <form onSubmit={submitCart}>
                <h2>Product</h2>
                <h3>{}</h3>

                <h2>Quantity</h2>
                <input
                    type=""
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                ></input>

                <h2>Each</h2>
                <h3>${}</h3>

                <h2>Total</h2>
                <h3>${}</h3>

                {/* Needs button for removing items, do in form or outside? */}

                <h2>Order Summary</h2>
                <h3>Subtotal: ${}</h3>

                <button type="submit">Checkout</button>
            </form>
        </div>
    )
}

export default Cart;