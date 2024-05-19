/**
 * @author Nathan Wise
 */
import { Button } from "@mui/material";
import { ProjectSettingsDialog } from "@/app/components/ProjectSettingsDialog";
import { fireEvent, render, screen } from "@testing-library/react";
import { toRegex } from "../lib";
import "@testing-library/jest-dom";

const project = {
  title: "PROJECT TITLE",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tristique massa risus, fermentum maximus nunc aliquam ac. Vestibulum vel libero magna. Maecenas at diam in ante vestibulum gravida nec id ipsum. Etiam varius, mi id gravida molestie, orci leo egestas arcu, eget dictum purus orci ac tellus. Pellentesque quam leo, dignissim vel facilisis vel, porta a est. Proin elit enim, consectetur eget rutrum at, sagittis sed lacus. Phasellus vitae sapien nunc. Mauris venenatis nibh vel facilisis semper. Suspendisse luctus est nec sapien vehicula rhoncus. Nunc sed nibh sit amet tellus suscipit lobortis. Mauris fermentum sed ante eget condimentum. Praesent consequat in ante a cursus. Nullam non tincidunt magna. Etiam feugiat tempus tortor.",
  mainCommunicationLanguage: "English",
  mainTimezone: "UTC±00:00",
  mainProgrammingLanguage: "JavaScript",
  mainTechnology: "React",
  projectUrl: "https://github.com/WiseNat/BS3206-musical-palm-tree",
};

describe("ProjectSettingsDialog", () => {
  it("opens dialog when handleOpen Button clicked", () => {
    render(
      <ProjectSettingsDialog submitCallback={() => {}} project={project}>
        {(handleOpen) => <Button onClick={handleOpen} />}
      </ProjectSettingsDialog>,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(
      screen.getByRole("heading", { name: toRegex("update project") }),
    ).toBeTruthy();
  });

  it("loads the default project values", () => {
    render(
      <ProjectSettingsDialog submitCallback={() => {}} project={project}>
        {(handleOpen) => <Button onClick={handleOpen} />}
      </ProjectSettingsDialog>,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(
      screen.getByRole("textbox", { name: toRegex("project description") }),
    ).toHaveValue(project.description);
    expect(
      screen.getByDisplayValue(toRegex(project.mainCommunicationLanguage)),
    ).toBeTruthy();
    expect(
      screen.getByDisplayValue(toRegex(project.mainTimezone)),
    ).toBeTruthy();
    expect(
      screen.getByDisplayValue(toRegex(project.mainProgrammingLanguage)),
    ).toBeTruthy();
    expect(
      screen.getByRole("textbox", { name: toRegex("project url") }),
    ).toHaveValue(project.projectUrl);
  });

  it("submits to the callback when 'Save' Button clicked", () => {
    var callbackCalled = false;

    function callback(_project) {
      callbackCalled = true;
    }

    render(
      <ProjectSettingsDialog submitCallback={callback} project={project}>
        {(handleOpen) => <Button onClick={handleOpen} />}
      </ProjectSettingsDialog>,
    );

    fireEvent.click(screen.getByRole("button"));
    fireEvent.submit(screen.getByRole("button", { name: toRegex("save") }));

    expect(callbackCalled).toBe(true);
  });

  it("dialog closes when 'Save' Button clicked", () => {
    render(
      <ProjectSettingsDialog submitCallback={() => {}} project={project}>
        {(handleOpen) => <Button onClick={handleOpen} />}
      </ProjectSettingsDialog>,
    );

    fireEvent.click(screen.getByRole("button"));
    fireEvent.submit(screen.getByRole("button", { name: toRegex("save") }));

    expect(
      screen.queryByRole("heading", { name: toRegex("update project") }),
    ).toBeNull();
  });
});
