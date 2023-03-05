import { useState, useEffect } from "react";
import { fetchAllCategories, editCategory, deleteCategory } from "../api/API";
import { useNavigate } from "react-router-dom";


const Categories = () => {
    const token = localStorage.getItem('token');
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([fetchAllCategories()])
        .then(([categories]) => {
            setCategories(categories)
        })
    }, []);

    async function onclickEdit(e) {
        e.preventDefault();
        if(isEdited === true) {
            setIsEdited(false);
        } else {
            setIsEdited(true);
        }
    }

    async function edit(e) {
        e.preventDefault()

        const category = {
            category_name: editName
        }

        const response = await editCategory(category, id, token);
        
        const updateCategory = JSON.parse(
            localStorage.getItem('categories')).map((category) => {
            if (category.id === id) {
                return response
            } else {
                return category
            }
        })

        localStorage.setItem('categories', JSON.stringify(updateCategory))
        setIsEdited(false);
        setThisCategory(response);
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
                        <button onClick={onclickEdit} className="functionalButton">Edit Category</button>
                        <button onClick={callDelete} className="functionalButton">Delete Category</button>
                    </div>

                ))
            }
        </div>
    )
};

export default Categories;