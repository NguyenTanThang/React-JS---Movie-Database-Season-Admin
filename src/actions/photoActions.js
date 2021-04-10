import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    GET_ALL_PHOTOS,
    ADD_PHOTO,
    DELETE_PHOTO,
    GET_PHOTOS_BY_MOVIE_ID,
    GET_PHOTOS_BY_SERIES_ID,
    GET_PHOTOS_BY_SEASON_ID
} from "./types";  
import {
    uploadPhotoFirebase,
    deleteFileFirebase
} from "../requests/firebaseStorageRequests"; 
import {authHeader} from "../helpers";

const PHOTO_URL = `${MAIN_PROXY_URL}/photos`;

export const deletePhoto = (photoID) => {
    return async (dispatch) => {
        try {
            message.destroy();
            message.loading('Action in progress..', 0);
            
            const res = await axios.delete(`${PHOTO_URL}/delete/${photoID}`, {
                headers: {
                    ...authHeader()
                }
            });
            const photo = res.data.data;
            await deleteFileFirebase(photo.photoURL);

            message.destroy()

            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            return dispatch({
                type: DELETE_PHOTO,
                payload: {
                    photo
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const addPhoto = (newPhoto) => {
    return async (dispatch) => {
        try {
            message.loading('Action in progress..', 0);

            const {recordID, photoFile} = newPhoto;

            const photoURL = await uploadPhotoFirebase(photoFile)
            const res = await axios.post(`${PHOTO_URL}/add`, {
                recordID, photoURL
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

            const photo = res.data.data;

            message.destroy()

            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            return dispatch({
                type: ADD_PHOTO,
                payload: {
                    photo
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const getAllPhotos = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(PHOTO_URL);
    
            const photos = res.data.data;
    
            return dispatch({
                type: GET_ALL_PHOTOS,
                payload: {
                    photos
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const getAllPhotosByMovieID = (movieID) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${PHOTO_URL}/movieID/${movieID}`);
    
            const photos = res.data.data;
            console.log("photos")
            console.log(photos)
    
            return dispatch({
                type: GET_PHOTOS_BY_MOVIE_ID,
                payload: {
                    photos
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const getAllPhotosBySeriesID = (seriesID) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${PHOTO_URL}/seriesID/${seriesID}`);
    
            const photos = res.data.data;
    
            return dispatch({
                type: GET_PHOTOS_BY_SERIES_ID,
                payload: {
                    photos
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const getAllPhotosBySeasonID = (seasonID) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${PHOTO_URL}/seasonID/${seasonID}`);
    
            const photos = res.data.data;
    
            return dispatch({
                type: GET_PHOTOS_BY_SEASON_ID,
                payload: {
                    photos
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}