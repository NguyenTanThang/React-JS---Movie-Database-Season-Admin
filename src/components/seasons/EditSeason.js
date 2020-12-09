import React, { Component } from 'react';
import {
    connect
} from "react-redux";
import {
    editSeason
} from "../../actions/seasonActions";
import {
    getSeasonByID
} from "../../requests/seasonRequests";
import { Button } from 'antd';
import TextField from '@material-ui/core/TextField';
import {Form, FormGroup, Row, Label} from 'reactstrap';
import TinyEditor from "../partials/TinyEditor";
import UpdateFileModal from "../partials/UpdateFileModal";

class EditSeason extends Component {

    state = {
        name: "",
        description: "",
        posterFile: {},
        trailerFile: {},
        posterURL: "",
        trailerURL: "",
        seasonNum: ""
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
        const file = e.target.files[0];
        this.setState({
            [e.target.name]: file
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

    handleSubmit = (e) => {
        e.preventDefault();
        const {editSeason, seasonID} = this.props;
        const {name, description, posterFile, trailerFile, seasonNum} = this.state;

        editSeason(seasonID, {name, description, posterFile, trailerFile, seasonNum});
    }

    render() {
        const {handleChange, handleSubmit, handleEditorChange, handleFileChange, onClear} = this;
        const {name, description, posterFile, trailerFile, posterURL, trailerURL, seasonNum} = this.state;

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
        editSeason: (seasonID, updatedSeason) => {
            dispatch(editSeason(seasonID, updatedSeason))
        }
    }
  }
  
export default connect(null, mapDispatchToProps)(EditSeason);
