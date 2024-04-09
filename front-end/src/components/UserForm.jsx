import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserFormMCQ from "./UserFormMCQ";
import UserFormSAQ from "./UserFormSAQ";

function UserForm() {
  const [formData, setFormData] = useState({});
  const { formID, groupID } = useParams();
  const [questions, setQuestions] = useState([]);
  const [formResponse, setFormResponse] = useState({
    userResponseID: Math.floor(Math.random() * 9000) + 1000,
    userGroupID: groupID,
    userResponse: [],
  });
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${BACKEND_URL}/admin/getFormData/${formID}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      if (response.ok) {
        if (!json.form.formIsAcceptingResponses)
          navigate(`/notAcceptingFormResponses?title=${json.form.formTitle}`);
        setFormData(json.form);
        setQuestions(json.form.formQuestions);
      } else alert("Form not found !");
    };
    fetchData();
  }, []);

  const updateUserResponse = (res) => {
    setFormResponse((old) => {
      const temp = old.userResponse.filter(
        (r) => r.questionID !== res.questionID
      );
      const newR = old;
      newR.userResponse = temp;
      newR.userResponse.push(res);
      return newR;
    });
    console.log(formResponse);
  };

  const handleSubmit = async () => {
    const response = await fetch(`${BACKEND_URL}/user/saveUserFormResponse`, {
      method: "POST",
      body: JSON.stringify({
        formID: formID,
        formResponse: formResponse,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    console.log(json);
    navigate(
      `/formResponseSubmitted?title=${formData.formTitle}&id=${formID}&groupID=${groupID}`
    );
  };

  return (
    <>
      <section className="user-form-title-description-section">
        <div className="user-form-title-description-card">
          <div className="user-form-title">{formData.formTitle}</div>
          <div className="user-form-description">
            {formData.formDescription}
          </div>
        </div>
      </section>
      <section className="user-form-all-questions-section">
        {questions.map((q, index) => {
          if (q.questionType === 1)
            return (
              <UserFormMCQ
                key={index}
                content={q}
                updateUserResponse={updateUserResponse}
              />
            );
          else if (q.questionType === 2)
            return (
              <UserFormSAQ
                key={index}
                content={q}
                updateUserResponse={updateUserResponse}
              />
            );
          else return <h1>Something went out !!!</h1>;
        })}
      </section>
      <div className="user-form-submit">
        <button
          className="btn btn-primary user-form-submit-btn"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default UserForm;
