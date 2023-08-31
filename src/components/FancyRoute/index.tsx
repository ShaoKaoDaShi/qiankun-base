import React, { useEffect } from "react";
import { Route as OfficalRoute } from "react-router-dom";
import type { RouteProps } from "react-router-dom";
import NProgress from "../NProgress";
const FancyRoute = (props: RouteProps) => {
    useEffect(() => {
        NProgress.start();
        return () => {
            NProgress.done();
        };
    }, []);

    return <OfficalRoute {...props} />;
};

export default FancyRoute;
