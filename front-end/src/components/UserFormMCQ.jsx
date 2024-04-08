function UserFormMCQ({ content, updateUserResponse }) {
  const handleUpdateUserResponse = (e) => {
    const res = {
      questionID: content.questionID,
      answer: content.options[e.target.value - 1],
    };
    updateUserResponse(res);
  };

  return (
    <div className="user-form-question-card">
      <div className="user-form-mc-question">
        <div className="user-form-mcq-text">{content.question}</div>
      </div>
      <div className="user-form-mcq-all-options">
        {content.options.map((option, index) => (
          <div
            className="user-form-mcq-option form-check"
            key={`option${index}-${option.optionID}`}
          >
            <input
              className="mcq-options-radio form-check-input"
              type="radio"
              name={"options" + index + content.questionID}
              id={"option" + index + content.questionID}
              value={index + 1}
              onChange={handleUpdateUserResponse}
            />
            <label
              className="form-check-label"
              htmlFor={"option" + index + content.questionID}
            >
              {option.optionValue}
            </label>
          </div>
        ))}
        {/* <div className="user-form-mcq-option form-check">
          <input
            className="mcq-options-radio form-check-input"
            type="radio"
            name={"options" + content.questionID}
            id={"option1" + content.questionID}
            value="1"
            onChange={handleUpdateUserResponse}
          />
          <label
            className="form-check-label"
            htmlFor={"option1" + content.questionID}
          >
            {content.options[0]}
          </label>
        </div>
        <div className="user-form-mcq-option form-check">
          <input
            className="mcq-options-radio form-check-input"
            type="radio"
            name={"options" + content.questionID}
            id={"option2" + content.questionID}
            value="2"
            onChange={handleUpdateUserResponse}
          />
          <label
            className="form-check-label"
            htmlFor={"option2" + content.questionID}
          >
            {content.options[1]}
          </label>
        </div>
        <div className="user-form-mcq-option form-check">
          <input
            className="mcq-options-radio form-check-input"
            type="radio"
            name={"options" + content.questionID}
            id={"option3" + content.questionID}
            value="3"
            onChange={handleUpdateUserResponse}
          />
          <label
            className="form-check-label"
            htmlFor={"option3" + content.questionID}
          >
            {content.options[2]}
          </label>
        </div>
        <div className="user-form-mcq-option form-check">
          <input
            className="mcq-options-radio form-check-input"
            type="radio"
            name={"options" + content.questionID}
            id={"option4" + content.questionID}
            value="4"
            onChange={handleUpdateUserResponse}
          />
          <label
            className="form-check-label"
            htmlFor={"option4" + content.questionID}
          >
            {content.options[3]}
          </label>
        </div> */}
      </div>
    </div>
  );
}

export default UserFormMCQ;
