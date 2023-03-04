import { useState, useEffect } from "react";
import { fetchAllCategories } from "../api/API";


const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        Promise.all([fetchAllCategories()])
        .then(([categories]) => {
            setCategories(categories)
        })
    }, []);
    
    return (
        <div className="panel">
            {
                categories.map(({ id, category_name }) => (
                    <div key={id}>
                        <h2>{category_name}</h2>
                    </div>

                ))
            }
        </div>
    )
};

export default Categories;