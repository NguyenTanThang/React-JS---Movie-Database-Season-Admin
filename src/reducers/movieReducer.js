import {
    ADD_MOVIE,
    GET_ALL_MOVIES,
    DELETE_MOVIE,
    EDIT_MOVIE
} from "../actions/types";

const initialState = {
    movies: []
}

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_MOVIES:
            return {
                ...state,
                movies: action.payload.movies
            }
            break;
        case ADD_MOVIE:
            return {
                ...state,
                movies: [...state.movies, action.payload.movie]
            }
            break;
        case EDIT_MOVIE:
            return {
                ...state,
                movies: state.movies.map(movieItem => {
                    if (movieItem._id == action.payload.movieID) {
                        movieItem = action.payload.movie;
                    }
                    return movieItem;
                }),
            }
            break;
        case DELETE_MOVIE:
            return {
                ...state,
                movies: state.movies.filter(movieItem => {
                    return action.payload.movie._id !== movieItem._id;
                })
            }
            break;
        default:
            return state;
            break;
    }
}

export default movieReducer;