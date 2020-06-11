import React from 'react';
import { Redirect, Route } from "react-router-dom";

const AuthRoute = ({component: Component, noAuthRequired,redirectIfUser, redirectIfAuth, ...rest}) => {
    const user = localStorage.getItem('azonta-user')
    console.log(rest)
    console.log('fetchUser')
    if(user){
        if(redirectIfUser && user.type === 'user'){
            return <Redirect {...rest} to="/"/>
        }
        // if(redirectIfAuth){
        //     return <Redirect {...rest} to="/users/profile"/>
        // }
        return <Route {...rest} exact component={Component} />
    }
    // console.log('excaped here now')
    return noAuthRequired ? <Route exact {...rest} component={Component} /> : 
    <Redirect to="/users/login" {...rest} />
};

// const isEmpty = (obj) => {
//     for(var key in obj) {
//         console.log('key', key, obj[key])
//         if(obj.hasOwnProperty(key))
//             return false;
//     }
//     return true;
// }
export default AuthRoute;