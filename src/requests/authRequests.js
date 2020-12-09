import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";

const MANAGER_URL = `${MAIN_PROXY_URL}/managers`;

export const changeUserPassword = async (oldPassword, newPassword) => {
    try {
        const userID = localStorage.getItem("userID");
        const res = await axios.put(`${MANAGER_URL}/change-password/${userID}`, {
            oldPassword, newPassword
        });

        const {success} = res.data;
        const resMessage = res.data.message;

        if (!success) {
            message.error(`${resMessage}`, 5);
            return res.data;
        }

        message.success(`${resMessage}`, 5);

        return res.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const getCurrentLoginStatus = async () => {
    const userID = localStorage.getItem("userID");
    let ans = true;
    if (!userID) {
        ans = false;
        return ans;
    } 
    const res = await axios.get(`${MANAGER_URL}/${userID}`);
    const {success} = res.data;
    if (!success) {
        ans = false;
    } 
    return ans;
}

const setCurrentUser = (user) => {
    localStorage.setItem("userID", user._id);
}

export const login = async (username, password) => {
    try {
        const res = await axios.post(`${MANAGER_URL}/login`, {
            username, 
            password
        });

        const {success} = res.data;
        const resMessage = res.data.message;
        const user = res.data.data;

        if (!success) {
            message.error(`${resMessage}`, 5);
        }

        message.success(`${resMessage}`, 5);
        setCurrentUser(user);

        return res.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}