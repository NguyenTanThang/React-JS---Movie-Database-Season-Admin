import React, { Component } from 'react';
import {Container} from "reactstrap";
import AddPlan from "../components/plans/AddPlan";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";

class AddPlanPage extends Component {

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
                <ComponentHeader returnURL="/plans" title="Add Plan"/>
                <Container className="section-padding">
                    <AddPlan/>
                </Container>
            </LayoutSide>
        )
    }
}

export default AddPlanPage;
