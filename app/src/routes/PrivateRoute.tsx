import React from "react";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useMoralis } from "react-moralis";

const PrivateRoute = ({ children }: any) => {
    const { user, isAuthenticating } = useMoralis();

    return isAuthenticating ? (
        <Loader />
    ) : user ? (
        children
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoute;
