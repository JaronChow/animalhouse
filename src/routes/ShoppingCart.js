import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import { useOutletContext } from 'react-router-dom';
import { getCartByCustomerId } from "../api/API";
import Cart from '../components/Cart';

const ShoppingCart = () => {
    const [token] = useOutletContext();
 

    return(
        <Cart />
    )
};

export default ShoppingCart;

