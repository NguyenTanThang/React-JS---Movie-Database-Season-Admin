import {
    ADD_SEASON,
    DELETE_SEASON,
    EDIT_SEASON,
    GET_ALL_SEASONS,
    GET_SEASONS_BY_SERIES_ID
} from "../actions/types";

const initialState = {
    seasons: []
}

const seasonReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SEASONS:
            return {
                ...state,
                seasons: action.payload.seasons
            }
            break;
        case ADD_SEASON:
            return {
                ...state,
                seasons: [...state.seasons, action.payload.season]
            }
            break;
        case EDIT_SEASON:
            return {
                ...state,
                seasons: state.seasons.map(seasonItem => {
                    if (seasonItem._id == action.payload.seasonID) {
                        seasonItem = action.payload.season;
                    }
                    return seasonItem;
                }),
            }
            break;
        case DELETE_SEASON:
            return {
                ...state,
                seasons: state.seasons.filter(seasonItem => {
                    return action.payload.season._id !== seasonItem._id;
                })
            }
            break;
        case GET_SEASONS_BY_SERIES_ID:
            return {
                ...state,
                seasons: action.payload.seasons
            }
            break;
        default:
            return state;
            break;
    }
}

export default seasonReducer;