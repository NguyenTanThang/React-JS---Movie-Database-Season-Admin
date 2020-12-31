/*
import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
*/
import {message} from "antd";
import {
    SET_USER_ROLE,
    GET_USER_ROLE
} from "./types";
import Hashids from 'hashids'
import Cryptr from "cryptr";

const cryptr = new Cryptr("XD");
const hashids = new Hashids();   

//const usedStorage = localStorage
const usedStorage = sessionStorage

//const MANAGER_URL = `${MAIN_PROXY_URL}/managers`;

const encryptToken = (token) => {
    //return hashids.encode(token)
    return cryptr.encrypt(token)
}

const decryptToken = (token) => {
    //return hashids.encode(token)
    return cryptr.decrypt(token)
}

export const setUserRole = (user) => {
    return (dispatch) => {
        try {
            if (!user) {
                return dispatch({
                    type: SET_USER_ROLE,
                    payload: {
                        userRole: ""
                    }
                })
            }
            const userRole = user.roleID.role;
            usedStorage.setItem("token", encryptToken(userRole));
            //usedStorage.setItem("token", userRole);
    
            return dispatch({
                type: SET_USER_ROLE,
                payload: {
                    userRole
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const getUserRole = () => {
    return (dispatch) => {
        try {
            let token = usedStorage.getItem("token");
            let userRole = "";
            //let userRole = token;

            if (token) {
                userRole = usedStorage.getItem("token");
                userRole = decryptToken(userRole);
            }
            
            return dispatch({
                type: GET_USER_ROLE,
                payload: {
                    userRole
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}