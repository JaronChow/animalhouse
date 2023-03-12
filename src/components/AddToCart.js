import { useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import { useState } from "react";
import { addAnimalsToCart } from "../api/API";
import { Button } from "react-bootstrap";

const AddToCart = () => {
    const { state } = useLocation();
    const [thisAnimal, setThisAnimal] = useState({...state});
    const { categoryId, breed_name, image_url, description, inventory_count, price, gender } = thisAnimal;
    const token = useOutletContext();
    const navigate = useNavigate();

    async function addToCart (event) {
        event.preventDefault(); 
        const animal = {
            categoryId,
            breed_name,
            image_url,
            description,
            price,
            gender
        }
        const animalToCart = await addAnimalsToCart(animal,token)
        console.log(animalToCart, "cart animal")
    }

    return (
        <div>
            <button onClick={addToCart} className="addToCartButton">Add To Cart</button>
        </div>
    )
}

export default AddToCart;