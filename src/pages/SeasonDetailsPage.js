import React, { Component } from 'react';
import {Container} from "reactstrap";
import SeasonDetails from "../components/seasons/SeasonDetails";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getSeasonByID} from "../requests/seasonRequests";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {getEpisodesBySeasonID} from "../actions/episodeActions";
import {message, Skeleton} from "antd";
import {connect} from "react-redux";

class SeasonDetailsPage extends Component {

    state = {
        seasonItem: "",
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

        const {seasonID} = this.props.match.params;
        this.props.getEpisodesBySeasonID(seasonID);
        const seasonItem = await getSeasonByID(seasonID);
        this.setState({
            seasonItem,
            loading: false
        })
    }

    render() {
        const {seasonItem, loggedIn, loading} = this.state;
        const {episodes} = this.props;
        const returnURL = localStorage.getItem("returnURL");
        localStorage.setItem("previousPathEpisode", this.props.location.pathname)

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

        if (!seasonItem || !loggedIn) {
            return (<></>)
        }

        return (
            <>
            {/*
            <LayoutSide>
                <ComponentHeader returnURL={returnURL} title="Season Details"/>
                <Container className="section-padding">
                    <SeasonDetails seasonItem={seasonItem} episodes={episodes}/>
                </Container>
            </LayoutSide>
            */}
            <ComponentHeader returnURL={returnURL} title="Season Details"/>
                <Container className="section-padding">
                    <SeasonDetails seasonItem={seasonItem} episodes={episodes}/>
                </Container>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        episodes: state.episodeReducer.episodes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEpisodesBySeasonID: (seasonID) => {
            dispatch(getEpisodesBySeasonID(seasonID))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonDetailsPage);
