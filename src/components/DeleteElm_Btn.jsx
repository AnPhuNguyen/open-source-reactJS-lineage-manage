function DeleteElm_Btn({ isSelecting, selectedIndices, onConfirmDelete, onCancelDelete, onStartSelecting }) {
    return (
        <>
            {isSelecting ? (
                <>
                    <button
                        className="btn btn-success me-2"
                        onClick={() => {
                            if (selectedIndices.length > 0) {
                                onConfirmDelete();
                            }
                        }}
                        disabled={selectedIndices.length === 0}
                    >
                        <i className="bi bi-check"></i>
                        Xác nhận xóa ({selectedIndices.length})
                    </button>

                    <button
                        className="btn btn-secondary mt-1"
                        onClick={onCancelDelete}
                    >
                        <i className="bi bi-x"></i>
                        Hủy
                    </button>
                </>
            ) : (
                <button
                    className="btn btn-danger"
                    onClick={onStartSelecting}
                >
                    <i className="bi bi-trash-fill"></i>
                    xóa thành viên
                </button>
            )}
        </>
    );
}

export default DeleteElm_Btn;
