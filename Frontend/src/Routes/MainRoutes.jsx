import React from "react";
import VendorDetails from "./VendorDetails";
import Login from "./Login";
import SignUp from "./SignUp";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import VendorsAdd from "./VendorsAdd";

const MainRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <VendorDetails />
          </PrivateRoute>
        }
      ></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route
        path="/vendorsAdd"
        element={
          <PrivateRoute>
            <VendorsAdd />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
};

export default MainRoutes;
