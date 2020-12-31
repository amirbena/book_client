import serverInstance from './serverInstance';
import jwtDecode from 'jwt-decode';


const baseUrl = "users"



const login = async (email, password) => {

    try {
        const response = await serverInstance.post(`${baseUrl}/login`, {
            email, password
        })
        const token = response.headers["authorization"];
        localStorage.setItem("token", token)
        return response.data;
    } catch (ex) {
        throw ex.response.data;
    }
}


const signup = async (email, password, fullName) => {
    try {
        const response = await serverInstance.post(`${baseUrl}/signup`, {
            email, password, fullName
        })
        const token = response.headers["authorization"];
        localStorage.setItem("token", token)
        return response.data;
    } catch (ex) {
        throw ex.response.data;
    }
}


const logout = () => {
    localStorage.removeItem("token");
}

const getCurrentUser = () => {
    try {
        const jwt = localStorage.getItem('token');
        return jwtDecode(jwt);
    }
    catch (ex) {
        return null;
    }
}





export { login };
export { signup }
export { logout };
export { getCurrentUser };
