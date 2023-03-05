import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllCategories, fetchAllUsers } from "../api/API";

const Home = () => {
    const [users, setUsers] = useState();
    const [categories, setCategories] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([fetchAllCategories(), fetchAllUsers()])
        .then(([categories, users]) => {
            setCategories(categories)
            setUsers(users)
        })
    }, []);

    return(
        <div>
            {users ? <h1>Welcome {users.username}!</h1> : <h1>Welcome Guest!</h1>}
            <h2>Shop By Pet Type</h2>
            {
                categories ? categories.map(({ id, category_name }) => (
                    <div key={id}>
                        <div onClick={() => navigate(`/${id}/animals`, {state: { id, category_name }})}>
                            <h2>{category_name}</h2>
                        </div>    
                    </div>             
                )) : null
            }
        </div>
    )
};

export default Home;