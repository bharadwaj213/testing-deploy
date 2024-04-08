function MCQuestion() {
  return (
    <>
      <input type="text" />
      <input type="radio" name="questionType" value="mcq" id="mcq" />
      <label htmlFor="mcq">Multiple Choice Question</label>
      <input
        type="radio"
        name="questionType"
        value="shortAnswer"
        id="shortAnswer"
      />
      <label htmlFor="shortAnswer">Short Answer Question</label>
      <input type="radio" name="options" id="option1" value="option1" />
      <label htmlFor="mcq">Option 1</label>
    </>
  );
}

export default MCQuestion;
