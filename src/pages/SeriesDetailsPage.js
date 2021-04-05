import React, { Component } from 'react';
import {Container} from "reactstrap";
import SeriesDetails from "../components/series/SeriesDetails";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getSeriesByID} from "../requests/seriesRequests";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {getSeasonsBySeriesID} from "../actions/seasonActions";
import {getAllPhotosBySeriesID} from "../actions/photoActions";
import {message, Skeleton} from "antd";
import {connect} from "react-redux";

class SeriesDetailsPage extends Component {

    state = {
        seriesItem: "",
        loggedIn: false,
        loading: true
    }

    async componentDidMount() {
        const loggedIn = await getCurrentLoginStatus();
        this.setState({
            loggedIn
        })
        if (!loggedIn) {
            message.error("You need to login first");
            return this.props.history.push("/login");
        }

        const {seriesID} = this.props.match.params;
        this.props.getSeasonsBySeriesID(seriesID);
        this.props.getAllPhotosBySeriesID(seriesID);
        const seriesItem = await getSeriesByID(seriesID);
        this.setState({
            seriesItem,
            loading: false
        })
    }

    render() {
        const {seriesItem, loggedIn, loading} = this.state;
        const {seasons, photos} = this.props;
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

        if (!seriesItem || !loggedIn) {
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
                    <SeriesDetails seriesItem={seriesItem} seasons={seasons} photos={photos}/>
                </Container>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        seasons: state.seasonReducer.seasons,
        photos: state.photoReducer.photos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSeasonsBySeriesID: (seriesID) => {
            dispatch(getSeasonsBySeriesID(seriesID))
        },
        getAllPhotosBySeriesID: (seriesID) => {
            dispatch(getAllPhotosBySeriesID(seriesID))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesDetailsPage);
