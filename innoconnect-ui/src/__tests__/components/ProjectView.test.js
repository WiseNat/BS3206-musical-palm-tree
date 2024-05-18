/**
 * @author Tom Shortridge
 */
import { fireEvent, render, screen } from "@testing-library/react";
import ProjectView from "@/app/components/ProjectView";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("ProjectView", () => {
  it("renders the project view with the relevant text", () => {
    const project = {
      _id: 1,
      title: "project 1",
      description: "test",
    };
    const projectContent = "project 1";
    render(<ProjectView project={project} />);

    const projectView = screen.findByText(projectContent);

    expect(projectView).toBeTruthy();
  });

  it("router is called on click with relevant project id", () => {
    const project = {
      _id: 1,
      title: "project 1",
      description: "test",
    };

    const projectRoute = "/ui/project/home/1";

    let mockRouterPush = jest.fn();
    useRouter.mockReturnValue({ push: mockRouterPush });

    render(<ProjectView project={project} />);

    const projectView = screen.getByRole("button");

    fireEvent.click(projectView);

    expect(mockRouterPush).toHaveBeenCalledWith(projectRoute);
    expect(mockRouterPush).toHaveBeenCalledTimes(1);
  });
});
