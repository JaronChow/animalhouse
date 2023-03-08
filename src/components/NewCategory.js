import { useState } from "react";
import { addNewCategory } from "../api/API";
import { useNavigate } from "react-router-dom";

const NewCategory = () => {
    const [category_name, setCategoryName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    async function submitCategory(e) {
        e.preventDefault()

        const category = {
            category_name
        }

        const response = await addNewCategory(category, token);
        console.log(response);

        if (!category_name ) {
            setErrorMessage('This is required Field')
        } else {
            navigate('/categories');
        }
    }

    return (
        <form onSubmit={submitCategory} className="panel">
            <h1>Add New Category</h1>
            <input 
                type="text" 
                value={category_name}
                placeholder="category name"
                onChange={(e) => setCategoryName(e.target.value)}
            />
            {errorMessage ? <p>{errorMessage}</p> : null}
            <button type="submit" className="createButton">Create</button>
        </form>
    )
}

export default NewCategory;