import React, { Component } from 'react';
import {
    connect
} from "react-redux";
import {
    addSeason
} from "../../actions/seasonActions";
import { Button } from 'antd';
import TextField from '@material-ui/core/TextField';
import {Form, FormGroup, Row, Label} from 'reactstrap';
import TinyEditor from "../partials/TinyEditor";
import FileUploader from "../partials/FileUploader";

class AddSeason extends Component {

    state = {
        name: "",
        description: "",
        posterFile: {},
        trailerFile: {},
        seasonNum: ""
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
        const {addSeason, seriesID} = this.props;
        const {name, description, posterFile, trailerFile, seasonNum} = this.state;

        addSeason({name, seriesID, description, posterFile, trailerFile, seasonNum});
    }

    render() {
        const {handleChange, handleSubmit, handleEditorChange, handleFileChange, onClear} = this;
        const {name, description, posterFile, trailerFile, seasonNum} = this.state;

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
        addSeason: (newSeason) => {
            dispatch(addSeason(newSeason))
        }
    }
  }
  
export default connect(null, mapDispatchToProps)(AddSeason);
