import React, { Component } from 'react';
import {Container} from "reactstrap";
import EditManager from "../components/managers/EditManager";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";

class EditManagerPage extends Component {

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
        const { match: { params } } = this.props;
        const {loggedIn} = this.state;

        if (!loggedIn) {
            return (<></>)
        }

        return (
            <LayoutSide>
                <ComponentHeader returnURL="/managers" title="Edit Manager"/>
                <Container className="section-padding">
                    <EditManager managerID={params.managerID}/>
                </Container>
            </LayoutSide>
        )
    }
}

export default EditManagerPage;
