import deleteIcon from "../assets/delete-icon.svg";

function GroupListItem({ content, updateFormGroup, handleDeleteFormGroup }) {
  const handleOnChangeUpdateForm = (e) => {
    const temp = {
      groupID: content.groupID,
      groupName: e.target.value,
      groupLink: content.groupLink,
    };
    updateFormGroup(temp);
  };

  return (
    <div className="group-list-item">
      <div className="group-name-list-item">
        <input
          type="text"
          className="form-control"
          value={content.groupName}
          onChange={handleOnChangeUpdateForm}
        />
      </div>
      <div className="group-link-list-item">
        <a href={content.groupLink}>{content.groupLink}</a>
      </div>
      <div
        className="delete-group-list-item"
        onClick={() => handleDeleteFormGroup(content.groupID)}
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

export default GroupListItem;
