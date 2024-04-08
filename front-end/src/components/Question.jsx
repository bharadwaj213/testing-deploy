import MCQuestion from "./MCQuestion";
import deleteIcon from "../assets/delete-icon.svg";
import { useState } from "react";
import SAQuestion from "./SAQuestion";

function Question({ handleDeleteQuestion, id, content, updateQuestion }) {
  const [questionType, setQuestionType] = useState(1);

  return (
    <div className="form-question">
      <div className="form-question-inner">
        {questionType == 1 && (
          <MCQuestion content={content} updateQuestion={updateQuestion} />
        )}
        {questionType == 2 && (
          <SAQuestion content={content} updateQuestion={updateQuestion} />
        )}
        <div className="question-type-selection">
          <div className="question-types">
            {/* <div className="question-type-option">
              <input type="radio" name="questionType" value="mcq" id="mcq" />
              <label htmlFor="mcq">Multiple Choice Question</label>
            </div>
            <div className="question-type-option">
              <input
                type="radio"
                name="questionType"
                value="shortAnswer"
                id="shortAnswer"
              />
              <label htmlFor="shortAnswer">Short Answer Question</label>
            </div> */}
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select Question Type
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={(e) => setQuestionType(1)}
                  >
                    Multiple Choice Question {/* id : 1 */}
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={(e) => setQuestionType(2)}
                  >
                    Short Answer Question {/* id : 2 */}
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="question-delete-button"
            onClick={() => {
              handleDeleteQuestion(id);
            }}
          >
            <img
              src={deleteIcon}
              alt="Delete"
              width="25"
              height="25"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;