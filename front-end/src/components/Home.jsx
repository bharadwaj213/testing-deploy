import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

function Home() {
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
        <Link to={"/form"} className="btn btn-primary marbtn">
          Create new form
        </Link>
      </section>
      <section>
        <h2>All forms</h2>
        <div></div>
      </section>
    </>
  );
}

export default Home;
