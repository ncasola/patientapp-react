import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { renderWithProviders } from "_test/test-utils";
import Users from "_pages/_users/Users";
import UserEdit from "_pages/_users/UserEdit";
import UserAdd from "_pages/_users/UserAdd";
import User from "_pages/_users/User";
import { users, nockBase } from "_test/data";
import Router from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

describe("Users", () => {
  it("Load DataTable", async () => {
    nockBase.get("/api/users").query(true).reply(200, users);

    const { container } = renderWithProviders(<Users />);

    await waitFor(() => {
      expect(container.querySelector('div[id="row-1"]')).not.toBeNull();
    });
  });
  it("Delete User", async () => {
    nockBase.get("/api/users").query(true).reply(200, users);
    nockBase.delete("/api/users/1").reply(200, {});

    const { container } = renderWithProviders(<Users />);

    await waitFor(() => {
      const deleteButton = container.querySelector('button[id="delete-1"]');
      userEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(container.querySelector('div[id="row-1"]')).toBeNull();
    });
  });
  it("Edit User", async () => {
    nockBase.get("/api/users/1").reply(200, users.items[0]);
    nockBase.put("/api/users/1").reply(200, {});

    // Load the page with the user to edit
    jest.spyOn(Router, "useParams").mockReturnValue({ id: "1" });
    const { container } = renderWithProviders(<UserEdit />);

    expect(screen.getByText(/Editar Usuario/i)).toBeInTheDocument();
    // Check if the form is loaded
    await waitFor(() => {
      expect(container.querySelector('input[name="email"]')).not.toBeNull();
    });

    // Change the
    userEvent.type(
      screen.getByRole("textbox", { name: /nombre/i }),
      "Test User"
    );

    // Save the form
    userEvent.click(screen.getByRole("button", { name: /enviar/i }));
    setTimeout(() => {
      expect(
        screen.findByText("Usuario actualizado correctamente")
      ).toBeInTheDocument();
    }, 2000);
  });
  it("View User", async () => {
    nockBase.get("/api/users/1").reply(200, users.items[0]);
    // Load the page with the user to edit
    jest.spyOn(Router, "useParams").mockReturnValue({ id: "1" });
    const { container } = renderWithProviders(<User />);

    await waitFor(() => {
      // Check if the user name is shown
      expect(screen.getAllByText(/Test User/i)[0]).toBeInTheDocument();
    });
  });
  it("Create User", async () => {
    nockBase.post("/api/users").reply(200, {});

    // Load the page with the user to edit
    const { container } = renderWithProviders(<UserAdd />);
    expect(screen.getByText(/Añadir Usuario/i)).toBeInTheDocument();
    // Check if the form is loaded
    await waitFor(() => {
      expect(container.querySelector('input[name="email"]')).not.toBeNull();
    });

    // Change the
    userEvent.type(
      screen.getByRole("textbox", { name: /nombre/i }),
      "Test User"
    );

    // Save the form
    userEvent.click(screen.getByRole("button", { name: /enviar/i }));

    // Check if toast is shown
    setTimeout(() => {
      expect(
        screen.findByText("Usuario creado correctamente")
      ).toBeInTheDocument();
    }, 2000);
  });
});
