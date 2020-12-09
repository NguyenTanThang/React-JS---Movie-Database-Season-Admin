import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";

const PLAN_ROLE_URL = `${MAIN_PROXY_URL}/plans`;

export const getPlanByID = async (planID) => {
    try {
        const res = await axios.get(`${PLAN_ROLE_URL}/${planID}`);

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}