import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
// import { registerUser } from '../util/API';


const RegisterCustomer = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [customerToken, setCustomerToken] = useOutletContext();
    const [errorMessage, setErrorMessage] = useState('Please Create Username and Password');
    const navigate = useNavigate();

    useEffect(() => {
        if(customerToken){
            return navigate('/home')
        }
    },[customerToken, navigate])

    async function submitForm (event) {
        event.preventDefault();
        if (!username){
            setErrorMessage("Username required");
        }else if (password.length < 8){
            setErrorMessage("Password needs to be a minimum of 8 characters.");

        }else if (password !== confirmPassword){
            setErrorMessage("Passwords must match");
        }else {
            setErrorMessage('Thank you for registering, please log in!');
            const customer = { username,password }
            const response = await registerCustomer(customer);
            console.log(response ,'response');
            if (response.error){
                setErrorMessage(response.error.message)
            }else {
                localStorage.setItem('customerToken', response.customerToken)
                setCustomerToken(response.customerToken) 
            }
        }
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    }

    return(
        <div>
            <h1>Under Construction!</h1>
            <section className ="register">    
                <h1> Register </h1>
                <p>{errorMessage}</p>
                <form className = 'registerForm' onSubmit={submitForm}>
                    <label>Username</label>
                    <input 
                        type="text" 
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={event => setPassword(event.target.value)}
                    />
                    <label>Confirm Password</label>
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={event => setConfirmPassword(event.target.value)}
                    />
                    <button type="submit" onChange={event => event.target.vale}>Register</button>
                </form>
            </section>
            
        </div>
    )
};

export default RegisterCustomer;