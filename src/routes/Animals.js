import { useState, useEffect } from "react";
import { fetchAllAnimals } from "../api/API";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

const Animals = () => {
    const [animals, setAnimals] = useState([]);
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([fetchAllAnimals()])
        .then(([animals]) => {
            setAnimals(animals)
        })
    }, []);
    
    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            {role ==='admin' ? <Button onClick={() => navigate('/newAnimal')} className="mt-4" variant="outline-secondary" style={{ maxWidth: '200px' }}>Add New Animal</Button>: null}
            <Container className="mt-4 d-flex justify-content-center" style={{ maxWidth: '1400px' }}>
                <div className="d-flex flex-wrap justify-content-center">
                {
                    animals.map(({ id, categoryId, breed_name, image_url, description, male_inventory, female_inventory, price }) => (
                        <Card key={id} style={{ width: '18rem' }} className="mb-3 me-3" onClick={() => navigate(`/animals/${id}`, {state: { id, categoryId, breed_name, image_url, description, male_inventory, female_inventory, price }})}>
                            <Card.Img variant="top" src={image_url} style={{height: "310px"}}/>
                            <Card.Body>
                                <Card.Title>{breed_name}</Card.Title>
                                <Card.Text>Price: ${price}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                }
                </div>
            </Container>
        </div>
    )
};

export default Animals;