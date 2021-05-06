import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    GET_ALL_SUBTITLES,
    GET_SUBTITLES_BY_MOVIE_ID,
    GET_SUBTITLES_BY_EPISODE_ID,
    ADD_SUBTITLE,
    DELETE_SUBTITLE,
    EDIT_SUBTITLE
} from "./types";  
import {
    uploadSubtitleFirebase,
    deleteFileFirebase
} from "../requests/firebaseStorageRequests"; 
import { getSubtitleByID } from "../requests/subtitlesRequests";
import {
    isObjectEmpty
} from "../utils/validator";
import {authHeader} from "../helpers";

const SUB_URL = `${MAIN_PROXY_URL}/subtitles`;

export const deleteSubtitle = (subtitleID) => {
    return async (dispatch) => {
        try {
            message.destroy();
            message.loading('Action in progress..', 0);

            const res = await axios.delete(`${SUB_URL}/delete/${subtitleID}`, {
                headers: {
                    ...authHeader()
                }
            });
    
            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const subtitle = res.data.data;
            await deleteFileFirebase(subtitle.subtitleURL);

            message.destroy()

            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            return dispatch({
                type: DELETE_SUBTITLE,
                payload: {
                    subtitle
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const editSubtitle = (subtitleID, updatedSubtitle) => {
    return async (dispatch) => {
        try {
            message.loading('Action in progress..', 0);
    
            const subtitle = await getSubtitleByID(subtitleID);
            let {subtitleURL} = subtitle;
            const {languageLabel, subtitleFile} = updatedSubtitle;
            let updateSubtitleObject = {languageLabel};

            if (!isObjectEmpty(subtitleFile)) {
                await deleteFileFirebase(subtitleURL);

                const subtitleFileFirebaseURL = await uploadSubtitleFirebase(subtitleFile);
                subtitleURL = subtitleFileFirebaseURL;
                updateSubtitleObject.subtitleURL = subtitleURL;
            }

            const last_modified_date = Date.now();
            const returnedSubtitle = Object.assign({}, subtitle, updatedSubtitle, {last_modified_date});

            const res = await axios.put(`${SUB_URL}/edit/${subtitleID}`, updateSubtitleObject, {
                headers: {
                    ...authHeader()
                }
            });

            message.destroy()
    
            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            message.destroy()

            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            return dispatch({
                type: EDIT_SUBTITLE,
                payload: {
                    subtitleID, subtitle: returnedSubtitle
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const addSubtitle = (newSubtitle) => {
    return async (dispatch) => {
        try {
            message.loading('Action in progress..', 0);

            const {videoID, languageLabel, subtitleFile} = newSubtitle;
            const subtitleURL = await uploadSubtitleFirebase(subtitleFile)
            const res = await axios.post(`${SUB_URL}/add`, {
                videoID, languageLabel, subtitleURL
            }, {
                headers: {
                    ...authHeader()
                }
            });
    
            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            const subtitle = res.data.data;

            message.destroy()

            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            return dispatch({
                type: ADD_SUBTITLE,
                payload: {
                    subtitle
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const getAllSubtitles = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(SUB_URL);
    
            const subtitles = res.data.data;
    
            return dispatch({
                type: GET_ALL_SUBTITLES,
                payload: {
                    subtitles
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const getAllSubtitlesByMovieID = (movieID) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${SUB_URL}/movieID/${movieID}`);
    
            const subtitles = res.data.data;
    
            return dispatch({
                type: GET_SUBTITLES_BY_MOVIE_ID,
                payload: {
                    subtitles
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const getAllSubtitlesByEpisodeID = (episodeID) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${SUB_URL}/episodeID/${episodeID}`);
    
            const subtitles = res.data.data;
    
            return dispatch({
                type: GET_SUBTITLES_BY_EPISODE_ID,
                payload: {
                    subtitles
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}