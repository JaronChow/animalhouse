import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { registerAdmin, fetchAllUsers } from '../api/API';


const RegisterAdmin= () => {
    const [firstname, setFirstname] = useState ('');
    const [lastname, setLastname] = useState ('');
    const [phone_number, setPhoneNumber] = useState ('');
    const [email_address, setEmailAddress] = useState ({email_address:""});
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useOutletContext();
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState('');
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
            const _user = { role:"admin", firstname, lastname, username, password, phone_number, email_address }
            const response = await registerAdmin(_user);
            console.log(_user, 'user register info');

            const allUsers = await fetchAllUsers()

            console.log(allUsers, 'all users')

            if(filteredEmail.length > 0){
                setEmailError('Email already exists, please enter another email.')
            }else if(_user.username === username){
                setUsernameError('Username already exists, please enter another email.')
            }
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('role', "admin" )
                setToken(response.data.token) 
                navigate('/home')
            
        }
        setEmailAddress('')
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
                        maxLength={10}
                        value={phone_number} 
                        onChange={event => setPhoneNumber(event.target.value)}
                    />
                    <label>Email Address</label>
                    <input 
                        type="text" 
                        value={email_address} 
                        onChange={event => setEmailAddress(event.target.value)}
                    />
                    <label>Username {usernameError}</label>
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
                    <button type="submit" onChange={event => (event.target.value)}>Register</button>
                </form>
            </section>
            
        </div>
    )
};

export default RegisterAdmin;