import { useState } from "react";
import AdminLogin from "../components/AdminLogin";
import CustomerLogin from "../components/CustomerLogin";

const Login = () => {
    const useToggle = (initialState) => {
        const [toggleValue, setToggleValue] = useState(initialState);
    
        const toggler = () => { setToggleValue(!toggleValue) };
        return [toggleValue, toggler]
    };

    const [adminToggle, setAdminToggle] = useToggle();
    const [customerToggle, setCustomerToggle] = useToggle()


    return(
        <div>
            <h1>Under Construction!</h1>
                <section className ="login">    
                    <h2 className = 'title'> Log In </h2>
                        <button onClick={setAdminToggle}>Log In as Admin</button>
                        <button onClick={setCustomerToggle}>Log In as Customer</button>

                        {adminToggle && <AdminLogin />}
                        {customerToggle && <CustomerLogin />}
                </section>
        </div>
    )
};

export default Login;