import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Card, Breadcrumb } from "react-bootstrap";
import { fetchAllAnimalsByCategoryName } from "../api/API";

const Animals = () => {
    const { state } = useLocation();
    const { category_name } = state;
    const [animals, setAnimals] = useState([]);
    const navigate = useNavigate();

    useEffect (() => {
        Promise.all([fetchAllAnimalsByCategoryName(category_name)])
        .then (([animals]) => {
            setAnimals(animals)
        })
    }, []);

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <Container className="mt-4 d-flex flex-wrap justify-content-start" style={{ maxWidth: '900px' }}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>{category_name}</Breadcrumb.Item>
                </Breadcrumb>
            </Container>
            <Container className="mt-3 d-flex justify-content-center" style={{ maxWidth: '1400px' }}>
                <div className="d-flex flex-wrap justify-content-center">
                    {
                        animals.map(({ id, category_name, breed_name, image_url, description, male_inventory, female_inventory, price }) => (
                            <Card key={id} style={{ width: '18rem' }} className="mb-3 me-3" onClick={() => navigate(`/categories/${category_name}/${id}`, {state: { id, category_name, breed_name, image_url, description, male_inventory, female_inventory, price }})}>
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
        </div>
    )
};

export default Animals;