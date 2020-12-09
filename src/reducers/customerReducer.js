import {
    ADD_CUSTOMER,
    DELETE_CUSTOMER,
    EDIT_CUSTOMER,
    GET_ALL_CUSTOMERS
} from "../actions/types";

const initialState = {
    customers: []
}

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CUSTOMERS:
            return {
                ...state,
                customers: action.payload.customers
            }
            break;
        case ADD_CUSTOMER:
            return {
                ...state,
                customers: [...state.customers, action.payload.customer]
            }
            break;
        case EDIT_CUSTOMER:
            return {
                ...state,
                customers: state.customers.map(customerItem => {
                    if (customerItem._id == action.payload.customerID) {
                        customerItem = action.payload.customer;
                    }
                    return customerItem;
                }),
            }
            break;
        case DELETE_CUSTOMER:
            return {
                ...state,
                customers: state.customers.filter(customerItem => {
                    return action.payload.customer.customerItem._id !== customerItem.customerItem._id;
                })
            }
            break;
        default:
            return state;
            break;
    }
}

export default customerReducer;