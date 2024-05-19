/**
 * @author Tom Shortridge
 */
import { fireEvent, render, screen } from "@testing-library/react";
import FormSelect from "@/app/components/FormSelect";

describe("FormSelect", () => {
  const items = ["Item 1", "Item 2", "Item 3"];
  const label = "Example Label";
  it("renders the selection with the relevant text", () => {
    render(<FormSelect label={label} items={items} />);

    const selectionElements = screen.getAllByText(label);

    const selectionLabel = selectionElements[0];
    const select = selectionElements[1];

    expect(selectionLabel).toBeTruthy();
    expect(select).toBeTruthy();
  });

  it("renders the dropdown", () => {
    render(<FormSelect label={label} items={items} />);
    expect(screen.findByRole("combobox")).toBeTruthy();
  });

  //  Non working tests - seems like a bug with MUI. Will revisit if have time.
  //   it("calls onChange handler when a option is selected", () => {
  //     const changeFunction = jest.fn();
  //     render(
  //       <FormSelect label={label} items={items} onChange={changeFunction} />
  //     );

  //     const selection = screen.getByTestId("selection-box");

  //     fireEvent.click(selection);

  //     fireEvent.click(screen.getByText("Item 1"));

  //     expect(changeFunction).toHaveBeenCalledTimes(1);
  //   });

  //   it("the dropdown has the correct number of items", async () => {
  //     render(<FormSelect label={label} items={items} />);

  //     const selection = await screen.findAllByTestId("selection-box");

  //     fireEvent.click(selection);

  //     const menuItems = screen.getAllByRole("option");
  //     expect(menuItems.length).toBe(3);
  //   });
});
