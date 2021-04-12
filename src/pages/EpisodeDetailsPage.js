import React, { Component } from 'react';
import {Container} from "reactstrap";
import EpisodeDetails from "../components/episodes/EpisodeDetails";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getEpisodeByID} from "../requests/episodeRequests";
import {getAllSubtitlesByEpisodeID} from "../actions/subtitleActions";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message, Skeleton} from "antd";
import {connect} from "react-redux";
import {validateManagerRole} from "../requests/authRequests";

class EpisodeDetailsPage extends Component {

    state = {
        episodeItem: "",
        loading: true
    }

    async componentDidMount() {
        await validateManagerRole();

        const {episodeID} = this.props.match.params;
        const episodeItem = await getEpisodeByID(episodeID);
        this.props.getAllSubtitlesByEpisodeID(episodeID);
        localStorage.setItem("previousPathSubtitle", this.props.location.pathname);
        this.setState({
            episodeItem,
            loading: false
        })
    }

    render() {
        const {episodeItem, loading} = this.state;
        const {subtitles} = this.props;
        const returnURL = localStorage.getItem("previousPathEpisode");

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

        if (!episodeItem) {
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
