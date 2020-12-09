import React, { Component } from 'react';
import {Container} from "reactstrap";
import EditPlan from "../components/plans/EditPlan";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";

class EditPlanPage extends Component {

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
            return this.props.history.push("/login");
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
                <ComponentHeader returnURL="/plans" title="Edit Manager"/>
                <Container className="section-padding">
                    <EditPlan planID={params.planID}/>
                </Container>
            </LayoutSide>
        )
    }
}

export default EditPlanPage;
