import { useState } from "react";
import "../css/gender.css"
import "../css/popup.css";

function DeleteElm_popUpMenu({ isOpen, selectedIndices, people, onConfirm, onCancel }) {
    if (!isOpen) return null;

    return (
        <div className="delete-popup">
            <div className="delete-popup-content">
                <h5>Xác nhận xóa</h5>
                <p>Bạn có chắc chắn muốn xóa các thành viên sau?</p>
                <ul>
                    {selectedIndices.map(index => (
                        <li key={index}>
                            <strong>{people[index].name}</strong> - {people[index].birth}
                        </li>
                    ))}
                </ul>
                <div className="d-flex justify-content-end">
                    <button
                        className="btn btn-danger me-2"
                        onClick={onConfirm}
                    >
                        Xóa
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={onCancel}
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteElm_popUpMenu;
