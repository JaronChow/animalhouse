import { useEffect, useState } from "react";
import Cart from '../components/Cart';
import Checkout from '../components/Checkout';
import Shipping from '../components/Shipping';
import Billing from '../components/Billing';
import Payment from '../components/Payment';
import ThankYou from '../components/ThankYou';

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
            {<Cart/>}
            {<Checkout />}
            {<Shipping />}
            {<Billing />}
            {<Payment />}
            {<ThankYou />}
        </div>
    )
};

export default ShoppingCart;