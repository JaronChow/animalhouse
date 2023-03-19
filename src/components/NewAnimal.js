import { useState } from "react";
import { addNewAnimal } from "../api/API";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Card, Button, Form } from "react-bootstrap";

const NewAnimal = () => {
    const [categoryId, setCategoryId] = useState('');
    const [breed_name, setBreedName] = useState('');
    const [image_url, setImageURL] = useState('');
    const [description, setDescription] = useState('');
    const [male_inventory, setMaleInventory] = useState(0);
    const [female_inventory, setFemaleInventory] = useState(0);
    const [price, setPrice] = useState(0);
    const [categoryErrorMessage, setCategoryErrorMessage] = useState('');
    const [breednameErrorMessage, setBreednameErrorMessage] = useState('');
    const [imageUrlErrorMessage, setImageUrlErrorMessage] = useState('');
    const [inventoryErrorMessage, setInventoryErrorMessage] = useState('');
    const [priceErrorMessage, setPriceErrorMessage] = useState('');
    const token = localStorage.getItem('token');
    const categories = JSON.parse(localStorage.getItem('categories'));
    const navigate = useNavigate();

    const handlePriceChange = (e) => {
        const inputValue = parseFloat(e.target.value);
        const roundedValue = Math.round(inputValue * 100) / 100; // Round to 2 decimal places
        setPrice(roundedValue);
    };
      
    async function submitAnimal(e) {
        e.preventDefault()

        const animal = {
            categoryId,
            breed_name,
            image_url,
            description,
            male_inventory,
            female_inventory,
            price
        }

        if (!categoryId || !breed_name || !image_url || !male_inventory || !female_inventory || !price) {
            if (!categoryId) {
                setCategoryErrorMessage('This is required Field')
            }
            if (!breed_name) {
                setBreednameErrorMessage('This is required Field')
            }
            if (!image_url) {
                setImageUrlErrorMessage('This is required Field')
            }
            if (!male_inventory || !female_inventory) {
                setInventoryErrorMessage('This is required Field')
            }
            if (!price) {
                setPriceErrorMessage('This is required Field')
            }
        } else {
            const response = await addNewAnimal(animal, token);
            console.log(response);
            navigate('/animals');
        }
    }

    return (
        <Container className="mt-4 d-flex justify-content-center">
        <Card className="mt-4 px-4" style={{ width: '32rem' }}>
        <Form onSubmit={submitAnimal}>
            <Form.Label className="d-flex justify-content-center text-center fs-4 mt-3 mb-2">Add New Animal</Form.Label>
            <Form.Group as={Row} className="mb-3">
                <Form.Label className="mt-3" column sm={3}>Category</Form.Label>
                <Col sm={9}>
                    <Form.Select className="mt-3" onChange={(e) => setCategoryId(e.target.value)}>
                        <option>-- Select category --</option>
                        {   
                            categories.map(({ id, category_name }) => {
                                return <option key={id} value={id}>{category_name}</option>  
                            })
                        }
                    </Form.Select>
                </Col>
            </Form.Group>
            {categoryErrorMessage ? <Form.Label className="d-flex justify-content-end text-danger me-3">{categoryErrorMessage}</Form.Label> : null}
            <Form.Group as={Row} className="mt-3">
                <Form.Label column sm={3}>Breed Name</Form.Label>
                <Col sm={9}>
                    <Form.Control 
                    type="text" 
                    value={breed_name}
                    placeholder="Breed name"
                    onChange={(e) => setBreedName(e.target.value)}
                    />
                </Col>
            </Form.Group>
            {breednameErrorMessage ? <Form.Label className="d-flex justify-content-end text-danger me-3">{breednameErrorMessage}</Form.Label> : null}
            <Form.Group as={Row} className="mt-3">
                <Form.Label column sm={3}>Image URL</Form.Label>
                <Col sm={9}>
                    <Form.Control 
                    type="text" 
                    value={image_url}
                    placeholder="Image URL"
                    onChange={(e) => setImageURL(e.target.value)}
                    />
                </Col>
            </Form.Group>
            {imageUrlErrorMessage ? <Form.Label  className="d-flex justify-content-end text-danger me-3">{imageUrlErrorMessage}</Form.Label> : null}
            <Form.Group as={Row} className="mt-3">
                <Form.Label column sm={3}>Description</Form.Label>
                <Col sm={9}>
                    <Form.Control 
                    type="text" 
                    value={description}
                    as="textarea"
                    placeholder="Description"
                    style={{ height: '150px' }}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mt-3">
                <Form.Label column sm={3}>Male Inventory</Form.Label>
                <Col sm={9}>
                    <Form.Control 
                    type="number"
                    value={male_inventory ? male_inventory : ""}
                    placeholder="male inventory"
                    onChange={(e) => setMaleInventory(e.target.value)}
                    />
                </Col>
            </Form.Group>
            {inventoryErrorMessage ? <Form.Label  className="d-flex justify-content-end text-danger me-3">{inventoryErrorMessage}</Form.Label> : null}
            <Form.Group as={Row} className="mt-3">
                <Form.Label column sm={3}>Female Inventory</Form.Label>
                <Col sm={9}>
                    <Form.Control 
                    type="number"
                    value={female_inventory ? female_inventory : ""}
                    placeholder="female inventory"
                    onChange={(e) => setFemaleInventory(e.target.value)}
                    />
                </Col>
            </Form.Group>
            {inventoryErrorMessage ? <Form.Label  className="d-flex justify-content-end text-danger me-3">{inventoryErrorMessage}</Form.Label> : null}

            <Form.Group as={Row} className="mt-3">
                <Form.Label column sm={3}>Price</Form.Label>
                <Col sm={9}>
                    <Form.Control
                    className="form-control"
                    type="number"
                    min="0"
                    value={price ? price : ""}
                    placeholder="price"
                    onChange={handlePriceChange}
                    />
                </Col>
            </Form.Group>
            {priceErrorMessage ? <Form.Label className="d-flex justify-content-end text-danger me-3">{priceErrorMessage}</Form.Label> : null}
            <Col className="d-flex justify-content-end">
                <Button type="submit" className="mt-4 mb-4" variant="primary">Create</Button>
            </Col>
        </Form>
        </Card>
        </Container>
    )
}

export default NewAnimal;