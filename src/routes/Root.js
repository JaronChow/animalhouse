import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { fetchAllAnimals } from "../api/API";

export default function Root() {
    const [token, setToken] =useState(localStorage.getItem('token'));
    const [animals, setAnimals] =useState(localStorage.getItem('animals'));
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setToken(localStorage.getItem('token'))
    }, [token])

    function logout() {
       localStorage.removeItem('token');
       setToken('');
       setIsLoggedIn(false);
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
                    {token ? <Link to="profile" className="linkStyle">Order History</Link> : null}
                    <Link to="shoppingCart" className="linkStyle">Shopping Cart</Link>
                    {token ? null : <Link to="register" className="linkStyle">Register</Link>}
                    {token ? null : <Link to="login" className="linkStyle">Login</Link>}
                    {token ? <button onClick={logout} className="logoutButton">Log Out</button> : null}
                </nav>
            </header>
            <main>
                <Outlet 
                    context={[
                        token, setToken,
                        isLoggedIn,setIsLoggedIn
                    ]}
                />
            </main>
        </div>
    );
}