import { useEffect, useState } from "react";
import GroupListItem from "./GroupListItem";
import { useNavigate } from "react-router-dom";

function Settings({
  content,
  updateFormGroup,
  handleDeleteFormGroup,
  handleAddFormGroup,
}) {
  const navigate = useNavigate();
  const [formIsAcceptingResponses, setFormIsAcceptingResponses] =
    useState(true);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${BACKEND_URL}/admin/getFormIsAcceptingResponses/${localStorage.getItem(
          "formID"
        )}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      console.log(json);
      setFormIsAcceptingResponses(json.formIsAcceptingResponses);
    };
    fetchData();
  }, []);

  const handleDeleteForm = async () => {
    const id = localStorage.getItem("formID");

    const response = await fetch(`${BACKEND_URL}/admin/deleteForm/${id}`, {
      method: "DELETE",
    });
    const json = await response.json();
    console.log(json);
    localStorage.removeItem("formID");
    navigate("/");
  };

  const handleFormIsAcceptingResponses = async (formIsAcceptingResponses) => {
    setFormIsAcceptingResponses(formIsAcceptingResponses);
    const id = localStorage.getItem("formID");
    const response = await fetch(
      `${BACKEND_URL}/admin/setIsAcceptingResponses`,
      {
        method: "POST",
        body: JSON.stringify({
          formID: id,
          formIsAcceptingResponses: formIsAcceptingResponses,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const json = await response.json();
    console.log(json);
  };

  return (
    <div className="settings-page">
      <div className="delete-form-settings">
        <div className="delete-form-button-settings">
          <button
            className="btn btn-danger delete-form-btn"
            onClick={() => handleDeleteForm()}
          >
            Delete form
          </button>
        </div>
        <div className="responses-off-div">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckChecked"
              onChange={(e) => handleFormIsAcceptingResponses(e.target.checked)}
              checked={formIsAcceptingResponses}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckChecked"
            >
              Accepting responses
            </label>
          </div>
        </div>
      </div>
      <div className="all-groups">
        <div className="add-new-group">
          <button
            className="btn btn-primary"
            onClick={() => handleAddFormGroup()}
          >
            Add group
          </button>
        </div>
        <div className="all-groups-list">
          {content.map((group, index) => (
            <GroupListItem
              key={index}
              content={group}
              updateFormGroup={updateFormGroup}
              handleDeleteFormGroup={handleDeleteFormGroup}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Settings;
