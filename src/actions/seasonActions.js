import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    GET_ALL_SEASONS,
    ADD_SEASON,
    DELETE_SEASON,
    EDIT_SEASON,
    GET_SEASONS_BY_SERIES_ID
} from "./types";   
import {
    uploadPosterFirebase,
    uploadTrailerFirebase,
    deleteFileFirebase
} from "../requests/firebaseStorageRequests";
import {
    removeSeasonRelatedFiles,
    getSeasonByID
} from "../requests/seasonRequests";
import {
    deleteEpisodesBySeasonID
} from "../requests/episodeRequests";
import {
    isObjectEmpty
} from "../utils/validator";

const SEASON_URL = `${MAIN_PROXY_URL}/seasons`;

export const deleteSeason = (seasonID) => {
    return async (dispatch) => {
        try {
            let res = await removeSeasonRelatedFiles(seasonID);
            res = await deleteEpisodesBySeasonID(seasonID);
            res = await axios.delete(`${SEASON_URL}/delete/${seasonID}`);
            
            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const season = res.data.data;

            return dispatch({
                type: DELETE_SEASON,
                payload: {
                    season
                }
            })
        } catch (error) {
            console.log(error);
            message.error(error.message, 5);
        }
    }
}

export const editSeason = (seasonID, updatedSeason) => {
    return async (dispatch) => {
        try {
            message.loading('Action in progress..', 0);

            const response = await getSeasonByID(seasonID);
            let {trailerURL, posterURL} = response;
            const {name, description, posterFile, trailerFile, seasonNum} = updatedSeason;
            let updateSeasonObject = {name, description, seasonNum};

            if (!isObjectEmpty(posterFile)) {
                console.log(posterFile);
                await deleteFileFirebase(posterURL);

                const posterFileFirebaseURL = await uploadPosterFirebase(posterFile);
                posterURL = posterFileFirebaseURL;
                updateSeasonObject.posterURL = posterURL;
            }

            if (!isObjectEmpty(trailerFile)) {
                console.log(trailerURL);
                await deleteFileFirebase(trailerURL);

                const trailerFileFirebaseURL = await uploadTrailerFirebase(trailerFile);
                trailerURL = trailerFileFirebaseURL;
                updateSeasonObject.trailerURL = trailerURL;
            }

            const res = await axios.put(`${SEASON_URL}/edit/${seasonID}`, updateSeasonObject);

            message.destroy()
    
            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const season = res.data.data;

            return dispatch({
                type: EDIT_SEASON,
                payload: {
                    seasonID, season
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const addSeason = (newSeason) => {
    return async (dispatch) => {
        try {
            message.loading('Action in progress..', 0);
            const {name, description, posterFile, trailerFile, seriesID, seasonNum} = newSeason;

            const posterFileFirebaseURL = await uploadPosterFirebase(posterFile);
            const trailerFileFirebaseURL = await uploadTrailerFirebase(trailerFile);

            const posterURL = posterFileFirebaseURL;
            const trailerURL = trailerFileFirebaseURL;

            const res = await axios.post(`${SEASON_URL}/add`, {seriesID, name, description, posterURL, trailerURL, seasonNum});
    
            message.destroy()

            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const season = res.data.data;

            return dispatch({
                type: ADD_SEASON,
                payload: {
                    season
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const getAllSeasons = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(SEASON_URL);
    
            const seasons = res.data.data;
    
            return dispatch({
                type: GET_ALL_SEASONS,
                payload: {
                    seasons
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const getSeasonsBySeriesID = (seriesID) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${SEASON_URL}/seriesID/${seriesID}`);
    
            const seasons = res.data.data;
    
            return dispatch({
                type: GET_SEASONS_BY_SERIES_ID,
                payload: {
                    seasons
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}