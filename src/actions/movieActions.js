import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    GET_ALL_MOVIES,
    ADD_MOVIE,
    DELETE_MOVIE,
    EDIT_MOVIE
} from "./types";   
import {
    uploadPosterFirebase,
    uploadTrailerFirebase,
    uploadMovieFirebase,
    deleteFileFirebase
} from "../requests/firebaseStorageRequests";
import {
    removeMovieRelatedFiles,
    getMovieByID
} from "../requests/movieRequests";
import {
    removeSubtitleByMovieID
} from "../requests/subtitlesRequests";
import {
    isObjectEmpty
} from "../utils/validator";
import {
    setLoading,
    clearLoading
} from "./loadingActions";

const MOVIE_URL = `${MAIN_PROXY_URL}/movies`;

export const deleteMovie = (movieID) => {
    return async (dispatch) => {
        try {
            message.loading('Action in progress..', 0);

            let res = await removeSubtitleByMovieID(movieID);
            res = await removeMovieRelatedFiles(movieID);
            res = await axios.delete(`${MOVIE_URL}/delete/${movieID}`);
            
            message.destroy();

            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const movie = res.data.data;

            return dispatch({
                type: DELETE_MOVIE,
                payload: {
                    movie
                }
            })
        } catch (error) {
            console.log(error);
            message.error(error.message, 5);
        }
    }
}

export const editMovie = (movieID, updatedMovie) => {
    return async (dispatch) => {
        try {
            message.loading('Action in progress..', 0);

            const response = await getMovieByID(movieID);
            let {trailerURL, movieURL, posterURL} = response;
            const {name, genres, description, IMDB_ID, posterFile, trailerFile, movieFile} = updatedMovie;
            let updateMovieObject = {name, genres, description, IMDB_ID};

            if (!isObjectEmpty(posterFile)) {
                await deleteFileFirebase(posterURL);

                const posterFileFirebaseURL = await uploadPosterFirebase(posterFile);
                posterURL = posterFileFirebaseURL;
                updateMovieObject.posterURL = posterURL;
            }

            if (!isObjectEmpty(trailerFile)) {
                await deleteFileFirebase(trailerURL);

                const trailerFileFirebaseURL = await uploadTrailerFirebase(trailerFile);
                trailerURL = trailerFileFirebaseURL;
                updateMovieObject.trailerURL = trailerURL;
            }

            if (!isObjectEmpty(movieFile)) {
                await deleteFileFirebase(movieURL);

                const movieFileFirebaseURL = await uploadMovieFirebase(movieFile);
                movieURL = movieFileFirebaseURL;
                updateMovieObject.movieURL = movieURL;
            }

            const res = await axios.put(`${MOVIE_URL}/edit/${movieID}`, updateMovieObject);

            message.destroy()
    
            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const movie = res.data.data;

            return dispatch({
                type: EDIT_MOVIE,
                payload: {
                    movieID, movie
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const addMovie = (newMovie) => {
    return async (dispatch) => {
        try {
            message.loading('Action in progress..', 0);
            const {name, genres, description, IMDB_ID, posterFile, trailerFile, movieFile} = newMovie;

            const posterFileFirebaseURL = await uploadPosterFirebase(posterFile);
            const trailerFileFirebaseURL = await uploadTrailerFirebase(trailerFile);
            const movieFileFirebaseURL = await uploadMovieFirebase(movieFile);

            const posterURL = posterFileFirebaseURL;
            const trailerURL = trailerFileFirebaseURL;
            const movieURL = movieFileFirebaseURL;

            const res = await axios.post(`${MOVIE_URL}/add`, {name, genres, description, IMDB_ID, movieURL, posterURL, trailerURL});
    
            message.destroy();

            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const movie = res.data.data;

            return dispatch({
                type: ADD_MOVIE,
                payload: {
                    movie
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const getAllMovies = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());
            
            const res = await axios.get(MOVIE_URL);
    
            const movies = res.data.data;
    
            dispatch(clearLoading());
            return dispatch({
                type: GET_ALL_MOVIES,
                payload: {
                    movies
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}