import { useOutletContext,useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast'
import jwt_decode from "jwt-decode";
// import AddToCart from '../components/AddToCart';
import { addAnimalsToCart } from "../api/API";
import { Container, Row, Col, Image, Button, Breadcrumb } from "react-bootstrap";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import AddToCart from './AddToCart';


const UserAnimal = () => {
    const { token, role } = useOutletContext();
    const navigate = useNavigate();
    const customerInfo = jwt_decode(token);
    const [ customerId ] = useState(customerInfo.id);
    const { state } = useLocation();
    const { id } = state;
    const [thisAnimal, setThisAnimal] = useState({...state});
    const { category_name, breed_name, image_url, description, male_inventory, female_inventory, price } = thisAnimal;
    const [gender, setGender] = useState('male');
    const [ message, setMessage ] = useState('');
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState();
    const [maleInventoryQty , setMaleInventoryQty] = useState(male_inventory); 
    const [femaleInventoryQty , setFemaleInventoryQty] = useState(female_inventory); 
    const [quantity , setQuantity] = useState (1);
    const [ inventoryCount, setInventoryCount ] = useState(gender === 'male' ? male_inventory : female_inventory)

    const addAnimal = async (event) =>{
        event.preventDefault();
        const addedToCart = [];
        for (let i = 0; i < quantity; i++) {
            const animalAdded = await addAnimalsToCart(id, thisAnimal, token);
            addedToCart.push(animalAdded);
        }
        console.log(addedToCart, 'added to cart')
    
        if (gender === 'male') {
            console.log(maleInventoryQty, 'male inventory')
            setMaleInventoryQty((prevMaleInventoryQty) => prevMaleInventoryQty - quantity);
        } else if (gender === 'female') {
            setFemaleInventoryQty((prevFemaleInventoryQty) => prevFemaleInventoryQty - quantity);
        }
        toast.success(`${quantity} "${breed_name}" added to cart`);
        return addedToCart
    };

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

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
        <Container className="mt-4 d-flex flex-wrap justify-content-start" style={{ maxWidth: '900px' }}>
              <Breadcrumb>
                  <Breadcrumb.Item onClick={() => navigate(`/home`)}>Home</Breadcrumb.Item>
                  <Breadcrumb.Item onClick={() => navigate(`/categories/${category_name}`, {state: { category_name }})}>{category_name}</Breadcrumb.Item>
                  <Breadcrumb.Item active>{breed_name}</Breadcrumb.Item>
              </Breadcrumb>
        </Container>
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
                        <select className="justify-content-center btn" id="gender-select" value={gender} onChange={handleGenderChange} style={{padding: '10px', margin: "5px", textAlign: "left"}}>
                            <option value="male" >Male</option>
                            <option value="female" >Female</option>
                        </select>
                        {gender === 'male' && <h5>Inventory: {maleInventoryQty}</h5>}
                        {gender === 'female' && <h5>Inventory: {femaleInventoryQty}</h5>}
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
                        <p> {message} </p>
                        { role === "customer" ? <Button onClick = { addAnimal } className="mt-3" > Add To Cart </Button> : <p> Please register or login to purchase product</p> }
                    </div>
                </Col>
            </Row>
        </Container>
        </div>

    )
}

export default UserAnimal;