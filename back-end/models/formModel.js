import mongoose from "mongoose";

const FormSchema = mongoose.Schema(
  {
    formID: {
      type: String,
      required: true,
      unique: true,
    },
    formTitle: {
      type: String,
    },
    formDescription: {
      type: String,
    },
    formQuestions: {
      type: [mongoose.Schema.Types.Mixed],
    },
    formResponses: {
      type: [mongoose.Schema.Types.Mixed],
    },
    formGroups: {
      type: [mongoose.Schema.Types.Mixed],
    },
  },
  {
    timestamps: true,
  }
);

const Form = mongoose.model("Form", FormSchema);

export default Form;
