import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { loginCustomer } from "../api/API";


const CustomerLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('Please Enter Username and Password');
    const [customerToken, setCustomerToken] = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(customerToken){
            return navigate('/home')
        }
    },[customerToken, navigate])


    async function submitForm (event) {
        event.preventDefault();
        if (!username){
            setErrorMessage("Please enter Username");
        }else if (!password){
            setErrorMessage("Incorrect Passsword")
        }else {
            setErrorMessage('');
            const customer = {username,password}
            const response = await loginCustomer(customer);
            console.log(response);
            if (response.error){
                setErrorMessage(response.error.message)
            }else {
                localStorage.setItem('customerToken', response.customerToken)
                setCustomerToken(response.customerToken) 
            }
        }
        setUsername('');
        setPassword('');
    }

    return(
        <div>
            <form className = 'loginForm' onSubmit={submitForm}>
                <p>{errorMessage}</p>
                <label>Customer Username</label>
                    <input 
                        type="text" 
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                <label> Customer Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={event => setPassword(event.target.value)}
                    />
                <button type="submit" onChange={event => (event.target.value)}>Login</button>
            </form>
        </div>
    )
};

export default CustomerLogin;