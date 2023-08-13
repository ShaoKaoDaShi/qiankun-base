import React, { useEffect } from "react";
import {
  BrowserRouter,
  useLocation,
  Route,
  useHistory,
  Switch,
} from "react-router-dom";
import auth from "../auth/auth";
import App from "../App";
import LoginPage from "../Pages/Login";
import myWindow from "../store/window";
import NProgress from "../components/NProgress";
import PageSkeleton from "../components/PageSkeleton";

const Router = () => {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    console.log("🚀 ~ file: index.tsx:11 ~ Router ~ location:", location);
    const unListen = history.listen(() => {
      NProgress.start();
    });
    return unListen;
  }, []);
  useEffect(() => {
    NProgress.done();
  });

  return (
    <>
      <Switch>
        <Route exact path="/" component={auth(PageSkeleton)} />
        <Route exact path="/home" component={auth(PageSkeleton)} />
        <Route exact path="/react" component={auth(App)} />
        <Route exact path="/vue" component={auth(App)} />
      </Switch>
      <Route
        path="/login"
        component={() => <LoginPage myWindow={myWindow} />}
      />
    </>
  );
};
export default Router;
