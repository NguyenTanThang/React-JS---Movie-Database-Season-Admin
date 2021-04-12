import React, { Component } from 'react';
import {Container} from "reactstrap";
import EditEpisode from "../components/episodes/EditEpisode";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";
import {validateManagerRole} from "../requests/authRequests";

class EditEpisodePage extends Component {
    async componentDidMount() {
        await validateManagerRole();
    }

    render() {
        const episodeID = this.props.match.params.episodeID;
        const returnURL = localStorage.getItem("previousPathEpisode");

        return (
            <>
            {/*
            <LayoutSide>
                <ComponentHeader returnURL={returnURL} title="Edit Episode"/>
                <Container className="section-padding">
                    <EditEpisode episodeID={episodeID}/>
                </Container>
            </LayoutSide>
            returnURL={returnURL}
            */}
            <ComponentHeader 
            returnURL={`/episodes/details/${episodeID}`}
            title="Edit Episode"/>
                <Container className="section-padding">
                    <EditEpisode episodeID={episodeID}/>
                </Container>
            </>
        )
    }
}

export default EditEpisodePage;
