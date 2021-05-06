import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    ADD_SERIES,
    DELETE_SERIES,
    EDIT_SERIES,
    GET_ALL_SERIES
} from "./types";   
import {
    uploadPosterFirebase,
    uploadTrailerFirebase
} from "../requests/firebaseStorageRequests";
import {
    addMultipleEpisodes,
    editMultipleEpisodes,
    deleteExceededEpisode
} from "../requests/episodeRequests";
import {
    removeSeriesRelatedFiles
} from "../requests/seriesRequests";
import {deleteSeasonsBySeriesID} from "../requests/seasonRequests";
import {
    isObjectEmpty
} from "../utils/validator";
import {
    setLoading,
    clearLoading
} from "./loadingActions";
import {authHeader} from "../helpers";

const SERIES_URL = `${MAIN_PROXY_URL}/series`;

export const deleteSeries = (seriesID) => {
    return async (dispatch) => {
        try {
            message.destroy();
            message.loading("Deleting...", 0);

            let res = await removeSeriesRelatedFiles(seriesID);
            res = await deleteSeasonsBySeriesID(seriesID);
            res = await axios.delete(`${SERIES_URL}/delete/${seriesID}`, {
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

            const series = res.data.data;

            return dispatch({
                type: DELETE_SERIES,
                payload: {
                    series
                }
            })
        } catch (error) {
            console.log(error);
            message.error(error.message, 5);
        }
    }
}

export const editSeries = (seriesID, updatedSeries) => {
    return async (dispatch) => {
        try {
            message.loading('Action in progress..', 0);

            const {name, genres, description, IMDB_ID, posterFile, trailerFile, episodes, total_episodes} = updatedSeries;
            let updateSeriesObject = {name, genres, description, IMDB_ID, total_episodes};

            if (!isObjectEmpty(posterFile)) {
                const posterFileFirebaseURL = await uploadPosterFirebase(posterFile);
                const posterURL = posterFileFirebaseURL;
                updateSeriesObject.posterURL = posterURL;
            }

            if (!isObjectEmpty(trailerFile)) {
                const trailerFileFirebaseURL = await uploadTrailerFirebase(trailerFile);
                const trailerURL = trailerFileFirebaseURL;
                updateSeriesObject.trailerURL = trailerURL;
            }

            const res = await axios.put(`${SERIES_URL}/edit/${seriesID}`, updateSeriesObject, {
                headers: {
                    ...authHeader()
                }
            });
    
            if (res.data.success) {
                const series = res.data.data;
                console.log("total_episodes");
                console.log(total_episodes);
                await editMultipleEpisodes(series._id, episodes);
                await deleteExceededEpisode(series._id, total_episodes);
                message.destroy()
                message.success(res.data.message, 5);
            } else {
                message.destroy()
                return message.warning(res.data.message, 5);
            }

            const series = res.data.data;

            return dispatch({
                type: EDIT_SERIES,
                payload: {
                    seriesID, series
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const addSeries = (newSeries) => {
    return async (dispatch) => {
        try {
            message.loading('Action in progress..', 0);
            const {name, genres, description, IMDB_ID, posterFile, trailerFile, episodes, total_episodes} = newSeries;

            const posterFileFirebaseURL = await uploadPosterFirebase(posterFile);
            const trailerFileFirebaseURL = await uploadTrailerFirebase(trailerFile);

            const posterURL = posterFileFirebaseURL;
            const trailerURL = trailerFileFirebaseURL;

            const res = await axios.post(`${SERIES_URL}/add`, {name, genres, description, IMDB_ID, posterURL, trailerURL, total_episodes}, {
                headers: {
                    ...authHeader()
                }
            });
    
            if (res.data.success) {
                const series = res.data.data;
                await addMultipleEpisodes(series._id, episodes);
                message.destroy()
                message.success(res.data.message, 5);
            } else {
                message.destroy()
                return message.warning(res.data.message, 5);
            }

            const series = res.data.data;
            
            return dispatch({
                type: ADD_SERIES,
                payload: {
                    series
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const getAllSeries = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());

            const res = await axios.get(SERIES_URL);
    
            const series = res.data.data;
    
            dispatch(clearLoading());
            return dispatch({
                type: GET_ALL_SERIES,
                payload: {
                    series
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}