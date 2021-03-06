import React, { Component } from 'react';
import {
    connect
} from "react-redux";
import {
    editEpisode
} from "../../actions/episodeActions";
import {
    getEpisodeByID,
    editEpisodeAsync
} from "../../requests/episodeRequests";
import { Button, message, Skeleton } from 'antd';
import TextField from '@material-ui/core/TextField';
import {Form, FormGroup, Row, Label, Container} from 'reactstrap';
import TinyEditor from "../partials/TinyEditor";
import UpdateFileModal from "../partials/UpdateFileModal";
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

class EditEpisode extends Component {

    state = {
        name: "",
        description: "",
        episodeFile: {},
        episodeURL: "",
        episodeNum: "",
        loadingUpdate: false,
        loading: true,
        seasonID: ""
    }

    async componentDidMount() {
        const {episodeID} = this.props;
        const episodeItem = await getEpisodeByID(episodeID);
   
        const {
                name,
                description,
                episodeURL,
                episodeNum,
                seasonID
            } = episodeItem;

        this.setState({
            name,
            description,
            episodeURL,
            episodeNum,
            seasonID,
            loading: false
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

        const {editEpisode, episodeID} = this.props;
        const {name, description, episodeFile, episodeNum, seasonID} = this.state;

        if (!description) {
            return createNotification("error", {
                message: "Description",
                description: "Please check the description. You might have leave it empty."
            });
        }

        this.setState({
            loadingUpdate: true
        })

        //editEpisode(episodeID, {name, description, episodeFile, episodeNum});
        const res = await editEpisodeAsync(episodeID, {name, description, episodeFile, episodeNum, seasonID});

        this.setState({
            loadingUpdate: false
        })

        if (res.data) {
            if (res.data.success) {
                this.props.history.push(`/episodes/details/${episodeID}`);
            }
        }
    }

    render() {
        const {handleChange, handleSubmit, handleEditorChange, handleFileChange, onClear} = this;
        const {name, description, episodeURL, episodeNum, episodeFile, loadingUpdate, loading} = this.state;

        if (loading) {
            return (
                <Container className="section-padding">
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                </Container>
            )
        }

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
                                <TextField id="episodeNum" name="episodeNum" label="Episode Number" variant="outlined" className="material-input" required onChange={handleChange} value={episodeNum}/>
                            </FormGroup>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <FormGroup>
                                <Label>Episode</Label>
                                <UpdateFileModal 
                                    labelTitle="Pick a file to replace the current one" inputName="episodeFile" currentFile={episodeFile} handleFileChange={handleFileChange} fileURL={episodeURL} movieName={name} buttonTitle={"Update Episode"}
                                />
                            </FormGroup>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <FormGroup>
                                <Label>Description</Label>
                                {description ? (<TinyEditor description={description} handleEditorChange={handleEditorChange} />) : <></>}
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
        editEpisode: (episodeID, updatedEpisode) => {
            dispatch(editEpisode(episodeID, updatedEpisode))
        }
    }
  }
  
export default connect(null, mapDispatchToProps)(withRouter(EditEpisode));
