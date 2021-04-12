import React, { Component } from 'react';
import {Container} from "reactstrap";
import AddSubtitle from "../components/subtitles/AddSubtitle";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";
import {validateManagerRole} from "../requests/authRequests";

class AddSubtitlePage extends Component {

    async componentDidMount() {
        await validateManagerRole();

    }

    render() {
        const returnURL = localStorage.getItem("previousPathSubtitle");
        const videoID = this.props.match.params.videoID;
        
        return (
            <>
            {/*
            <LayoutSide>
                <ComponentHeader returnURL={returnURL} title="Add Subtitle"/>
                <Container className="section-padding">
                    <AddSubtitle videoID={videoID}/>
                </Container>
            </LayoutSide>
            */}
            <ComponentHeader returnURL={returnURL} title="Add Subtitle"/>
                <Container className="section-padding">
                    <AddSubtitle videoID={videoID}/>
                </Container>
            </>
        )
    }
}

export default AddSubtitlePage;
