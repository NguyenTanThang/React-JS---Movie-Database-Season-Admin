import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";

const SUB_URL = `${MAIN_PROXY_URL}/subscriptions`;

export const getSubByCustomerID = async (customerID) => {
    try {
        const res = await axios.get(`${SUB_URL}/customerID/${customerID}`);

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}