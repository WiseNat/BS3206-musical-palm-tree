/** @jest-environment node */
/**
 * @author Nathan Wise
 */
import { POST } from "@/app/api/inventor-matching/find/route";

describe("Inventor Matching API", () => {
    describe("AUT001", () => {
        it("TCA001 - Getting Inventor Recommendations with valid data", async () => {
            console.log("before")
            const requestObj = {
                json: async () => ({ 
                    role: "TODO",
                    project: "TODO"
                }),
            };

            console.log("afte")

            const res = await POST({requestObj})
            console.log(res)

            const body = await res.json();
            console.log(body)
        });

        it("TCA002 - Getting Inventor Recommendations with an invalid role", () => {
        });

        it("TCA003 - Getting Inventor Recommendations with an invalid timezone", () => {
        });

        it("TCA004 - Getting Inventor Recommendations with an invalid language", () => {
        });
    });

    describe("AUT???", () => {
        it("TCA??? - DESCRIPTION", () => {
        });
    });
});