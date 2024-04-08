function MCQuestion({ content, updateQuestion }) {
  var mcQuestion = {
    questionID: content.questionID,
    questionType: content.questionType,
    question: content.question,
    options: content.options,
  };

  return (
    <div className="mcq-question">
      <div className="question-mcq-type">
        <input
          type="text"
          placeholder="Question"
          className="form-control"
          onChange={(e) => {
            // setQuestion(e.target.value)
            mcQuestion.question = e.target.value;
            updateQuestion(mcQuestion);
          }}
          value={content.question}
        />
      </div>
      <div className="all-options">
        <div className="option">
          <input type="radio" name="options" id="option1" value="option1" />
          <input
            type="text"
            placeholder="Option 1"
            className="form-control"
            onChange={(e) => {
              mcQuestion.options[0] = e.target.value;
              updateQuestion(mcQuestion);
            }}
            value={content.options[0]}
          />
        </div>
        <div className="option">
          <input type="radio" name="options" id="option2" value="option2" />
          <input
            type="text"
            placeholder="Option 2"
            className="form-control"
            onChange={(e) => {
              mcQuestion.options[1] = e.target.value;
              updateQuestion(mcQuestion);
            }}
            value={content.options[1]}
          />
        </div>
        <div className="option">
          <input type="radio" name="options" id="option3" value="option3" />
          <input
            type="text"
            placeholder="Option 3"
            className="form-control"
            onChange={(e) => {
              mcQuestion.options[2] = e.target.value;
              updateQuestion(mcQuestion);
            }}
            value={content.options[2]}
          />
        </div>
        <div className="option">
          <input type="radio" name="options" id="option4" value="option4" />
          <input
            type="text"
            placeholder="Option 4"
            className="form-control"
            onChange={(e) => {
              mcQuestion.options[3] = e.target.value;
              updateQuestion(mcQuestion);
            }}
            value={content.options[3]}
          />
        </div>
      </div>
    </div>
  );
}

export default MCQuestion;
