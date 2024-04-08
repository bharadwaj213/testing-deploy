import express from "express";
import randomstring from "randomstring";
import cors from "cors";
import mongoose from "mongoose";
import Form from "./models/formModel.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const forms = await Form.find({});
  res.json(forms);
});

app.get("/createNewForm", async (req, res) => {
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
      groupLink: `http://localhost:5173/userform/${formID}/${defaultGroupID}`,
    },
  ];
  try {
    const form = await Form.create({
      formID: formID,
      formTitle: formTitle,
      formDescription: formDescription,
      formQuestions: formQuestions,
      formResponses: formResponses,
      formGroups: formGroups,
    });
    console.log(form);
    res.status(200).json({ msg: "Form created.", form: form });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Form creation failed !", errorMsg: error.message });
  }
});

app.get("/getAllFormTitlesIDs", async (req, res) => {
  try {
    const allFormTitlesIDs = await Form.find(
      {},
      { formID: true, formTitle: true, _id: false }
    );
    console.log(allFormTitlesIDs);
    res.status(200).json({ allFormTitlesIDs: allFormTitlesIDs });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "See error message !", errorMsg: error.message });
  }
});

app.delete("/deleteForm/:id", async (req, res) => {
  try {
    const result = await Form.deleteOne({ formID: req.params.id });
    console.log(result);
    if (result.deletedCount === 1)
      res.status(200).json({ msg: "Form Deleted." });
    else res.status(404).json({ msg: "Form not found." });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "See error message !", errorMsg: error.message });
  }
});

app.get("/getFormData/:id", async (req, res) => {
  try {
    const form = await Form.findOne({ formID: req.params.id });
    console.log(form);
    if (form) res.status(200).json({ form: form });
    else res.status(404).json({ msg: "Form not found." });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "See error message !", errorMsg: error.message });
  }
});

app.put("/updateForm", async (req, res) => {
  try {
    const updatedForm = {
      $set: {
        formTitle: req.body.formTitle,
        formDescription: req.body.formDescription,
        formQuestions: req.body.formQuestions,
        formGroups: req.body.formGroups,
      },
    };
    const result = await Form.updateOne(
      { formID: req.body.formID },
      updatedForm
    );
    console.log(result);
    if (result.modifiedCount === 1)
      res.status(200).json({ msg: "Form updated." });
    else res.status(404).json({ msg: "Form not found." });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "See error message !", errorMsg: error.message });
  }
});

app.get("/createNewFormGroup/:id", async (req, res) => {
  try {
    const formGroupsObj = await Form.findOne(
      { formID: req.params.id },
      { formGroups: true, _id: false }
    );
    const formGroups = formGroupsObj.formGroups;
    const defaultGroupID = randomstring.generate(7);
    formGroups.push({
      groupID: defaultGroupID,
      groupName: "",
      groupLink: `http://localhost:5173/userform/${req.params.id}/${defaultGroupID}`,
    });
    const updatedForm = {
      $set: {
        formGroups: formGroups,
      },
    };
    const result = await Form.updateOne({ formID: req.params.id }, updatedForm);
    console.log(result);
    if (result.modifiedCount === 1)
      res.status(200).json({ msg: "New form group created." });
    else res.status(404).json({ msg: "Form not found." });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "See error message !", errorMsg: error.message });
  }
});

app.post("/saveUserFormResponse", async (req, res) => {
  try {
    const formResponsesObj = await Form.findOne(
      { formID: req.body.formID },
      { formResponses: true, _id: false }
    );
    const formResponses = formResponsesObj.formResponses;
    formResponses.push(req.body.formResponse);
    const updatedForm = {
      $set: {
        formResponses: formResponses,
      },
    };
    const result = await Form.updateOne(
      { formID: req.body.formID },
      updatedForm
    );
    console.log(result);
    if (result.modifiedCount === 1)
      res.status(200).json({ msg: "Responses submitted." });
    else res.status(404).json({ msg: "Form not found." });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "See error message !", errorMsg: error.message });
  }
});

app.get("/getSummaryDashboardData/:id", async (req, res) => {
  try {
    const form = await Form.findOne({ formID: req.params.id });
    if (form) {
      const numberOfResponses = form.formResponses.length;
      const summaryData = [];
      form.formQuestions.forEach((q) => {
        const norQuestion = form.formResponses.filter((r) => {
          if (
            r.userResponse.filter((qr) => qr.questionID === q.questionID)
              .length === 1
          )
            return true;
          else return false;
        }).length;
        var subData;
        if (q.questionType === 1) {
          subData = {
            [q.options[0]]: 0,
            [q.options[1]]: 0,
            [q.options[2]]: 0,
            [q.options[3]]: 0,
          };
          form.formResponses.forEach((r) => {
            const temp = r.userResponse.filter(
              (qr) => qr.questionID === q.questionID
            );
            if (temp[0]) subData[temp[0].answer] += 1;
          });
        } else if (q.questionType === 2) {
          subData = [];
          form.formResponses.forEach((r) => {
            const temp = r.userResponse.filter(
              (qr) => qr.questionID === q.questionID
            );
            if (temp[0]) subData.push(temp[0].answer);
          });
        }
        const totalData = {
          question: q.question,
          questionType: q.questionType,
          options: q.options,
          norQuestion: norQuestion,
          subData: subData,
        };
        summaryData.push(totalData);
      });
      res.status(200).json({
        summaryData: summaryData,
        numberOfResponses: numberOfResponses,
        msg: "Summary Data and number of responses sent.",
      });
    } else res.status(404).json({ msg: "Form not found." });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "See error message !", errorMsg: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://dbuser:SmafeO8gqwb7br8L@cluster0.kpfchi2.mongodb.net/formsDB?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database.");
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT} ...`);
    });
  })
  .catch(() => {
    console.log("Connection to database failed !");
  });

/*

Form Array Object Template:

[
    {
      formID: formID,
      formTitle: formTitle,
      formDescription: formDescription,
      formQuestions: formQuestions,
      formResponses: formResponses,
      formGroups: formGroups
    }
]


Questions Array Object Template:

[
    {
        questionID: 1231
        questionType: 1,
        question: "aasdasdf sfsda  fsdfa",
        options: ["option1", "options2"]
    },
    {
        questionID: 1231
        questionType: 2,
        question: "aasdasdf sfsda  fsdfa"
    }
]

Group Array Object Template:

[
    {
        groupID: "fsdfas",
        groupName: "fsadfsdf",
        groupLink: ".........."
    }
]

Response Array Object Template:

[
  {
    userResponseID: 4316
    userGroupID: "fkjsd"
    userResponse: [
      { questionID: 4333,
        answer: "gnskjd"
      }
    ]
  }
]

*/
