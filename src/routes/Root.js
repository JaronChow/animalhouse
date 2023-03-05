import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { fetchAllAnimals } from "../api/API";

export default function Root() {
    const [token, setToken] =useState(localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role'))
    const [animals, setAnimals] =useState(localStorage.getItem('animals'));
    const navigate = useNavigate();

    useEffect(() => {
        setToken(localStorage.getItem('token'))
        setRole(localStorage.getItem('role'))
    }, [token])


    function logout() {
       localStorage.removeItem('token');
       setToken('');
       setRole('');
       navigate('/login');
    }
   
    useEffect(() => {
        Promise.all([fetchAllAnimals()])
        .then(([animals]) => {
            setAnimals(localStorage.setItem('animals', JSON.stringify(animals)))
        })
    }, []);
    console.log(token, 'customer token')

    return (
        <div>
            <header>
                <h2 className="webName">??</h2>
                <nav className="headerLink">
                    <Link to="home" className="linkStyle">Home</Link>
                    <Link to="animals" className="linkStyle">Animals</Link>
                    {token ? <Link to="categories" className="linkStyle">Categories</Link> : null}
                    {token ? <Link to="profile" className="linkStyle">Order History</Link> : null}
                    {token ? <Link to="shoppingCart" className="linkStyle">Shopping Cart</Link>: null}
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