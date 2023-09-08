import React, { useEffect, lazy, Suspense } from "react";
import { useLocation, Route, useHistory, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
// import LoginPage from "../Pages/Login";
import myWindow from "../store/window";
import NProgress from "../components/NProgress";
// import PageSkeletonNow from "../components/PageSkeletonNow";
import menuStore from "../store/menuStore";
import request from "../request/index";
import { toJS } from "mobx";
const PageSkeletonNow = lazy(() => import("../components/PageSkeletonNow"));
const LoginPage = lazy(() => import("../Pages/Login"));
function containTreeItem(pathArr: string[], tree = []) {
    if (pathArr.length === 0) return true;
    const pathItem = pathArr.shift();
    for (let i = 0; i < tree.length; i++) {
        if (pathItem.includes(tree[i].key)) {
            return containTreeItem(pathArr, tree[i].children);
        }
    }
    return false;
}
const Router = () => {
    const location = useLocation();
    const history = useHistory();
    const token = Cookies.get("access_token");
    if (!token && window.location.pathname !== "/login") {
        history.push("/login");
    }
    useEffect(() => {
        NProgress.start();
    }, [location]);
    useEffect(() => {
        NProgress.done();
        return () => {
            NProgress.done();
        };
    });

    return (
        <>
            <Suspense fallback={<div>loading ...</div>}>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                <Route path={["/"]} component={PageSkeletonNow} />

                <Route
                    path="/login"
                    component={() => <LoginPage myWindow={myWindow} />}
                />
            </Suspense>
        </>
    );
};

export default Router;
