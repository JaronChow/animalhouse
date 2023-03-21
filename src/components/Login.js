import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { loginCustomer } from "../api/API";
import { Container, Button, Form } from "react-bootstrap";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('Please Enter Username and Password');
    const { setToken, setRole, setIsLoggedIn } = useOutletContext();
    const navigate = useNavigate();

    async function submitForm (event) {
        event.preventDefault();
        if (!username){
            setErrorMessage("Please enter Username!");
        }else if (!password){
            setErrorMessage("Incorrect Passsword")
        }else {
            setErrorMessage('');
            const user = { username,password }
            const response = await loginCustomer(user);
            console.log(response.data , 'response.data');
            if (!response.data.user){
                setErrorMessage(response.data.message)
            }else {
                localStorage.setItem('token', response.data.token)
                setToken(response.data.token)
                setRole(response.data.user.role);
                setIsLoggedIn(true)
                navigate('/home')
            }
        }
        setUsername('');
        setPassword('');
    }

    return(
        <Container className="mt-4 d-flex flex-wrap justify-content-center">
            <Form onSubmit={submitForm}>
                <Form.Label className="d-flex justify-content-center text-center fs-2 mt-2">Login</Form.Label>
                <Form.Label className="d-flex justify-content-center text-center text-danger mb-2">{errorMessage}</Form.Label>
                <Form.Label className="text-start fs-5 mt-3 mb-2">Username</Form.Label>
                <Form.Control
                    className="mb-2"
                    type="text" 
                    value={username}
                    style={{ width: '20rem' }}
                    onChange={event => setUsername(event.target.value)}
                />
                <Form.Label className="fs-5 mt-3">Password</Form.Label>
                <Form.Control
                    className="mb-3"
                    type="password" 
                    value={password} 
                    onChange={event => setPassword(event.target.value)}
                />
                <Button className="float-end mt-1" type="submit" onChange={event => (event.target.value)}>Login</Button>
            </Form>
        </Container>
    )
};

export default Login;