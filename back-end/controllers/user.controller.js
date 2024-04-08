import Form from "../models/formModel.js";

const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;

export const saveUserFormResponse = async (req, res) => {
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
};

export const getGroupLink = async (req, res) => {
  //app.get('/api/admin/getFormGroupLink/:formID/:formGroupID', async (req, res) => {
  try {
    const { formID, formGroupID } = req.params;
    const form = await Form.findOne({ formID });
    const groupLink = form.formGroups.forEach((group) => {
      if (group.groupID === formGroupID) return group.groupLink;
    });
    // const groupLink = form.formGroups.find(group => group.groupID === formGroupID)?.groupLink;

    if (groupLink) {
      res.json({ groupLink });
    } else {
      res.status(404).json({ message: "Form group not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
