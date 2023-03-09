import { deleteProduct } from "../api/API";

const DeleteProduct = () => {
    // needs state for cart, prolly need to check API function if working
    // async function handleDelete() {
    //     try {
    //         const response = await deleteProduct(orderId, token);
    //         const filteredCart = .filter(filteredProduct => filteredProduct.id !== response.id);
    //         setImmediate(filteredCart);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

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