import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {authHeader} from "../helpers";

const PLAN_URL = `${MAIN_PROXY_URL}/plans`;

export const addPlanAsync = async (newPlan) => {
    try {
        message.loading('Action in progress..', 0);
        const {name, price, description, durationInDays} = newPlan;
        const res = await axios.post(`${PLAN_URL}/add`, {
            name, price, description, durationInDays
        }, {
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

export const editPlanAsync = async (planID, updatedPlan) => {
    try {
        message.loading('Action in progress..', 0);

        const res = await axios.put(`${PLAN_URL}/edit/${planID}`, updatedPlan, {
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

export const getPlanByID = async (planID) => {
    try {
        const res = await axios.get(`${PLAN_URL}/${planID}`);

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}