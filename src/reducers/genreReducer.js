import {
    GET_ALL_GENRES,
    ADD_GENRE,
    DELETE_GENRE,
    EDIT_GENRE
} from "../actions/types";

const initialState = {
    genres: []
}

const genreReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_GENRES:
            return {
                ...state,
                genres: action.payload.genres
            }
            break;
        case ADD_GENRE:
            return {
                ...state,
                genres: [...state.genres, action.payload.genre]
            }
            break;
        case EDIT_GENRE:
            return {
                ...state,
                genres: state.genres.map(genreItem => {
                    if (genreItem._id == action.payload.genreID) {
                        genreItem = action.payload.genre;
                    }
                    return genreItem;
                }),
            }
            break;
        case DELETE_GENRE:
            return {
                ...state,
                genres: state.genres.filter(genreItem => {
                    return action.payload.genre._id !== genreItem._id;
                })
            }
            break;
        default:
            return state;
            break;
    }
}

export default genreReducer;