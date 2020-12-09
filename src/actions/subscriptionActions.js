import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    GET_ALL_SUBS,
    DELETE_SUB,
    GET_SUBS_BY_CUSTOMER_ID
} from "./types";   

const SUB_URL = `${MAIN_PROXY_URL}/subscriptions`;

export const deleteSubscription = (subID) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`${SUB_URL}/delete/${subID}`);
    
            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const subscription = res.data.data;

            return dispatch({
                type: DELETE_SUB,
                payload: {
                    subscription
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const getAllSubscriptions = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(SUB_URL);
    
            const subscriptions = res.data.data;
    
            return dispatch({
                type: GET_ALL_SUBS,
                payload: {
                    subscriptions
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const getAllSubscriptionsByCustomerID = (customerID) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${SUB_URL}/customerID/${customerID}`);
    
            const subscriptions = res.data.data;
    
            return dispatch({
                type: GET_SUBS_BY_CUSTOMER_ID,
                payload: {
                    subscriptions
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}