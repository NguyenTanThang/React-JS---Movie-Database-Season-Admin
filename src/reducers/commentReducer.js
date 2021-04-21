import {
    GET_COMMENTS_BY_MOVIE_ID,
    DELETE_COMMENT,
    GET_ALL_COMMENTS,
} from "../actions/types";

const initialState = {
    comments: []
}

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COMMENTS:
        case GET_COMMENTS_BY_MOVIE_ID:
            return {
                ...state,
                comments: action.payload.comments
            }
            break;
        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(commentItem => {
                    return action.payload.comment._id !== commentItem._id;
                })
            }
            break;
        default:
            return state;
            break;
    }
}

export default commentReducer;