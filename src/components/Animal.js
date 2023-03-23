import UserAnimal from "./UserAnimal";
import GuestAnimal from "./GuestAnimal";
import { useOutletContext } from "react-router-dom";

const Animal = () => {
    const { isLoggedIn } = useOutletContext();

    if (isLoggedIn == 'true') {
        return <UserAnimal />;
    } else {
        return <GuestAnimal />;
    }
};

export default Animal;