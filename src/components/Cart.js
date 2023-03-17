import { useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { useOutletContext } from 'react-router-dom';
import { getCartByCustomerId, getCustomerCart } from "../api/API";
import CheckoutNavigation from "./CheckoutNavigation";

const Cart = () => {
    const [token] = useOutletContext();
    const { id, username } = jwt_decode(token);
    const [ customerId ] = useState(id);
    const [cart, setCart] = useState([]);    

    useEffect(() =>{
        getCart()
    }, [token, customerId]);

    const getCart = async () =>{
        const response = await getCustomerCart(token,customerId);
        console.log(response.data, 'response.data')
        setCart(response.data, 'response cart')
    }
    console.log(cart,'cart')
    return (
        <div>
            <h1>{username}'s Cart</h1>
            <form>
                {cart.map(({ id, breed_name, image_url, description, price, gender, quantity }) => (
                <div key={id}>
                    <h2>{breed_name}</h2>
                    {image_url ? <img src={image_url} /> : null}
                    {description ? <h4>Description: {description}</h4> : null}
                    {gender ? <h4>Gender: {gender}</h4> : null}
                    {price ? <h4>Price: ${price}</h4> : null}
                    {quantity ? <h4>Quantity: {quantity}</h4> : null}
                </div>
                ))}
                <CheckoutNavigation />
            </form>
        </div>
    )
}

export default Cart;

    // const animalInfo = [];
    // const animalData = JSON.parse(localStorage.getItem('animals'));
    // for (let i = 0; i < animalData.length; i++) {
    //     const mappedAnimalData = animalData[i];
    //     animalInfo.push(
    //         <form>
    //         <h2>Product</h2>
    //         <img src={mappedAnimalData.image_url}/> want image here
    //         <h3>{}</h3>
    //         <button>Remove Item</button>

    //         <h2>Quantity</h2>
    //         <h3>{mappedAnimalData.quantity}</h3>

    //         <h2>Each</h2>
    //         <h3>${mappedAnimalData.price}</h3>

    //         {/* Needs button for removing items, do in form or outside? */}

    //         <h2>Order Summary</h2>
    //         <h3>Subtotal: ${mappedAnimalData.price}</h3>
    //         <h3>Shipping Fee: ${}</h3>
    //         <h3>Total: ${}</h3>

    //         <CheckoutNavigation />
    //     </form>
    //     )
    //     console.log(mappedAnimalData);
    // }
    
    
    // const mappedAnimalData = animalData.map(animal => {
    //     console.log(animal);
    // })
    // console.log(animalData, 'this is animal data');
    // console.log(mappedAnimalData, 'this is map');