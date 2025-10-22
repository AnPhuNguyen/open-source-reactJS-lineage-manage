import { useState } from "react";
import AddElm_popUpBtn from "./AddElm_popUpBtn";
import AddElm_PopUpForm from "./AddElm_PopUpForm";
import Person from "./Person";
import DeleteElm_Btn from "./DeleteElm_Btn";
import DeleteElm_popUpMenu from "./DeleteElm_popUpMenu";
import Relationship_Btn from "./Relationship_Btn";
import RelationshipCreate_Popup from "./RelationshipCreate_Popup";
import Relationship_List_Popup from "./Relationship_List_Popup";
import "../css/gender.css"
import "../css/popup.css";
// import '../css/bootstrap.css';



function MemberContainer() {
    const [people, setPeople] = useState([]);
    const [popUp, setPopUp] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedIndices, setSelectedIndices] = useState([]);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showRelationshipPopup, setShowRelationshipPopup] = useState(false);
    const [showRelationshipListPopup, setShowRelationshipListPopup] = useState(false);
    const [relationships, setRelationships] = useState({ marriages: [], parentChild: [] });
    const [generations, setGenerations] = useState([[]]); // Array of arrays, each subarray is a generation


    /**
     * for the edit member function: click on a member displayed on screen
     * to open popup that allow user to edit that member's info
     *  */
    const handleFormSubmit = (formData) => {
        if (editingIndex !== null) {
            // Editing existing person
            setPeople(prev => prev.map((person, index) =>
                index === editingIndex ? formData : person
            ));
            setEditingIndex(null);
        } else {
            // Adding new person
            const newIndex = people.length;
            setPeople(prev => [...prev, formData]);
            // Add to first generation
            setGenerations(prev => {
                const newGens = [...prev];
                if (!newGens[0]) newGens[0] = [];
                newGens[0] = [...newGens[0], newIndex];
                return newGens;
            });
        }
    };

    /**
     * for the delete member function:
     * clicking on member(s) to put them in array 'selectedIndices'
     *  */
    const handlePersonClick = (index) => {
        if (isSelecting) {
            // Toggle selection
            setSelectedIndices(prev =>
                prev.includes(index)
                    ? prev.filter(i => i !== index)
                    : [...prev, index]
            );
        } else {
            setEditingIndex(index);
            setPopUp(true);
        }
    };

    /**
     * for setting relationships
     */
    const handleSetMarriage = (person1Index, person2Index) => {
        const person1 = people[person1Index];
        const person2 = people[person2Index];
        if (person1.gender !== person2.gender) {
            setRelationships(prev => ({
                ...prev,
                marriages: [...prev.marriages, { husband: person1Index, wife: person2Index }]
            }));
            // Arrange the generation row so the connection is visible
            // For simplicity, assume they are in the same generation and arrange them side by side
        }
    };

    const handleSetParentChild = (parentIndex, childIndex) => {
        setRelationships(prev => ({
            ...prev,
            parentChild: [...prev.parentChild, { parent: parentIndex, child: childIndex }]
        }));
        // Move the child to a new row as new generation
        // Find the generation of the parent
        let parentGen = -1;
        for (let i = 0; i < generations.length; i++) {
            if (generations[i].includes(parentIndex)) {
                parentGen = i;
                break;
            }
        }
        if (parentGen !== -1) {
            const childGen = parentGen + 1;
            if (!generations[childGen]) {
                setGenerations(prev => [...prev, []]);
            }
            setGenerations(prev => {
                const newGens = [...prev];
                // Remove child from current generation if present
                for (let gen of newGens) {
                    const idx = gen.indexOf(childIndex);
                    if (idx !== -1) {
                        gen.splice(idx, 1);
                        break;
                    }
                }
                // Add to new generation
                newGens[childGen] = [...newGens[childGen], childIndex];
                return newGens;
            });
        }
    };

    const handleDeleteMarriage = (index) => {
        setRelationships(prev => ({
            ...prev,
            marriages: prev.marriages.filter((_, idx) => idx !== index)
        }));
    };

    const handleDeleteParentChild = (index) => {
        setRelationships(prev => ({
            ...prev,
            parentChild: prev.parentChild.filter((_, idx) => idx !== index)
        }));
    };

    // screen-rendering
    return (
        <div className="container">
            <h2>Danh sách thành viên trong gia phả</h2>
            <div className="row justify-content-evenly">
                <div className="col-2">
                    <AddElm_popUpBtn onSubmit={handleFormSubmit} />
                </div>
                <div className="col-2">
                    <DeleteElm_Btn
                        isSelecting={isSelecting}
                        selectedIndices={selectedIndices}
                        onConfirmDelete={() => setShowDeletePopup(true)}
                        onCancelDelete={() => {
                            setIsSelecting(false);
                            setSelectedIndices([]);
                        }}
                        onStartSelecting={() => setIsSelecting(true)}
                    />
                </div>
                <div className="col-2">
                    <Relationship_Btn onSetRelationship={() => setShowRelationshipPopup(true)} />
                </div>
                <div className="col-2">
                    <button className="btn btn-info" onClick={() => setShowRelationshipListPopup(true)}>Xem mối quan hệ</button>
                </div>


            </div>

            <div className="mt-4">
                {generations.map((gen, genIndex) => (
                    <div key={genIndex} className="row mb-4" style={{ justifyContent: "center" }}>
                        {gen.map(personIndex => {
                            const person = people[personIndex];
                            return (
                                <Person
                                    key={personIndex}
                                    name={person.name}
                                    birth={person.birth}
                                    gender={person.gender}
                                    inDeleteMode={isSelecting}
                                    isBeingSelected_forDelete={selectedIndices.includes(personIndex)}
                                    onClick={() => handlePersonClick(personIndex)}
                                />
                            );
                        })}
                    </div>
                ))}

            </div>
            <AddElm_PopUpForm
                isOpen={popUp}
                onClose={() => {
                    setPopUp(false);
                    setEditingIndex(null);
                }}
                onSubmit={handleFormSubmit}
                initialData={editingIndex !== null ? people[editingIndex] : null}
            />
            <DeleteElm_popUpMenu
                isOpen={showDeletePopup}
                selectedIndices={selectedIndices}
                people={people}
                onConfirm={() => {
                    setPeople(prev => prev.filter((_, index) => !selectedIndices.includes(index)));
                    setSelectedIndices([]);
                    setIsSelecting(false);
                    setShowDeletePopup(false);
                }}
                onCancel={() => setShowDeletePopup(false)}
            />
            <RelationshipCreate_Popup
                isOpen={showRelationshipPopup}
                people={people}
                relationships={relationships}
                onClose={() => setShowRelationshipPopup(false)}
                onSetMarriage={handleSetMarriage}
                onSetParentChild={handleSetParentChild}
            />
            <Relationship_List_Popup
                isOpen={showRelationshipListPopup}
                people={people}
                relationships={relationships}
                onClose={() => setShowRelationshipListPopup(false)}
                onDeleteMarriage={handleDeleteMarriage}
                onDeleteParentChild={handleDeleteParentChild}
            />
        </div>
    );
}

export default MemberContainer;