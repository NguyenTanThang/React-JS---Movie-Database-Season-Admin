import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    ADD_EPISODE,
    DELETE_EPISODE,
    EDIT_EPISODE,
    GET_ALL_EPISODES,
    GET_EPISODES_BY_SEASON_ID
} from "./types";   
import {
    uploadEpisodeFirebase,
    deleteFileFirebase
} from "../requests/firebaseStorageRequests";
import {
    removeEpisodeRelatedFiles,
    getEpisodeByID
} from "../requests/episodeRequests";
import {
    isObjectEmpty
} from "../utils/validator";

const EPISODE_URL = `${MAIN_PROXY_URL}/episodes`;

export const deleteEpisode = (episodeID) => {
    return async (dispatch) => {
        try {
            let res = await removeEpisodeRelatedFiles(episodeID);
            res = await axios.delete(`${EPISODE_URL}/delete/${episodeID}`);
            
            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const episode = res.data.data;

            return dispatch({
                type: DELETE_EPISODE,
                payload: {
                    episode
                }
            })
        } catch (error) {
            console.log(error);
            message.error(error.message, 5);
        }
    }
}

export const editEpisode = (episodeID, updatedEpisode) => {
    return async (dispatch) => {
        try {
            message.loading('Action in progress..', 0);

            const response = await getEpisodeByID(episodeID);
            let {episodeURL} = response;
            const {name, description, episodeFile, episodeNum} = updatedEpisode;
            let updateEpisodeObject = {name, description, episodeNum};

            if (!isObjectEmpty(episodeFile)) {
                await deleteFileFirebase(episodeURL);

                const episodeFileFirebaseURL = await uploadEpisodeFirebase(episodeFile);
                episodeURL = episodeFileFirebaseURL;
                updateEpisodeObject.episodeURL = episodeURL;
            }

            const res = await axios.put(`${EPISODE_URL}/edit/${episodeID}`, updateEpisodeObject);

            message.destroy()
    
            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const episode = res.data.data;

            return dispatch({
                type: EDIT_EPISODE,
                payload: {
                    episodeID, episode
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const addEpisode = (newEpisode) => {
    return async (dispatch) => {
        try {
            message.loading('Action in progress..', 0);
            const {name, description, episodeFile, episodeNum, seasonID} = newEpisode;

            const episodeFileFirebaseURL = await uploadEpisodeFirebase(episodeFile);

            const episodeURL = episodeFileFirebaseURL;

            const res = await axios.post(`${EPISODE_URL}/add`, {name, description, episodeFile, episodeNum, episodeURL, seasonID});
    
            message.destroy()

            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const episode = res.data.data;

            return dispatch({
                type: ADD_EPISODE,
                payload: {
                    episode
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const getAllEpisodes = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(EPISODE_URL);
    
            const episodes = res.data.data;
    
            return dispatch({
                type: GET_ALL_EPISODES,
                payload: {
                    episodes
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const getEpisodesBySeasonID = (seasonID) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${EPISODE_URL}/seasonID/${seasonID}`);
    
            const episodes = res.data.data;
    
            return dispatch({
                type: GET_EPISODES_BY_SEASON_ID,
                payload: {
                    episodes
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}