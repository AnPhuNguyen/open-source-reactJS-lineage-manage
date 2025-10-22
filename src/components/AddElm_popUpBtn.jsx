import { useState } from "react";
import AddElm_PopUpForm from "./AddElm_PopUpForm";
import 'bootstrap-icons/font/bootstrap-icons.css';

/**
 * button that shows add member function
 * @param {*} clicking_submit_button 
 * @returns 
 */
function AddElm_popUpBtn({ onSubmit }) {
    const [popUp, setPopUp] = useState(false);

    return (
        <div>
            {!popUp && (
                <button
                    className="btn btn-success"
                    onClick={() => setPopUp(true)}
                >
                    <i className="bi bi-person-fill-add"></i> Thêm thành viên
                </button>
            )}

            <AddElm_PopUpForm
                isOpen={popUp}
                onClose={() => setPopUp(false)}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default AddElm_popUpBtn;