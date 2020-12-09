import React, { Component } from 'react';
import {Container} from "reactstrap";
import AddManager from "../components/managers/AddManager";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";

class AddManagerPage extends Component {

    async componentDidMount() {
        const loggedIn = await getCurrentLoginStatus();
        if (!loggedIn) {
            message.error("You need to login first");
            this.props.history.push("/login");
        }
    }

    render() {
        return (
            <LayoutSide>
                <ComponentHeader returnURL="/managers" title="Add Manager"/>
                <Container className="section-padding">
                    <AddManager/>
                </Container>
            </LayoutSide>
        )
    }
}

export default AddManagerPage;
