import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { fetchAllAnimals, fetchAllCategories } from "../api/API";

export default function Root() {
    const [token, setToken] =useState(localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role'))
    const [categories, setCategories] = useState(localStorage.getItem('categories'))
    const [animals, setAnimals] =useState(localStorage.getItem('animals'));
    const navigate = useNavigate();

    useEffect(() => {
        setToken(localStorage.getItem('token'))
        setRole(localStorage.getItem('role'))
    }, [token, role])


    function logout() {
       localStorage.removeItem('token');
       localStorage.removeItem('role');
       setToken('');
       setRole('');
       navigate('/login');
    }
   
    useEffect(() => {
        Promise.all([fetchAllAnimals(), fetchAllCategories()])
        .then(([animals, categories]) => {
            setAnimals(localStorage.setItem('animals', JSON.stringify(animals)))
            setCategories(localStorage.setItem('categories', JSON.stringify(categories)))
        })
    }, []);

    return (
        <div>
            <header>
                <h2 className="webName">??</h2>
                <nav className="headerLink">
                    <Link to="home" className="linkStyle">Home</Link>
                    <Link to="animals" className="linkStyle">Animals</Link>
                    {role === "admin" ? <Link to="categories" className="linkStyle">Categories</Link> : null}
                    {role === "admin" ? <Link to="customers_profile" className="linkStyle">Customers Profile</Link> : null}
                    {role === "customer" ? <Link to="profile" className="linkStyle">Order History</Link> : null}
                    {role === "customer" ? <Link to="shoppingCart" className="linkStyle">Shopping Cart</Link>: null}
                    {token ? null : <Link to="register" className="linkStyle">Register</Link>}
                    {token ? null : <Link to="login" className="linkStyle">Login</Link>}
                    {token ? <button onClick={logout} className="logoutButton">Log Out</button> : null}
                </nav>
            </header>
            <main>
                <Outlet 
                    context={[
                        token, setToken
                    ]}
                />
            </main>
        </div>
    );
}