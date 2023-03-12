import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { registerCustomer, fetchAllUsers } from '../api/API';

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

    return (
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-5">
              <div className="card">
                <div className="card-body">
                    <h1 className="card-title text-center">Customer Registration</h1>
                    <form className="register-form" onSubmit={submitCustomerForm}>
                        <div className="form-group">
                        <label>First Name</label>
                        <input 
                            type="text" 
                            className="form-control mb-3" 
                            value={firstname} 
                            onChange={event => setFirstname(event.target.value)}
                        />
                        </div>
                        <div className="form-group mb-3">
                        <label>Last Name</label>
                        <input 
                            type="text" 
                            className="form-control"  
                            value={lastname} 
                            onChange={event => setLastname(event.target.value)}
                        />
                        </div>
                        <div className="form-group mb-3">
                        <label>Phone Number</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            maxLength={10} 
                            value={phone_number} 
                            onChange={event => setPhoneNumber(event.target.value)}
                        />
                        </div>
                        <div className="form-group mb-3">
                        <label>Email Address</label>
                        <p className="text-danger">{emailError}</p>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={email_address} 
                            onChange={event => setEmailAddress(event.target.value)}
                        />
                        </div>
                        <div className="form-group mb-3">
                        <label>Address</label>
                        <input 
                            type="text" 
                            className="form-control"  
                            value={address} 
                            onChange={event => setAddress(event.target.value)}
                        />
                        </div>
                        <div className="form-group mb-3">
                        <label>City</label>
                        <input 
                            type="text" 
                            className="form-control"  
                            value={city} 
                            onChange={event => setCity(event.target.value)}
                        />
                        </div>
                        <div className="form-group mb-3">
                        <label>State</label>
                        <input 
                            type="text" 
                            className="form-control"  
                            maxLength={2}
                            value={state} 
                            onChange={event => setState(event.target.value.toUpperCase())}
                        />
                        </div>   
                        <div className="form-group mb-3">
                        <label>Zipcode</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={zipcode} 
                            onChange={event => setZipcode(event.target.value)}
                        />
                        </div>
                        <div className="form-group mb-3">
                        <label>Username</label>
                        <p className="text-danger">{usernameError}</p>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                        />
                        </div>
                        <div className="form-group mb-3">
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={password} 
                            onChange={event => setPassword(event.target.value)}
                        />
                        </div>
                        <div className="form-group mb-5">
                        <label>Confirm Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={confirmPassword} 
                            onChange={event => setConfirmPassword(event.target.value)}
                        />
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary text-center"
                            onChange={event => event.target.vale}
                            >Register
                        </button>
                    </form>
                </div>
            </div>
        </div> 
        </div>
    </div>
    )
};

export default RegisterCustomer;