import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";

const CUSTOMER_ROLE_URL = `${MAIN_PROXY_URL}/customers`;

export const getCustomerByID = async (customerID) => {
    try {
        const res = await axios.get(`${CUSTOMER_ROLE_URL}/${customerID}`);

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}