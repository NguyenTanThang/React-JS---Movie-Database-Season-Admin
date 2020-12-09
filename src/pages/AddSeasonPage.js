import React, { Component } from 'react';
import {Container} from "reactstrap";
import AddSeason from "../components/seasons/AddSeason";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";

class AddSeasonPage extends Component {

    async componentDidMount() {
        const loggedIn = await getCurrentLoginStatus();
        if (!loggedIn) {
            message.error("You need to login first");
            this.props.history.push("/login");
        }
    }

    render() {
        const returnURL = localStorage.getItem("returnURL");
        const seriesID = this.props.match.params.seriesID;
        
        return (
            <LayoutSide>
                <ComponentHeader returnURL={returnURL} title="Add Season"/>
                <Container className="section-padding">
                    <AddSeason seriesID={seriesID}/>
                </Container>
            </LayoutSide>
        )
    }
}

export default AddSeasonPage;
