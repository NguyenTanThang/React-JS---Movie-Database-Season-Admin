import {
    GET_ALL_PHOTOS,
    ADD_PHOTO,
    DELETE_PHOTO,
    GET_PHOTOS_BY_MOVIE_ID,
    GET_PHOTOS_BY_SERIES_ID,
    GET_PHOTOS_BY_SEASON_ID
} from "../actions/types";

const initialState = {
    photos: []
}

const photoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PHOTOS:
        case GET_PHOTOS_BY_MOVIE_ID:
        case GET_PHOTOS_BY_SERIES_ID:
            case GET_PHOTOS_BY_SEASON_ID:
            return {
                ...state,
                photos: action.payload.photos
            }
            break;
        case ADD_PHOTO:
            return {
                ...state,
                photos: [...state.photos, action.payload.photo]
            }
            break;
        case DELETE_PHOTO:
            return {
                ...state,
                photos: state.photos.filter(photoItem => {
                    return action.payload.photo._id !== photoItem._id;
                })
            }
            break;
        default:
            return state;
            break;
    }
}

export default photoReducer;