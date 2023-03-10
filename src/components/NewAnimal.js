import { useState } from "react";
import { addNewAnimal } from "../api/API";
import { useNavigate } from "react-router-dom";

const NewAnimal = () => {
    const [categoryId, setCategoryId] = useState('');
    const [breed_name, setBreedName] = useState('');
    const [image_url, setImageURL] = useState('');
    const [description, setDescription] = useState('');
    const [inventory_count, setInventoryCount] = useState(0);
    const [price, setPrice] = useState(0);
    const [gender, setGender] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const token = localStorage.getItem('token');
    const categories = JSON.parse(localStorage.getItem('categories'));
    const navigate = useNavigate();
    
    async function submitAnimal(e) {
        e.preventDefault()

        const animal = {
            categoryId,
            breed_name,
            image_url,
            description,
            inventory_count,
            price,
            gender
        }

        const response = await addNewAnimal(animal, token);
        console.log(response);

        if (!categoryId || !breed_name || !image_url || !inventory_count || !price || !gender ) {
            setErrorMessage('This is required Field')
        } else {
            navigate('/animals');
        }
    }

    return (
        <form onSubmit={submitAnimal} className="panel">
            <h1>Add New Animal</h1>
            <div>
                <select onChange={(e) => setCategoryId(e.target.value)} className="dropDownButton">
                    <option>-- Select category --</option>
                    {   
                        categories.map(({ id, category_name }) => {
                            return <option key={id} value={id}>{category_name}</option>  
                        })
                    }
                </select>
            </div>
            <input 
            type="text" 
            value={breed_name}
            placeholder="breed name"
            onChange={(e) => setBreedName(e.target.value)}
            />
            {errorMessage ? <p>{errorMessage}</p> : null}
            <input 
            type="text" 
            value={image_url}
            placeholder="image URL"
            onChange={(e) => setImageURL(e.target.value)}
            />
            {errorMessage ? <p>{errorMessage}</p> : null}
            <input 
            type="text" 
            value={description}
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
            />
            <input 
            type="text" 
            value={inventory_count}
            placeholder="inventory count"
            onChange={(e) => setInventoryCount(e.target.value)}
            />
            {errorMessage ? <p>{errorMessage}</p> : null}
            <input 
            type="text" 
            value={price}
            placeholder="price"
            onChange={(e) => setPrice(e.target.value)}
            />
            {errorMessage ? <p>{errorMessage}</p> : null}
            <div>
                <select onChange={(e) => setGender(e.target.value)} className="dropDownButton">
                    <option>-- Select category --</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </div>
            {errorMessage ? <p>{errorMessage}</p> : null}
            <button type="submit" className="createButton">Create</button>
        </form>
    )
}

export default NewAnimal;