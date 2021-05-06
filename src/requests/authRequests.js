import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {authenticationService} from "../services";

const MANAGER_URL = `${MAIN_PROXY_URL}/managers`;

export const changeUserPassword = async (oldPassword, newPassword) => {
    try {
        message.loading("Updating...", 0);
        
        const currentUser = authenticationService.currentUserValue;
        const userID = currentUser._id;
        const res = await axios.put(`${MANAGER_URL}/change-password/${userID}`, {
            oldPassword, newPassword
        });

        const {success} = res.data;
        const resMessage = res.data.message;

        if (!success) {
            message.destroy();
            message.error(`${resMessage}`, 5);
            return res.data;
        }

        message.destroy();
        message.success(`${resMessage}`, 5);

        return res.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const getCurrentLoginStatus = async () => {
    const currentUser = authenticationService.currentUserValue;
    const userID = currentUser._id;
    let ans = true;
    if (!userID) {
        ans = false;
        return ans;
    } 
    const res = await axios.get(`${MANAGER_URL}/${userID}`);
    const {success} = res.data;
    if (!success) {
        ans = false;
    } 
    return ans;
}

export const validateManagerRole = async () => {
    try {
        const currentUser = authenticationService.currentUserValue;
        const userID = currentUser._id;
        const managerRecordRes = await axios.get(`${MANAGER_URL}/${userID}`);

        if (currentUser) {
            if (!managerRecordRes.data.success) {
                return authenticationService.logout();
            }
            const managerRecord = managerRecordRes.data.data;
            console.log("managerRecord.roleID.role != currentUser.roleID.role");
            console.log(managerRecord.roleID);
            console.log(managerRecord.roleID.role != currentUser.roleID.role);
            if (managerRecord.roleID.role != currentUser.roleID.role) {
                return authenticationService.logout();
            }
        } else {
            return authenticationService.logout();
        }

        return managerRecordRes.data;
    } catch (error) {
        console.log(error);
    }
}
