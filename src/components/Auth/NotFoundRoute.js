import React from 'react';
import { Route,  } from "react-router-dom";
import NotFound from "../NotFound";

const NotFoundRoute = ({component: Component, ...rest}) => {
    console.log('called ehere')
    // return <Redirect to="/" component={NotFound} {...rest} />
    return <Route {...rest} component={NotFound} />
};

export default NotFoundRoute;