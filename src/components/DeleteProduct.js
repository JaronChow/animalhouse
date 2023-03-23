import { deleteProduct } from "../api/API";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
            <FontAwesomeIcon
            icon={faTrash}
            className="trash-icon"
            onClick={(event) => {
                event.preventDefault();
                handleDelete();
            }}
            />
        </div>
    )
}

export default DeleteProduct;