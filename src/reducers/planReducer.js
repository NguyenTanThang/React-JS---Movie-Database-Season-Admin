import {
    GET_ALL_PLANS,
    ADD_PLAN,
    DELETE_PLAN,
    EDIT_PLAN
} from "../actions/types";

const initialState = {
    plans: []
}

const planReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PLANS:
            return {
                ...state,
                plans: action.payload.plans
            }
            break;
        case ADD_PLAN:
            return {
                ...state,
                plans: [...state.plans, action.payload.plan]
            }
            break;
        case EDIT_PLAN:
            return {
                ...state,
                plans: state.plans.map(planItem => {
                    if (planItem._id == action.payload.planID) {
                        planItem = action.payload.plan;
                    }
                    return planItem;
                }),
            }
            break;
        case DELETE_PLAN:
            return {
                ...state,
                plans: state.plans.filter(planItem => {
                    return action.payload.plan._id !== planItem._id;
                })
            }
            break;
        default:
            return state;
            break;
    }
}

export default planReducer;