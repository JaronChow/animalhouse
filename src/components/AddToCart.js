import { useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useState } from "react";
import { getAnimalById, addAnimalsToCart, createOrderItem, createCustomerOrder, getCartByCustomerId } from "../api/API";
import { Button } from "react-bootstrap";


const AddToCart = () => {
    const [token] = useOutletContext();
    const customerInfo = jwt_decode(token);
    const [ customerId ] = useState(customerInfo.id);
    const { state } = useLocation();
    const { id } = state;
    const [ thisAnimal, setThisAnimal ] = useState({...state});
    const { categoryId, breed_name, image_url, description, male_inventory, female_inventory, price, gender } = thisAnimal;
    const [ orderId, setOrderId ] = useState('');
    const [ quantity, setQuantity ] = useState(0)
    const [ total_item_amount, setTotalItemAmount ] = useState(0);
    const [ shipping_fee, setShippingFee ] = useState(0);
    const [ order_total_amount, setOrderTotalAmount ] = useState(0);
    const [ order_date, setOrderDate ] = useState('');
    const [ order_status, setOrderStatus ] = useState('Pending') 
    const navigate = useNavigate();

    async function addToCart (event) {
        event.preventDefault(); 
        const animal = await getAnimalById(id);
        console.log(animal, 'animal')
        const addedToCart = await addAnimalsToCart(id,animal,token);

        console.log(addedToCart, 'animal added to cart')
        return addedToCart
    }

    return (
        <div>
            <Button onClick={addToCart} className="mt-3">Add To Cart</Button>
        </div>
    )
}

export default AddToCart;