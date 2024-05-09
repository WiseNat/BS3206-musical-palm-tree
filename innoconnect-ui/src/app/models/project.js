/**
 * @author Nathan Wise
 */
import mongoose from "mongoose";
const mongoose_fuzzy_searching = require("@rowboat/mongoose-fuzzy-searching");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mainCommunicationLanguage: {
    type: String,
    required: true,
  },
  mainTimezone: {
    type: String,
    required: true,
  },
  mainProgrammingLanguage: {
    type: String,
    required: true,
  },
  mainTechnology: {
    type: String,
    required: true,
  },
  projectUrl: {
    type: String,
    required: true,
  },
});

projectSchema.plugin(mongoose_fuzzy_searching, {
  fields: [
    "title",
    "mainCommunicationLanguage",
    "mainTimezone",
    "mainProgrammingLanguage",
    "mainTechnology",
  ],
});

const Project =
  mongoose.models.project || mongoose.model("project", projectSchema);

export default Project;
