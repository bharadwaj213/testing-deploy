import { useState } from "react";

function FormTitleDescription({ store, formContent }) {
  return (
    <div className="form-title-description">
      <div className="form-title-description-inner">
        <input
          type="text"
          id="form-title"
          placeholder="Form Title"
          className="form-control"
          defaultValue={formContent[0]}
          onChange={(e) => {
            store([e.target.value, formContent[1]]);
          }}
        />
        <input
          type="text"
          id="form-description"
          placeholder="Form Description"
          className="form-control"
          defaultValue={formContent[1]}
          onChange={(e) => {
            store([formContent[0], e.target.value]);
          }}
        />
      </div>
    </div>
  );
}

export default FormTitleDescription;
