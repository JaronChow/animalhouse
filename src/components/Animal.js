import { useLocation } from "react-router-dom";
import { useState } from "react";
import AddToCart from '../components/AddToCart';
import { Container, Row, Col, Image } from "react-bootstrap";

const SingleAnimal = () => {
    const { state } = useLocation();
    const { id } = state;
    const [thisAnimal, setThisAnimal] = useState({...state});
    const { breed_name, image_url, description, male_inventory, female_inventory, price } = thisAnimal;
    const role = localStorage.getItem('role');

    return (
        <Container className="mt-5 d-flex justify-content-center">
            <Row>
                <Col md={6}>
                    {
                        male_inventory === 0 && female_inventory === 0 ? 
                        <Image src='https://static.vecteezy.com/system/resources/thumbnails/008/580/807/small/premium-sold-out-price-tag-sign-vector.jpg' fluid style={{ width: '800px', height: 'auto' }}/> 
                        : <Image src={image_url} fluid style={{ width: '400px', maxHeight: '500px' }}/>
                    }
                </Col>
                <Col md={5} key={id}>
                    <h2 className="mt-4" style={{ fontSize: '40px' }}>{breed_name}</h2>
                    <div className="mt-4">
                        {description ? <h4 style={{ fontSize: '22px' }}>{description}</h4> : null}
                        <h4>gender: </h4>
                        <h4>Male Qty: {male_inventory}</h4>
                        <h4>Female Qty: {female_inventory}</h4>
                        <h4>Price: {price}</h4>
                        {role === 'customer' ? <AddToCart /> : null}
                    </div>
                </Col>
            </Row>
        </Container>

    )
}

export default SingleAnimal;