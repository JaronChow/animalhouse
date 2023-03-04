import { useState, useEffect } from "react";
// import { loginUser, loginAdmin } from "../util/API";
import { useOutletContext, useNavigate } from "react-router-dom";


const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('Please Enter Username and Password');
    const [adminToken, setadminToken] = useOutletContext();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(adminToken){
            return navigate('/home')
        }
    },[adminToken, navigate])


    async function submitForm (event) {
        event.preventDefault();
        if (!username){
            setErrorMessage("Please enter Username");
        }else if (!password){
            setErrorMessage("Incorrect Passsword")
        }else {
            setErrorMessage('');
            const user = {username,password}
            const response = await loginUser(user);
            console.log(response);
            if (response.error){
                setErrorMessage(response.error.message)
            }else {
                localStorage.setItem('token', response.token)
                setToken(response.token)
            }
        }
        setUsername('');
        setPassword('');
    }

    return(
        <div>
            <form className = 'loginForm' onSubmit={submitForm}>
                <p>{errorMessage}</p>
                <label>Admin Username</label>
                    <input 
                        type="text" 
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                <label>Admin Password</label>
                    <input 
                        type="text" 
                        value={password} 
                        onChange={event => setPassword(event.target.value)}
                    />
                <button type="submit" onChange={event => (event.target.value)}>Login</button>
            </form>
        </div>
    )
};

export default AdminLogin;