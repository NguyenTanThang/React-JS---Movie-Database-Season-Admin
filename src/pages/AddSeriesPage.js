import React, { Component } from 'react';
import {Container} from "reactstrap";
import AddSeries from "../components/series/AddSeries";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {
    getAllGenres
} from "../actions/genreActions";
import {
    connect
} from "react-redux";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";
import {validateManagerRole} from "../requests/authRequests";


class AddSeriesPage extends Component {

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
                <ComponentHeader returnURL="/series" title="Add Series"/>
                <Container className="section-padding">
                    <AddSeries genres={genres}/>
                </Container>
            </LayoutSide>
            */}
            <ComponentHeader returnURL="/series" title="Add Series"/>
                <Container className="section-padding">
                    <AddSeries genres={genres}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddSeriesPage);
