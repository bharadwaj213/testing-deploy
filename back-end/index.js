import express from "express";
import randomstring from "randomstring";
import cors from "cors";

const PORT = 3000;
const app = express();

let formsData = [];

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json(formsData);
});

app.post("/createNewForm", (req, res) => {
  const formID = randomstring.generate(7);
  const formTitle = "";
  const formDescription = "";
  const formQuestions = [];
  const formResponses = [];
  const defaultGroupID = randomstring.generate(7);
  const formGroups = [
    {
      groupID: defaultGroupID,
      groupName: "",
      groupLink: `http://localhost:5173/${formID}/${defaultGroupID}`,
    },
  ];
  formsData.push({
    formID: formID,
    formTitle: formTitle,
    formDescription: formDescription,
    formQuestions: formQuestions,
    formResponses: formResponses,
    formGroups: formGroups,
  });
  console.log(formsData);
  res.status(200).json({ msg: "Form created.", formID: formID });
});

// app.get("/getAllFormTitles", (req, res) => {
//   const allFormTitles = formsData.map((form) => form.formTitle);
//   res.status(200).json({allFormTitles: allFormTitles});
// });

app.get("/getAllFormTitlesIDs", (req, res) => {
  const allFormTitlesIDs = formsData.map((form) => ({
    formTitle: form.formTitle,
    formID: form.formID,
  }));
  res.status(200).json({ allFormTitlesIDs: allFormTitlesIDs });
});

app.put("/deleteForm", (req, res) => {
  // const id = req.body.formID;
  // formsData = formsData.filter((form) => form.formID != id);
  // res.json({ msg: "Form deleted." });
  const id = req.body.formID;
  const formIndex = formsData.findIndex((form) => form.formID === id);
  if (formIndex !== -1) {
    formsData.splice(formIndex, 1);
    console.log(formsData);
    res.status(200).json({ msg: "Form Deleted." });
  } else res.status(404).json({ msg: "Form not found." });
});

app.get("/getFormData/:id", (req, res) => {
  const form = formsData.filter((form) => form.formID === req.params.id);
  if (form) res.status(200).json({ form: form[0] });
  else res.status(404).json({ msg: "Form not found." });
});

app.put("/updateForm", (req, res) => {
  const id = req.body.formID;
  const formIndex = formsData.findIndex((form) => form.formID === id);
  if (formIndex !== -1) {
    formsData[formIndex].formTitle = req.body.formTitle;
    formsData[formIndex].formDescription = req.body.formDescription;
    formsData[formIndex].formQuestions = req.body.formQuestions;
    formsData[formIndex].formGroups = req.body.formGroups;
    console.log(formsData);
    formsData.forEach((f) => console.log(f.formQuestions));
    res.status(200).json({ msg: "Form updated." });
  } else res.status(404).json({ msg: "Form not found." });
});

app.get("/getFormResponses", (req, res) => {
  const id = req.body.id;
  const allResponses = formsData.filter((form) => form.id == id).responses;
  const allQuestions = formsData.filter((form) => form.id == id).questions;
  res.json({
    questions: allQuestions,
    responses: allResponses,
  });
});

app.post("/createNewFormGroup", (req, res) => {
  const id = req.body.formID;
  const formIndex = formsData.findIndex((form) => form.formID === id);
  if (formIndex !== -1) {
    formsData[formIndex].formGroups = req.body.formGroups;
    const defaultGroupID = randomstring.generate(7);
    formsData[formIndex].formGroups.push({
      groupID: defaultGroupID,
      groupName: "",
      groupLink: `http://localhost:5173/${id}/${defaultGroupID}`,
    });
    res.status(200).json({ msg: "New form group created." });
  } else res.status(404).json({ msg: "Form not found." });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ...`);
});

/*

[
    {
        questionType: 1,
        question: "aasdasdf sfsda  fsdfa",
        options: ["option1", "options2"]
    },
    {
        questionType: 2,
        question: "aasdasdf sfsda  fsdfa"
    }
]

[
    {
        groupID: 5345,
        groupName: "fsadfsdf",
        groupLink: ".........."
    }
]

*/
