import React, { Component } from 'react';
import {Container} from "reactstrap";
import AddSeason from "../components/seasons/AddSeason";
import ComponentHeader from "../components/partials/ComponentHeader";
import {validateManagerRole} from "../requests/authRequests";

class AddSeasonPage extends Component {

    async componentDidMount() {
        await validateManagerRole();
    }

    render() {
        const returnURL = localStorage.getItem("returnURL");
        const seriesID = this.props.match.params.seriesID;
        
        return (
            <>
            {/*
            <LayoutSide>
                <ComponentHeader returnURL={returnURL} title="Add Season"/>
                <Container className="section-padding">
                    <AddSeason seriesID={seriesID}/>
                </Container>
            </LayoutSide>
            */}
            <ComponentHeader returnURL={returnURL} title="Add Season"/>
                <Container className="section-padding">
                    <AddSeason seriesID={seriesID}/>
                </Container>
            </>
        )
    }
}

export default AddSeasonPage;
