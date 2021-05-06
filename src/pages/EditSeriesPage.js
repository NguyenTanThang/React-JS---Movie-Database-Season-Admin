import React, { Component } from 'react';
import {Container} from "reactstrap";
import EditSeries from "../components/series/EditSeries";
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

class EditSeriesPage extends Component {
    
    async componentDidMount() {
        await validateManagerRole();

        this.props.getAllGenres();
    }

    render() {
        const { match: { params }, genres } = this.props;

        return (
            <>
            {/*
            <LayoutSide>
                <ComponentHeader returnURL="/series" title="Edit Series"/>
                <Container className="section-padding">
                    <EditSeries seriesID={params.seriesID} genres={genres}/>
                </Container>
            </LayoutSide>
            returnURL="/series" 
            */}
            <ComponentHeader 
            returnURL={`/series/details/${params.seriesID}`}
            title="Edit Series"/>
                <Container className="section-padding">
                    <EditSeries seriesID={params.seriesID} genres={genres}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditSeriesPage);
