import { BehaviorSubject } from 'rxjs';
import {createNotification} from "../utils";
import {message} from "antd";
import {MAIN_PROXY_URL} from "../config/config";
import { handleResponse } from '../helpers';
//import {getSubStatus} from "../requests/authRequests";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    message.loading("Logging in...", 0);
    return fetch(`${MAIN_PROXY_URL}/managers/login`, requestOptions)
        .then(handleResponse)
        .then(data => {
            message.destroy();
            if (data.success) {
                const user = data.data;
                const token = data.token;
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({
                    ...user,
                    token
                }));
                currentUserSubject.next({
                    ...user,
                    token
                });

                createNotification("success", {
                    message: "Login",
                    description: data.message
                });
    
                return user;
            } else {
                createNotification("error", {
                    message: "Login",
                    description: data.message
                });
                throw new Error();
            }
        });
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
    window.location.replace("/login");
}