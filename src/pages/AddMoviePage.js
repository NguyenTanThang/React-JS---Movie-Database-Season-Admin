import React, { Component } from 'react';
import {Container} from "reactstrap";
import AddMovie from "../components/movies/AddMovie";
import ComponentHeader from "../components/partials/ComponentHeader";
import {
    getAllGenres
} from "../actions/genreActions";
import {
    connect
} from "react-redux";
import {validateManagerRole} from "../requests/authRequests";

class AddMoviePage extends Component {

    async componentDidMount() {
        await validateManagerRole();
        this.props.getAllGenres();
    }

    render() {
        const {genres} = this.props;

        return (
            <>
            {/*
            <LayoutSide>
                <ComponentHeader returnURL="/movies" title="Add Movie"/>
                <Container className="section-padding">
                    <AddMovie genres={genres}/>
                </Container>
            </LayoutSide>
            */}
            <ComponentHeader returnURL="/movies" title="Add Movie"/>
                <Container className="section-padding">
                    <AddMovie genres={genres}/>
                </Container>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllGenres: () => {
            dispatch(getAllGenres())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        genres: state.genreReducer.genres
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMoviePage);
