import { useNavigate } from "react-router-dom";

const GuestGreeting = () => {
    const navigate = useNavigate();
    const navigateLogin = () => {
        navigate('/login');
    };

    return(
        <div className="panel">
            <h2>Welcome to ???</h2>
            <h3>You are not logged in.</h3>
            <button onClick={navigateLogin} className="loginButton">Log In</button>
        </div>
    )
};

export default GuestGreeting;