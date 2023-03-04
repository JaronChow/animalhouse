import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import RegisterAdmin from '../components/RegisterAdmin';
import RegisterCustomer from '../components/RegisterCustomer';
// import { registerUser } from '../util/API';


const Register = () => {
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
                    <h2 className = 'title'> Register </h2>
                        <button onClick={setAdminToggle} > 
                            Register as Admin
                        </button>
                            { adminToggle && <RegisterAdmin /> }
                        <button onClick={ setCustomerToggle } > 
                            Register as Customer
                        </button>
                            { customerToggle && <RegisterCustomer /> }
                </section>
        </div>
    )
};

export default Register;