import genreReducer from "./genreReducer";
import managerReducer from "./managerReducer";
import customerReducer from "./customerReducer";
import movieReducer from "./movieReducer";
import seriesReducer from "./seriesReducer";
import seasonReducer from "./seasonReducer";
import episodeReducer from "./episodeReducer";
import planReducer from "./planReducer";
import subscriptionReducer from "./subscriptionReducer";
import subtitleReducer from "./subtitleReducer";
import authReducer from "./authReducer";
import loadingReducer from "./loadingReducer";
import photoReducer from "./photoReducer";
import commentReducer from "./commentReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    genreReducer,
    managerReducer,
    customerReducer,
    movieReducer,
    seriesReducer,
    planReducer,
    subscriptionReducer,
    seasonReducer,
    episodeReducer,
    subtitleReducer,
    authReducer,
    loadingReducer,
    photoReducer,
    commentReducer
})

export default rootReducer;