import {
    SET_USER_ROLE,
    GET_USER_ROLE
} from "../actions/types";

const initialState = {
    userRole: ""
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_ROLE:
            return {
                ...state,
                userRole: action.payload.userRole
            }
        break;
        default:
            return state;
            break;
    }
}

export default authReducer;