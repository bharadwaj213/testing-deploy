import React, { useState, useEffect } from "react";
import deleteIcon from "../assets/delete-icon.svg";
import plusIcon from "../assets/circle-plus-icon.svg";

function OptionListItem({
  Option,
  handleAddOptionListItem,
  handleDeleteOptionListItem,
  updateOption,
}) {
  const [option, setOption] = useState(Option);
  useEffect(() => {
    if (Option !== option) {
      setOption(Option);
    }
  }, [Option]);

  const handleAddOptionListIte = () => {
    console.log("handleAddOptionListItem called");
    handleAddOptionListItem();
  };

  return (
    <div className="option">
      <input type="radio" name="options" id="option" value="option1" />
      <input
        type="text"
        placeholder="Option Value"
        className="form-control"
        onChange={(e) => {
          //const updatedOption = { ...option, optionValue: e.target.value };
          const updatedOption = {
            optionID: option.optionID,
            optionValue: e.target.value,
          };
          setOption(updatedOption);
          updateOption(updatedOption); // Ensure this updates the parent's state correctly
        }}
        value={option.optionValue}
      />
      <div className="add-option">
        {/*  <button
          className="btn btn-primary"
          onClick={() => handleAddOptionListItem()}
        >
          Add Question
        </button> */}
        <div
          className="option-add-button"
          onClick={() => {
            console.log("Button clicked");
            handleAddOptionListIte();
          }}
        >
          <img
            src={plusIcon}
            alt="Add Option"
            width="25"
            height="25"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <div className="delete-option">
        <div
          className="option-delete-button"
          onClick={() => {
            console.log("Button clicked");
            handleDeleteOptionListItem(option.optionID);
          }}
        >
          <img
            src={deleteIcon}
            alt="Delete"
            width="25"
            height="25"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
}

export default OptionListItem;
