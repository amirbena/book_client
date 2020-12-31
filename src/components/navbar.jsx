import React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { getCurrentUser, logout } from '../services/userService';
import { useHistory, useLocation } from 'react-router-dom';



const Navbar = () => {
    const user = getCurrentUser();
    console.log("User", user);
    const history = useHistory();
    const location = useLocation();
    const handleLogButton = () => {
        if (user) {
            logout();
            console.log(location.pathname);
            history.push('/');
            return;
        }
        history.push("/login");
    }
    return (
        <AppBar title="My App">
            <Tabs>
                <Tab label="Home" onClick={() => history.push('/')} />
                {
                    user &&
                    <React.Fragment>
                        <Tab label="Purchase book" onClick={() => history.push('/purchase')} />
                        <Tab label="Your Purchases" onClick={() => history.push('/userPurchases')} />
                    </React.Fragment>
                }
                {
                    user && user.isAdmin &&
                    <React.Fragment>
                        <Tab label="Books" onClick={() => history.push('/books')} />
                        <Tab label="All Purchases" onClick={() => history.push('/allPurchases')} />
                    </React.Fragment>
                }
                {
                    !user &&
                    <Tab
                        label="Sign up"
                        onClick={() => history.push("/signup")}
                    />
                }
                <Tab
                    label={user ? "Logout" : "Login"}
                    onClick={handleLogButton}
                />

            </Tabs>
        </AppBar>
    )
}

export default Navbar;