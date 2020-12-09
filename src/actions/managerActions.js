import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    GET_ALL_MANAGERS,
    ADD_MANAGER,
    DELETE_MANAGER,
    EDIT_MANAGER
} from "./types";   

const MANAGER_URL = `${MAIN_PROXY_URL}/managers`;

export const deleteManager = (managerID) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`${MANAGER_URL}/delete/${managerID}`);
    
            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const manager = res.data.data;

            return dispatch({
                type: DELETE_MANAGER,
                payload: {
                    manager
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const editManager = (managerID, updatedManager) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`${MANAGER_URL}/edit/${managerID}`, updatedManager);
    
            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const manager = res.data.data;
            const last_modified_date = Date.now();

            return dispatch({
                type: EDIT_MANAGER,
                payload: {
                    managerID, manager
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const addManager = (newManager) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${MANAGER_URL}/add`, newManager);
    
            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const manager = res.data.data;

            return dispatch({
                type: ADD_MANAGER,
                payload: {
                    manager
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const getAllManagers = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(MANAGER_URL);
    
            const managers = res.data.data;
    
            return dispatch({
                type: GET_ALL_MANAGERS,
                payload: {
                    managers
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}