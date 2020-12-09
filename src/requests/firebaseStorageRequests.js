import {firebaseStorage} from "../config/base";
import {
    exchangeURLToFileDirectory
} from "../utils/utils";
import { v4 as uuidv5 } from 'uuid';

const storage = firebaseStorage;
var storageRef = storage.ref();

export const deleteFileFirebase = async (urlString) => {
    const directoryString = exchangeURLToFileDirectory(urlString)
    var fileRef = storageRef.child(directoryString);
    await fileRef.delete()
}

export const uploadEpisodeFirebase = async (file) => {
    const storageRef = storage.ref();
    const newID = `${uuidv5()}-${file.name}`;
    const fileRef = storageRef.child(`episodes/${newID}`)
    await fileRef.put(file)
    const returnedURL = await fileRef.getDownloadURL()
    return returnedURL;
}

export const uploadPosterFirebase = async (file) => {
    const storageRef = storage.ref();
    const newID = `${uuidv5()}-${file.name}`;
    const fileRef = storageRef.child(`posters/${newID}`)
    await fileRef.put(file)
    const returnedURL = await fileRef.getDownloadURL()
    return returnedURL;
}

export const uploadTrailerFirebase = async (file) => {
    const storageRef = storage.ref();
    const newID = `${uuidv5()}-${file.name}`;
    const fileRef = storageRef.child(`trailers/${newID}`)
    await fileRef.put(file)
    const returnedURL = await fileRef.getDownloadURL()
    return returnedURL;
}

export const uploadMovieFirebase = async (file) => {
    const storageRef = storage.ref();
    const newID = `${uuidv5()}-${file.name}`;
    const fileRef = storageRef.child(`movies/${newID}`)
    await fileRef.put(file)
    const returnedURL = await fileRef.getDownloadURL()
    return returnedURL;
}
