/**
 * @author Nathan Wise
 */
import { render, screen } from "@testing-library/react";
import IconText from "@/app/components/IconText";
import StarIcon from "@mui/icons-material/Star";

describe("IconText", () => {
  it("renders text and an icon when given text and an icon", () => {
    const text = "some random text";

    render(
      <IconText text={text}>
        <StarIcon />
      </IconText>,
    );

    const textElement = screen.getByText(text);
    const iconElement = screen.getByTestId("StarIcon");

    expect(textElement).toBeTruthy();
    expect(iconElement).toBeTruthy();
  });

  it("renders link and an icon when given text, an icon, and isTextUrl", () => {
    const text = "some random text";

    render(
      <IconText text={text} isTextUrl>
        <StarIcon />
      </IconText>,
    );

    const textElement = screen.getByRole("link", {
      name: text,
    });
    const iconElement = screen.getByTestId("StarIcon");

    expect(textElement).toBeTruthy();
    expect(iconElement).toBeTruthy();
  });
});
