import { useState, useEffect } from "react";
import { fetchAllAnimals } from "../api/API";
import { useNavigate } from "react-router-dom";
import AddToCart from "../components/AddToCart";

const Animals = () => {
    const [animals, setAnimals] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([fetchAllAnimals()])
        .then(([animals]) => {
            setAnimals(animals)
        })
    }, []);
    
    return (
        <div className="panel">
            <button onClick={() => navigate('/newAnimal')} className="functionalButton">Add New Animal</button>
            {
                animals.map(({ id, categoryId, breed_name, image_url, description, inventory_count, price, gender }) => (
                    <div key={id} className="animals">
                        <div onClick={() => navigate(`/animals/${id}`, {state: { id, categoryId, breed_name, image_url, description, inventory_count, price, gender }})}>
                            <h2>{breed_name}</h2>
                            {image_url ? <img src={image_url}/> : null}
                            {description ? <h4>Description: {description}</h4> : null}
                            {price ? <h4>Price: {price}</h4> : null}
                            {gender ? <h4>Gender: {gender}</h4> : null}
                            {inventory_count ? <h4>Inventory_Count: {inventory_count}</h4> : null}
                        </div>
                        <AddToCart />
                    </div>
                ))
            }
        </div>
    )
};

export default Animals;