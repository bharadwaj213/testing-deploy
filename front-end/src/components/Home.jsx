import { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import { Link, json, useNavigate } from "react-router-dom";
import FormListItem from "./FormListItem";

function Home() {
  const [allFormTitlesIDs, setAllFormTitlesIDs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("formID");
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:3000/getAllFormTitlesIDs",
        {
          method: "GET",
        }
      );
      const json = await response.json();
      console.log(json);
      setAllFormTitlesIDs(json.allFormTitlesIDs);
    };
    fetchData();
  }, []);

  const handleCreateNewForm = async () => {
    const response = await fetch("http://localhost:3000/createNewForm", {
      method: "POST",
      body: JSON.stringify({
        formTitle: "",
        formDescription: "",
        formQuestions: [],
      }),
    });
    const json = await response.json();
    console.log(json);
    localStorage.setItem("formID", json.formID);
    navigate(`/form/${json.formID}`);
  };

  const handleDeleteFormListItem = async (id) => {
    localStorage.removeItem("formID");
    const response = await fetch("http://localhost:3000/deleteForm", {
      method: "PUT",
      body: JSON.stringify({
        formID: id,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (response.ok) {
      console.log(json.msg);
      setAllFormTitlesIDs((titles) => {
        const newTitles = titles.filter((t) => t.formID !== id);
        return newTitles;
      });
      console.log(allFormTitlesIDs);
    } else console.log(json.msg);
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
      <section className="create-new-form">
        <button className="btn btn-primary" onClick={handleCreateNewForm}>
          Create new form
        </button>
        {/* <Link
          to={`/form/${localStorage.getItem("formID")}`}
          className="btn btn-primary marbtn"
          onClick={handleCreateNewForm}
        >
          Create new form
        </Link> */}
      </section>
      <section className="all-forms-list-section">
        <h2 className="all-forms-heading">All forms</h2>
        <div className="all-forms-list">
          {allFormTitlesIDs.map((form, index) => (
            <FormListItem
              key={index}
              title={form.formTitle}
              id={form.formID}
              handleDeleteFormListItem={handleDeleteFormListItem}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
