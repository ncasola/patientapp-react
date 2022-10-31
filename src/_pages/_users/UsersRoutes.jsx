import Users from "./Users";

import { Route } from "react-router-dom";
import { PrivateRoute } from "_components/_layout/PrivateRoute";

const usersArray =  [
      <Route
        path="/users"
        element={
          <PrivateRoute roles={["admin"]}>
            <Users />
          </PrivateRoute>
        }
      />,
    ];

export default usersArray;