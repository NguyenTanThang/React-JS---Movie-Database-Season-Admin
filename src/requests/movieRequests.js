import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {deleteFileFirebase} from "./firebaseStorageRequests";

const MOVIE_URL = `${MAIN_PROXY_URL}/movies`;

export const removeMovieRelatedFiles = async (movieID) => {
    try {
        const movieItem = await getMovieByID(movieID);

        const {movieURL, trailerURL, posterURL} = movieItem;

        await deleteFileFirebase(movieURL);
        await deleteFileFirebase(trailerURL);
        await deleteFileFirebase(posterURL);

        return movieItem;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const checkForURLUsage = async (movieID) => {
    try {
        const res = await axios.get(`${MOVIE_URL}/checkURLUsage/${movieID}`);

        console.log(res);

        const {
            movieURLUsage,
            trailerURLUsage,
            posterURLUsage,
            movie
        } = res.data.data;

        const {movieURL, trailerURL, posterURL} = movie;

        if (movieURLUsage.length === 0) {
            await deleteFileFirebase(movieURL)
        }
        
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

export const getMovieByID = async (movieID) => {
    try {
        const res = await axios.get(`${MOVIE_URL}/${movieID}`);

        return res.data.data;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}