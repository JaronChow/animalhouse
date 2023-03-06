import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
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
    const [token, setToken] = useOutletContext();
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [errorMessage, setErrorMessage] = useState('Please Create Username and Password');
    const navigate = useNavigate();

    async function submitCustomerForm (event) {
        event.preventDefault();
        if (!username){
            setErrorMessage("Username required");
        }else if (password.length < 8){
            setErrorMessage("Password needs to be a minimum of 8 characters.");

        }else if (password !== confirmPassword){
            setErrorMessage("Passwords must match");
        }else {
            const allUsers = await fetchAllUsers();
        
            const userWithEmail = allUsers.find(user => user.email_address === email_address);
            const userWithUsername = allUsers.find(user => user.username === username);
        
            if (userWithEmail) {
              setEmailError('Email already exists, please enter another email.')
            } else if (userWithUsername) {
              setUsernameError('Username already exists, please enter another username.')
            } else {
                const user = { role:"customer", firstname, lastname, username, password, phone_number, email_address };
                const response = await registerCustomer(user);
                console.log(response ,'token')
                setToken(response.data.token);
    
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', "customer");
                setEmailAddress('');
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                navigate('/home')
            }
        }
    }

    return(
        
        <div>
            <h1>Under Construction!</h1>
            <section className ="register">    
                <h1> Customer Registration </h1>
                <p>{errorMessage}</p>
                <form className = 'registerForm' onSubmit={submitCustomerForm}>
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
                        maxLength={10}
                        value={phone_number} 
                        onChange={event => setPhoneNumber(event.target.value)}
                    />
                    <label>Email Address {emailError} </label>
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
                        maxLength={2}
                        value={state} 
                        onChange={event => setState (event.target.value.toUpperCase())}
                    />
                    <label>Zipcode </label>
                    <input 
                        type="text" 
                        value={zipcode} 
                        onChange={event => setZipcode (event.target.value)}
                    />
                    <label>Username {usernameError} </label>
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