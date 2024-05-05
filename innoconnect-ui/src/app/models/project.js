/**
 * @author Nathan Wise
 */
import mongoose from "mongoose";

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
});

const Project = mongoose.models.project || mongoose.model("project", projectSchema);

export default Project;
