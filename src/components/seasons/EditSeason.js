import React, { Component } from 'react';
import {
    connect
} from "react-redux";
import {
    editSeason
} from "../../actions/seasonActions";
import {
    getSeasonByID,
    editSeasonAsync
} from "../../requests/seasonRequests";
import { Button, message } from 'antd';
import TextField from '@material-ui/core/TextField';
import {Form, FormGroup, Row, Label} from 'reactstrap';
import TinyEditor from "../partials/TinyEditor";
import UpdateFileModal from "../partials/UpdateFileModal";
import {
    acceptImageExt,
    acceptVideoExt,
    getFileExtension
} from "../../utils/validator";
import {
    withRouter
} from "react-router-dom";

class EditSeason extends Component {

    state = {
        name: "",
        description: "",
        posterFile: {},
        trailerFile: {},
        posterURL: "",
        trailerURL: "",
        seasonNum: "",
        loadingUpdate: false
    }

    async componentDidMount() {
        const {seasonID} = this.props;
        const seasonItem = await getSeasonByID(seasonID);
   
        const {
                name,
                description,
                posterURL,
                trailerURL,
                seasonNum
            } = seasonItem;

        this.setState({
            name,
            description,
            posterURL,
            trailerURL,
            seasonNum
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

        this.setState({
            loadingUpdate: true
        })

        const {editSeason, seasonID} = this.props;
        const {name, description, posterFile, trailerFile, seasonNum} = this.state;

        //editSeason(seasonID, {name, description, posterFile, trailerFile, seasonNum});
        const res = await editSeasonAsync(seasonID, {name, description, posterFile, trailerFile, seasonNum});

        this.setState({
            loadingUpdate: false
        })

        if (res.data.success) {
            this.props.history.push(`/seasons/details/${seasonID}`);
        }
    }

    render() {
        const {handleChange, handleSubmit, handleEditorChange, handleFileChange, onClear} = this;
        const {name, description, posterFile, trailerFile, posterURL, trailerURL, seasonNum, loadingUpdate} = this.state;

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
                                <TextField id="seasonNum" name="seasonNum" label="Season Number" variant="outlined" className="material-input" required onChange={handleChange} value={seasonNum}/>
                            </FormGroup>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <FormGroup>
                                <Label>Poster</Label>
                                <UpdateFileModal 
                                    labelTitle="Pick a file to replace the current one" inputName="posterFile" currentFile={posterFile} handleFileChange={handleFileChange} fileURL={posterURL} movieName={name} buttonTitle={"Update Poster"}
                                />
                            </FormGroup>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <FormGroup>
                                <Label>Trailer</Label>
                                <UpdateFileModal          
                                    labelTitle="Pick a file to replace the current one"  inputName="trailerFile" currentFile={trailerFile} handleFileChange={handleFileChange} fileURL={trailerURL} movieName={name} buttonTitle={"Update Trailer"}
                                />
                            </FormGroup>
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
        editSeason: (seasonID, updatedSeason) => {
            dispatch(editSeason(seasonID, updatedSeason))
        }
    }
  }
  
export default connect(null, mapDispatchToProps)(withRouter(EditSeason));
