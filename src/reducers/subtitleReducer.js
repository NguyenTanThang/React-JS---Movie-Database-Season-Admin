import {
    GET_ALL_SUBTITLES,
    GET_SUBTITLES_BY_MOVIE_ID,
    GET_SUBTITLES_BY_EPISODE_ID,
    ADD_SUBTITLE,
    DELETE_SUBTITLE,
    EDIT_SUBTITLE
} from "../actions/types";

const initialState = {
    subtitles: []
}

const subtitleReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SUBTITLES:
        case GET_SUBTITLES_BY_MOVIE_ID:
        case GET_SUBTITLES_BY_EPISODE_ID:
            return {
                ...state,
                subtitles: action.payload.subtitles
            }
            break;
        case ADD_SUBTITLE:
            return {
                ...state,
                subtitles: [...state.subtitles, action.payload.subtitle]
            }
            break;
        case EDIT_SUBTITLE:
            return {
                ...state,
                subtitles: state.subtitles.map(subtitleItem => {
                    if (subtitleItem._id == action.payload.subtitleID) {
                        subtitleItem = action.payload.subtitle;
                    }
                    return subtitleItem;
                }),
            }
            break;
        case DELETE_SUBTITLE:
            return {
                ...state,
                subtitles: state.subtitles.filter(subtitleItem => {
                    return action.payload.subtitle._id !== subtitleItem._id;
                })
            }
            break;
        default:
            return state;
            break;
    }
}

export default subtitleReducer;