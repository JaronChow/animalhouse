import { useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useState } from "react";
import {  addAnimalsToCart,  createCustomerOrder, getCartByCustomerId } from "../api/API";
import { Button } from "react-bootstrap";
import Modal from 'react-modal';

const AddToCart = () => {
    const token = localStorage.getItem('token');
    const customerInfo = jwt_decode(token);
    const [ customerId ] = useState(customerInfo.id);
    const { state } = useLocation();
    const { id } = state;
    const [ thisAnimal, setThisAnimal ] = useState({...state});
    const [ customerOrder , setCustomerOrder ] = useState({...state});
    const { categoryId, breed_name, image_url, description, male_inventory, female_inventory, price } = thisAnimal;
    const { total_item_amount, shipping_fee, order_total_amount, order_date, order_status } = customerOder
    // const [ orderId, setOrderId ] = useState('');
    // const [ quantity, setQuantity ] = useState(0)
    // const [ total_item_amount, setTotalItemAmount ] = useState(0);
    // const [ shipping_fee, setShippingFee ] = useState(0);
    // const [ order_total_amount, setOrderTotalAmount ] = useState(0);
    // const [ order_date, setOrderDate ] = useState('');
    // const [ order_status, setOrderStatus ] = useState('Pending') 
    const [isOpen, setIsOpen] = useState(false);
    const [ message , setMessage ] = useState('')
    const navigate = useNavigate();
    Modal.setAppElement('#root');

    async function addToCart (event) {
        event.preventDefault(); 
        const addedToCart = await addAnimalsToCart(id, thisAnimal, token);
        console.log(addedToCart, 'animal added to cart')
        setIsOpen(true)
        return addedToCart, order
    }

    async function itemAdded () {
        setIsOpen(false)
        navigate('/shoppingCart');
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                style={{
                    overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    content: {
                    border: 'none',
                    borderRadius: '5px',
                    boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.5)',
                    width: '450px',
                    height: '150px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                    }
                }}
                >
                <button onClick={() => setIsOpen(false)} style={{ position: 'absolute', top: '2px', right: '5px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '20px' }}>&times;</button>
                <h2 style = {{ textAlign: 'center', marginBottom: '20px' }}>Item Added to Cart</h2>
                <Button onClick={ itemAdded } style={{ display: 'block', margin: 'auto' }} >Go To Cart</Button>
            </Modal>
            <Button onClick={addToCart} className="mt-3" >Add To Cart</Button>
        </div>
    )
}

export default AddToCart;