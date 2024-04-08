function NAResponses() {
  const qParams = new URLSearchParams(window.location.search);
  const formTitle = qParams.get("title");

  return (
    <div className="na-responses-div">
      <div className="na-responses-card">
        <div className="na-responses-form-title">{formTitle}</div>
        <p className="na-responses-description">
          This form is no longer accepting responses.
        </p>
      </div>
    </div>
  );
}

export default NAResponses;
