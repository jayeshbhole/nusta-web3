import { createElement, lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useMoralis } from "react-moralis";

import AuthPrivateRoute from "./routes/AuthPrivateRoute";
import PrivateRoute from "./routes/PrivateRoute";

import NotFound from "./pages/NotFound";
import Loader from "./components/Loader";

function App() {
    const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
        useMoralis();

    useEffect(() => {
        const connectorId = window.localStorage.getItem("connectorId");
        if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
            // @ts-ignore
            enableWeb3({ provider: connectorId });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isWeb3Enabled]);

    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <Suspense fallback={<Loader />}>
                                {route.private && (
                                    <PrivateRoute>
                                        {createElement(route.element)}
                                    </PrivateRoute>
                                )}
                                {route.auth && (
                                    <AuthPrivateRoute>
                                        {createElement(route.element)}
                                    </AuthPrivateRoute>
                                )}
                            </Suspense>
                        }
                    />
                ))}
                <Route
                    path="*"
                    element={
                        <PrivateRoute>
                            <NotFound />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

const routes = [
    {
        path: "/",
        element: lazy(() => import("./pages/Home")),
        private: true,
        auth: false,
    },
    {
        path: "/login",
        element: lazy(() => import("./pages/Login")),
        private: false,
        auth: true,
    },
    // {
    //     path: "/explore",
    //     element: lazy(() => import("./pages/Explore")),
    //     private: true,
    //     auth: false,
    // },
    // {
    //     path: "/library",
    //     element: lazy(() => import("./pages/Library")),
    //     private: true,
    //     auth: false,
    // },
    // {
    //     path: "/your_posts",
    //     element: lazy(() => import("./pages/YourPosts")),
    //     private: true,
    //     auth: false,
    // },
    // {
    //     path: "/search/:caption",
    //     element: lazy(() => import("./pages/Search")),
    //     private: true,
    //     auth: false,
    // },
    // {
    //     path: "/profile/:uuid",
    //     element: lazy(() => import("./pages/Profile")),
    //     private: true,
    //     auth: false,
    // },
    // {
    //     path: "/followers",
    //     element: lazy(() => import("./pages/Followers")),
    //     private: true,
    //     auth: false,
    // },
    // {
    //     path: "/create",
    //     element: lazy(() => import("./pages/Create")),
    //     private: true,
    //     auth: false,
    // },
];

export default App;
