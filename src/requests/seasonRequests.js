import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {deleteFileFirebase, uploadPosterFirebase, uploadTrailerFirebase} from "./firebaseStorageRequests";
import {deleteEpisodesBySeasonID} from "./episodeRequests";
import {
    isObjectEmpty
} from "../utils/validator";
import {authHeader} from "../helpers";

const SEASON_URL = `${MAIN_PROXY_URL}/seasons`;

export const addSeasonAsync = async (newSeason) => {
    try {
        message.loading('Action in progress..', 0);
        const {name, description, posterFile, trailerFile, seriesID, seasonNum} = newSeason;

        const posterFileFirebaseURL = await uploadPosterFirebase(posterFile);
        const trailerFileFirebaseURL = await uploadTrailerFirebase(trailerFile);

        const posterURL = posterFileFirebaseURL;
        const trailerURL = trailerFileFirebaseURL;

        const res = await axios.post(`${SEASON_URL}/add`, {seriesID, name, description, posterURL, trailerURL, seasonNum}, {
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

export const editSeasonAsync = async (seasonID, updatedSeason) => {
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

        const res = await axios.put(`${SEASON_URL}/edit/${seasonID}`, updateSeasonObject, {
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

export const removeSeasonRelatedFiles = async (movieID) => {
    try {
        const res = await getSeasonByID(movieID);

        const seasonItem = res;

        const {trailerURL, posterURL} = seasonItem;

        await deleteFileFirebase(trailerURL);
        await deleteFileFirebase(posterURL);

        return res;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const getSeasonByID = async (seasonID) => {
    try {
        const res = await axios.get(`${SEASON_URL}/${seasonID}`);

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const getSeasonsBySeriesID = async (seriesID) => {
    try {
        const res = await axios.get(`${SEASON_URL}/seriesID/${seriesID}`);

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const deleteSeasonsBySeriesID = async (seriesID) => {
    try {
        const res = await axios.get(`${SEASON_URL}/seriesID/${seriesID}`);
        const seasonList = res.data.data;

        for (let index = 0; index < seasonList.length; index++) {
            const seasonItem = seasonList[index];
            await deleteEpisodesBySeasonID(seasonItem._id)
            await axios.delete(`${SEASON_URL}/delete/${seasonItem._id}`, {
                headers: {
                    ...authHeader()
                }
            });
        }

        return seasonList;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}