import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import RegisterCustomer from '../components/RegisterCustomer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from "react-bootstrap";

const Register = () => {
    const navigate = useNavigate();
    return (
    <div style={{margin: '60px auto 0px' }}>
      <RegisterCustomer />
    </div>
    );
};
export default Register;