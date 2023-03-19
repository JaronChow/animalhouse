import { useState, useEffect } from "react";
import { fetchAllAnimalsByCategoryId } from "../api/API";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

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
                <div>
                    <Card style={{ width: '18rem' }} className="mb-3 me-3">
                        <Card.Img variant="top" src='https://www.discoveryourselfwellness.com/wp-content/uploads/2021/06/Coming-Soon-Image.jpg'  style={{height: "310px"}}/>
                        <Card.Body>
                            <Card.Title>New Animals Comming Soon</Card.Title>
                            <Card.Text>Stay Tuned!</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </Container>
    )
};

export default Category;