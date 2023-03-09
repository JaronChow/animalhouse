import { useEffect, useState } from "react";
import Cart from '../components/Cart';

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
                <Cart />
            </div>
    )
};

export default ShoppingCart;

