import { useState } from "react";
import "../css/popup.css";

function Relationship_List_Popup({ isOpen, people, relationships, onClose, onDeleteMarriage, onDeleteParentChild }) {
    if (!isOpen) return null;

    return (
        <div className="delete-popup">
            <div className="delete-popup-content" style={{ maxWidth: "800px" }}>
                <h5>Danh sách mối quan hệ</h5>
                <div className="mb-3">
                    <h6>Hôn nhân:</h6>
                    <ul>
                        {relationships.marriages.map((marriage, idx) => (
                            <li key={idx} className="d-flex justify-content-between align-items-center">
                                <span>{people[marriage.husband].name} (Nam) - {people[marriage.wife].name} (Nữ)</span>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => onDeleteMarriage(idx)}
                                >
                                    Xóa
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mb-3">
                    <h6>Cha mẹ - Con cái:</h6>
                    <ul>
                        {relationships.parentChild.map((pc, idx) => (
                            <li key={idx} className="d-flex justify-content-between align-items-center">
                                <span>{people[pc.parent].name} - {people[pc.child].name}</span>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => onDeleteParentChild(idx)}
                                >
                                    Xóa
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="d-flex justify-content-end">
                    <button
                        className="btn btn-secondary"
                        onClick={onClose}
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Relationship_List_Popup;
