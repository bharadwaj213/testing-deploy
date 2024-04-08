function UserFormSAQ({ content, updateUserResponse }) {
  const handleUpdateUserResponse = (e) => {
    const res = {
      questionID: content.questionID,
      answer: e.target.value,
    };
    updateUserResponse(res);
  };

  return (
    <div className="user-form-question-card">
      <div className="user-form-sa-question">
        <div className="user-form-sa-text">{content.question}</div>
      </div>
      <div className="user-form-saq-answer">
        <input
          className="form-control"
          type="text"
          placeholder="Answer"
          onChange={handleUpdateUserResponse}
        />
      </div>
    </div>
  );
}

export default UserFormSAQ;
