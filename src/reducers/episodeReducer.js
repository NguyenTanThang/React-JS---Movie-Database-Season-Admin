import {
    ADD_EPISODE,
    DELETE_EPISODE,
    EDIT_EPISODE,
    GET_ALL_EPISODES,
    GET_EPISODES_BY_SEASON_ID
} from "../actions/types";

const initialState = {
    episodes: []
}

const episodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_EPISODES:
            return {
                ...state,
                episodes: action.payload.episodes
            }
            break;
        case ADD_EPISODE:
            return {
                ...state,
                episodes: [...state.episodes, action.payload.episode]
            }
            break;
        case EDIT_EPISODE:
            return {
                ...state,
                episodes: state.episodes.map(episodeItem => {
                    if (episodeItem._id == action.payload.episodeID) {
                        episodeItem = action.payload.episode;
                    }
                    return episodeItem;
                }),
            }
            break;
        case DELETE_EPISODE:
            return {
                ...state,
                episodes: state.episodes.filter(episodeItem => {
                    return action.payload.episodes._id !== episodeItem._id;
                })
            }
            break;
        case GET_EPISODES_BY_SEASON_ID:
            return {
                ...state,
                episodes: action.payload.episodes
            }
            break;
        default:
            return state;
            break;
    }
}

export default episodeReducer;