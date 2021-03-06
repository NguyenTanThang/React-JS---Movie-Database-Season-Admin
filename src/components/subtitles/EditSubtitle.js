import React, { Component } from 'react';
import {
    connect
} from "react-redux";
import {
    editSubtitle
} from "../../actions/subtitleActions";
import {
    getSubtitleByID
} from "../../requests/subtitlesRequests";
import { Button, message } from 'antd';
import TextField from '@material-ui/core/TextField';
import {Form, FormGroup, Row, Label} from 'reactstrap';
import UpdateFileModal from "../partials/UpdateFileModal";
import {getFileExtension} from "../../utils/utils";
import {withRouter} from 'react-router-dom';

class EditSubtitle extends Component {

    state = {
        languageLabel: "",
        subtitleFile: {},
        subtitleURL: "",
        subtitleItem: {},
        loadingUpdate: false
    }

    async componentDidMount() {
        const {subtitleID} = this.props;
        const subtitleItem = await getSubtitleByID(subtitleID);
        
        const {
            languageLabel,
            subtitleURL
        } = subtitleItem;

        this.setState({
            languageLabel,
            subtitleURL,
            subtitleItem
        })
    }

    onClear = (e) => {
        e.preventDefault()
        this.setState({
            name: "",
            description: "",
        })
    }

    handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        if (file) {
            const fileExt = getFileExtension(file.name);
            if (fileExt !== "vtt") {
                message.error("Please upload a .vtt file. Although the file's name is visible it will not be uploaded", 5);
                return this.setState({
                    [e.target.name]: {}
                })
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
            loadingUpdate: true
        })

        const {editSubtitle, subtitleID} = this.props;
        const {languageLabel, subtitleFile} = this.state;

        editSubtitle(subtitleID, {languageLabel, subtitleFile});

        this.setState({
            loadingUpdate: false
        })

        setTimeout(() => {
            this.props.history.goBack();
        }, 2500);
    }

    render() {
        const {handleChange, handleSubmit, handleFileChange, onClear} = this;
        const {languageLabel, subtitleFile, subtitleURL, loadingUpdate} = this.state;

        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <FormGroup>
                                <Label>Language Label</Label>
                                <TextField id="languageLabel" name="languageLabel" label="Language Label" variant="outlined" className="material-input" required onChange={handleChange} value={languageLabel}/>
                            </FormGroup>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <FormGroup>
                                <Label>Subtitle</Label>
                                <UpdateFileModal 
                                    labelTitle="Pick a file to replace the current one" inputName="subtitleFile" currentFile={subtitleFile} handleFileChange={handleFileChange} fileURL={subtitleURL} movieName={languageLabel} buttonTitle={"Update Subtitle"}
                                />
                            </FormGroup>
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
                                    <Button type="primary" htmlType="submit" block loading={loadingUpdate}>
                                        Save
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
        editSubtitle: (subtitleID, updatedSubtitle) => {
            dispatch(editSubtitle(subtitleID, updatedSubtitle))
        }
    }
  }
  
export default connect(null, mapDispatchToProps)(withRouter(EditSubtitle));
