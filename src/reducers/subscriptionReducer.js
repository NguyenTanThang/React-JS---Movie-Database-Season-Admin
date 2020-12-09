import {
    DELETE_SUB,
    GET_ALL_SUBS,
    GET_SUBS_BY_CUSTOMER_ID
} from "../actions/types";

const initialState = {
    subscriptions: []
}

const subscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SUBS:
        case GET_SUBS_BY_CUSTOMER_ID:
            return {
                ...state,
                subscriptions: action.payload.subscriptions
            }
            break;
            /*
        case ADD_PLAN:
            return {
                ...state,
                plans: [...state.plans, action.payload.plan]
            }
            break;
            */
        case DELETE_SUB:
            return {
                ...state,
                subscriptions: state.subscriptions.filter(subscriptionItem => {
                    return action.payload.subscription._id !== subscriptionItem._id;
                })
            }
            break;
        default:
            return state;
            break;
    }
}

export default subscriptionReducer;