import { useState, useEffect } from "react";
import { fetchAllAnimalsByCategoryId } from "../api/API";
import { useNavigate, useLocation } from "react-router-dom";

const Category = () => {
    const { state } = useLocation();
    const { id } = state;
    const [animals, setAnimals] = useState([]);
    const navigate = useNavigate();

    useEffect (() => {
        Promise.all([fetchAllAnimalsByCategoryId(id)])
        .then (([animals]) => {
            setAnimals(animals)
        })
    }, []);

    return (
        <>
            {   animals ?
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
                    </div>
                )) : null
            }
        </>
    )
};

export default Category;