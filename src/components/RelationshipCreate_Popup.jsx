import { useState } from "react";
import "../css/popup.css";

function RelationshipCreate_Popup({ isOpen, people, relationships, onClose, onSetMarriage, onSetParentChild }) {
    const [selectedPerson1, setSelectedPerson1] = useState(null);
    const [selectedPerson2, setSelectedPerson2] = useState(null);
    const [relationshipType, setRelationshipType] = useState("marriage");
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleSetRelationship = () => {
        setError("");
        if (selectedPerson1 !== null && selectedPerson2 !== null) {
            if (selectedPerson1 === selectedPerson2) {
                setError("Không thể tạo mối quan hệ với chính mình.");
                return;
            }
            if (relationshipType === "marriage") {
                const person1 = people[selectedPerson1];
                const person2 = people[selectedPerson2];
                if (person1.gender === person2.gender) {
                    setError("Hôn nhân chỉ có thể giữa nam và nữ.");
                    return;
                }
                // Check if parent-child relationship exists between them
                const isParentChild = relationships.parentChild.some(pc => 
                    (pc.parent === selectedPerson1 && pc.child === selectedPerson2) ||
                    (pc.parent === selectedPerson2 && pc.child === selectedPerson1)
                );
                if (isParentChild) {
                    setError("Không thể kết hôn giữa cha mẹ và con cái.");
                    return;
                }
                // Check if either person is already married
                const existingMarriages = relationships.marriages;
                const isPerson1Married = existingMarriages.some(m => m.husband === selectedPerson1 || m.wife === selectedPerson1);
                const isPerson2Married = existingMarriages.some(m => m.husband === selectedPerson2 || m.wife === selectedPerson2);
                if (isPerson1Married || isPerson2Married) {
                    setError("Một trong hai người đã kết hôn rồi.");
                    return;
                }
                onSetMarriage(selectedPerson1, selectedPerson2);
            } else if (relationshipType === "parent-child") {
                if (selectedPerson1 === selectedPerson2) {
                    setError("Không thể tạo mối quan hệ cha mẹ - con cái với chính mình.");
                    return;
                }
                onSetParentChild(selectedPerson1, selectedPerson2);
            }
        }
        onClose();
    };

    return (
        <div className="delete-popup">
            <div className="delete-popup-content" style={{ maxWidth: "600px" }}>
                <h5>Thiết lập mối quan hệ</h5>
                <div className="mb-3">
                    <label className="form-label">Loại mối quan hệ:</label>
                    <select
                        className="form-select"
                        value={relationshipType}
                        onChange={(e) => setRelationshipType(e.target.value)}
                    >
                        <option value="marriage">Hôn nhân</option>
                        <option value="parent-child">Cha mẹ - Con cái</option>
                    </select>
                </div>
                <div className="row">
                    <div className="col-6">
                        <label className="form-label">Người 1:</label>
                        <select
                            className="form-select"
                            value={selectedPerson1 !== null ? selectedPerson1 : ""}
                            onChange={(e) => setSelectedPerson1(parseInt(e.target.value))}
                        >
                            <option value="">Chọn người</option>
                            {people.map((person, index) => (
                                <option key={index} value={index}>
                                    {person.name} ({person.gender ? "Nữ" : "Nam"})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-6">
                        <label className="form-label">Người 2:</label>
                        <select
                            className="form-select"
                            value={selectedPerson2 !== null ? selectedPerson2 : ""}
                            onChange={(e) => setSelectedPerson2(parseInt(e.target.value))}
                        >
                            <option value="">Chọn người</option>
                            {people.map((person, index) => (
                                <option key={index} value={index}>
                                    {person.name} ({person.gender ? "Nữ" : "Nam"})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                <div className="d-flex justify-content-end mt-3">
                    <button
                        className="btn btn-success me-2"
                        onClick={handleSetRelationship}
                        disabled={selectedPerson1 === null || selectedPerson2 === null}
                    >
                        Thiết lập
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={onClose}
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RelationshipCreate_Popup;
