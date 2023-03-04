import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { registerCustomer } from '../api/API';


const RegisterCustomer = () => {
    const [firstname, setFirstname] = useState ('');
    const [lastname, setLastname] = useState ('');
    const [phone_number, setPhoneNumber] = useState ('');
    const [email_address, setEmailAddress] = useState ('');
    const [address, setAddress] = useState ('');
    const [city, setCity] = useState ('');
    const [state, setState] = useState ('');
    const [zipcode, setZipcode] = useState ('');
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
            const customer = { firstname, lastname, username, password, phone_number, email_address, address, city, state, zipcode }
                console.log(customer, 'customer info')
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
                <h1> Customer Registration </h1>
                <p>{errorMessage}</p>
                <form className = 'registerForm' onSubmit={submitForm}>
                    <label>First Name </label>
                    <input 
                        type="text" 
                        value={firstname}
                        onChange={event => setFirstname(event.target.value)}
                    />
                    <label>Last Name </label>
                    <input 
                        type="text" 
                        value={lastname} 
                        onChange={event => setLastname(event.target.value)}
                    />
                    <label>Phone Number </label>
                    <input 
                        type="text" 
                        value={phone_number} 
                        onChange={event => setPhoneNumber(event.target.value)}
                    />
                    <label>Email Address </label>
                    <input 
                        type="text" 
                        value={email_address} 
                        onChange={event => setEmailAddress(event.target.value)}
                    />
                    <label>Address </label>
                    <input 
                        type="text" 
                        value={address} 
                        onChange={event => setAddress(event.target.value)}
                    />
                    <label>City </label>
                    <input 
                        type="text" 
                        value={city} 
                        onChange={event => setCity (event.target.value)}
                    />
                    <label>State </label>
                    <input 
                        type="text" 
                        value={state} 
                        onChange={event => setState (event.target.value)}
                    />
                    <label>Zipcode </label>
                    <input 
                        type="text" 
                        value={zipcode} 
                        onChange={event => setZipcode (event.target.value)}
                    />
                    <label>Username </label>
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