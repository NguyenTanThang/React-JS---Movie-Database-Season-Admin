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

class EditSubtitle extends Component {

    state = {
        languageLabel: "",
        subtitleFile: {},
        subtitleURL: "",
        subtitleItem: {}
    }

    async componentDidMount() {
        const {subtitleID} = this.props;
        const subtitleItem = await getSubtitleByID(subtitleID);
        
        console.log(subtitleItem)
   
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
        const {editSubtitle, subtitleID} = this.props;
        const {languageLabel, subtitleFile} = this.state;

        editSubtitle(subtitleID, {languageLabel, subtitleFile});
    }

    render() {
        const {handleChange, handleSubmit, handleFileChange, onClear} = this;
        const {languageLabel, subtitleFile, subtitleURL} = this.state;

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
                                    <Button type="primary" htmlType="submit" block>
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
  
export default connect(null, mapDispatchToProps)(EditSubtitle);
