import React, { Component } from 'react';
import { CustomInput, FormGroup } from 'reactstrap';
import {isObjectEmpty} from "../../utils/validator";

let fileName;

export default class FileUploader extends Component {

    renderFileInput = () => {
        const {labelTitle, inputName, currentFile, handleFileChange} = this.props;
        fileName = labelTitle;

        if (currentFile && !isObjectEmpty(currentFile)) {
            console.log(currentFile);
            fileName = currentFile.name
        }

        if (inputName === "posterFile" || inputName === "photoFile") {
            return (
                <CustomInput type="file" id={inputName} name={inputName} label={fileName} onChange={handleFileChange} accept="image/*"/>
            )
        } 
        else if (inputName === "subtitleFile") {
            return (
                <CustomInput type="file" id={inputName} name={inputName} label={fileName} onChange={handleFileChange} accept=".vtt"/>
            )
        }
        else {
            return (
                <CustomInput type="file" id={inputName} name={inputName} label={fileName} onChange={handleFileChange} accept=".mp4"/>
            )
        }
    }

    render() {
        const {renderFileInput} = this;

        return (
            <FormGroup>
                {renderFileInput()}
            </FormGroup>
        )
    }
}
