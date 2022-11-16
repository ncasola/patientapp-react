import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "_store";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { BrowserRouter } from "react-router-dom";
import ToastList from "_components/ToastList";

export function renderWithProviders(
  ui,
  {
    preloadedState = {
      auth: {
        user: {
          id: 1,
          name: "Test User",
          email: "ncasolajimenez@gmail.com",
          roles: [
            {
              id: 1,
              name: "admin",
            },
          ],
        },
      },
    },
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  setupListeners(store.dispatch);

  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ToastList />
          {children}
        </BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
