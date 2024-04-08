import { useNavigate } from "react-router-dom";
import deleteIcon from "../assets/delete-icon.svg";

function FormListItem({ title, id, handleDeleteFormListItem }) {
  const navigate = useNavigate();
  const handleOpenForm = () => {
    localStorage.setItem("formID", id);
    navigate(`/form/${id}`);
  };

  return (
    <div className="form-list-item">
      <div className="form-title-list-item" onClick={handleOpenForm}>
        {title}
      </div>
      <div
        className="delete-form-list-item"
        onClick={() => handleDeleteFormListItem(id)}
      >
        <img
          src={deleteIcon}
          alt="Delete"
          width="20"
          height="20"
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
}

export default FormListItem;
