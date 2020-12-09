import React, { Component } from 'react';
import {
    connect
} from "react-redux";
import {
    addEpisode
} from "../../actions/episodeActions";
import { Button } from 'antd';
import TextField from '@material-ui/core/TextField';
import {Form, FormGroup, Row, Label} from 'reactstrap';
import TinyEditor from "../partials/TinyEditor";
import FileUploader from "../partials/FileUploader";

class AddEpisode extends Component {

    state = {
        name: "",
        description: "",
        episodeFile: {},
        episodeNum: ""
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
        const {addEpisode, seasonID} = this.props;
        const {name, description, episodeFile, episodeNum} = this.state;

        addEpisode({name, description, episodeFile, episodeNum, seasonID});
    }

    render() {
        const {handleChange, handleSubmit, handleEditorChange, handleFileChange, onClear} = this;
        const {name, description, episodeFile, episodeNum} = this.state;

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
                                    <Button type="primary" htmlType="submit" block>
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
  
export default connect(null, mapDispatchToProps)(AddEpisode);
