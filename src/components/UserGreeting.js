import { useOutletContext } from "react-router-dom";
import jwt_decode from 'jwt-decode';

const UserGreeting = () => {
    const [token, setToken] = useOutletContext();
    const { username } = jwt_decode(token);
    return(
        <div className="panel">
            <h1>Welcome to ???</h1>
            <h2>Logged in as {username}</h2>
        </div>
    )
};

export default UserGreeting;