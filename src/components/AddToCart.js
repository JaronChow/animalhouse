import { useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useState } from "react";
import { addAnimalsToCart, createOrderItem, createCustomerOrder, getCartByCustomerId } from "../api/API";
import { Button } from "react-bootstrap";


const AddToCart = () => {
    const [token] = useOutletContext();
    const { id, username } = jwt_decode(token);
    const [ customerId ] = useState(id);
    const { state } = useLocation();
    const [ thisAnimal, setThisAnimal ] = useState({...state});
    const { animalId, categoryId, breed_name, image_url, description, inventory_count, price, gender } = thisAnimal;
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

        const { customerId } = jwt_decode(token);

        const order = {
            total_item_amount,
            shipping_fee,
            order_total_amount,
            order_date,
            order_status
        }

        const order_item = {
            animalId,
            customerId,
            orderId,
            quantity
        }    

        const updateOrder = {
            id: animalId,
            price: price,
            description:description,
            gender:gender
        }

        if(!getCartByCustomerId){
            const createOrder = await createCustomerOrder(order,token);
            const createOrderItem = await createOrderItem(order_item, token)
            const updateCustomerOrder = await updateCustomerOrder(updateOrder, token);
            navigate('./shoppingCart')
        }

        console.log()
        const addedToCart = await addAnimalsToCart(orderItem, token);
    }

    return (
        <div>
            <button onClick={addToCart} className="addToCartButton">Add To Cart</button>
        </div>
    )
}

export default AddToCart;