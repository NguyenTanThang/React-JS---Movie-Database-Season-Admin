import React, { Component } from 'react';
import FileUploader from "./FileUploader";
import { Modal, Button } from 'antd';
import {
    isObjectEmpty,
} from "../../utils/validator";

class UpdateFileModal extends Component {

    state = {
        visible: false
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      };

      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

    renderCurrentFile = () => {
        const {fileURL, movieName, currentFile} = this.props;

        if (!isObjectEmpty(currentFile) || !fileURL) {
            return (<></>);
        }
        
        if (fileURL.includes(".mp4")) {
            return (
                <div className="current-file-image-container">
                    <video width="100%" height="300" controls className="current-file-video">
                        <source src={fileURL} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                </div>
            )
        } else {
            return (
                <div className="current-file-image-container">
                    <img src={fileURL} alt={movieName} className="img-fluid current-file-image"/>
                </div>
            )
        }
    }

    renderFileUploader = () => {
        const {labelTitle, inputName, currentFile, handleFileChange} = this.props;
        
        return (
            <FileUploader labelTitle={labelTitle} inputName={inputName} currentFile={currentFile} handleFileChange={handleFileChange}/>
        )
    }

    render() {
        const {renderFileUploader, renderCurrentFile} = this;
        const {buttonTitle} = this.props;
        
        return (
            <>
                <Button type="primary" onClick={this.showModal} block>
                    {buttonTitle}
                </Button>
                <Modal
                    title={buttonTitle}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    okButtonProps={{ style: {display: "none"} }}
                >
                    {renderCurrentFile()}
                    {renderFileUploader()}
                </Modal>
            </>
        )
    }
}

export default UpdateFileModal;
