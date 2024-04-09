import { useState, useEffect } from "react";

function ResponseSubmitted() {
  const qParams = new URLSearchParams(window.location.search);
  const formTitle = qParams.get("title");
  const formID = qParams.get("id");
  const formGroupID = qParams.get("groupID");

  const [formGroupLink, setFormGroupLink] = useState();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${BACKEND_URL}/user/getFormGroupLink/${formID}/${formGroupID}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      console.log(json);
      setFormGroupLink(json.groupLink);
    };
    fetchData();
  });

  return (
    <div className="response-submitted-div">
      <div className="response-submitted-card">
        <div className="response-submitted-form-title">{formTitle}</div>
        <p className="response-submitted-description">
          Your response has been recorded.
        </p>
        <a
          className="response-submitted-sar"
          href={`${BACKEND_URL}/userform/${formID}/${formGroupID}`}
        >
          Submit another response
        </a>
      </div>
    </div>
  );
}

export default ResponseSubmitted;
