import React, { Component } from 'react';
import {Container} from "reactstrap";
import AddEpisode from "../components/episodes/AddEpisode";
import ComponentHeader from "../components/partials/ComponentHeader";
import {validateManagerRole} from "../requests/authRequests";

class AddEpisodePage extends Component {

    async componentDidMount() {
        await validateManagerRole();
    }

    render() {
        const returnURL = localStorage.getItem("previousPathEpisode");
        const seasonID = this.props.match.params.seasonID;
        
        return (
            <>
            {/*
            <LayoutSide>
                <ComponentHeader returnURL={returnURL} title="Add Episode"/>
                <Container className="section-padding">
                    <AddEpisode seasonID={seasonID}/>
                </Container>
            </LayoutSide>
            */}
                <ComponentHeader returnURL={returnURL} title="Add Episode"/>
                <Container className="section-padding">
                    <AddEpisode seasonID={seasonID}/>
                </Container>
            </>
        )
    }
}

export default AddEpisodePage;
