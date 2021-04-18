import React, { Component } from 'react';
import {
    connect
} from "react-redux";
import {
    addEpisode
} from "../../actions/episodeActions";
import {
    addEpisodeAsync
} from "../../requests/episodeRequests";
import { Button, message } from 'antd';
import TextField from '@material-ui/core/TextField';
import {Form, FormGroup, Row, Label} from 'reactstrap';
import TinyEditor from "../partials/TinyEditor";
import FileUploader from "../partials/FileUploader";
import {
    withRouter
} from "react-router-dom";
import {
    acceptVideoExt,
    getFileExtension,
    isObjectEmpty
} from "../../utils/validator";
import {
    createNotification
} from "../../utils";

class AddEpisode extends Component {

    state = {
        name: "",
        description: "",
        episodeFile: {},
        episodeNum: "",
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
        const targetName = e.target.name;
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        const fileExt = getFileExtension(file.name);

        if (targetName == "episodeFile") {
            if (acceptVideoExt(fileExt)) {
                return this.setState({
                    episodeURL: "",
                    [e.target.name]: file
                })
            }
            message.warning("Trailer can only be MP4 file.  Although the file's name is visible it will not be uploaded", 5)
        }

        return this.setState({
            [e.target.name]: {}
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleEditorChange = (content, editor) => {
        this.setState({
            description: content
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const {addEpisode, seasonID} = this.props;
        const {name, description, episodeFile, episodeNum} = this.state;

        if (!episodeFile || isObjectEmpty(episodeFile)) {
            return createNotification("error", {
                message: "File Input",
                description: "Please check the episode file input. You might have leave some empty."
            });
        }

        if (!description) {
            return createNotification("error", {
                message: "Description",
                description: "Please check the description. You might have leave it empty."
            });
        }

        this.setState({
            loadingCreate: true
        })

        //addEpisode({name, description, episodeFile, episodeNum, seasonID});
        const res = await addEpisodeAsync({name, description, episodeFile, episodeNum, seasonID})

        this.setState({
            loadingCreate: false
        })

        if (res.data) {
            if (res.data.success) {
                this.props.history.push(`/episodes/details/${res.data.data._id}`);
            }
        } 
    }

    render() {
        const {handleChange, handleSubmit, handleEditorChange, handleFileChange, onClear} = this;
        const {name, description, episodeFile, episodeNum, loadingCreate} = this.state;

        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <FormGroup>
                                <Label>Name</Label>
                                <TextField id="name" name="name" label="Name" variant="outlined" className="material-input" required onChange={handleChange} value={name}/>
                            </FormGroup>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <FormGroup>
                                <Label>Episode Number</Label>
                                <TextField type="number" id="episodeNum" name="episodeNum" label="Episode Number" variant="outlined" className="material-input" required onChange={handleChange} value={episodeNum}/>
                            </FormGroup>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <Label>Episode</Label>
                            <FileUploader labelTitle="Episode" inputName="episodeFile" currentFile={episodeFile} handleFileChange={handleFileChange}/>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <FormGroup>
                                <Label>Description</Label>
                                <TinyEditor description={description} handleEditorChange={handleEditorChange} />
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
                                    <Button type="primary" htmlType="submit" block loading={loadingCreate}>
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
        addEpisode: (newEpisode) => {
            dispatch(addEpisode(newEpisode))
        }
    }
  }
  
export default connect(null, mapDispatchToProps)(withRouter(AddEpisode));
