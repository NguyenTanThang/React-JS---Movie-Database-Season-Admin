import React, { Component } from 'react';
import {Container} from "reactstrap";
import EditSeason from "../components/seasons/EditSeason";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";

class EditSeasonPage extends Component {
    
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
        const seasonID = this.props.match.params.seasonID;
        const {loggedIn} = this.state;
        const returnURL = localStorage.getItem("returnURL");

        if (!loggedIn) {
            return (<></>)
        }

        return (
            <>
            {/*
            <LayoutSide>
                <ComponentHeader returnURL={returnURL} title="Edit Season"/>
                <Container className="section-padding">
                    <EditSeason seasonID={seasonID}/>
                </Container>
            </LayoutSide>
            */}
            <ComponentHeader returnURL={returnURL} title="Edit Season"/>
                <Container className="section-padding">
                    <EditSeason seasonID={seasonID}/>
                </Container>
            </>
        )
    }
}

export default EditSeasonPage;
