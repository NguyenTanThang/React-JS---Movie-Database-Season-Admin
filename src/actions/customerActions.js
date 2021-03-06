import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    ADD_CUSTOMER,
    DELETE_CUSTOMER,
    EDIT_CUSTOMER,
    GET_ALL_CUSTOMERS
} from "./types";  
import {
    setLoading,
    clearLoading
} from "./loadingActions"; 
import {authHeader} from "../helpers";

const CUSTOMER_URL = `${MAIN_PROXY_URL}/customers`;

export const deleteCustomer = (customerID) => {
    return async (dispatch) => {
        try {
            message.destroy();
            message.loading("Deleting...", 0);

            const res = await axios.delete(`${CUSTOMER_URL}/delete/${customerID}`, {
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

            const customer = res.data.data;

            return dispatch({
                type: DELETE_CUSTOMER,
                payload: {
                    customer
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const editCustomer = (customerID, updatedCustomer) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`${CUSTOMER_URL}/edit/${customerID}`, updatedCustomer, {
                headers: {
                    ...authHeader()
                }
            });
    
            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const customer = res.data.data;

            return dispatch({
                type: EDIT_CUSTOMER,
                payload: {
                    customerID, customer
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const addCustomer = (newCustomer) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${CUSTOMER_URL}/add`, newCustomer, {
                headers: {
                    ...authHeader()
                }
            });
    
            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const customer = res.data.data;

            return dispatch({
                type: ADD_CUSTOMER,
                payload: {
                    customer
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const getAllCustomers = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());

            const res = await axios.get(CUSTOMER_URL, {
                headers: {
                    ...authHeader()
                }
            });
    
            const customers = res.data.data;
    
            dispatch(clearLoading());

            return dispatch({
                type: GET_ALL_CUSTOMERS,
                payload: {
                    customers
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}