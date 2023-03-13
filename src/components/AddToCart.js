import { useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useState } from "react";
import { addAnimalsToCart } from "../api/API";
import { Button } from "react-bootstrap";

const AddToCart = () => {
    const [token] = useOutletContext();
    const { id, username } = jwt_decode(token);
    const [ customerId ] = useState(id);
    const { state } = useLocation();
    const [thisAnimal, setThisAnimal] = useState({...state});
    const { animalId, categoryId, breed_name, image_url, description, inventory_count, price, gender } = thisAnimal;
    const navigate = useNavigate();

    async function addToCart (event) {
        event.preventDefault(); 

        const { customerId } = jwt_decode(token);
        const orderItem = {
            customerId,
            price,
            quantity:1
        }
        const addedToCart = await addAnimalsToCart(orderItem, token)
        console.log(addedToCart, "cart animal")
    }

    return (
        <div>
            <button onClick={addToCart} className="addToCartButton">Add To Cart</button>
        </div>
    )
}

export default AddToCart;