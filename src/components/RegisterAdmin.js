import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/API';


const RegisterAdmin= () => {
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
    const [errorMessage, setErrorMessage] = useState('Please Create Username and Password');
    const navigate = useNavigate();


    async function submitAdminForm (event) {
        event.preventDefault();
        if (!username){
            setErrorMessage("Username required");
        }else if (password.length < 8){
            setErrorMessage("Password needs to be a minimum of 8 characters.");

        }else if (password !== confirmPassword){
            setErrorMessage("Passwords must match");
        }else {
            setErrorMessage('Thank you for registering, please log in!');
            const user = { role:"admin", firstname, lastname, username, password, phone_number, email_address, address, city, state, zipcode }
            const response = await registerUser(user);
            if (response.error){
                setErrorMessage(response.error.message)
            }else {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('role', "admin" )
                setToken(response.data.token) 
                navigate('/home')
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
                <h1> Admin Registration </h1>
                <p>{errorMessage}</p>
                <form className = 'registerForm' onSubmit={submitAdminForm}>
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

export default RegisterAdmin;