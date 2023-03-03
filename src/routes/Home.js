import UserGreeting from "../components/UserGreeting";
import GuestGreeting from "../components/GuestGreeting";
import { useOutletContext } from "react-router-dom";

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useOutletContext();

    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
};

export default Home;