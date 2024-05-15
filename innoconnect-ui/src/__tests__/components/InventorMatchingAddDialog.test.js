/**
 * @author Nathan Wise
 */
import { Button } from '@mui/material';
import { InventorMatchingAddDialog } from '@/app/components/InventorMatchingAddDialog';
import { fireEvent, render, screen } from '@testing-library/react';
import { toRegex } from '../lib';
import '@testing-library/jest-dom'

const project = {
    title: "PROJECT TITLE",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tristique massa risus, fermentum maximus nunc aliquam ac. Vestibulum vel libero magna. Maecenas at diam in ante vestibulum gravida nec id ipsum. Etiam varius, mi id gravida molestie, orci leo egestas arcu, eget dictum purus orci ac tellus. Pellentesque quam leo, dignissim vel facilisis vel, porta a est. Proin elit enim, consectetur eget rutrum at, sagittis sed lacus. Phasellus vitae sapien nunc. Mauris venenatis nibh vel facilisis semper. Suspendisse luctus est nec sapien vehicula rhoncus. Nunc sed nibh sit amet tellus suscipit lobortis. Mauris fermentum sed ante eget condimentum. Praesent consequat in ante a cursus. Nullam non tincidunt magna. Etiam feugiat tempus tortor.",
    mainCommunicationLanguage: "English",
    mainTimezone: "UTC±00:00",
    mainProgrammingLanguage: "JavaScript",
    mainTechnology: "React",
    projectUrl: "https://github.com/WiseNat/BS3206-musical-palm-tree"
}

describe("ProjectSettingsDialog", () => {
  it("renders correctly", () => {
    const renderer = render(
      <InventorMatchingAddDialog submitCallback={() => {}} project={project}>
        {(handleOpen) => (
          <Button onClick={handleOpen} />
        )}                      
      </InventorMatchingAddDialog> 
    )

    expect(renderer.container.firstChild).toMatchInlineSnapshot(`
<button
  class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary css-1e6y48t-MuiButtonBase-root-MuiButton-root"
  tabindex="0"
  type="button"
>
  <span
    class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
  />
</button>
`);
  });

  it("opens dialog when handleOpen Button clicked", () => {
    render(
      <InventorMatchingAddDialog submitCallback={() => {}} project={project}>
        {(handleOpen) => (
          <Button onClick={handleOpen} />
        )}                      
      </InventorMatchingAddDialog> 
    )

    fireEvent.click(screen.getByRole("button"))

    expect(screen.getByRole("heading", {name: toRegex("Add Inventor")})).toBeTruthy();
  });
});
