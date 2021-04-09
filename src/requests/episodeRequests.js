import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";
import {
    uploadEpisodeFirebase,
    deleteFileFirebase
} from "./firebaseStorageRequests";
import {
    removeSubtitleByEpisodeID
} from "./subtitlesRequests";
import {
    isObjectEmpty
} from "../utils/validator";
import {authHeader} from "../helpers";

const EPISODES_URL = `${MAIN_PROXY_URL}/episodes`;

export const addEpisodeAsync = async (newEpisode) => {
    try {
        message.loading('Action in progress..', 0);
        const {name, description, episodeFile, episodeNum, seasonID} = newEpisode;

        const episodeFileFirebaseURL = await uploadEpisodeFirebase(episodeFile);

        const episodeURL = episodeFileFirebaseURL;

        const res = await axios.post(`${EPISODES_URL}/add`, {name, description, episodeFile, episodeNum, episodeURL, seasonID}, {
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

        return res;
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const editEpisodeAsync = async (episodeID, updatedEpisode) => {
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

        const res = await axios.put(`${EPISODES_URL}/edit/${episodeID}`, updateEpisodeObject, {
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

        return res
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const removeEpisodeRelatedFiles = async (episodeID) => {
    try {
        const episodeItem = await getEpisodeByID(episodeID);

        const {episodeURL} = episodeItem;

        await deleteFileFirebase(episodeURL);

        return episodeItem;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const getEpisodeByID = async (episodeID) => {
    try {
        const res = await axios.get(`${EPISODES_URL}/${episodeID}`);

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const checkForURLUsageEpisodes = async (seriesID) => {
    try {
        const res = await axios.get(`${EPISODES_URL}/checkURLUsage/seriesID/${seriesID}`);

        console.log(res);

        const {
            episodes,
            //episodeList,
            episodeURLUsage
        } = res.data.data;

        for (let i = 0; i < episodes.length; i++) {
            let tof = true;
            const episodeMasterItem = episodes[i];

            for (let j = 0; j < episodeURLUsage.length; j++) {
                const episodeURLUsageItem = episodeURLUsage[j];
                const {
                    indexIndicator
                } = episodeURLUsageItem;

                if (indexIndicator === i) {
                    tof = false;
                    break;
                }
            }

            if (tof) {
                await deleteFileFirebase(episodeMasterItem.episodeURL);
            }
        }

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const deleteExceededEpisode = async (seriesID, totalEpisode) => {
    try {
        const episodes = await getEpisodesBySeriesID(seriesID);

        for (let index = 0; index < episodes.length; index++) {
            const episode = episodes[index];
            if (episode.episodeNum > totalEpisode) {
                console.log("episode");
                console.log(episode);
                await deleteEpisodeByID(episode._id);
            }
        }
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const deleteEpisodeByID = async (episodeID) => {
    try {
        const res = await axios.delete(`${EPISODES_URL}/delete/${episodeID}`, {
            headers: {
                ...authHeader()
            }
        });

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const deleteEpisodeBySeriesIDAndEpNum = async (seriesID, episodeObject) => {
    try {
        const {
            episodeNum
        } = episodeObject;
        const res = await axios.delete(`${EPISODES_URL}/delete/seriesID/${seriesID}/epNum/${episodeNum}`, {
            headers: {
                ...authHeader()
            }
        });

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const getEpisodesBySeriesID = async (seriesID) => {
    try {
        const res = await axios.get(`${EPISODES_URL}/seriesID/${seriesID}`);

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const getEpisodesBySeasonID = async (seasonID) => {
    try {
        const res = await axios.get(`${EPISODES_URL}/seasonID/${seasonID}`);

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const addEpisode = async (seriesID, newEpisode) => {
    try {
        const {
            episodeFile,
            episodeNum
        } = newEpisode;

        let episodeURL = await uploadEpisodeFirebase(episodeFile)
        const res = await axios.post(`${EPISODES_URL}/add/`, {
            seriesID,
            episodeURL,
            episodeNum
        }, {
            headers: {
                ...authHeader()
            }
        });

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const editEpisode = async (seriesID, updatedEpisode) => {
    try {
        //const {episodeFile, episodeNum} = updatedEpisode;

        /*
        let episodeURL = await uploadEpisodeFirebase(episodeFile);
        */
        await deleteEpisodeBySeriesIDAndEpNum(seriesID, updatedEpisode)
        /*
        const res = await axios.put(`${EPISODES_URL}/edit/seriesID/${seriesID}`, {
            episodeURL, episodeNum
        });
        */
        const createdEpisode = await addEpisode(seriesID, updatedEpisode);

        return createdEpisode;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const addMultipleEpisodes = async (seriesID, episodes) => {
    try {
        for (let index = 0; index < episodes.length; index++) {
            const episode = episodes[index];
            await addEpisode(seriesID, episode);
        }
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const editMultipleEpisodes = async (seriesID, episodes) => {
    try {
        for (let index = 0; index < episodes.length; index++) {
            const episode = episodes[index];
            await editEpisode(seriesID, episode);
        }
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const deleteEpisodesBySeasonID = async (seasonID) => {
    try {
        const res = await axios.get(`${EPISODES_URL}/seasonID/${seasonID}`, {
            headers: {
                ...authHeader()
            }
        });
        const episodeList = res.data.data;

        for (let index = 0; index < episodeList.length; index++) {
            const episodeItem = episodeList[index];
            await deleteFileFirebase(episodeItem.episodeURL);
            await removeSubtitleByEpisodeID(episodeItem._id);
            const deleteRes = await axios.delete(`${EPISODES_URL}/delete/${episodeItem._id}`, {
                headers: {
                    ...authHeader()
                }
            });
            console.log(deleteRes);
        }

        return episodeList;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}