import React, { Component } from 'react';
import {Container} from "reactstrap";
import EpisodeDetails from "../components/episodes/EpisodeDetails";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getEpisodeByID} from "../requests/episodeRequests";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";

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
        this.setState({
            episodeItem
        })
    }

    render() {
        const {episodeItem, loggedIn} = this.state;
        const returnURL = localStorage.getItem("previousPathEpisode");

        if (!episodeItem || !loggedIn) {
            return (<></>)
        }

        return (
            <LayoutSide>
                <ComponentHeader returnURL={returnURL} title="Episode Details"/>
                <Container className="section-padding">
                    <EpisodeDetails episodeItem={episodeItem}/>
                </Container>
            </LayoutSide>
        )
    }
}

export default EpisodeDetailsPage;
