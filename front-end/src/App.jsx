import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";
import "./App.css";
import UserForm from "./components/UserForm";
import NAResponses from "./components/NAResponses";
import ResponseSubmitted from "./components/ResponseSubmitted";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form/:id" element={<Form />} />
          <Route path="/userform/:formID/:groupID" element={<UserForm />} />
          <Route path="/notAcceptingFormResponses" element={<NAResponses />} />
          <Route
            path="/formResponseSubmitted"
            element={<ResponseSubmitted />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
