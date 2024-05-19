/**
 * @author Nathan Wise
 */
import { POST } from "@/app/api/projects/addInventor/route";
import { createProject } from "../../lib";
import Project from "@/app/models/project";

const title = "TITLE";
const description = "DESC";
const language = "English";
const timezone = "UTC±00:00";
const programmingLanguage = "JavaScript";
const technology = "React";
const projectUrl = "https://github.com/WiseNat/BS3206-musical-palm-tree";

function buildReq(projectID, email, role) {
  return {
    json: () => ({
      _id: projectID,
      email: email,
      role: role,
    }),
  };
}

describe("Add Inventor to Project API", () => {
  describe("AUT003 - An inventor who is already on the project who is added again fails", () => {
    it("TCA009 - Add inventor who is not already on the project", async () => {
      const preProject = await createProject(
        title,
        description,
        language,
        timezone,
        programmingLanguage,
        technology,
        projectUrl,
        "OWNER@EMAIL.com",
      );

      const email = "ANOTHER@EMAIL.com";
      const req = buildReq(preProject._id, email, "Developer");
      const res = await POST(req);

      expect(res.ok).toBe(true);

      const postProject = await Project.findById(preProject._id);

      let foundAddedInventor = false;
      for (let inventor of postProject.inventors) {
        if (inventor.email == email) {
          foundAddedInventor = true;
          break;
        }
      }

      expect(foundAddedInventor).toBe(true);
    });

    it("TCA010 - Fail to add inventor who is already on the project", async () => {
      const email = "OWNER@EMAIL.com";
      const preProject = await createProject(
        title,
        description,
        language,
        timezone,
        programmingLanguage,
        technology,
        projectUrl,
        email,
      );

      const req = buildReq(preProject._id, email, "Developer");
      const res = await POST(req);

      expect(res.ok).toBe(false);

      const postProject = await Project.findById(preProject._id);

      expect(postProject.inventors).toHaveLength(1);
    });

    it("TCA011 - Try adding an inventor with an invalid Project ID", async () => {
      const projectId = "664a4e88fef035e44aac03b7";

      const req = buildReq(projectId, "SOME@EMAIL.com", "Developer");
      const res = await POST(req);

      expect(res.ok).toBe(false);

      const project = await Project.findById(projectId);

      expect(project).not.toBeTruthy();
    });

    it("TCA012 - Try adding an inventor with an invalid email", async () => {
      const email = "OWNER@EMAIL.com";
      const preProject = await createProject(
        title,
        description,
        language,
        timezone,
        programmingLanguage,
        technology,
        projectUrl,
        email,
      );

      const req = buildReq(preProject._id, "foobar", "Developer");
      const res = await POST(req);

      expect(res.ok).toBe(false);

      const project = await Project.findById(preProject._id);

      expect(project.inventors).toHaveLength(1);
    });

    it("TCA013 - Try adding an inventor with an invalid role", async () => {
      const email = "OWNER@EMAIL.com";
      const preProject = await createProject(
        title,
        description,
        language,
        timezone,
        programmingLanguage,
        technology,
        projectUrl,
        email,
      );

      const req = buildReq(preProject._id, email, null);
      const res = await POST(req);

      expect(res.ok).toBe(false);

      const project = await Project.findById(preProject._id);

      expect(project.inventors).toHaveLength(1);
    });
  });
});
