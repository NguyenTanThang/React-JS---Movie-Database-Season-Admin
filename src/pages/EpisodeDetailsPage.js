import React, { Component } from 'react';
import {Container} from "reactstrap";
import EpisodeDetails from "../components/episodes/EpisodeDetails";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getEpisodeByID} from "../requests/episodeRequests";
import {getAllSubtitlesByEpisodeID} from "../actions/subtitleActions";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";
import {connect} from "react-redux";

class EpisodeDetailsPage extends Component {

    state = {
        episodeItem: "",
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

        const {episodeID} = this.props.match.params;
        const episodeItem = await getEpisodeByID(episodeID);
        this.props.getAllSubtitlesByEpisodeID(episodeID);
        localStorage.setItem("previousPathSubtitle", this.props.location.pathname);
        this.setState({
            episodeItem
        })
    }

    render() {
        const {episodeItem, loggedIn} = this.state;
        const {subtitles} = this.props;
        const returnURL = localStorage.getItem("previousPathEpisode");

        if (!episodeItem || !loggedIn) {
            return (<></>)
        }

        return (
            <>
            {/*
            <LayoutSide>
                <ComponentHeader returnURL={returnURL} title="Episode Details"/>
                <Container className="section-padding">
                    <EpisodeDetails subtitles={subtitles} episodeItem={episodeItem}/>
                </Container>
            </LayoutSide>
            */}
            <ComponentHeader returnURL={returnURL} title="Episode Details"/>
                <Container className="section-padding">
                    <EpisodeDetails subtitles={subtitles} episodeItem={episodeItem}/>
                </Container>
            </>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getAllSubtitlesByEpisodeID: (episodeID) => {
            dispatch(getAllSubtitlesByEpisodeID(episodeID))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        subtitles: state.subtitleReducer.subtitles
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeDetailsPage);
