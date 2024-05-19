/**
 * @author Tom Shortridge
 */
import { fireEvent, render, screen } from "@testing-library/react";
import LabelSwitch from "@/app/components/LabelSwitch";

describe("LabelSwitch", () => {
  it("renders the switch with the relevant text", () => {
    const switchText = "example text";

    render(<LabelSwitch label={switchText} />);

    const text = screen.getByText(switchText);

    expect(text).toBeTruthy();
  });

  it("performs on change action", () => {
    const funct = jest.fn();
    const switchText = "example text";

    render(<LabelSwitch label={switchText} action={funct} />);

    const labelSwitch = screen.getByText(switchText);

    fireEvent.click(labelSwitch);

    expect(funct).toBeCalledTimes(1);
  });
});
