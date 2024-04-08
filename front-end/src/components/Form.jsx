import logo from "../assets/notepad-sheet-svgrepo-com.svg";
import MCQuestion from "./MCQuestion";

function Form() {
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
        <div></div>
      </section>
      <section>
        <div></div>
        <MCQuestion />
      </section>
    </>
  );
}

export default Form;
