import { useNavigate } from "react-router-dom";
import { Container, Form, Card } from "react-bootstrap";

const GuestGreeting = () => {
    const categories = JSON.parse(localStorage.getItem('categories'));
    const animals = JSON.parse(localStorage.getItem('animals'));
    const navigate = useNavigate();

    function category(e, category_name) {
        e.preventDefault()

        navigate(`/categories/${category_name}`, {state: { category_name }})
    }

    return(
        <div className="d-flex flex-column align-items-center justify-content-center">
            <h3 className="mt-3">Welcome Guest!</h3>
            <Container className="mt-2 d-flex flex-wrap justify-content-start" style={{ maxWidth: '950px' }}>
                <h4 className="me-3">Shop By Pet Type</h4>
                <Form.Select style={{ width: '15rem' }} onChange={(e) => category(e, e.target.value)}>
                    <option>-- Select category --</option>
                    {   
                        categories.map(({ id, category_name }) => {
                            return <option key={id} value={category_name}>{category_name}</option>  
                        })
                    } 
                </Form.Select>             
            </Container>
            <div>
                <Container className="mt-4 d-flex justify-content-center" style={{ maxWidth: '1400px' }}>
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
                    </div>
                </Container>
            </div>
        </div>
    )
};

export default GuestGreeting;