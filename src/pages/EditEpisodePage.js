import React, { Component } from 'react';
import {Container} from "reactstrap";
import EditEpisode from "../components/episodes/EditEpisode";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";

class EditEpisodePage extends Component {
    
    state = {
        loggedIn: false
    }
    
    async componentDidMount() {
        const loggedIn = await getCurrentLoginStatus();
        this.setState({
            loggedIn
        })
        if (!loggedIn) {
            message.error("You need to login first");
            this.props.history.push("/login");
        }
    }

    render() {
        const episodeID = this.props.match.params.episodeID;
        const {loggedIn} = this.state;
        const returnURL = localStorage.getItem("previousPathEpisode");

        if (!loggedIn) {
            return (<></>)
        }

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
