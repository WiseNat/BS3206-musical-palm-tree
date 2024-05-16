/**
 * @author Nathan Wise
 */
import { Button } from "@mui/material";
import { AddInventorDialog } from "@/app/components/AddInventorDialog";
import { fireEvent, render, screen } from "@testing-library/react";
import { toRegex } from "../lib";
import "@testing-library/jest-dom";

describe("AddInventorDialog", () => {
  it("opens dialog when handleOpen Button clicked", () => {
    render(
      <AddInventorDialog addInventorCallback={() => {}}>
        {(handleOpen) => <Button onClick={handleOpen} />}
      </AddInventorDialog>,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(
      screen.getByRole("heading", { name: toRegex("Add Inventor") }),
    ).toBeTruthy();
  });

  it("submits to the callback when 'Save' Button clicked", () => {
    var callbackCalled = false;

    function callback(_project) {
      callbackCalled = true;
    }

    render(
      <AddInventorDialog addInventorCallback={callback}>
        {(handleOpen) => <Button onClick={handleOpen} />}
      </AddInventorDialog>,
    );

    fireEvent.click(screen.getByRole("button"));
    fireEvent.submit(screen.getByRole("button", { name: toRegex("Add") }));

    expect(callbackCalled).toBe(true);
  });

  it("dialog closes when 'Add' Button clicked", () => {
    render(
      <AddInventorDialog addInventorCallback={() => {}}>
        {(handleOpen) => <Button onClick={handleOpen} />}
      </AddInventorDialog>,
    );

    fireEvent.click(screen.getByRole("button"));
    fireEvent.submit(screen.getByRole("button", { name: toRegex("Add") }));

    expect(
      screen.queryByRole("heading", { name: toRegex("update project") }),
    ).toBeNull();
  });
});
