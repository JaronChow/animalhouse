import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllCategories } from "../api/API";
import { Container, Card } from "react-bootstrap";

const GuestGreeting = () => {
    const [categories, setCategories] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([fetchAllCategories()])
        .then(([categories]) => {
            setCategories(categories)
        })
    }, []);

    return(
        <div className="d-flex flex-column align-items-center justify-content-center">
            <h1 className="mt-3">Welcome Guest!</h1>
            <h4 className="mt-5">Shop By Pet Type:</h4>
            <Container className="mt-2 d-flex flex-wrap justify-content-center" style={{ maxWidth: '800px' }}>
                {
                    categories ? categories.map(({ id, category_name }) => (
                        <Card key={id} style={{ width: '18rem' }} className="mb-3 me-3">
                            <Card.Body onClick={() => navigate(`/animal_categories/${id}`, {state: { id, category_name }})}>
                                <Card.Title className="text-center fs-2 mt-5 mb-5">{category_name}</Card.Title>
                            </Card.Body>    
                        </Card>             
                    )) : null
                }
            </Container>  
        </div>
    )
};

export default GuestGreeting;