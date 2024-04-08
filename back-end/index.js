import express from "express";

import cors from "cors";
import mongoose from "mongoose";
import Form from "./models/formModel.js";
import "dotenv/config.js";
import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";

const PORT = process.env.PORT;
const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const forms = await Form.find({});
  res.json(forms);
});

/* app.get("/createNewForm", async (req, res) => {
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
      groupLink: `${CLIENT_BASE_URL}/userform/${formID}/${defaultGroupID}`,
    },
  ];
  const formIsAcceptingResponses = true;
  try {
    const form = await Form.create({
      formID: formID,
      formTitle: formTitle,
      formDescription: formDescription,
      formQuestions: formQuestions,
      formResponses: formResponses,
      formGroups: formGroups,
      formIsAcceptingResponses: formIsAcceptingResponses,
    });
    console.log(form);
    res.status(200).json({ msg: "Form created.", form: form });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Form creation failed !", errorMsg: error.message });
  }
}); */

app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.get("/tests", (req, res) => {
  res.send("Test route is working!");
});

/* app.get("/getAllFormTitlesIDs", async (req, res) => {
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
}); */

/* app.delete("/deleteForm/:id", async (req, res) => {
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
 */
/* app.get("/getFormData/:id", async (req, res) => {
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
}); */

/* app.put("/updateForm", async (req, res) => {
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
}); */

/* app.get("/createNewFormGroup/:id", async (req, res) => {
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
      groupLink: `${CLIENT_BASE_URL}/userform/${req.params.id}/${defaultGroupID}`,
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
}); */

/* app.post("/saveUserFormResponse", async (req, res) => {
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
}); */

/* app.get("/getSummaryDashboardData/:id", async (req, res) => {
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
          norQuestion: norQuestion,
          subData: subData,
        };
        if (q.questionType === 1) {
          totalData.options = q.options;
        }
        summaryData.push(totalData);
      });
      res.status(200).json({
        summaryData: summaryData,
        numberOfResponses: numberOfResponses,
        formGroups: form.formGroups,
        formResponses: form.formResponses,
        formQuestions: form.formQuestions,
        msg: "Summary Data and number of responses sent.",
      });
    } else res.status(404).json({ msg: "Form not found." });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "See error message !", errorMsg: error.message });
  }
}); */

/* app.post("/setIsAcceptingResponses", async (req, res) => {
  try {
    const updatedForm = {
      $set: {
        formIsAcceptingResponses: req.body.formIsAcceptingResponses,
      },
    };
    const result = await Form.updateOne(
      { formID: req.body.formID },
      updatedForm
    );
    console.log(result);
    if (result.modifiedCount === 1)
      res.status(200).json({ msg: "Updated FormIsAcceptingResponses." });
    else res.status(404).json({ msg: "Form not found." });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "See error message !", errorMsg: error.message });
  }
}); */

/* app.get("/getFormIsAcceptingResponses/:id", async (req, res) => {
  try {
    const form = await Form.findOne({ formID: req.params.id });
    console.log(form);
    if (form)
      res
        .status(200)
        .json({ formIsAcceptingResponses: form.formIsAcceptingResponses });
    else res.status(404).json({ msg: "Form not found." });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "See error message !", errorMsg: error.message });
  }
});
 */
mongoose
  .connect(process.env.MONGO_DB_URL)
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
