import { useNavigate } from "react-router-dom";
import { Container, Form, Card } from "react-bootstrap";
import jwt_decode from 'jwt-decode';

const UserGreeting = () => {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    const categories = JSON.parse(localStorage.getItem('categories'));
    const animals = JSON.parse(localStorage.getItem('animals'));
    const { username } = jwt_decode(token);
    const navigate = useNavigate();

    function category(e, id) {
        e.preventDefault()

        setCategoryId(e.target.value)
        navigate(`/animal_categories/${id}`, {state: { id }})
    }

    return(
        <div className="d-flex flex-column align-items-center justify-content-center">
            <h3 className="mt-3">Welcome { username }!</h3>
            <Container className="mt-2 d-flex flex-wrap justify-content-start" style={{ maxWidth: '950px' }}>
                <h4 className="me-3">Shop By Pet Type</h4>
                <Form.Select style={{ width: '15rem' }} onChange={(e) => category(e, e.target.value)}>
                    <option>-- Select category --</option>
                    {   
                        categories.map(({ id, category_name }) => {
                            return <option key={id} value={id}>{category_name}</option>  
                        })
                    } 
                </Form.Select>             
            </Container>
            <div>
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
        </div>
    )
};

export default UserGreeting;