import React, { useEffect } from "react";
import {
    BrowserRouter,
    useLocation,
    Route,
    useHistory,
    Switch,
    Redirect,
} from "react-router-dom";
import auth from "../auth/auth";
import App from "../App";
import LoginPage from "../Pages/Login";
import myWindow from "../store/window";
import NProgress from "../components/NProgress";
import PageSkeletonNow from "../components/PageSkeletonNow";
import tabStore from "../store/tabs";

const Router = () => {
    // const location = useLocation();
    // const history = useHistory();
    // useEffect(() => {
    //     console.log("🚀 ~ file: index.tsx:11 ~ Router ~ location:", location);
    //     const unListen = history.listen(() => {
    //         NProgress.start();
    //     });
    //     return unListen;
    // }, []);
    // useEffect(() => {
    //     NProgress.done();
    // });

    return (
        <>
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>
            <Route path={["/"]} render={() => <PageSkeletonNow />} />
            <Route
                path="/login"
                component={() => <LoginPage myWindow={myWindow} />}
            />
        </>
    );
};

export default Router;
