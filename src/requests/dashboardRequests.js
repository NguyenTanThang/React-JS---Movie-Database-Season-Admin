import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";

const DASHBOARD_URL = `${MAIN_PROXY_URL}/dashboard`;

export const getCustomerDashboardData = async () => {
    try {
        const res = await axios.get(`${DASHBOARD_URL}/customer-data`);

        return res.data.data;
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const getRevenueData = async () => {
    try {
        const res = await axios.get(`${DASHBOARD_URL}/revenue-data`);

        return res.data.data;
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const getNewCustomerData = async () => {
    try {
        const res = await axios.get(`${DASHBOARD_URL}/new-customer-data`);

        return res.data.data;
    } catch (error) {
        message.error(error.message, 5);
    }
}
