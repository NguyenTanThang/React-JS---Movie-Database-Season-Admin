import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {deleteFileFirebase} from "./firebaseStorageRequests";
import {deleteEpisodesBySeasonID} from "./episodeRequests"

const SEASON_URL = `${MAIN_PROXY_URL}/seasons`;

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
            await axios.delete(`${SEASON_URL}/delete/${seasonItem._id}`);
        }

        return seasonList;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}