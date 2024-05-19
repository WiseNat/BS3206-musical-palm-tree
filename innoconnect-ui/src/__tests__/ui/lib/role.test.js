/**
 * @author Nathan Wise
 */
import { render, screen } from "@testing-library/react";
import { getRoleIcon } from "@/app/lib/role";

// use the following for a great debugger: screen.logTestingPlaygroundURL()

describe("getRoleIcon", () => {
  it.each(["founder", "Founder", "FoUnDer"])(
    "returns StarIcon when given '%s'",
    (input) => {
      render(getRoleIcon(input));

      const element = screen.getByTestId("StarIcon");

      expect(element).toBeTruthy();
    },
  );

  it.each(["developer", "Developer", "DevElopEr"])(
    "returns CodeIcon when given '%s'",
    (input) => {
      render(getRoleIcon(input));

      const element = screen.getByTestId("CodeIcon");

      expect(element).toBeTruthy();
    },
  );

  it.each(["quality assurance", "Quality Assurance", "qualItY aSSURance"])(
    "returns AssignmentTurnedInIcon when given '%s'",
    (input) => {
      render(getRoleIcon(input));

      const element = screen.getByTestId("AssignmentTurnedInIcon");

      expect(element).toBeTruthy();
    },
  );

  it.each(["project manager", "Project Manager", "prOjecT mAnagEr"])(
    "returns GroupsIcon when given '%s'",
    (input) => {
      render(getRoleIcon(input));

      const element = screen.getByTestId("GroupsIcon");

      expect(element).toBeTruthy();
    },
  );

  it.each(["Software Architect", "Builder", "Scrum Master"])(
    "returns HelpOutlineIcon when given an unknown value '%s'",
    (input) => {
      render(getRoleIcon(input));

      const element = screen.getByTestId("HelpOutlineIcon");

      expect(element).toBeTruthy();
    },
  );
});
