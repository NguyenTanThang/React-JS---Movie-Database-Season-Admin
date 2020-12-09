import React, { Component } from 'react';
import {Container} from "reactstrap";
import SeriesDetails from "../components/series/SeriesDetails";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getSeriesByID} from "../requests/seriesRequests";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {getSeasonsBySeriesID} from "../actions/seasonActions";
import {message} from "antd";
import {connect} from "react-redux";

class SeriesDetailsPage extends Component {

    state = {
        seriesItem: "",
        loggedIn: false
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
        const seriesItem = await getSeriesByID(seriesID);
        this.setState({
            seriesItem
        })
    }

    render() {
        const {seriesItem, loggedIn} = this.state;
        const {seasons} = this.props;
        localStorage.setItem("returnURL", this.props.location.pathname)

        if (!seriesItem || !loggedIn) {
            return (<></>)
        }

        return (
            <LayoutSide>
                <ComponentHeader returnURL="/series" title="Series Details"/>
                <Container className="section-padding">
                    <SeriesDetails seriesItem={seriesItem} seasons={seasons}/>
                </Container>
            </LayoutSide>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        seasons: state.seasonReducer.seasons
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSeasonsBySeriesID: (seriesID) => {
            dispatch(getSeasonsBySeriesID(seriesID))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesDetailsPage);
