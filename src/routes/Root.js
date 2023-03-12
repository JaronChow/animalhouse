import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { fetchAllAnimals, fetchAllCategories } from "../api/API";
import Header from "../components/Header";

export default function Root() {
    const [token, setToken] =useState(localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role'))
    const [categories, setCategories] = useState(localStorage.getItem('categories'))
    const [animals, setAnimals] =useState(localStorage.getItem('animals'));

    useEffect(() => {
        setToken(localStorage.getItem('token'))
        setRole(localStorage.getItem('role'))
    }, [token, role])
   
    useEffect(() => {
        Promise.all([fetchAllAnimals(), fetchAllCategories()])
        .then(([animals, categories]) => {
            setAnimals(localStorage.setItem('animals', JSON.stringify(animals)))
            setCategories(localStorage.setItem('categories', JSON.stringify(categories)))
        })
    }, []);

    return (
        <div>
            <Header />
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