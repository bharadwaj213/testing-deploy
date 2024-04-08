function SAQuestion({ content, updateQuestion }) {
  var saQuestion = {
    questionID: content.questionID,
    questionType: content.questionType,
    question: content.question,
  };
  return (
    <div className="sa-question">
      <div className="question-sa-type">
        <input
          type="text"
          placeholder="Question"
          className="form-control"
          onChange={(e) => {
            saQuestion.question = e.target.value;
            updateQuestion(saQuestion);
          }}
          value={content.question}
        />
      </div>
      <div className="short-answer">
        <input
          type="text"
          placeholder="Short Answer"
          className="form-control"
        />
      </div>
    </div>
  );
}

export default SAQuestion;
