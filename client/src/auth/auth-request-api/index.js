import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/auth',
})
export const getLoggedIn = () => api.get(`/loggedIn/`);
export const loginUser = (email, password) => {
    return api.post(`/login/`, {
        email : email,
        password : password
    })
}
export const logoutUser = () => api.get(`/logout/`)
export const registerUser = (userName,firstName, lastName, email, password, passwordVerify) => {
    return api.post(`/register/`, {
        userName: userName,
        firstName : firstName,
        lastName : lastName,
        email : email,
        password : password,
        passwordVerify : passwordVerify,
        interactions:[]
    })
}
const apis = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser
}
export default apis
