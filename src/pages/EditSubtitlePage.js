import React, { Component } from 'react';
import {Container} from "reactstrap";
import EditSubtitle from "../components/subtitles/EditSubtitle";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";

class EditSubtitlePage extends Component {
    
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
        const subtitleID = this.props.match.params.subtitleID;
        const {loggedIn} = this.state;
        const returnURL = localStorage.getItem("previousPathSubtitle");

        if (!loggedIn) {
            return (<></>)
        }

        return (
            <>
            {/*
            <LayoutSide>
                <ComponentHeader returnURL={returnURL} title="Edit Subtitle"/>
                <Container className="section-padding">
                    <EditSubtitle subtitleID={subtitleID}/>
                </Container>
            </LayoutSide>
            */}
            <ComponentHeader returnURL={returnURL} title="Edit Subtitle"/>
                <Container className="section-padding">
                    <EditSubtitle subtitleID={subtitleID}/>
                </Container>
            </>
        )
    }
}

export default EditSubtitlePage;
