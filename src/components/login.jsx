import React, { useState } from 'react';
import { login } from '../services/userService';
import { useHistory } from 'react-router-dom';
import validator from 'validator';
import * as core from '@material-ui/core';

const Login = () => {
    const [state, setState] = useState({
        email: "",
        password: ""
    })
    const history = useHistory();
    const errorObject = {
        "email": () => !validator.isEmail(state.email),
        "password": () => !validator.isAlphanumeric(state.password)
    }


    const handleChange = event => {

        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value
        })
    }

    const handleClick = async () => {
        try {
            const result = await login(state.email, state.password);
            alert(result)
            history.push('/');
        } catch (ex) {
            console.log(ex);
            alert(ex)
        }
    }

    const validateAll = () => {
        for (let key in errorObject) {
            const result = errorObject[key]()
            if (result) return true;
        }
        return false;
    }
    const formStyle = {
        marginBottom: "20px"
    }
    return (
        <div>
            <div style={formStyle}>
                <core.Typography variant="h3" >Log in</core.Typography>
            </div>
            <div style={formStyle}>
                <core.TextField
                    value={state.email}
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    fullWidth
                    error={errorObject["email"]()}
                    helperText={errorObject["email"]() && "Please enter valid email"}
                />
            </div>
            <div style={formStyle}>
                <core.TextField
                    value={state.password}
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    onChange={handleChange}
                    error={errorObject["password"]()}
                    helperText={errorObject["password"]() && "Please enter valid password- combine between names and letters"}
                />
            </div>
            <div style={formStyle}>
                <core.Button
                    disabled={validateAll()}
                    style={{ background: "green", color: "white" }}
                    onClick={async () => await handleClick()}
                >
                    Log in
                </core.Button>
            </div>
        </div>
    );
}

export default Login;