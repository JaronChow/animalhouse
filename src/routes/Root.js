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
       setToken('');
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
                    {adminToken ? <Link to="categories" className="linkStyle">Catories</Link> : null}
                    {adminToken ? <Link to="profile" className="linkStyle">Customers Profile</Link> : null}
                    {customerToken ? <Link to="profile" className="linkStyle">Order History</Link> : null}
                    <Link to="shoppingCart" className="linkStyle">Shopping Cart</Link>
                    {adminToken ? null : <Link to="register" className="linkStyle">Register</Link>}
                    {customerToken ? null : <Link to="register" className="linkStyle">Register</Link>}
                    {adminToken ? null : <Link to="login" className="linkStyle">Login</Link>}
                    {customerToken ? null : <Link to="login" className="linkStyle">Login</Link>}
                    {adminToken ? <button onClick={logout} className="logoutButton">Log Out</button> : null}
                    {customerToken ? <button onClick={logout} className="logoutButton">Log Out</button> : null}
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