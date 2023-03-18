import UserGreeting from "../components/UserGreeting";
import GuestGreeting from "../components/GuestGreeting";
import { useState } from "react";

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('login'))

    if (isLoggedIn == 'true') {
        return <UserGreeting />;
    } else {
        return <GuestGreeting />;
    }
};

export default Home;