import {
    ADD_MANAGER,
    DELETE_MANAGER,
    EDIT_MANAGER,
    GET_ALL_MANAGERS
} from "../actions/types";

const initialState = {
    managers: []
}

const managerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_MANAGERS:
            return {
                ...state,
                managers: action.payload.managers
            }
            break;
        case ADD_MANAGER:
            return {
                ...state,
                managers: [...state.managers, action.payload.manager]
            }
            break;
        case EDIT_MANAGER:
            return {
                ...state,
                managers: state.managers.map(managerItem => {
                    if (managerItem._id == action.payload.managerID) {
                        managerItem = action.payload.manager;
                    }
                    return managerItem;
                }),
            }
            break;
        case DELETE_MANAGER:
            return {
                ...state,
                managers: state.managers.filter(managerItem => {
                    return action.payload.manager._id !== managerItem._id;
                })
            }
            break;
        default:
            return state;
            break;
    }
}

export default managerReducer;