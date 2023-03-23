import { useEffect } from "react";
import { Card, Container, Image } from "react-bootstrap";

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
                <Card className="mt-4">
                    <Card.Body><Image src={"https://marketplace.canva.com/EAEaIMAz-WI/2/0/1600w/canva-beige-minimal-thank-you-card-jOZOzZod2TE.jpg"} style={{ width: '600px', height: 'auto' }} /></Card.Body>
                </Card>
            </div> 
        </Container>
    )
}

export default ThankYou;