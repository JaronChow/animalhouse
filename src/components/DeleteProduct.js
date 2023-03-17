import { deleteProduct } from "../api/API";

const DeleteProduct = ({ cart, setCart, orderId, token }) => {
    // not working, need to fix
    async function handleDelete() {
        try {
            const response = await deleteProduct(orderId, token);
            const filteredCart = cart.filter(filteredProduct => filteredProduct.id !== response.id);
            console.log(response, 'this is response');
            setCart(filteredCart);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <button
                onClick={(event) => {
                    event.preventDefault();
                    handleDelete();
                }}
            >
                Remove Item
            </button>
        </div>
    )
}

export default DeleteProduct;