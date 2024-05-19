/**
 * @author Nathan Wise
 */
import { POST } from "@/app/api/inventor-matching/find/route";
import User from "@/app/models/user";

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
    await User.create({
        firstname: `${prefix} first name`,
        lastname: `${prefix} last name`,
        email: `${prefix}@gmail.com`,
        password: "test",
        role: role,
        language: language,
        timezone: timezone,
        matching: matching
    });
};

describe("Inventor Matching API", () => {
    describe("AUT001", () => {
        it("TCA001 - Getting Inventor Recommendations with valid data", async () => {
            const role = "Developer";
            const timezone = "UTC±00:00";
            const language = "English";

            for (let i = 0; i < 10; i++) {
                await createUser(i, role, timezone, language, true)
            }

            const badPrefix = "Bad"
            await createUser(`${badPrefix}#1`, "Project Manager", timezone, language, true)
            await createUser(`${badPrefix}#2`, role, "UTC+02:00", language, true)
            await createUser(`${badPrefix}#3`, role, timezone, "German", true)

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

    describe("AUT???", () => {
        it("TCA??? - DESCRIPTION", () => {
        });
    });
});