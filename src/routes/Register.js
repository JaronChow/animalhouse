import { useNavigate } from "react-router-dom";
import RegisterCustomer from '../components/RegisterCustomer';

const Register = () => {
    const navigate = useNavigate();
    return (
    <div style={{margin: '40px auto 0px' }}>
      <RegisterCustomer />
    </div>
    );
};
export default Register;