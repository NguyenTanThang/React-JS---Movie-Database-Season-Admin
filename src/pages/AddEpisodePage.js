import React, { Component } from 'react';
import {Container} from "reactstrap";
import AddEpisode from "../components/episodes/AddEpisode";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";

class AddEpisodePage extends Component {

    async componentDidMount() {
        const loggedIn = await getCurrentLoginStatus();
        if (!loggedIn) {
            message.error("You need to login first");
            this.props.history.push("/login");
        }
    }

    render() {
        const returnURL = localStorage.getItem("previousPathEpisode");
        const seasonID = this.props.match.params.seasonID;
        
        return (
            <LayoutSide>
                <ComponentHeader returnURL={returnURL} title="Add Episode"/>
                <Container className="section-padding">
                    <AddEpisode seasonID={seasonID}/>
                </Container>
            </LayoutSide>
        )
    }
}

export default AddEpisodePage;
