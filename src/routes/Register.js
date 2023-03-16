import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import RegisterAdmin from '../components/RegisterAdmin';
import RegisterCustomer from '../components/RegisterCustomer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from "react-bootstrap";

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
      <Container className="mt-5 d-flex justify-content-center" style={{ maxWidth: '1400px' }}>
        <div className="clearfix text-center">
          <div className="mb-3 text-primary">
            <h2>New Here?</h2>
          </div>
          <Row>
              <Col className="mt-3" md={6}>
                {adminToggle && <RegisterAdmin />}
                {adminToggle || customerToggle ? null : (
                  <Button style={{ width: '12rem', height: '10rem' }} variant="outline-primary" onClick={adminClick}>Register as Admin</Button>
                )}
              </Col>
              <Col className="mt-3" md={6}>
              {customerToggle && <RegisterCustomer />}
              {adminToggle || customerToggle ? null : (
                <Button style={{ width: '12rem', height: '10rem' }} variant="outline-primary" onClick={customerClick}>
                  Register as Customer
                </Button>
              )}
            </Col>
          </Row>
        </div>
        </Container>
    );
};
export default Register;