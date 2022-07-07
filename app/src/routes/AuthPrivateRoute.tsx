import { useMoralis } from "react-moralis";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";

const AuthPrivateRoute = ({ children }: any) => {
    const { user, isAuthenticating } = useMoralis();

    return isAuthenticating ? (
        <Loader />
    ) : !user ? (
        children
    ) : (
        <Navigate to="/" />
    );
};

export default AuthPrivateRoute;
