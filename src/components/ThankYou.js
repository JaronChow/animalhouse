import { useEffect } from "react";
import { Card } from "react-bootstrap";

const ThankYou = () => {

    // might need useEffect for getting all the info from this order
    useEffect(() => {
        try {
            
        } catch (error) {
            console.error(error);
        }
    })

    return (
        <Container className="mt-4 d-flex justify-content-center" style={{ maxWidth: '800px' }}>
            <div className="d-flex flex-wrap justify-content-center">
                <Card key={id} style={{ width: '18rem' }} className="mb-3 me-3">
                    <Card.Body>Thank you for your order!</Card.Body>
                </Card>
            </div> 
        </Container>
    )
}

export default ThankYou;