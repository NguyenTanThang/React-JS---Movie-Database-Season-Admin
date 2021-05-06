import { authenticationService } from '../services';

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
        console.log(currentUser.token);
        return { authorization: currentUser.token };
    } else {
        return {};
    }
}