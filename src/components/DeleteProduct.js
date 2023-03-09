const DeleteProduct = () => {
    async function handleDelete() {
        try {
            
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