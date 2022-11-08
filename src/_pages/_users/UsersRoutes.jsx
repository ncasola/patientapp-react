import Users from "./Users";
import User from "./User";
import UserAdd from "./UserAdd";
import UserEdit from "./UserEdit";
import UserProfile from "./UserProfile";

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
      <Route
        
        path="/user/:id"
        element={
          <PrivateRoute roles={["admin"]}>
            <User />
          </PrivateRoute>
        }
      />,
      <Route
        
        path="/user/edit/:id"
        element={
          <PrivateRoute roles={["admin"]}>
            <UserEdit />
          </PrivateRoute>
        }
      />,
      <Route
        
        path="/user/add"
        element={
          <PrivateRoute roles={["admin"]}>
            <UserAdd />
          </PrivateRoute>
        }
      />,
      <Route
        
      path="/profile"
      element={
        <PrivateRoute roles={["admin", "worker"]}>
          <UserProfile />
        </PrivateRoute>
      }
    />
    ];

export default usersArray;