import React, { Component } from 'react';
import {
    connect
} from "react-redux";
import {
    addSeason
} from "../../actions/seasonActions";
import {
    addSeasonAsync
} from "../../requests/seasonRequests";
import { Button, message } from 'antd';
import TextField from '@material-ui/core/TextField';
import {Form, FormGroup, Row, Label} from 'reactstrap';
import TinyEditor from "../partials/TinyEditor";
import FileUploader from "../partials/FileUploader";
import {
    acceptImageExt,
    acceptVideoExt,
    getFileExtension
} from "../../utils/validator";
import {
    withRouter
} from "react-router-dom";
import {
    isObjectEmpty
} from "../../utils/validator";
import {
    createNotification
} from "../../utils";

class AddSeason extends Component {

    state = {
        name: "",
        description: "",
        posterFile: {},
        trailerFile: {},
        seasonNum: "",
        loadingCreate: false
    }

    onClear = (e) => {
        e.preventDefault();
        this.setState({
            name: "",
            description: "",
        })
    }

    handleFileChange = (e) => {
        const targetName = e.target.name;
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        const fileExt = getFileExtension(file.name);

        if (targetName == "posterFile") {
            if (acceptImageExt(fileExt)) {
                return this.setState({
                    posterURL: "",
                    [e.target.name]: file
                })
            }
            message.warning("Poster can only be PNG, JPEG or JPG file. Although the file's name is visible it will not be uploaded", 5)
        }
        if (targetName == "trailerFile") {
            if (acceptVideoExt(fileExt)) {
                return this.setState({
                    trailerURL: "",
                    [e.target.name]: file
                })
            }
            message.warning("Trailer can only be MP4 file.  Although the file's name is visible it will not be uploaded", 5)
        }
        if (targetName == "movieFile") {
            if (acceptVideoExt(fileExt)) {
                return this.setState({
                    movieURL: "",
                    [e.target.name]: file
                })
            }
            message.warning("Movie can only be MP4 file.  Although the file's name is visible it will not be uploaded", 5)
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
        
        const {addSeason, seriesID} = this.props;
        const {name, description, posterFile, trailerFile, seasonNum} = this.state;

        if (!posterFile || isObjectEmpty(posterFile)) {
            return createNotification("error", {
                message: "File Input",
                description: "Please check the poster file input. You might have leave some empty."
            });
        }

        if (!trailerFile || isObjectEmpty(trailerFile)) {
            return createNotification("error", {
                message: "File Input",
                description: "Please check the trailer file input. You might have leave some empty."
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

        //addSeason({name, seriesID, description, posterFile, trailerFile, seasonNum});
        const res = await addSeasonAsync({name, seriesID, description, posterFile, trailerFile, seasonNum});

        this.setState({
            loadingCreate: false
        })

        if (res.data) {
            if (res.data.success) {
                this.props.history.push(`/seasons/details/${res.data.data._id}`);
            }
        }
    }

    render() {
        const {handleChange, handleSubmit, handleEditorChange, handleFileChange, onClear} = this;
        const {name, description, posterFile, trailerFile, seasonNum, loadingCreate} = this.state;

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
                                <Label>Season Number</Label>
                                <TextField type="number" id="seasonNum" name="seasonNum" label="Season Number" variant="outlined" className="material-input" required onChange={handleChange} value={seasonNum}/>
                            </FormGroup>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Label>Poster</Label>
                            <FileUploader labelTitle="Poster" inputName="posterFile" currentFile={posterFile} handleFileChange={handleFileChange}/>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Label>Trailer</Label>
                            <FileUploader labelTitle="Trailer" inputName="trailerFile" currentFile={trailerFile} handleFileChange={handleFileChange}/>
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
        addSeason: (newSeason) => {
            dispatch(addSeason(newSeason))
        }
    }
  }
  
export default connect(null, mapDispatchToProps)(withRouter(AddSeason));
