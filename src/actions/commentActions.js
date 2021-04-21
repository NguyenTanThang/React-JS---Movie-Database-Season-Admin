import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    GET_ALL_COMMENTS,
    GET_COMMENTS_BY_MOVIE_ID,
    DELETE_COMMENT
} from "./types";  
import {authHeader} from "../helpers";

const COMMENT_URL = `${MAIN_PROXY_URL}/comments`;

export const deleteComment = (commentID) => {
    return async (dispatch) => {
        try {
            message.destroy();
            message.loading('Action in progress..', 0);
            
            const res = await axios.delete(`${COMMENT_URL}/delete/${commentID}`, {
                headers: {
                    ...authHeader()
                }
            });

            const comment = res.data.data;

            message.destroy();

            if (res.data.success) {
                message.success(res.data.message, 5);
            } else {
                return message.warning(res.data.message, 5);
            }

            return dispatch({
                type: DELETE_COMMENT,
                payload: {
                    comment
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const getAllCommentsByMovieID = (movieID) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${COMMENT_URL}/movieID/${movieID}`);
    
            const comments = res.data.data;
    
            return dispatch({
                type: GET_COMMENTS_BY_MOVIE_ID,
                payload: {
                    comments
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

export const getAllComments = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${COMMENT_URL}`);
    
            const comments = res.data.data;
    
            return dispatch({
                type: GET_ALL_COMMENTS,
                payload: {
                    comments
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}

