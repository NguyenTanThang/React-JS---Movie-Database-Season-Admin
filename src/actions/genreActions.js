import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    GET_ALL_GENRES,
    ADD_GENRE,
    DELETE_GENRE,
    EDIT_GENRE
} from "./types";   
import {
    setLoading,
    clearLoading
} from "./loadingActions";
import {authHeader} from "../helpers";

const GENRE_URL = `${MAIN_PROXY_URL}/genres`;

export const deleteGenre = (genreID) => {
    return async (dispatch) => {
        try {
            message.destroy();
            message.loading("Deleting...", 0);

            const res = await axios.delete(`${GENRE_URL}/delete/${genreID}`, {
                headers: {
                    ...authHeader()
                }
            });
    
            message.destroy();
            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const genre = res.data.data;

            return dispatch({
                type: DELETE_GENRE,
                payload: {
                    genre
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const editGenre = (genreItem, updatedGenre) => {
    return async (dispatch) => {
        try {
            message.destroy();
            message.loading("Updating...", 0);

            const genreID = genreItem._id;
            const res = await axios.put(`${GENRE_URL}/edit/${genreID}`, updatedGenre, {
                headers: {
                    ...authHeader()
                }
            });
    
            message.destroy();
            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const genre = res.data.data;
            const last_modified_date = Date.now();
            const returnedGenre = Object.assign({}, genreItem, genre, updatedGenre, {last_modified_date});

            return dispatch({
                type: EDIT_GENRE,
                payload: {
                    genreID, genre: returnedGenre
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const addGenre = (name) => {
    return async (dispatch) => {
        try {
            message.destroy();
            message.loading("Creating...", 0);

            const res = await axios.post(`${GENRE_URL}/add`, {
                name
            }, {
                headers: {
                    ...authHeader()
                }
            });
    
            message.destroy();
            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const genre = res.data.data;

            return dispatch({
                type: ADD_GENRE,
                payload: {
                    genre
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const getAllGenres = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());

            const res = await axios.get(GENRE_URL);
    
            const genres = res.data.data;
    
            dispatch(clearLoading());

            return dispatch({
                type: GET_ALL_GENRES,
                payload: {
                    genres
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}