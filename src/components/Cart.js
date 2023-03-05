import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import { useNavigate, useOutletContext } from 'react-router-dom';
import axios from "axios";

const Cart = () => {
    const [token] = useOutletContext();
    const { username } = jwt_decode(token);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    // will need data from animals
    useEffect(() => {
        try {
            
        } catch (error) {
            console.error(error);
        }
    })

    const handleInput = (event) => {
        try {
            const { name, value } = event.target;
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value
            }));

        } catch (error) {
            console.error(error);
        }
    }

    const handleNext = () => {
        try {
            axios
                .post("/cart", formData)
                .then((response) => {
                    navigate("/checkout");
                })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>{username}'s Cart</h1>

            <form>
                <h2>Product</h2>
                <h3>{}</h3>

                <h2>Quantity</h2>
                <input
                    type=""
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInput}
                    required
                ></input>

                <h2>Each</h2>
                <h3>${}</h3>

                <h2>Total</h2>
                <h3>${}</h3>

                {/* Needs button for removing items, do in form or outside? */}

                <h2>Order Summary</h2>
                <h3>Subtotal: ${}</h3>

                <button onClick={handleNext}>Continue to checkout</button>
            </form>
        </div>
    )
}

export default Cart;