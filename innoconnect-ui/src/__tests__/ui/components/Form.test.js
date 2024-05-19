/**
 * @author Tom Shortridge
 */
import { fireEvent, render, screen } from "@testing-library/react";
import Form from "@/app/components/Form";

describe("Form", () => {
  it("renders the form with the correct title", () => {
    const formTitle = "example text";

    render(<Form title={formTitle} />);

    const form = screen.getByText(formTitle);

    expect(form).toBeTruthy();
  });

  it("renders a child component within the form", () => {
    const formTitle = "example text";

    render(<Form title={formTitle} children={<button>test</button>} />);

    const button = screen.getByRole("button");

    expect(button).toBeTruthy();
  });

  it("submit action is successfully called", () => {
    const formTitle = "example text";
    const mockedFunction = jest.fn();

    render(
      <Form
        title={formTitle}
        submitAction={mockedFunction}
        children={<button type="submit">Submit</button>}
      />,
    );

    const button = screen.getByRole("button");

    fireEvent.submit(button);

    expect(mockedFunction).toHaveBeenCalled();
  });
});
