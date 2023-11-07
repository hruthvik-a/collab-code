import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import Header from "../Home/Header";
import Cookies from "js-cookie";

// Finds the jwtToken and stores jwtToken in localStorage
const PrivateRoutes: React.FC = () => {
  const auth = Cookies.get("token");
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

// To render pages without navigation
export const WithoutNav: React.FC = () => {
  console.log("Without");
  return <Outlet />;
};

// To render pages with navigation
export const WithNav: React.FC = () => {
  console.log("this is running");
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default PrivateRoutes;
