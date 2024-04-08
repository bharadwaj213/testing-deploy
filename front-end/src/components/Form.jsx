import { useState } from "react";
import logo from "../assets/logo.svg";
import FormTitleDescription from "./FormTitleDescription";
import Question from "./Question";

function Form() {
  const [questions, setQuestions] = useState([
    {
      questionID: Math.floor(Math.random() * 10000),
      questionType: 1,
      question: "",
      options: ["option1", "option2", "option3", "option4"],
    },
  ]);

  const updateQuestion = (newQ) => {
    setQuestions((oldQuestions) => {
      const index = oldQuestions.findIndex(
        (q) => q.questionID === newQ.questionID
      );
      const newQuestions = [...oldQuestions];
      newQuestions[index] = newQ;
      return newQuestions;
    });
  };

  const handleDeleteQuestion = (id) => {
    setQuestions((oldQuestions) => {
      const newQuestions = oldQuestions.filter((q) => q.questionID !== id);
      return newQuestions;
    });
  };

  const handleAddQuestion = () => {
    setQuestions((q) => [
      ...q,
      {
        questionID: Math.floor(Math.random() * 10000),
        questionType: 1,
        question: "",
        options: ["option1", "options2", "option3", "option4"],
      },
    ]);
  };

  const handleSave = async () => {
    const response = await fetch("http://localhost:3000/createNewForm", {
      method: "POST",
      body: JSON.stringify({
        title: document.getElementById("form-title").value,
        description: document.getElementById("form-description").value,
        questions: questions,
      }),
    });
    const status = response.status;
    console.log(status);
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src={logo}
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            Forms Project
          </a>
        </div>
      </nav>
      <section>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="questions-tab"
              data-bs-toggle="tab"
              data-bs-target="#questions-tab-pane"
              type="button"
              role="tab"
              aria-controls="questions-tab-pane"
              aria-selected="true"
            >
              Questions
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="dashboard-tab"
              data-bs-toggle="tab"
              data-bs-target="#dashboard-tab-pane"
              type="button"
              role="tab"
              aria-controls="dashboard-tab-pane"
              aria-selected="false"
            >
              Dashboard
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="settings-tab"
              data-bs-toggle="tab"
              data-bs-target="#settings-tab-pane"
              type="button"
              role="tab"
              aria-controls="settings-tab-pane"
              aria-selected="false"
            >
              Settings
            </button>
          </li>
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="questions-tab-pane"
            role="tabpanel"
            aria-labelledby="questions-tab"
            tabIndex="0"
          >
            <section>
              <FormTitleDescription />
              <div className="add-question">
                <button className="btn btn-primary" onClick={handleAddQuestion}>
                  Add Question
                </button>
              </div>
              {questions.map((question, index) => (
                <Question
                  key={index}
                  handleDeleteQuestion={handleDeleteQuestion}
                  id={question.questionID}
                  content={question}
                  updateQuestion={updateQuestion}
                />
              ))}
            </section>
          </div>
          <div
            className="tab-pane fade"
            id="dashboard-tab-pane"
            role="tabpanel"
            aria-labelledby="dasboard-tab"
            tabIndex="0"
          >
            ...
          </div>
          <div
            className="tab-pane fade"
            id="settings-tab-pane"
            role="tabpanel"
            aria-labelledby="settings-tab"
            tabIndex="0"
          >
            ...
          </div>
        </div>
      </section>
    </>
  );
}

export default Form;
