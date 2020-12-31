import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";

const MANAGER_URL = `${MAIN_PROXY_URL}/managers`;

export const addManagerAsync = async (newManager) => {
    try {
        message.loading('Action in progress..', 0);
        const res = await axios.post(`${MANAGER_URL}/add`, newManager);

        message.destroy()

        if (res.data.success) {
            message.success(res.data.message, 5);
        } else {
            return message.warning(res.data.message, 5);
        }

        return res
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const editManagerAsync = async (managerID, updatedManager) => {
    try {
        message.loading('Action in progress..', 0);

        const res = await axios.put(`${MANAGER_URL}/edit/${managerID}`, updatedManager);

        message.destroy()

        if (res.data.success) {
            message.success(res.data.message, 5);
        } else {
            return message.warning(res.data.message, 5);
        }

        return res
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const getManagerByID = async (managerID) => {
    try {
        const res = await axios.get(`${MANAGER_URL}/${managerID}`);

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}