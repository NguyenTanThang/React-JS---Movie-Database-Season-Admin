import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {deleteFileFirebase} from "./firebaseStorageRequests";
import {getSeasonsBySeriesID} from "./seasonRequests";
import {deleteEpisodesBySeasonID} from "./episodeRequests";

const SERIES_URL = `${MAIN_PROXY_URL}/series`;

export const removeEpisodesBySeasonID = async (seriesID) => {
    try {
        const seasonList = await removeSeasonsBySeriesID(seriesID);
        let episodeList = [];

        for (let i = 0; i < seasonList.length; i++) {
            const seasonItem = seasonList[i];
            episodeList = await deleteEpisodesBySeasonID(seasonItem._id);
        }

        return {
            seasonList,
            episodeList
        };
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

const removeSeasonsBySeriesID = async (seriesID) => {
    try {
        const res = await getSeasonsBySeriesID(seriesID);

        const seasonList = res;

        for (let index = 0; index < seasonList.length; index++) {
            const seasonItem = seasonList[index];
            const {trailerURL, posterURL} = seasonItem;

            await deleteFileFirebase(trailerURL);
            await deleteFileFirebase(posterURL);
        }

        return res;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const removeSeriesRelatedFiles = async (seriesID) => {
    try {
        let res = await removeEpisodesBySeasonID(seriesID);
        res = await getSeriesByID(seriesID);

        const seriesItem = res;

        const {trailerURL, posterURL} = seriesItem;

        await deleteFileFirebase(trailerURL);
        await deleteFileFirebase(posterURL);

        return res;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const checkForURLUsageSeries = async (seriesID) => {
    try {
        const res = await axios.get(`${SERIES_URL}/checkURLUsage/${seriesID}`);

        console.log(res);

        const {
            trailerURLUsage,
            posterURLUsage,
            series
        } = res.data.data;

        const {trailerURL, posterURL} = series;

        if (trailerURLUsage.length === 0) {
            await deleteFileFirebase(trailerURL)
        }

        if (posterURLUsage.length === 0) {
            await deleteFileFirebase(posterURL)
        }

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const getSeriesByID = async (seriesID) => {
    try {
        const res = await axios.get(`${SERIES_URL}/${seriesID}`);

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}