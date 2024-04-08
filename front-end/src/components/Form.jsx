import { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import FormTitleDescription from "./FormTitleDescription";
import Question from "./Question";
import Settings from "./Settings";
import Dashboard from "./Dashboard";

function Form() {
  const [questions, setQuestions] = useState([
    {
      questionID: Math.floor(Math.random() * 9000) + 1000,
      questionType: 1,
      question: "",
      options: [
        { optionID: Math.floor(Math.random() * 9000) + 1000, optionValue: "" },
      ],
    },
  ]);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formGroups, setFormGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/admin/getFormData/${localStorage.getItem("formID")}`,

        //`http://localhost:3000/getFormData/${localStorage.getItem("formID")}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      console.log(json);
      setFormTitle(json.form.formTitle);
      setFormDescription(json.form.formDescription);
      setFormGroups(json.form.formGroups);
      if (json.form.formQuestions.length !== 0)
        setQuestions(json.form.formQuestions);
    };
    fetchData();
  }, []);

  const storeTitleDescription = (arr) => {
    setFormTitle(arr[0]);
    setFormDescription(arr[1]);
    console.log(formTitle);
    console.log(formDescription);
  };

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
        questionID: Math.floor(Math.random() * 9000) + 1000,
        questionType: 1,
        question: "",
        options: [
          {
            optionID: Math.floor(Math.random() * 9000) + 1000,
            optionValue: "",
          },
        ],
      },
    ]);
  };

  const updateFormGroup = (newG) => {
    setFormGroups((oldGroups) => {
      const index = oldGroups.findIndex((g) => g.groupID === newG.groupID);
      const newGroups = [...oldGroups];
      newGroups[index] = newG;
      return newGroups;
    });
    console.log(formGroups);
  };

  const handleDeleteFormGroup = (id) => {
    if (formGroups.length === 1)
      alert("Cannot delete. Only 1 form group is present !");
    else {
      setFormGroups((oldGroups) => {
        const newGroups = oldGroups.filter((g) => g.groupID !== id);
        return newGroups;
      });
    }
  };

  const handleAddFormGroup = async () => {
    const id = localStorage.getItem("formID");
    const response = await fetch(
      `/api/admin/createNewFormGroup/${id}`,
      //`http://localhost:3000/createNewFormGroup/${id}`,
      {
        method: "GET",
        // body: JSON.stringify({
        //   formID: id,
        //   formGroups: formGroups,
        // }),
        // headers: { "Content-Type": "application/json" },
      }
    );
    const json = await response.json();
    const newGroup = json.formGroup;
    console.log(json);
    setFormGroups((oldGroups) => [...oldGroups, newGroup]);
  };

  const handleSave = async () => {
    const id = localStorage.getItem("formID");
    const response = await fetch(
      `/api/admin/updateForm`,
      //"http://localhost:3000/updateForm"
      {
        method: "PUT",
        body: JSON.stringify({
          formID: id,
          formTitle: formTitle,
          formDescription: formDescription,
          formQuestions: questions,
          formGroups: formGroups,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const json = await response.json();
    console.log(json);
    alert("Form Saved !");
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
          <button
            className="btn btn-primary save-form-btn"
            onClick={handleSave}
          >
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
            <div className="form-questions-tab">
              <FormTitleDescription
                store={storeTitleDescription}
                formContent={[formTitle, formDescription]}
              />
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
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="dashboard-tab-pane"
            role="tabpanel"
            aria-labelledby="dasboard-tab"
            tabIndex="0"
          >
            <Dashboard />
          </div>
          <div
            className="tab-pane fade"
            id="settings-tab-pane"
            role="tabpanel"
            aria-labelledby="settings-tab"
            tabIndex="0"
          >
            <Settings
              content={formGroups}
              updateFormGroup={updateFormGroup}
              handleDeleteFormGroup={handleDeleteFormGroup}
              handleAddFormGroup={handleAddFormGroup}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Form;
