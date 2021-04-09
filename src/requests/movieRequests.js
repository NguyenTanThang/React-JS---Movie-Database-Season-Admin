import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";
import {
    deleteFileFirebase,
    uploadPosterFirebase,
    uploadTrailerFirebase,
    uploadMovieFirebase
} from "./firebaseStorageRequests";
import {
    isObjectEmpty
} from "../utils/validator";
import {authHeader} from "../helpers";

const MOVIE_URL = `${MAIN_PROXY_URL}/movies`;

export const addMovieAsync = async (newMovie) => {
    try {
        const {
            name,
            genres,
            description,
            IMDB_ID,
            posterFile,
            trailerFile,
            movieFile
        } = newMovie;

        const posterFileFirebaseURL = await uploadPosterFirebase(posterFile);
        const trailerFileFirebaseURL = await uploadTrailerFirebase(trailerFile);
        const movieFileFirebaseURL = await uploadMovieFirebase(movieFile);

        const posterURL = posterFileFirebaseURL;
        const trailerURL = trailerFileFirebaseURL;
        const movieURL = movieFileFirebaseURL;

        const res = await axios.post(`${MOVIE_URL}/add`, {
            name,
            genres,
            description,
            IMDB_ID,
            movieURL,
            posterURL,
            trailerURL
        }, {
            headers: {
                ...authHeader()
            }
        });

        return res;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const editMovieAsync = async (movieID, updatedMovie) => {
    try {
        message.loading('Action in progress..', 0);

        const response = await getMovieByID(movieID);
        let {
            trailerURL,
            movieURL,
            posterURL
        } = response;
        const oldTrailerURL = trailerURL;
        const oldMovieURL = movieURL;
        const oldPosterURL = posterURL;
        const {
            name,
            genres,
            description,
            IMDB_ID,
            posterFile,
            trailerFile,
            movieFile
        } = updatedMovie;
        let updateMovieObject = {
            name,
            genres,
            description,
            IMDB_ID
        };

        if (!isObjectEmpty(posterFile)) {
            const posterFileFirebaseURL = await uploadPosterFirebase(posterFile);
            posterURL = posterFileFirebaseURL;
            updateMovieObject.posterURL = posterURL;
        }

        if (!isObjectEmpty(trailerFile)) {
            const trailerFileFirebaseURL = await uploadTrailerFirebase(trailerFile);
            trailerURL = trailerFileFirebaseURL;
            updateMovieObject.trailerURL = trailerURL;
        }

        if (!isObjectEmpty(movieFile)) {
            const movieFileFirebaseURL = await uploadMovieFirebase(movieFile);
            movieURL = movieFileFirebaseURL;
            updateMovieObject.movieURL = movieURL;
        }

        const res = await axios.put(`${MOVIE_URL}/edit/${movieID}`, updateMovieObject, {
            headers: {
                ...authHeader()
            }
        });
    
        if (res.data.success) {
            if (!isObjectEmpty(posterFile)) {
                await deleteFileFirebase(oldPosterURL);
            }
            if (!isObjectEmpty(trailerFile)) {
                await deleteFileFirebase(oldTrailerURL);
            }
            if (!isObjectEmpty(movieFile)) {
                await deleteFileFirebase(oldMovieURL);
            }
            message.destroy()
            message.success(res.data.message, 5);
        } else {
            message.destroy()
            return message.warning(res.data.message, 5);
        }

        return res;
    } catch (error) {
        console.log(error);
        message.error(`${error.message}`, 5);
    }
}

export const removeMovieRelatedFiles = async (movieID) => {
    try {
        const movieItem = await getMovieByID(movieID);

        const {
            movieURL,
            trailerURL,
            posterURL
        } = movieItem;

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

        const {
            movieURL,
            trailerURL,
            posterURL
        } = movie;

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