import React, { Component } from 'react';
import {Container} from "reactstrap";
import EditSubtitle from "../components/subtitles/EditSubtitle";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";
import {validateManagerRole} from "../requests/authRequests";

class EditSubtitlePage extends Component {
    
    async componentDidMount() {
        await validateManagerRole();
        
    }

    render() {
        const subtitleID = this.props.match.params.subtitleID;
        const returnURL = localStorage.getItem("previousPathSubtitle");

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
