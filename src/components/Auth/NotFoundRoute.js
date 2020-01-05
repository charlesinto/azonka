import React from 'react';
import { Redirect,  } from "react-router-dom";

const NotFoundRoute = ({component: Component, ...rest}) => {
    return <Redirect to="/" component={Component} {...rest} />
};

export default NotFoundRoute;