import express from "express";
import randomstring from "randomstring";

const PORT = 3000;
const app = express();

let formsData = [];

app.use(express.json());

app.get("/", (req, res) => {
  res.json(formsData);
});

app.post("/createNewForm", (req, res) => {
  const formID = randomstring.generate(7);
  const formTitle = req.body.title;
  const formDescription = req.body.description;
  const questions = req.body.questions;
  formsData.push({
    id: formID,
    title: formTitle,
    description: formDescription,
    questions: questions,
    responses: [],
  });
  res.json(formsData);
});

app.get("/getAllFormTitles", (req, res) => {
  const allFormTitles = formsData.map((form) => form.title);
  res.json(allFormTitles);
});

app.put("/deleteForm", (req, res) => {
  //req has form ID in body
  const id = req.body.id;
  formsData = formsData.filter((form) => form.id != id);
  res.json({ msg: "Form deleted." });
});

app.get("/getFormData", (req, res) => {
  const form = formsData.filter((form) => form.id == req.body.id);
  res.json(form);
});

app.put("/updateForm", (req, res) => {
  const id = req.body.id;
  const responses = formsData.filter((form) => form.id == id).responses;
  formsData = formsData.filter((form) => form.id != id);
  const formID = id;
  const formTitle = req.body.title;
  const formDescription = req.body.description;
  const questions = req.body.questions;
  formsData.push({
    id: formID,
    title: formTitle,
    description: formDescription,
    questions: questions,
    responses: responses,
  });
  res.json(formsData);
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

*/
