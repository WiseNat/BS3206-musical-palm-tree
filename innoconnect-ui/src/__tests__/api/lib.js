import Project from "@/app/models/project";
import User from "@/app/models/user";

function buildInventor(name, role, email) {
  return {
    name: name,
    role: role,
    email: email,
    joinDate: Date.now(),
  };
}

async function createUser(prefix, role, timezone, language, matching) {
  const firstname = `${prefix} first name`;
  const lastname = `${prefix} last name`;
  const email = `${prefix}@gmail.com`;

  await User.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: "test",
    role: role,
    language: language,
    timezone: timezone,
    matching: matching,
  });

  return buildInventor(firstname + " " + lastname, role, email);
}

async function createProject(
  title,
  description,
  communicationLanguage,
  timezone,
  programmingLanguage,
  technology,
  projectUrl,
  ownerEmail,
) {
  const project = await Project.create({
    title: title,
    description: description,
    mainCommunicationLanguage: communicationLanguage,
    mainTimezone: timezone,
    mainProgrammingLanguage: programmingLanguage,
    mainTechnology: technology,
    projectUrl: projectUrl,
    inventors: [
      {
        email: ownerEmail,
        role: "Founder",
        joinDate: Date.now(),
      },
    ],
  });

  return project;
}

export { createUser, buildInventor, createProject };
