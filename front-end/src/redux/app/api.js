import axios from 'axios';

//const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const login = async (user, pass) => {
    try {
        console.log(`login(${user}, ${pass})`);
        const response = await axios.post(
            `${process.env.REACT_APP_AUTH_API_URL}/login`, 
            {user, pass},
        );
        const wasSuccessful = response.status === 200;
        console.log(`login(${user}, ${pass}): ${wasSuccessful? "successful" : "auth error"}`);
        return wasSuccessful;
    } catch (error) {
        console.error(`login(${user}, ${pass}): error: ${error}`);
        return false;
    }
};

export const logout = async () => {
    try {
        console.log("logout()");
        await axios.post(
            `${process.env.REACT_APP_AUTH_API_URL}/logout`,
        );
        console.log("logout(): successful");
    } catch (error) {
        console.error(`logout(): error: ${error}`);
    }
}

export const signup = async (user, pass) => {
    try {
        console.log(`signup(${user}, ${pass})`);
        const response = await axios.post(
            `${process.env.REACT_APP_AUTH_API_URL}/signup`, 
            {user, pass},
        );
        const wasSuccessful = response.status === 200;
        console.log(`login(${user}, ${pass}): ${wasSuccessful? "successful" : "auth error"}`);
        return wasSuccessful;       
    } catch (error) {
        console.error(`signup(${user}, ${pass}): error: ${error}`);
        return false;
    }
}

export const getSessionStatus = async () => {
    try {
        console.log("getSessionStatus()");
        //const response = await axios.get("http://localhost:1340/auth/status");
        const response = await axios.get(
            `${process.env.REACT_APP_AUTH_API_URL}/status`,
            //await getHeaders()
        );
        console.log(`getSessionStatus(): ${response.data.isAuthenticated}`);
        return response.data.isAuthenticated;
    } catch (error) {
        console.error(`getSessionStatus(): error: ${error}`);
        return false;
    }
}

export const getCsrfToken = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_AUTH_API_URL}/csrf`);
        return response.data.csrfToken;
    } catch (error) {
        console.error('getCsrfToken(): error:', error);
        return null;
    }
};
