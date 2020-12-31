import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from '../services/userService';

const ProtectedRoute = ({ path, component: Component, render, admin, ...rest }) => {

    const isAvailable = () => {
        const user = getCurrentUser();
        if (!user) return user;
        if (!admin) return true;
        return user.isAdmin;
    }
    return (
        <Route
            {...rest}
            render={props => {
                if (!isAvailable())
                    return <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }} />
                return Component ? <Component {...props} /> : render(props);
            }
            }
        />
    );
}

export default ProtectedRoute;