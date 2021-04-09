import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";
import {authHeader} from "../helpers";

const CUSTOMER_URL = `${MAIN_PROXY_URL}/customers`;

export const addCustomerAsync = async (newCustomer) => {
    try {
        message.loading('Action in progress..', 0);
        const res = await axios.post(`${CUSTOMER_URL}/add`, newCustomer, {
            headers: {
                ...authHeader()
            }
        });

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

export const editCustomerAsync = async (customerID, updatedCustomer) => {
    try {
        message.loading('Action in progress..', 0);

        const res = await axios.put(`${CUSTOMER_URL}/edit/${customerID}`, updatedCustomer, {
            headers: {
                ...authHeader()
            }
        });

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

export const getCustomerByID = async (customerID) => {
    try {
        const res = await axios.get(`${CUSTOMER_URL}/${customerID}`);

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}