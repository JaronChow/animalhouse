import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { loginUser } from "../api/API";


const CustomerLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('Please Enter Username and Password');
    const [token, setToken] = useOutletContext();
    const navigate = useNavigate();

    async function submitForm (event) {
        event.preventDefault();
        if (!username){
            setErrorMessage("Please enter Username");
        }else if (!password){
            setErrorMessage("Incorrect Passsword")
        }else {
            setErrorMessage('');
            const user = {username,password}

                console.log(username, password)

            const response = await loginUser(user);

                console.log(response , 'response.data');

            if (response.error){
                setErrorMessage(response.error.message)
            }else {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('role','customer')
                setToken(response.data.token) 
                navigate('/home')
            }
        }
        setUsername('');
        setPassword('');
    }

    return(
        <div>
            <form className = 'loginForm' onSubmit={submitForm}>
                <p>{errorMessage}</p>
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
                <button type="submit" onChange={event => (event.target.value)}>Login</button>
            </form>
        </div>
    )
};

export default CustomerLogin;