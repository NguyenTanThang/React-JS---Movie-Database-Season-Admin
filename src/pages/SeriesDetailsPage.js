import React, { Component } from 'react';
import {Container} from "reactstrap";
import SeriesDetails from "../components/series/SeriesDetails";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getSeriesByID} from "../requests/seriesRequests";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {getSeasonsBySeriesID} from "../actions/seasonActions";
import {getAllPhotosBySeriesID} from "../actions/photoActions";
import {getAllCommentsByMovieID} from "../actions/commentActions";
import {message, Skeleton} from "antd";
import {connect} from "react-redux";
import {validateManagerRole} from "../requests/authRequests";

class SeriesDetailsPage extends Component {

    state = {
        seriesItem: "",
        loading: true
    }

    async componentDidMount() {
        await validateManagerRole();

        const {seriesID} = this.props.match.params;
        this.props.getSeasonsBySeriesID(seriesID);
        this.props.getAllPhotosBySeriesID(seriesID);
        this.props.getAllCommentsByMovieID(seriesID);
        const seriesItem = await getSeriesByID(seriesID);
        this.setState({
            seriesItem,
            loading: false
        })
    }

    render() {
        const {seriesItem, loading} = this.state;
        const {seasons, photos, comments} = this.props;
        localStorage.setItem("returnURL", this.props.location.pathname)

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

        if (!seriesItem) {
            return (<></>)
        }

        return (
            <>
            {/*
            <LayoutSide>
                <ComponentHeader returnURL="/series" title="Series Details"/>
                <Container className="section-padding">
                    <SeriesDetails seriesItem={seriesItem} seasons={seasons}/>
                </Container>
            </LayoutSide>
            */}
            <ComponentHeader returnURL="/series" title="Series Details"/>
                <Container className="section-padding">
                    <SeriesDetails seriesItem={seriesItem} seasons={seasons} photos={photos} comments={comments}/>
                </Container>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        seasons: state.seasonReducer.seasons,
        photos: state.photoReducer.photos,
        comments: state.commentReducer.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSeasonsBySeriesID: (seriesID) => {
            dispatch(getSeasonsBySeriesID(seriesID))
        },
        getAllPhotosBySeriesID: (seriesID) => {
            dispatch(getAllPhotosBySeriesID(seriesID))
        },
        getAllCommentsByMovieID: (movieID) => {
            dispatch(getAllCommentsByMovieID(movieID))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesDetailsPage);
