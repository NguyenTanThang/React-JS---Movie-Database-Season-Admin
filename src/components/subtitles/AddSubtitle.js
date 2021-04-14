import React, { Component } from 'react';
import {
    connect
} from "react-redux";
import {
    addSubtitle
} from "../../actions/subtitleActions";
import { Button, message } from 'antd';
import {Form, FormGroup, Row, Label} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import FileUploader from "../partials/FileUploader";
import languageCodes from "../../data/languageCodes";
import {
    getFileExtension, 
    createNotification
} from "../../utils/utils";
import {
    isObjectEmpty
} from "../../utils/validator";

class AddSubtitle extends Component {

    state = {
        languageLabel: "",
        subtitleFile: {},
        loadingCreate: false
    }

    onClear = (e) => {
        e.preventDefault()
        this.setState({
            name: "",
            description: "",
        }, () => {
            console.log(this.state);
        })
    }

    handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileExt = getFileExtension(file.name);
            if (fileExt !== "vtt") {
                message.error("Please upload a .vtt file. Although the file's name is visible it will not be uploaded", 5);
            } else {
                this.setState({
                    [e.target.name]: file
                })
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            loadingCreate: true
        })

        const {addSubtitle, videoID} = this.props;
        const {languageLabel, subtitleFile} = this.state;

        if (!subtitleFile || isObjectEmpty(subtitleFile)) {
            return createNotification("error", {
                message: "File Input",
                description: "Please check the subtitle file input. You might have leave some empty."
            });
        }

        addSubtitle({languageLabel, subtitleFile, videoID});
        
        this.setState({
            loadingCreate: false
        })
        
        setTimeout(() => {
            this.props.history.goBack();
        }, 2000);
    }

    renderLanguageCodes = () => {
        return languageCodes.map(languageCodeItem => {
            return <option key={languageCodeItem.code}>
                {languageCodeItem.name}
            </option>
        })
    }

    render() {
        const {handleChange, handleSubmit, handleFileChange, onClear, renderLanguageCodes} = this;
        const {languageLabel, subtitleFile, loadingCreate} = this.state;

        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <FormGroup>
                                <Label>Language Label</Label>
                                <select id="languageLabel" name="languageLabel" className="form-control" required onChange={handleChange} defaultValue={""}>
                                    <option key="0" value="" disabled>Language</option>
                                    {renderLanguageCodes()}
                                </select>
                            </FormGroup>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <Label>Subtitle</Label>
                            <FileUploader labelTitle="Subtitle" inputName="subtitleFile" currentFile={subtitleFile} handleFileChange={handleFileChange}/>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <FormGroup>
                                    <Button htmlType="reset" block onClick={onClear}>
                                        Clear
                                    </Button>
                            </FormGroup>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <FormGroup>
                                    <Button type="primary" htmlType="submit" block  loading={loadingCreate}>
                                        Create
                                    </Button>
                            </FormGroup>
                        </div>
                    </Row>
                </Form>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addSubtitle: (newSubtitle) => {
            dispatch(addSubtitle(newSubtitle))
        }
    }
  }
  
export default connect(null, mapDispatchToProps)(withRouter(AddSubtitle));
