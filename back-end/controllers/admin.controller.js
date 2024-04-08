import e from "express";
import randomstring from "randomstring";
import Form from "../models/formModel.js";
export const test = (req, res) => {
  res.send("Route test is working!");
};

const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;

export const getAllFormTitlesIDs = async (req, res) => {
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
};

export const deleteFormID = async (req, res) => {
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
};

export const updateForm = async (req, res) => {
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
};

export const createNewFormGroup = async (req, res) => {
  try {
    const formGroupsObj = await Form.findOne(
      { formID: req.params.id },
      { formGroups: true, _id: false }
    );
    const formGroups = formGroupsObj.formGroups;
    const defaultGroupID = randomstring.generate(7);
    const formGroup = {
      groupID: defaultGroupID,
      groupName: "",
      groupLink: `${CLIENT_BASE_URL}/userform/${req.params.id}/${defaultGroupID}`,
    };
    formGroups.push(formGroup);
    const updatedForm = {
      $set: {
        formGroups: formGroups,
      },
    };
    const result = await Form.updateOne({ formID: req.params.id }, updatedForm);
    // console.log(result);
    if (result.modifiedCount === 1)
      res
        .status(200)
        .json({ formGroup: formGroup, msg: "Form Group created." });
    else res.status(404).json({ msg: "Form not found." });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "See error message !", errorMsg: error.message });
  }
};

export const setFormIsAcceptingResponses = async (req, res) => {
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
};

export const getFormIsAcceptingResponses = async (req, res) => {
  try {
    const form = await Form.findOne({ formID: req.params.id });
    //console.log(form);
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
};

export const getSummaryDashboardData = async (req, res) => {
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
          subData = {};
          for (const option of q.options) {
            subData[option.optionID] = 0;
          }
          console.log("SubData", subData);
          form.formResponses.forEach((r) => {
            const temp = r.userResponse.filter(
              (qr) => qr.questionID === q.questionID
            );
            console.log("Temp", temp);
            if (temp[0]) subData[temp[0].answer.optionID] += 1;
          });
          console.log("After SubData", subData);
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
        console.log("Total Data", totalData);
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
};
export const createNewForm = async (req, res) => {
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
    //console.log(form);
    res.status(200).json({ msg: "Form created.", form: form });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Form creation failed !", errorMsg: error.message });
  }
};
export const getFormData = async (req, res) => {
  try {
    const form = await Form.findOne({ formID: req.params.id });
    // console.log("Get form", form);
    //console.log("Get for options", form.formQuestions[0].options);
    if (form) res.status(200).json({ form: form });
    else res.status(404).json({ msg: "Form not found." });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "See error message !", errorMsg: error.message });
  }
};
