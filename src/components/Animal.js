import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { editAnimal, deleteAnimal } from "../api/API";

const SingleAnimal = () => {
    const { state } = useLocation();
    const { id } = state;
    const [thisAnimal, setThisAnimal] = useState({...state});
    const { categoryId, breed_name, image_url, description, inventory_count, price, gender } = thisAnimal;
    const [isEdited, setIsEdited] = useState(false);
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const categories = JSON.parse(localStorage.getItem('categories'));
    const [editCategoryId, setEditCategoryId] = useState(categoryId);
    const [editBreedName, setEditBreedName] = useState(breed_name);
    const [editImageURL, setEditImageURL] = useState(image_url);
    const [editDescription, setEditDescription] = useState(description);
    const [editInventoryCount, setEditInventoryCount] = useState(inventory_count);
    const [editPrice, setEditPrice] = useState(price);
    const [editGender, setEditGender] = useState(gender);
    const navigate = useNavigate();

    async function edit(e) {
        e.preventDefault()

        const animal = {
            categoryId: editCategoryId,
            breed_name: editBreedName,
            image_url: editImageURL,
            description: editDescription,
            inventory_count: editInventoryCount,
            price: editPrice,
            gender: editGender
        }

        const response = await editAnimal(animal, id, token);
        
        const updateAnimal = 
            JSON.parse(localStorage.getItem('animals')).map((animal) => {
            if (animal.id === id) {
                return response
            } else {
                return animal
            }
        })

        localStorage.setItem('animals', JSON.stringify(updateAnimal))
        setIsEdited(false);
        setThisAnimal(response);
        navigate(`/animals`);
        return response;
    }

    async function onclickEdit(e) {
        e.preventDefault();
        if(isEdited === true) {
            setIsEdited(false);
        } else {
            setIsEdited(true);
        }
    }
    
    async function callDelete(e) {
        e.preventDefault();
        const response = await deleteAnimal(id, token);
        navigate('/animals');
        return response;
    }
    
    return (
        <>
            <div key={id} className="panel">
                <h2>{breed_name}</h2>
                <div>
                    <img src={image_url}/>
                    {description ? <h4>Description: {description}</h4> : null}
                    <h4>gender: {gender}</h4>
                    <h4>Qty: {inventory_count}</h4>
                    <h4>Price: {price}</h4>
                    {role === 'customer' ? <button onClick={onclickEdit} className="functionalButton">Add To Cart</button> : null}
                    {role === 'admin' ? <button onClick={onclickEdit} className="functionalButton">Edit Animal</button> : null}
                    {role === 'admin' ? <button onClick={callDelete} className="functionalButton">Delete Animal</button> : null}
                </div>
            </div>
            {
                isEdited ? 
                <form onSubmit={edit} className="panel">
                    <h1>Edit Animal</h1>
                    <div>
                        <select onChange={(e) => setEditCategoryId(e.target.value)} className="dropDownButton">
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
                    defaultValue={thisAnimal.breed_name}
                    placeholder="breed name"
                    onChange={(e) => setEditBreedName(e.target.value)}
                    />
                    <input 
                    type="text" 
                    defaultValue={thisAnimal.image_url}
                    placeholder="image URL"
                    onChange={(e) => setEditImageURL(e.target.value)}
                    />
                    <input 
                    type="text" 
                    defaultValue={thisAnimal.description}
                    placeholder="description"
                    onChange={(e) => setEditDescription(e.target.value)}
                    />
                    <input 
                    type="text" 
                    defaultValue={thisAnimal.inventory_count}
                    placeholder="inventory count"
                    onChange={(e) => setEditInventoryCount(e.target.value)}
                    />
                    <input 
                    type="text" 
                    defaultValue={thisAnimal.price}
                    placeholder="price"
                    onChange={(e) => setEditPrice(e.target.value)}
                    />
                    <input 
                    type="text" 
                    defaultValue={thisAnimal.gender}
                    placeholder="gender"
                    onChange={(e) => setEditGender(e.target.value)}
                    />
                    <button type="submit" className="createButton">Edit</button>
                </form> : null
            }
        </>
    )
}

export default SingleAnimal;