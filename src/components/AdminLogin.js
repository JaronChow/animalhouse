import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { loginAdmin } from "../api/API";


const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('Please Enter Username and Password');
    const [adminToken, setAdminToken] = useOutletContext();
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
            const admin= {username,password}
            const response = await loginAdmin(admin);
            console.log(response);
            if (response.error){
                setErrorMessage(response.error.message)
            }else {
                localStorage.setItem('adminToken', response.data.adminToken)
                setAdminToken(response.data.adminToken) 
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