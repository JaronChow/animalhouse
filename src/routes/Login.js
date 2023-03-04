import { useState, useEffect} from "react";
// import { loginUser, loginAdmin } from "../util/API";
import { useOutletContext, useNavigate } from "react-router-dom";
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
    const [adminToken, setadminToken] = useOutletContext();
    const [customerToken, setCustomerToken] = useOutletContext();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(adminToken || customerToken){
            return navigate('/home')
        }
    },[adminToken, customerToken, navigate])

    return(
        <div>
            <h1>Under Construction!</h1>
                <section className ="login">    
                    <h2 className = 'title'> Log In </h2>
                        <button onClick={setAdminToggle} > 
                            Log In as Admin
                        </button>
                            { adminToggle && <AdminLogin /> }
                        <button onClick={ setCustomerToggle } > 
                            Log In as Customer
                        </button>
                            { customerToggle && <CustomerLogin /> }
                </section>
        </div>
    )
};

export default Login;