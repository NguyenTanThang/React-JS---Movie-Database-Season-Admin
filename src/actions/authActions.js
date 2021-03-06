/*
import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
*/
import {message} from "antd";
import {
    GET_USER_ROLE
} from "./types";
import {
    authenticationService
} from "../services";

export const getUserRole = () => {
    return (dispatch) => {
        try {
            const currentUser = authenticationService.currentUserValue;
            if (currentUser) {
                const currentUserRole = currentUser.roleID.role;
                let userRole = currentUserRole;
                
                return dispatch({
                    type: GET_USER_ROLE,
                    payload: {
                        userRole
                    }
                })
            }
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}