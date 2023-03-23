import UserGreeting from "../components/UserGreeting";
import GuestGreeting from "../components/GuestGreeting";
import { useOutletContext } from "react-router-dom";

const Home = () => {
    const { isLoggedIn } = useOutletContext();

    if (isLoggedIn == 'true') {
        return <UserGreeting />;
    } else {
        return <GuestGreeting />;
    }
};

export default Home;