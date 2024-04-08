// import { useState, useEffect, useMemo } from "react";
// import OptionListItem from "./OptionListItem";

// function MCQuestion({ content, optionsp, updateQuestion }) {
//   //const [content, setContent] = useState(contents);
//   // var mcQuestion = {
//   //   questionID: content.questionID,
//   //   questionType: content.questionType,
//   //   question: content.question,
//   //   options: content.options,
//   // };
//   const [options, setOptions] = useState(content.options);
//   const [mcQuestion, setMcQuestion] = useState({
//     questionID: content.questionID,
//     questionType: content.questionType,
//     question: content.question,
//     options: content.options,
//   });
//   useEffect(() => {
//     setMcQuestion({
//       questionID: content.questionID,
//       questionType: content.questionType,
//       question: content.question,
//       options: content.options,
//     });
//   }, [content]);

//   /* useMemo(() => {
//     setMcQuestion({
//       questionID: content.questionID,
//       questionType: content.questionType,
//       question: content.question,
//       options: content.options,
//     });
//   }, [content]); */

//   const [localOptions, setLocalOptions] = useState(content.options);

//   // Use effect hook to update local state when the prop changes
//   useEffect(() => {
//     // Update localOptions with the latest content.options
//     setLocalOptions(content.options);

//     // Since setLocalOptions does not immediately update localOptions,
//     // we directly use content.options to ensure mcQuestion is updated
//     // with the most current options from the parent.
//     setMcQuestion((oldMcQuestion) => ({
//       ...oldMcQuestion,
//       options: content.options,
//     }));
//   }, [content.options]);

//   const handleAddOptionListItem = () => {
//     const option = {
//       optionID: Math.floor(Math.random() * 900) + 100,
//       optionValue: "",
//     };
//     content.options.push(option);

//     setMcQuestion((oldMcQuestion) => {
//       const newMcQuestion = {
//         ...oldMcQuestion,
//         options: [...oldMcQuestion.options, option],
//       };
//       return newMcQuestion;
//     });

//     updateQuestion(mcQuestion);
//   };

//   const handleDeleteOptionListItem = (id) => {
//     console.log("Before delete", mcQuestion.options);
//     console.log("Deleting option with id", id);

//     const updatedOptions = localOptions.filter(
//       (option) => option.optionID !== optionID
//     );
//     setLocalOptions(updatedOptions);

//     setMcQuestion((oldMcQuestion) => {
//       const optionsCopy = [...oldMcQuestion.options];

//       // Find the index of the option with the matching optionID
//       const index = optionsCopy.findIndex((option) => option.optionID === id);
//       console.log("Index of option to delete", index);
//       // If the option is found, remove it from the array
//       if (index !== -1) {
//         optionsCopy.splice(index, 1);
//       }
//       /* console.log("Options after delete", optionsCopy);
//       content.options = optionsCopy;
//       console.log("Content options after delete", content.options);
//  */
//       // Return the updated mcQuestion object with the modified options array
//       console.log({
//         ...oldMcQuestion,
//         options: optionsCopy,
//       });
//       return {
//         ...oldMcQuestion,
//         options: optionsCopy,
//       };
//     });

//     console.log("After delete", mcQuestion.options);
//     updateQuestion(mcQuestion);
//     console.log("afgter delete", mcQuestion.options);
//   };

//   const updateOption = (option) => {
//     /* setOptions((oldOptions) => {
//       const index = oldOptions.findIndex((o) => o.optionID === option.optionID);
//       const newOptions = [...oldOptions];
//       newOptions[index] = option;
//       return newOptions;
//     });
//     mcQuestion.options = options; //.map((option) => option.value);
//     updateQuestion(mcQuestion); */
//     setMcQuestion((oldMcQuestion) => {
//       const newMcQuestion = { ...oldMcQuestion };
//       const index = newMcQuestion.options.findIndex(
//         (o) => o.optionID === option.optionID
//       );
//       newMcQuestion.options[index] = option;
//       return newMcQuestion;
//     });
//     content.options = mcQuestion.options;
//     updateQuestion(mcQuestion);
//   };

//   return (
//     <div className="mcq-question">
//       <div className="question-mcq-type">
//         <input
//           type="text"
//           placeholder="Question"
//           className="form-control"
//           onChange={(e) => {
//             // setQuestion(e.target.value)
//             mcQuestion.question = e.target.value;
//             updateQuestion(mcQuestion);
//           }}
//           value={content.question}
//         />
//       </div>
//       <div className="all-options">
//         <div className="dynamic-option">
//           {mcQuestion.options.map((option, index) => (
//             <OptionListItem
//               key={index}
//               Option={option}
//               updateOption={updateOption}
//               handleAddOptionListItem={handleAddOptionListItem}
//               handleDeleteOptionListItem={handleDeleteOptionListItem}
//             />
//           ))}
//           {/* options.map((option, index) => (
//             <OptionListItem
//               key={index}
//               Option={option}
//               updateOption={updateOption}
//               handleAddOptionListItem={handleAddOptionListItem}
//               handleDeleteOptionListItem={handleDeleteOptionListItem}
//             />
//           ))} */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MCQuestion;

import { useState, useEffect } from "react";
import OptionListItem from "./OptionListItem";

function MCQuestion({ content, updateQuestion }) {
  const [options, setOptions] = useState(content.options);

  useEffect(() => {
    setOptions(content.options);
  }, [content.options]);

  const handleAddOptionListItem = () => {
    const newOption = {
      optionID: Math.floor(Math.random() * 900) + 100,
      optionValue: "",
    };
    const updatedOptions = [...options, newOption];
    setOptions(updatedOptions);
    propagateChanges(updatedOptions);
  };

  const handleDeleteOptionListItem = (id) => {
    const updatedOptions = options.filter((option) => option.optionID !== id);
    setOptions(updatedOptions);
    propagateChanges(updatedOptions);
  };

  const updateOption = (optionToUpdate) => {
    const updatedOptions = options.map((option) =>
      option.optionID === optionToUpdate.optionID ? optionToUpdate : option
    );
    setOptions(updatedOptions);
    propagateChanges(updatedOptions);
  };

  // Helper function to update parent component
  const propagateChanges = (updatedOptions) => {
    updateQuestion({
      ...content,
      options: updatedOptions,
    });
  };

  return (
    <div className="mcq-question">
      <div className="question-mcq-type">
        <input
          type="text"
          placeholder="Question"
          className="form-control"
          onChange={(e) => {
            const updatedQuestion = { ...content, question: e.target.value };
            updateQuestion(updatedQuestion);
          }}
          value={content.question}
        />
      </div>
      <div className="all-options">
        <div className="dynamic-option">
          {options.map((option, index) => (
            <OptionListItem
              key={option.optionID} // Using optionID as key instead of index for better performance
              Option={option}
              updateOption={updateOption}
              handleAddOptionListItem={handleAddOptionListItem}
              handleDeleteOptionListItem={handleDeleteOptionListItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MCQuestion;
