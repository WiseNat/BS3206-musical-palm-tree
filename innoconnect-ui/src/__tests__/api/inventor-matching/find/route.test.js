/**
 * @author Nathan Wise
 */
import { POST } from "@/app/api/inventor-matching/find/route";
import User from "@/app/models/user";

function buildInventor(name, role, email) {
    return {
        name: name,
        role: role,
        email: email,
        joinDate: Date.now()
    }
}

function buildReq(role, timezone, communicationLanguge, inventors) {
    return {
        json: () => ({ 
            role: role,
            project: {
                mainTimezone: timezone,
                mainCommunicationLanguage: communicationLanguge,
                inventors: inventors
            }
        }),
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
        matching: matching
    });

    return buildInventor(firstname + " " + lastname, role, email);
};

describe("Inventor Matching API", () => {
    describe("AUT001 - Retrieving a list of Inventors for a given project where their time zone & language match the projects equivalents, the role matches the given role, and all inventors have matching set to true", () => {
        it("TCA001 - Getting Inventor Recommendations with valid data", async () => {
            const role = "Developer";
            const timezone = "UTC±00:00";
            const language = "English";

            for (let i = 0; i < 10; i++) {
                await createUser(i, role, timezone, language, true)
            }

            const badPrefix = "Bad"
            for (let i = 0; i < 10; i++) {
                await createUser(`${badPrefix}#${i}`, "Project Manager", timezone, language, true)
            }

            const req = buildReq(role, timezone, language, [])
            const res = await POST(req)
            const body = await res.json();

            for (let inventor of body.inventors) {
                expect(inventor.name.indexOf(badPrefix)).not.toBe(0);
            }
        });

        it("TCA002 - Getting Inventor Recommendations with an invalid role", async () => {
            const role = "Developer";
            const timezone = "UTC±00:00";
            const language = "English";

            for (let i = 0; i < 10; i++) {
                await createUser(i, role, timezone, language, true)
            }

            const req = buildReq("THIS ROLE DOES NOT EXIST", timezone, language, [])
            const res = await POST(req)
            const body = await res.json();

            expect(body.inventors).toHaveLength(0);
        });

        it("TCA003 - Getting Inventor Recommendations with an invalid timezone", async () => {
            const role = "Developer";
            const timezone = "UTC±00:00";
            const language = "English";

            for (let i = 0; i < 10; i++) {
                await createUser(i, role, timezone, language, true)
            }

            const req = buildReq(role, "THIS TIMEZONE DOES NOT EXIST", language, [])
            const res = await POST(req)
            const body = await res.json();

            expect(body.inventors).toHaveLength(0);
        });

        it("TCA004 - Getting Inventor Recommendations with an invalid language", async () => {
            const role = "Developer";
            const timezone = "UTC±00:00";
            const language = "English";

            for (let i = 0; i < 10; i++) {
                await createUser(i, role, timezone, language, true)
            }

            const req = buildReq(role, timezone, "THIS LANGUAGE DOES NOT EXIST", [])
            const res = await POST(req)
            const body = await res.json();

            expect(body.inventors).toHaveLength(0);
        });
    });

    describe("AUT002 - Inventor matching does not return Inventors that are currently on the project", () => {
        it("TCA005 - Inventor matching with 1 inventor recommendation who is already on the project", async () => {
            const role = "Developer";
            const timezone = "UTC±00:00";
            const language = "English";

            for (let i = 0; i < 10; i++) {
                await createUser(i, role, timezone, language, true)
            }

            const inventors = [];

            const badPrefix = "Bad"
            for (let i = 0; i < 1; i++) {
                inventors.push(await createUser(`${badPrefix}#${i}`, role, timezone, language, true))
            }

            const req = buildReq(role, timezone, language, inventors)
            const res = await POST(req)
            const body = await res.json();

            for (let inventor of body.inventors) {
                expect(inventor.name.indexOf(badPrefix)).not.toBe(0);
            }
        });

        it("TCA006 - Inventor matching with multiple inventor recommendations who are already on the project", async () => {
            const role = "Developer";
            const timezone = "UTC±00:00";
            const language = "English";

            for (let i = 0; i < 10; i++) {
                await createUser(i, role, timezone, language, true)
            }

            const inventors = [];
           
            const badPrefix = "Bad"
            for (let i = 0; i < 2; i++) {
                inventors.push(await createUser(`${badPrefix}#${i}`, role, timezone, language, true))
            }

            const req = buildReq(role, timezone, language, inventors)
            const res = await POST(req)
            const body = await res.json();

            for (let inventor of body.inventors) {
                expect(inventor.name.indexOf(badPrefix)).not.toBe(0);
            }
        });
    });
    
    describe("AUT???", () => {
        it("TCA??? - DESCRIPTION", () => {
        });
    });
});