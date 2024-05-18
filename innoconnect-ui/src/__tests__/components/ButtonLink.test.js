/**
 * @author Tom Shortridge
 */
import { fireEvent, render, screen } from "@testing-library/react";
import ButtonLink from "@/app/components/ButtonLink";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("ButtonLink", () => {
  it("renders the button with the relevant text", () => {
    const buttonText = "example text";

    render(<ButtonLink text={buttonText} />);

    const button = screen.getByText(buttonText);

    expect(button).toBeTruthy();
  });

  it("router is called on click with correct route", () => {
    const buttonText = "text";
    const buttonRoute = "/ui/home";

    let mockRouterPush = jest.fn();
    useRouter.mockReturnValue({ push: mockRouterPush });

    render(<ButtonLink text={buttonText} route={buttonRoute} />);

    const button = screen.getByText(buttonText);

    fireEvent.click(button);

    expect(mockRouterPush).toHaveBeenCalledWith(buttonRoute);
    expect(mockRouterPush).toHaveBeenCalledTimes(1);
  });
});
