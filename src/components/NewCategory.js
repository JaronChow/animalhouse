import { useState } from "react";
import { addNewCategory } from "../api/API";
import { useNavigate } from "react-router-dom";
import { Container, Col, Card, Button, Form } from "react-bootstrap";

const NewCategory = () => {
    const [category_name, setCategoryName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    async function submitCategory(e) {
        e.preventDefault()

        const category = {
            category_name
        }

        if (!category_name ) {
            setErrorMessage('This is required Field')
        } else {
            const response = await addNewCategory(category, token);
            console.log(response);
            navigate('/categories');
        }
    }

    return (
        <Container className="mt-4 d-flex justify-content-center">
            <Card className="mt-4 px-4" style={{ width: '18rem' }}>
                <Form onSubmit={submitCategory}>
                    <Form.Label className="text-center fs-4 mt-3 mb-2">Add New Category</Form.Label>
                    <Form.Control 
                        className="mt-3"
                        type="text" 
                        value={category_name}
                        placeholder="category name"
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    {errorMessage ? <Form.Label className="mt-2">{errorMessage}</Form.Label> : null}
                    <Col className="d-flex justify-content-end">
                        <Button className="mt-4 mb-4" type="submit" variant="primary">Create</Button>
                    </Col>
                </Form>
            </Card>
        </Container>
    )
}

export default NewCategory;