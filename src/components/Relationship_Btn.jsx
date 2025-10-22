import { useState } from "react";

function Relationship_Btn({ onSetRelationship }) {
    return (
        <button
            className="btn btn-primary"
            onClick={onSetRelationship}
        >
            <i className="bi bi-link"></i>
            Thiết lập mối quan hệ
        </button>
    );
}

export default Relationship_Btn;
