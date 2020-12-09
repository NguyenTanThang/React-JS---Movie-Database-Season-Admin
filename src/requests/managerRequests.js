import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";

const MANAGER_ROLE_URL = `${MAIN_PROXY_URL}/managers`;

export const getManagerByID = async (managerID) => {
    try {
        const res = await axios.get(`${MANAGER_ROLE_URL}/${managerID}`);

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}