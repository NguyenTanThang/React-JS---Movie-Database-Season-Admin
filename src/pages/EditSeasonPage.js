import React, { Component } from 'react';
import {Container} from "reactstrap";
import EditSeason from "../components/seasons/EditSeason";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";
import {validateManagerRole} from "../requests/authRequests";

class EditSeasonPage extends Component {

    async componentDidMount() {
        await validateManagerRole();

    }

    render() {
        const seasonID = this.props.match.params.seasonID;
        const returnURL = localStorage.getItem("returnURL");

        return (
            <>
            {/*
            <LayoutSide>
                <ComponentHeader returnURL={returnURL} title="Edit Season"/>
                <Container className="section-padding">
                    <EditSeason seasonID={seasonID}/>
                </Container>
            </LayoutSide>
            returnURL={returnURL} 
            */}
            <ComponentHeader 
            returnURL={`/seasons/details/${seasonID}`}
            title="Edit Season"/>
                <Container className="section-padding">
                    <EditSeason seasonID={seasonID}/>
                </Container>
            </>
        )
    }
}

export default EditSeasonPage;
