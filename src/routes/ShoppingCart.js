import { useEffect, useState } from "react";
import Cart from '../components/Cart';
import Checkout from '../components/Checkout';
import Shipping from '../components/Shipping';
import Billing from '../components/Billing';
import Payment from '../components/Payment';
import ThankYou from '../components/ThankYou';
import { Routes, Route } from "react-router-dom";

const ShoppingCart = () => {
    const [cart, setCart] = useState([]);

    // Not sure exactly if we'll need to create the sales info 
    // useEffect(() => {
    //     try {
    //         fetchSalesByUser().then((results) => {
    //             setCart(results);
    //         })
    //     } catch (error) {
    //         console.error(error);
    //     }
    // })

    return(
            <div>
                <Routes>
                    <Route path="/" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/shipping" element={<Shipping />} />
                    <Route path="/billing" element={<Billing />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/thankyou" element={<ThankYou />} />
                </Routes>
            </div>
    )
};

export default ShoppingCart;
