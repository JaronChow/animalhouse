import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { editAnimal, deleteAnimal } from "../api/API";
import AddToCart from '../components/AddToCart';
import { Container, Row, Col, Image, Button, Form } from "react-bootstrap";

const SingleAnimal = () => {
    const { state } = useLocation();
    const { id } = state;
    const [thisAnimal, setThisAnimal] = useState({...state});
    const { categoryId, breed_name, image_url, description, inventory_count, price, gender } = thisAnimal;
    const [isEdited, setIsEdited] = useState(false);
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const categories = JSON.parse(localStorage.getItem('categories'));
    const [editCategoryId, setEditCategoryId] = useState(categoryId);
    const [editBreedName, setEditBreedName] = useState(breed_name);
    const [editImageURL, setEditImageURL] = useState(image_url);
    const [editDescription, setEditDescription] = useState(description);
    const [editInventoryCount, setEditInventoryCount] = useState(inventory_count);
    const [editPrice, setEditPrice] = useState(price);
    const [editGender, setEditGender] = useState(gender);
    const navigate = useNavigate();

    async function edit(e) {
        e.preventDefault()

        const animal = {
            categoryId: editCategoryId,
            breed_name: editBreedName,
            image_url: editImageURL,
            description: editDescription,
            inventory_count: editInventoryCount,
            price: editPrice,
            gender: editGender
        }

        const response = await editAnimal(animal, id, token);
        
        const updateAnimal = 
            JSON.parse(localStorage.getItem('animals')).map((animal) => {
            if (animal.id === id) {
                return response
            } else {
                return animal
            }
        })

        localStorage.setItem('animals', JSON.stringify(updateAnimal))
        setIsEdited(false);
        setThisAnimal(response);
        navigate(`/animals`);
        return response;
    }

    async function onclickEdit(e) {
        e.preventDefault();
        if(isEdited === true) {
            setIsEdited(false);
        } else {
            setIsEdited(true);
        }
    }
    
    async function callDelete(e) {
        e.preventDefault();
        const response = await deleteAnimal(id, token);
        navigate('/animals');
        return response;
    }

    return (
        <Container className="mt-5 d-flex justify-content-center">
            <Row>
                <Col md={6}>
                    {
                        inventory_count===0 ? 
                        <Image src='https://static.vecteezy.com/system/resources/thumbnails/008/580/807/small/premium-sold-out-price-tag-sign-vector.jpg' fluid style={{ width: '800px', height: 'auto' }}/> 
                        : <Image src={image_url} fluid style={{ width: '800px', height: 'auto' }}/>
                    }
                </Col>
                <Col md={5} key={id}>
                    {role === 'admin' ? <Button className="me-3 mt-4" onClick={onclickEdit} variant="outline-secondary">Edit Animal</Button> : null}
                    {role === 'admin' ? <Button className="mt-4"onClick={callDelete} variant="outline-secondary">Delete Animal</Button> : null}
                    {
                    isEdited ? 
                    <Form onSubmit={edit} className="mt-2">
                        <Form.Group className="mt-3 mb-3" as={Row}>
                            <Form.Label column sm={3}>Category</Form.Label>
                            <Col sm={9}>
                                <Form.Select onChange={(e) => setEditCategoryId(e.target.value)}>
                                    <option>-- Select category --</option>
                                    {
                                        categories.map(({ id, category_name }) => {
                                            return <option key={id} value={id}>{category_name}</option>  
                                        })
                                    }
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Breed Name</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type="text" 
                                    defaultValue={thisAnimal.breed_name}
                                    placeholder="breed name"
                                    onChange={(e) => setEditBreedName(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Image URL</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type="text" 
                                    defaultValue={thisAnimal.image_url}
                                    placeholder="image URL"
                                    onChange={(e) => setEditImageURL(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Description</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type="text"
                                    as="textarea"
                                    rows={4}
                                    defaultValue={thisAnimal.description}
                                    placeholder="description"
                                    className="flex-wrap"
                                    style={{ height: '100px' }}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Inventory</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type="text"
                                    defaultValue={thisAnimal.inventory_count}
                                    placeholder="inventory count"
                                    onChange={(e) => setEditInventoryCount(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Price</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type="text" 
                                    defaultValue={thisAnimal.price}
                                    placeholder="price"
                                    onChange={(e) => setEditPrice(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Gender</Form.Label>
                            <Col sm={9}>
                                    <Form.Select onChange={(e) => setEditGender(e.target.value)} className="dropDownButton">
                                        <option>-- Select Gender --</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </Form.Select>
                            </Col>
                        </Form.Group>
                        <Col className="d-flex justify-content-end">
                            <Button type="submit" variant="primary">Edit</Button>
                        </Col>
                    </Form> : null
                    }
                    <h2 className="mt-4" style={{ fontSize: '40px' }}>{breed_name}</h2>
                    <div className="mt-4">
                        {description ? <h4 style={{ fontSize: '22px' }}>{description}</h4> : null}
                        <h4>gender: {gender}</h4>
                        <h4>Qty: {inventory_count}</h4>
                        <h4>Price: {price}</h4>
                        {role === 'customer' ? <AddToCart /> : null}
                    </div>
                </Col>
            </Row>
        </Container>

    )
}

export default SingleAnimal;