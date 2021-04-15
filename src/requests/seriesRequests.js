import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {deleteFileFirebase, uploadTrailerFirebase, uploadPosterFirebase} from "./firebaseStorageRequests";
import {getSeasonsBySeriesID} from "./seasonRequests";
import {deleteEpisodesBySeasonID} from "./episodeRequests";
import {
    isObjectEmpty
} from "../utils/validator";
import {authHeader} from "../helpers";

const SERIES_URL = `${MAIN_PROXY_URL}/series`;

export const addSeriesAsync = async (newSeries) => {
    try {
        message.loading('Action in progress..', 0);
        const {name, genres, description, IMDB_ID, posterFile, trailerFile} = newSeries;

        const imdbRes = await axios.get(`${SERIES_URL}/IMDB_ID/${IMDB_ID}`);
        
        if (imdbRes.data.data) {
            message.destroy()
            return message.warning("This IMDB ID has already been used");
        }

        const posterFileFirebaseURL = await uploadPosterFirebase(posterFile);
        const trailerFileFirebaseURL = await uploadTrailerFirebase(trailerFile);

        const posterURL = posterFileFirebaseURL;
        const trailerURL = trailerFileFirebaseURL;

        const res = await axios.post(`${SERIES_URL}/add`, {name, genres, description, IMDB_ID, posterURL, trailerURL}, {
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

export const editSeriesAsync = async (seriesID, updatedSeries) => {
    try {
        message.loading('Action in progress..', 0);

        const {name, genres, description, IMDB_ID, posterFile, trailerFile} = updatedSeries;
        let updateSeriesObject = {name, genres, description, IMDB_ID};

        const imdbRes = await axios.get(`${SERIES_URL}/IMDB_ID/${IMDB_ID}`);
        
        if (imdbRes.data.data && imdbRes.data.data._id !== seriesID) {
            message.destroy()
            return message.warning("This IMDB ID has already been used");
        }

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