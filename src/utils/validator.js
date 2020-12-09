export const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
}

export const getImageDemo = function(file) {
    let ans = "";
    var reader = new FileReader();
    reader.onload = function(){
      var dataURL = reader.result;
      ans = dataURL;
    };
    reader.readAsDataURL(file);
    return ans;
  };

export const getFileExtension = (filename) => {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

export const acceptImageExt = (ext) => {
    if (ext === "png" || ext === "jpg" || ext === "jpeg") {
        return true;
    }
    return false;
}

export const acceptVideoExt = (ext) => {
    if (ext === "mp4") {
        return true;
    }
    return false;
}