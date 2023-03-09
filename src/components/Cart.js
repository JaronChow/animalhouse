import { useState } from "react";
import jwt_decode from 'jwt-decode';
import { useOutletContext } from 'react-router-dom';
import CheckoutNavigation from "./CheckoutNavigation";

const Cart = () => {
    const [token] = useOutletContext();
    const { username } = jwt_decode(token);

    // will need data from animals
    // useEffect(() => {
    //     try {
    //         fetchAllAnimals().then((results) => {
    //             setAnimals(results);
    //         })
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }, [])

    
    const animalInfo = [];
    const animalData = JSON.parse(localStorage.getItem('animals'));
    for (let i = 0; i < animalData.length; i++) {
        const mappedAnimalData = animalData[i];
        animalInfo.push(
            <form>
            <h2>Product</h2>
            <img src={mappedAnimalData.image_url}/> want image here
            <h3>{}</h3>
            <button>Remove Item</button>

            <h2>Quantity</h2>
            <h3>{mappedAnimalData.quantity}</h3>

            <h2>Each</h2>
            <h3>${mappedAnimalData.price}</h3>

            {/* Needs button for removing items, do in form or outside? */}

            <h2>Order Summary</h2>
            <h3>Subtotal: ${mappedAnimalData.price}</h3>
            <h3>Shipping Fee: ${}</h3>
            <h3>Total: ${}</h3>

            <CheckoutNavigation />
        </form>
        )
        console.log(mappedAnimalData);
    }
    
    
    // const mappedAnimalData = animalData.map(animal => {
    //     console.log(animal);
    // })
    // console.log(animalData, 'this is animal data');
    // console.log(mappedAnimalData, 'this is map');


    return (
        <div>
            <h1>{username}'s Cart</h1>
            <div>{animalInfo}</div>
        </div>
    )
}

export default Cart;