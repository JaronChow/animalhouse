import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useOutletContext } from "react-router-dom";
import RegisterAdmin from '../components/RegisterAdmin';
import RegisterCustomer from '../components/RegisterCustomer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const Register = () => {
    const navigate = useNavigate();

    const useToggle = (initialState) => {
        const [toggleValue, setToggleValue] = useState(initialState);
    
        const toggler = () => { setToggleValue(!toggleValue) };
        return [toggleValue, toggler]
    };
    const [adminToggle, setAdminToggle] = useToggle();
    const [customerToggle, setCustomerToggle] = useToggle()

    const adminClick = () => {
        setAdminToggle(true);
        navigate('/register/admin');
    };
    
    const customerClick = () => {
        setCustomerToggle(true);
        navigate('/register/customer');
    };

    return (
        <div>
          <h1>Under Construction!</h1>
          <section className="login">
            <h2 className="title"> Register </h2>

            {adminToggle && <RegisterAdmin />}
            {customerToggle && <RegisterCustomer />}

            {adminToggle || customerToggle ? null : (
              <Button variant="primary" onClick={adminClick}>
                <span>Register as Admin</span>
              </Button>
            )}
            
            {adminToggle || customerToggle ? null : (
              <Button variant="primary" onClick={customerClick}>
                <span>Register as Customer</span>
              </Button>
            )}
          </section>
        </div>
    );
};
export default Register;