import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getCustomerCart } from '../api/API';
import { Container, Table, Image } from "react-bootstrap";

const OrderHistory = () => {
    const { token } = useOutletContext();
    const { id, username } = jwt_decode(token);
    const [ customerId ] = useState(id);
    const [gender, setGender] = useState('male');
    const [showCart, setShowCart] = useState(false);
    const [maleInventoryQty , setMaleInventoryQty] = useState(0); 
    const [femaleInventoryQty , setFemaleInventoryQty] = useState(0); 
    const [cartItems, setCartItems] = useState([]);
    const [consolidatedCart, setConsolidatedCart] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 
    
        useEffect(() =>{
            getCart()
        }, [token, customerId]);

        const getCart = async () =>{
            const response = await getCustomerCart(token,customerId);
            setCartItems(response.data);
            setIsLoading(false);
            console.log(response.data)
        }

        useEffect(() => {
          const consolidatedCart = cartItems.reduce((accumulator, current) => {
            const existingItemIndex = accumulator.findIndex((item) => item.animalId === current.animalId);
            if (existingItemIndex === -1) {
              accumulator.push({...current , totalQuantity: current.quantity, 
                totalPrice: current.price * current.quantity, maleQuantity: current.male_inventory  ? current.quantity : 0, 
                femaleQuantity: current.female_inventory  ? current.quantity : 0});
            } else {
              accumulator[existingItemIndex].totalQuantity += current.quantity;
              accumulator[existingItemIndex].totalPrice += current.price * current.quantity;
              if (current.gender === 'male') {
                accumulator[existingItemIndex].maleQuantity += current.quantity;
              } else {
                accumulator[existingItemIndex].femaleQuantity += current.quantity;
              }
            }
            return accumulator;
          }, []);
          setConsolidatedCart(consolidatedCart);
        }, [cartItems]);

    return (
        <Container className='mt-4'>
          <h1 className='text-center mb-2' style={{ fontSize: '30px' }}>{username}'s Order History</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Table responsive>
              <thead>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Male</th>
                  <th>Female</th>
                  <th>Total Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {consolidatedCart.map(({ id, animalId, breed_name, image_url, description, price, maleQuantity, femaleQuantity, totalQuantity, totalPrice }) => (
                  <tr key={animalId}>
                    <td><Image src={image_url} style={{ width: '100px', height: 'auto' }} /></td>
                    <td>
                      <h4>{breed_name}</h4>
                      <p className="text-muted">{description}</p>
                    </td>
                    <td>${parseFloat(price).toFixed(2)}</td>
                    <td>{totalQuantity}</td>
                    <td>0</td>
                    <td>${parseFloat(totalPrice).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
        )} 
      </Container>
    )
};

export default OrderHistory;