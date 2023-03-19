import { useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

const EditAnimals = () => {
    const animals = JSON.parse(localStorage.getItem('animals'));
    const navigate = useNavigate();
    
    async function callDelete(e) {
        e.preventDefault();
        await deleteAnimal(id, token);
        navigate('/animals');
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <Button onClick={() => navigate('/newAnimal')} className="mt-4" variant="outline-secondary" style={{ maxWidth: '200px' }}>Add New Animal</Button>
            <Container className="mt-4 d-flex justify-content-center" style={{ maxWidth: '1400px' }}>
                <div className="d-flex flex-wrap justify-content-center">
                    {
                        animals.map(({ id, categoryId, breed_name, image_url, description, male_inventory, female_inventory, price }) => (
                            <Card key={id} style={{ width: '18rem' }} className="mb-3 me-3">
                                <Card.Img variant="top" src={image_url} style={{height: "310px"}}/>
                                <Card.Body>
                                    <Card.Title>{breed_name}</Card.Title>
                                    <Card.Text>Price: ${price}</Card.Text>
                                    <Card.Text>Male Inventory: {male_inventory}</Card.Text>
                                    <Card.Text>Female Inventory: {female_inventory}</Card.Text>
                                    <Card.Text>Description: {description}</Card.Text>
                                </Card.Body>
                                <Card.Footer style={{ backgroundColor: 'white', border: 'none' }} className="d-flex flex-wrap justify-content-center">
                                    <Button className="me-3" onClick={(e) => navigate(`/animals/${id}`, {state: { id, categoryId, breed_name, image_url, description, male_inventory, female_inventory, price }})} variant="outline-secondary">Edit Animal</Button>
                                    <Button onClick={callDelete} variant="outline-secondary">Delete Animal</Button>
                                </Card.Footer>
                            </Card>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
};

export default EditAnimals;