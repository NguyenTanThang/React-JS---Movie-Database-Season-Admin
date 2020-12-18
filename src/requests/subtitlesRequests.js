import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";
import {
    deleteFileFirebase
} from "./firebaseStorageRequests";

const SUB_URL = `${MAIN_PROXY_URL}/subtitles`;

export const removeSubtitleRelatedFiles = async (subID) => {
    try {
        const res = await getSubtitleByID(subID);

        const subItem = res.data.data;

        const {subtitleURL} = subItem;

        await deleteFileFirebase(subtitleURL);

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const removeSubtitleByMovieID = async (movieID) => {
    try {
        const res = await axios.delete(`${SUB_URL}/delete/movieID/${movieID}`)

        const subtitles = res.data.data;

        for (let i = 0; i < subtitles.length; i++) {
            const subItem = subtitles[i];
            const {subtitleURL} = subItem;
            await deleteFileFirebase(subtitleURL);
        }

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const removeSubtitleByEpisodeID = async (episodeID) => {
    try {
        const res = await axios.delete(`${SUB_URL}/delete/episodeID/${episodeID}`);

        const subtitles = res.data.data;

        for (let i = 0; i < subtitles.length; i++) {
            const subItem = subtitles[i];
            const {subtitleURL} = subItem;
            await deleteFileFirebase(subtitleURL);
        }

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const getSubtitleByID = async (subID) => {
    try {
        const res = await axios.get(`${SUB_URL}/${subID}`);

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}