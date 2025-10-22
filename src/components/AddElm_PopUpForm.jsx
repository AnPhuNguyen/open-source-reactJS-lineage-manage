import { useState, useEffect } from "react";
import '../css/popup.css';

function AddElm_PopUpForm({ isOpen, onClose, onSubmit, initialData }) {
    const [checked, setChecked] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        birth: '',
        gender: false,
        note: ''
    });

    //false = male - nam, true = female - nu

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
            setChecked(initialData.gender === true);
        } else {
            setFormData({ name: '', birth: '', gender: false, note: '' });
            setChecked(false);
        }
    }, [initialData]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleCheckboxChange = () => {
        setChecked(!checked);
        setFormData(prev => ({
            ...prev,
            gender: !checked ? true : false
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
        setFormData({ name: '', birth: '', gender: false, note: '' });
        setChecked(false);
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="popup-backdrop"></div>
            <div style={{}} className="border border-3 p-3 w-50 popup-container">
                <button
                    className="btn btn-danger btn-sm"
                    onClick={onClose}
                >
                    X  thoát
                </button>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Tên</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Nhập tên..."
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="birth">Ngày sinh</label>
                        <input
                            type="date"
                            className="form-control"
                            id="birth"
                            value={formData.birth}
                            onChange={handleInputChange}
                            
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="gender">Giới tính</label>
                        <input
                            type="checkbox"
                            id="gender"
                            checked={checked}
                            onChange={handleCheckboxChange}
                        />
                        <p>{(formData.gender == true)?"nữ":"nam"}</p>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="note" className="mb-2">Ghi chú</label>
                        <textarea name="" id="note" className="form-control" value={formData.note} onChange={handleInputChange}></textarea>
                    </div>
                    <br />
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        hoàn tất
                    </button>
                </form>
            </div>
        </>
    );
}

export default AddElm_PopUpForm;
