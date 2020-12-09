import {
    ADD_SERIES,
    DELETE_SERIES,
    EDIT_SERIES,
    GET_ALL_SERIES
} from "../actions/types";

const initialState = {
    series: []
}

const seriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SERIES:
            return {
                ...state,
                series: action.payload.series
            }
            break;
        case ADD_SERIES:
            return {
                ...state,
                series: [...state.series, action.payload.series]
            }
            break;
        case EDIT_SERIES:
            return {
                ...state,
                series: state.series.map(seriesItem => {
                    if (seriesItem._id == action.payload.movieID) {
                        seriesItem = action.payload.series;
                    }
                    return seriesItem;
                }),
            }
            break;
        case DELETE_SERIES:
            return {
                ...state,
                series: state.series.filter(seriesItem => {
                    return action.payload.series._id !== seriesItem._id;
                })
            }
            break;
        default:
            return state;
            break;
    }
}

export default seriesReducer;