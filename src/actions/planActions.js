import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    GET_ALL_PLANS,
    ADD_PLAN,
    DELETE_PLAN,
    EDIT_PLAN
} from "./types";   

const PLAN_URL = `${MAIN_PROXY_URL}/plans`;

export const deletePlan = (planID) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`${PLAN_URL}/delete/${planID}`);
    
            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const plan = res.data.data;

            return dispatch({
                type: DELETE_PLAN,
                payload: {
                    plan
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const editPlan = (planID, updatedPlan) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`${PLAN_URL}/edit/${planID}`, updatedPlan);
    
            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const plan = res.data.data;
            const last_modified_date = Date.now();
            const returnedPlan = Object.assign({}, plan, updatedPlan, {last_modified_date});

            return dispatch({
                type: EDIT_PLAN,
                payload: {
                    planID, plan: returnedPlan
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const addPlan = (newPlan) => {
    return async (dispatch) => {
        try {
            const {name, price, description, durationInDays} = newPlan;
            const res = await axios.post(`${PLAN_URL}/add`, {
                name, price, description, durationInDays
            });
    
            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const plan = res.data.data;

            return dispatch({
                type: ADD_PLAN,
                payload: {
                    plan
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const getAllPlans = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(PLAN_URL);
    
            const plans = res.data.data;
    
            return dispatch({
                type: GET_ALL_PLANS,
                payload: {
                    plans
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}