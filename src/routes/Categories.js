import { useState } from "react";
import { editCategory, deleteCategory } from "../api/API";
import { useNavigate } from "react-router-dom";


const Categories = () => {
    const token = localStorage.getItem('token');
    const categories = JSON.parse(localStorage.getItem('categories'));
    const [editName, setEditName] = useState();
    const [isEdited, setIsEdited] = useState({});
    const navigate = useNavigate();

    async function onclickEdit(e, id) {
        e.preventDefault();
        setIsEdited(prevState => ({ ...prevState, [id]: !prevState[id] }));
    }

    async function edit(e, id) {
        e.preventDefault()

        const category = {
            category_name: editName
        }
        console.log(id)
        console.log(editName)
        console.log(category)
        const response = await editCategory(category, id, token);
        console.log(response)
        const updateCategory = 
            categories.map(category => {
            if (category.id === id) {
                return response.data
            } else {
                return category
            }
        })

        localStorage.setItem('categories',  JSON.stringify(updateCategory))
        setIsEdited(prevState => ({ ...prevState, [id]: false }));
        navigate(`/categories`);
        return response;
    }

    async function callDelete(e) {
        e.preventDefault();
        const response = await deleteCategory(id, token);
        navigate('/categories');
        return response;
    }
    
    return (
        <div className="panel">
            <button onClick={() => navigate('/newCategory')} className="functionalButton">Add New Category</button>
            {
                categories.map(({ id, category_name }) => (
                    <div key={id}>
                        <h2>{category_name}</h2>
                        <button onClick={(e) => onclickEdit(e, id)} className="functionalButton">Edit {category_name}</button>
                        {
                            isEdited[id] ?
                            <form onSubmit={(e) => edit(e, id)} className='panel'>
                                <h4>Edit Categories</h4>
                                <input
                                    type='text'
                                    defaultValue={category_name}
                                    onChange={(e) => setEditName(e.target.value)}
                                />
                                <button type="submit" className="createButton">Edit</button>
                            </form> : null
                        }
                        <button onClick={callDelete} className="functionalButton">Delete {category_name}</button>
                    </div>

                ))
            }
        </div>
    )
};

export default Categories;