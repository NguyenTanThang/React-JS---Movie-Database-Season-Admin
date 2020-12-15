import React, { Component } from 'react';
import {
    connect
} from "react-redux";
import {
    editSeries
} from "../../actions/seriesActions";
import {
    getSeriesByID
} from "../../requests/seriesRequests";
import { Button, Select } from 'antd';
import TextField from '@material-ui/core/TextField';
import {Form, FormGroup, Row, Label} from 'reactstrap';
import TinyEditor from "../partials/TinyEditor";
import UpdateFileModal from "../partials/UpdateFileModal";

const { Option } = Select;

class EditSeries extends Component {

    state = {
        name: "",
        genres: [],
        description: "",
        IMDB_ID: "",
        posterFile: {},
        trailerFile: {},
        posterURL: "",
        trailerURL: "",
    }

    async componentDidMount() {
        const {seriesID} = this.props;
        const seriesItem = await getSeriesByID(seriesID);
   
        const {
                name,
                genres,
                description,
                IMDB_ID,
                posterURL,
                trailerURL,
            } = seriesItem;

        this.setState({
            name,
            genres,
            description,
            IMDB_ID,
            posterURL,
            trailerURL,
        })
    }

    onClear = (e) => {
        e.preventDefault()
        this.setState({
            name: "",
            genres: [],
            description: "",
            IMDB_ID: ""
        }, () => {
            console.log(this.state);
        })
    }

    renderGenreOptions = () => {
        const {genres} = this.props;

        return genres.map(genre => {
            return(
                <Option key={genre.name}>{genre.name}</Option>
            )
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

    handleGenreChange = (value) => {
        if (value.length === 0) {
            return this.setState({
                genres: value
            })
        }
        const newValue = value[value.length - 1];
        const {genres} = this.props;
        let isOccurred = false;

        genres.forEach(genre => {
            if (newValue === genre.name) {
                isOccurred = true;
            }
        })

        if (isOccurred) {
            this.setState({
                genres: value
            })
        }
    }

    handleEditorChange = (content, editor) => {
        this.setState({
            description: content
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {editSeries, seriesID} = this.props;
        const {name, genres, description, IMDB_ID, posterFile, trailerFile} = this.state;

        editSeries(seriesID, {name, genres, description, IMDB_ID, posterFile, trailerFile});
    }

    render() {
        const {handleChange, handleSubmit, renderGenreOptions, handleGenreChange, handleEditorChange, handleFileChange, onClear} = this;
        const {name, IMDB_ID, description, genres, posterFile, trailerFile, posterURL, trailerURL} = this.state;

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
                                <Label>IMDB ID</Label>
                                <TextField id="IMDB_ID" name="IMDB_ID" label="IMDB ID" variant="outlined" className="material-input" required onChange={handleChange} value={IMDB_ID}/>
                            </FormGroup>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <FormGroup>
                                <Label>Genres</Label>
                                <Select mode="tags" style={{ width: '100%' }} placeholder="Genres" onChange={handleGenreChange} value={genres}>
                                    {renderGenreOptions()}
                                </Select>
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
        editSeries: (seriesID, updatedSeries) => {
            dispatch(editSeries(seriesID, updatedSeries))
        }
    }
  }
  
export default connect(null, mapDispatchToProps)(EditSeries);