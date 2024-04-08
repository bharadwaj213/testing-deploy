import GroupListItem from "./GroupListItem";
import { useNavigate } from "react-router-dom";

function Settings({
  content,
  updateFormGroup,
  handleDeleteFormGroup,
  handleAddFormGroup,
}) {
  const navigate = useNavigate();

  const handleDeleteForm = async () => {
    const id = localStorage.getItem("formID");
    const response = await fetch("http://localhost:3000/deleteForm", {
      method: "PUT",
      body: JSON.stringify({
        formID: id,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    // if (response.ok) {
    //   console.log(json);
    //   setAllFormTitlesIDs((titles) => {
    //     const newTitles = titles.filter((t) => t.formID !== id);
    //     return newTitles;
    //   });
    //   console.log(allFormTitlesIDs);
    // } else console.log(json);
    console.log(json);
    localStorage.removeItem("formID");
    navigate("/");
  };

  return (
    <div className="settings-page">
      <div className="delete-form-button-settings">
        <button className="btn btn-primary" onClick={() => handleDeleteForm()}>
          Delete form
        </button>
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
