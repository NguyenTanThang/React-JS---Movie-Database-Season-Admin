import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    GET_ALL_MANAGERS,
    ADD_MANAGER,
    DELETE_MANAGER,
    EDIT_MANAGER
} from "./types";   
import {
    setLoading,
    clearLoading
} from "./loadingActions";
import {
    authenticationService
} from "../services";
import {authHeader} from "../helpers";

const MANAGER_URL = `${MAIN_PROXY_URL}/managers`;

export const deleteManager = (managerID) => {
    return async (dispatch) => {
        try {
            message.destroy();
            message.loading("Deleting...", 0);

            const res = await axios.delete(`${MANAGER_URL}/delete/${managerID}`, {
                headers: {
                    ...authHeader()
                }
            });
    
            message.destroy();
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
            const res = await axios.put(`${MANAGER_URL}/edit/${managerID}`, updatedManager, {
                headers: {
                    ...authHeader()
                }
            });
    
            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const manager = res.data.data;

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
            const res = await axios.post(`${MANAGER_URL}/add`, newManager, {
                headers: {
                    ...authHeader()
                }
            });
    
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
            dispatch(setLoading());

            const res = await axios.get(MANAGER_URL);
            const userID = authenticationService.currentUserValue._id;
    
            let managers = res.data.data;
            managers = managers.filter(managerItem => {
                return managerItem._id !== userID;
            })
    
            dispatch(clearLoading());
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