import "../css/gender.css"
function Person({ name, birth, gender, inDeleteMode, isBeingSelected_forDelete, onClick }) {
    return (
        <div
            className={`person m-3 p-2
                        ${gender === false ? "male" : "female"}
                        ${inDeleteMode && isBeingSelected_forDelete ? "selected" : ""}`}
            onClick={onClick}
        >

            <img src={gender == true
                ? "src/img/sillhoute_female.png"
                : "src/img/sillhoute_male.png"
            } alt="person" />

            <div>
                <p><strong>Tên: </strong>{name}</p>
                <p><strong>Ngày sinh: </strong>{birth} </p>
            </div>

        </div>
    );
}

export default Person
