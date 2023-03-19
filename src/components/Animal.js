import { useLocation } from "react-router-dom";
import { useState } from "react";
import AddToCart from '../components/AddToCart';
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const SingleAnimal = () => {
    const { state } = useLocation();
    const { id } = state;
    const [thisAnimal, setThisAnimal] = useState({...state});
    const { breed_name, image_url, description, male_inventory, female_inventory, price } = thisAnimal;
    const role = localStorage.getItem('role');
    const [gender, setGender] = useState('male');
    const [ inventoryCount, setInventoryCount ] = useState(gender === 'male' ? male_inventory : female_inventory)
    const [ quantity , setQuantity] = useState (1);

    const incQuantity = () =>{
        setQuantity ((prevQuantity) => prevQuantity +1)
    }

    const decQuantity = () =>{
        setQuantity ((prevQuantity) => {
            if(prevQuantity -1 < 1) 
            return 1
            return prevQuantity - 1;
        })
    }

    const handleGenderChange = (event) => {
        const selectedGender = event.target.value;
        setGender(selectedGender);
        setInventoryCount(selectedGender === 'male' ? male_inventory : female_inventory);
    };

    const handleAddToCart = () => {
        const selectedInventoryCount = inventoryCount - quantity;
        setInventoryCount(selectedInventoryCount);
      };

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
                    {description ? <h4 style={{ fontSize: '22px' }}>{description}</h4> : null}
                    <div className="mt-4">
                        <label htmlFor="gender-select"><h5>Gender: </h5></label>
                        <select className="justify-content-center btn" id="gender-select" value={gender} onChange={handleGenderChange}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {gender === 'male' && <h5>Inventory: {male_inventory}</h5>}
                        {gender === 'female' && <h5>Inventory: {female_inventory}</h5>}
                        <h5> Quantity : </h5>
                        <p className = 'quantity-desc'>
                            <Button className = "minus" onClick={decQuantity}>
                                <AiOutlineMinus/>
                            </Button>
                            <span className = "num" style={{border: "none",borderRadius: "4px",margin: "5px",padding: "10px",fontSize: "18px"}}>
                                {quantity}
                            </span>
                            <Button className = "plus" onClick={incQuantity}>
                                <AiOutlinePlus/>
                            </Button>
                        </p>
                        <h5>Price: {price}</h5>
                        {role === "customer" ? (<AddToCart handleAddToCart= {handleAddToCart} disabled={inventoryCount < quantity}/>) : null}
                    </div>
                </Col>
            </Row>
        </Container>

    )
}

export default SingleAnimal;