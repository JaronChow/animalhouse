import { deleteProduct } from "../api/API";
import { Button } from "react-bootstrap";

const DeleteProduct = ({ id, cart, setCart, token, getCart }) => {
    async function handleDelete() {
        try {
            const response = await deleteProduct(id, token);
            const filteredCart = cart.filter(filteredProduct => filteredProduct.id !== response.id);
            console.log(response, 'this is response');
            setCart(filteredCart);
            getCart();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
           <Button variant="danger"
                onClick={(event) => {
                    event.preventDefault();
                    handleDelete();
                }}
            >
                Remove Item
            </Button>
        </div>
    )
}

export default DeleteProduct;