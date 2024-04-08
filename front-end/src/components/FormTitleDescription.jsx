import { useState } from "react";

function FormTitleDescription(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="form-title-description">
      <div className="form-title-description-inner">
        <input
          type="text"
          id="form-title"
          placeholder="Form Title"
          className="form-control"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          id="form-description"
          placeholder="Form Description"
          className="form-control"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </div>
  );
}

export default FormTitleDescription;
