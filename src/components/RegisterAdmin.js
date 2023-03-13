import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { registerAdmin, fetchAllUsers } from '../api/API';

const RegisterAdmin= () => {
    const [firstname, setFirstname] = useState ('');
    const [lastname, setLastname] = useState ('');
    const [phone_number, setPhoneNumber] = useState ('');
    const [email_address, setEmailAddress] = useState ('');
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
            const allUsers = await fetchAllUsers();
        
            const userWithEmail = allUsers.find(user => user.email_address === email_address);
            const userWithUsername = allUsers.find(user => user.username === username);
        
            if (userWithEmail) {
              setEmailError('Email already exists, please enter another email.')
            } else if (userWithUsername) {
              setUsernameError('Username already exists, please enter another username.')
            } else {
                const user = { role:"admin", firstname, lastname, username, password, phone_number, email_address };
                const response = await registerAdmin(user);
                console.log(response ,'token')
                setToken(response.data.token);
    
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', "admin");
                setEmailAddress('');
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                navigate('/animals')
            }
        }
    }


    return(
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                    <div className="card-body">
                        <h1> Admin Registration </h1>
                        <p className="text-danger">{errorMessage}</p>
                        <form className="register-form" onSubmit={submitAdminForm}>
                            <div className="form-group">
                                <label>First Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={firstname} 
                                    onChange={event => setFirstname(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={lastname} 
                                    onChange={event => setLastname(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    maxLength={10} 
                                    value={phone_number} 
                                    onChange={event => setPhoneNumber(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label> Email Address</label>
                                    <p className="text-danger"> {emailError} </p>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={email_address} 
                                    onChange={event => setEmailAddress(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Username {usernameError}</label>
                                    <p className="text-danger"> {usernameError}</p>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={username} 
                                    onChange={event => setUsername(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    value={password} 
                                    onChange={event => setPassword(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
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

export default RegisterAdmin;