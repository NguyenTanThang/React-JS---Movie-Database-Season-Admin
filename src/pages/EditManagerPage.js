import React, { Component } from 'react';
import {Container} from "reactstrap";
import EditManager from "../components/managers/EditManager";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";
import {validateManagerRole} from "../requests/authRequests";

class EditManagerPage extends Component {
    async componentDidMount() {
        await validateManagerRole();
    }

    render() {
        const { match: { params } } = this.props;
        const {loggedIn} = this.state;

        if (!loggedIn) {
            return (<></>)
        }

        return (
            <>
            {/*
            <LayoutSide>
                <ComponentHeader returnURL="/managers" title="Edit Manager"/>
                <Container className="section-padding">
                    <EditManager managerID={params.managerID}/>
                </Container>
            </LayoutSide>
            */}
            <ComponentHeader returnURL="/managers" title="Edit Manager"/>
                <Container className="section-padding">
                    <EditManager managerID={params.managerID}/>
                </Container>
            </>
        )
    }
}

export default EditManagerPage;
