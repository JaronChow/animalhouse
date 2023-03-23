import { useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { useOutletContext, useNavigate} from 'react-router-dom';
import { getCustomerCart } from "../api/API";
import CheckoutNavigation from "./CheckoutNavigation";
import DeleteProduct from "./DeleteProduct";
import { Card, Row, Col, Button, Container, Table, Image } from "react-bootstrap";

const Cart = () => {
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
        <div style={{ margin: '20px' }}>
          <h1>{username}'s Cart</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Table responsive>
                <colgroup>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "40%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th></th>
                  <th >Product</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Male</th>
                  <th className="text-center">Female</th>
                  <th className="text-center">Total Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {consolidatedCart.map(({ id, animalId, orderId, breed_name, image_url, description, price, maleQuantity, femaleQuantity, totalQuantity, totalPrice }) => (
                  <tr key={animalId}>
                    <td><Image src={image_url} style={{ width: '100px', height: 'auto' }} /></td>
                    <td>
                      <h4>{breed_name}</h4>
                      <p className="text-muted">{description}</p>
                    </td>
                    <td className="text-center">${parseFloat(price).toFixed(2)}</td>
                    <td className="text-center">{totalQuantity}</td>
                    <td className="text-center">0</td>
                    <td className="text-center">${parseFloat(totalPrice).toFixed(2)}</td>
                    <td className="text-center"><DeleteProduct cart={cartItems} setCart={setCartItems} getCart={getCart} id={id} token={token} /></td>
                  </tr>
                ))}
              </tbody>
              <tfoot >
                  <tr>
                    <td colSpan = '4'></td>
                    <td> SubTotal:</td>
                    <td colSpan= '2'>${consolidatedCart.reduce((total, { totalPrice }) => total + parseFloat(totalPrice), 0).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan = '4'></td>
                    <td> Tax (7.25%):</td>
                    <td colSpan= '2'>${consolidatedCart.reduce((total, { totalPrice }) => total + parseFloat(totalPrice * 0.0725), 0).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan = '4'></td>
                    <td> Order Total:</td>
                    <td colSpan= '2'>${consolidatedCart.reduce((total, { totalPrice }) => total + parseFloat(totalPrice * 0.0725) + totalPrice, 0).toFixed(2)}</td>
                  </tr>
                    <td colSpan = '4'></td>                
                    <td colSpan= '2'> <CheckoutNavigation /></td>
                </tfoot>
            </Table>
        )} 
      </div>
    )
};
export default Cart;

