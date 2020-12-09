import React, { Component } from 'react';
import {
    connect
} from "react-redux";
import {
    addMovie
} from "../../actions/movieActions";
import { Button, Select } from 'antd';
import TextField from '@material-ui/core/TextField';
import {Form, FormGroup, Row, Label} from 'reactstrap';
import TinyEditor from "../partials/TinyEditor";
import FileUploader from "../partials/FileUploader";

const { Option } = Select;

class AddMovie extends Component {

    state = {
        name: "",
        genres: [],
        description: "",
        IMDB_ID: "",
        posterFile: {},
        trailerFile: {},
        movieFile: {}
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
        const {addMovie} = this.props;
        const {name, genres, description, IMDB_ID, posterFile, trailerFile, movieFile} = this.state;

        addMovie({name, genres, description, IMDB_ID, posterFile, trailerFile, movieFile});
    }

    render() {
        const {handleChange, handleSubmit, renderGenreOptions, handleGenreChange, handleEditorChange, handleFileChange, onClear} = this;
        const {name, IMDB_ID, description, genres, posterFile, trailerFile, movieFile} = this.state;

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
                            <Label>Poster</Label>
                            <FileUploader labelTitle="Poster" inputName="posterFile" currentFile={posterFile} handleFileChange={handleFileChange}/>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Label>Trailer</Label>
                            <FileUploader labelTitle="Trailer" inputName="trailerFile" currentFile={trailerFile} handleFileChange={handleFileChange}/>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <Label>Movie</Label>
                            <FileUploader labelTitle="Movie" inputName="movieFile" currentFile={movieFile} handleFileChange={handleFileChange}/>
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
        addMovie: (newMovie) => {
            dispatch(addMovie(newMovie))
        }
    }
  }
  
export default connect(null, mapDispatchToProps)(AddMovie);
