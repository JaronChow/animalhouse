import { useState } from "react";
import { editCategory, deleteCategory } from "../api/API";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Container, Stack, Card, Button, Form } from "react-bootstrap";

const Categories = () => {
    const { token, categories, setCategories } = useOutletContext();
    const [editName, setEditName] = useState();
    const [isEdited, setIsEdited] = useState(false);
    const [idSeleted, setIdSeleted] = useState(null);
    const navigate = useNavigate();
    
    async function onclickEdit(e, id) {
        e.preventDefault();

        setIdSeleted(id);
        if (isEdited === true) {
            setIsEdited(false)
        } else {
            setIsEdited(true)
        }
    }

    async function edit(e, id) {
        e.preventDefault()

        if (!editName) {
            setEditName(category_name);
        }
        
        const category = {
            category_name: editName
        }

        const response = await editCategory(category, id, token);

        const updateCategory = categories.map(category => {
            if (category.id === id) {
                return response.data
            } else {
                return category
            }
        })

        setCategories(updateCategory)
        setIdSeleted(null)
        setIsEdited(false)
    }

    async function callDelete(e, id) {
        e.preventDefault();
        await deleteCategory(id, token);
        const updatedCategories = categories.filter(category => category.id !== id);
        setCategories(updatedCategories);
    }
    
    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <Button className="mt-4" onClick={() => navigate('/newCategory')} variant="outline-secondary" style={{ maxWidth: '200px' }}>Add New Category</Button>
            <Container className="mt-4 d-flex justify-content-center" style={{ maxWidth: '800px' }}>
                <div className="d-flex flex-wrap justify-content-center">
                {
                    categories.map(({ id, category_name }) => (
                        <Card key={id} style={{ width: '18rem' }} className="mb-3 me-3">
                            <Card.Body>
                                <Card.Title className="text-center fs-2 mt-5 mb-5">{category_name}</Card.Title>
                                <Stack direction="horizontal" gap={2} className="justify-content-center">
                                    <Button className="col-md-5" onClick={(e) => onclickEdit(e, id)} variant="outline-secondary">Edit</Button>
                                    <Button className="col-md-5" onClick={(e) => callDelete(e, id)}  variant="outline-secondary">Delete</Button>                            
                                </Stack>
                                {
                                    idSeleted === id && isEdited === true ?
                                    <Form onSubmit={(e) => edit(e, id)}>
                                        <Stack direction="horizontal" gap={2} className="mt-2 justify-content-center">
                                            <Form.Control
                                                className='w-50'
                                                type='text'
                                                defaultValue={category_name}
                                                onChange={(e) => setEditName(e.target.value)}
                                            />
                                            <Button className="col-md-4" type="submit">Edit</Button>
                                        </Stack>
                                    </Form> : null
                                }
                            </Card.Body>
                        </Card>
                    ))
                }
                </div> 
            </Container>
        </div>
    )
    
};

export default Categories;