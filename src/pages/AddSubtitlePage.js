import React, { Component } from 'react';
import {Container} from "reactstrap";
import AddSubtitle from "../components/subtitles/AddSubtitle";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";

class AddSubtitlePage extends Component {

    async componentDidMount() {
        const loggedIn = await getCurrentLoginStatus();
        if (!loggedIn) {
            message.error("You need to login first");
            this.props.history.push("/login");
        }
    }

    render() {
        const returnURL = localStorage.getItem("previousPathSubtitle");
        const videoID = this.props.match.params.videoID;
        
        return (
            <LayoutSide>
                <ComponentHeader returnURL={returnURL} title="Add Subtitle"/>
                <Container className="section-padding">
                    <AddSubtitle videoID={videoID}/>
                </Container>
            </LayoutSide>
        )
    }
}

export default AddSubtitlePage;
