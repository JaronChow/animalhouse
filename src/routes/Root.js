import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { fetchAllAnimals } from "../api/API";

export default function Root() {
    const [adminToken, setadminToken] =useState(localStorage.getItem('adminToken'));
    const [customerToken, setCustomerToken] =useState(localStorage.getItem('customerToken'));
    const [animals, setAnimals] =useState(localStorage.getItem('animals'));
    const navigate = useNavigate();

    useEffect(() => {
        setadminToken(localStorage.getItem('adminToken'))
    }, [adminToken])

    useEffect(() => {
        setCustomerToken(localStorage.getItem('customerToken'))
    }, [customerToken])

    function logout() {
       localStorage.removeItem('adminToken');
       localStorage.removeItem('customerToken');
       setadminToken('');
       setCustomerToken('');
       navigate('/login');
    }
   
    useEffect(() => {
        Promise.all([fetchAllAnimals()])
        .then(([animals]) => {
            setAnimals(localStorage.setItem('animals', JSON.stringify(animals)))
        })
    }, []);

    return (
        <div>
            <header>
                <h2 className="webName">??</h2>
                <nav className="headerLink">
                    <Link to="home" className="linkStyle">Home</Link>
                    <Link to="animals" className="linkStyle">Animals</Link>
                    {adminToken ? <Link to="categories" className="linkStyle">Categories</Link> : null}
                    {adminToken ? <Link to="customer_profile" className="linkStyle">Customers Profile</Link> : null}
                    {customerToken ? <Link to="my_profile" className="linkStyle">Order History</Link> : null}
                    {adminToken || customerToken ? <Link to="shoppingCart" className="linkStyle">Shopping Cart</Link>: null}
                    {adminToken || customerToken ? null : <Link to="register" className="linkStyle">Register</Link>}
                    {adminToken || customerToken ? null : <Link to="login" className="linkStyle">Login</Link>}
                    {adminToken || customerToken ? <button onClick={logout} className="logoutButton">Log Out</button> : null}
                </nav>
            </header>
            <main>
                <Outlet 
                    context={[
                        adminToken, setadminToken,
                        customerToken, setCustomerToken
                    ]}
                />
            </main>
        </div>
    );
}