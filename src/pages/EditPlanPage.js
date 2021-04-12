import React, { Component } from 'react';
import {Container} from "reactstrap";
import EditPlan from "../components/plans/EditPlan";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";
import {validateManagerRole} from "../requests/authRequests";

class EditPlanPage extends Component {

    async componentDidMount() {
        await validateManagerRole();
    }

    render() {
        const { match: { params } } = this.props;

        return (
            <>
            {/*
            <LayoutSide>
                <ComponentHeader returnURL="/plans" title="Edit Manager"/>
                <Container className="section-padding">
                    <EditPlan planID={params.planID}/>
                </Container>
            </LayoutSide>
            */}
            <ComponentHeader returnURL="/plans" title="Edit Manager"/>
                <Container className="section-padding">
                    <EditPlan planID={params.planID}/>
                </Container>
            </>
        )
    }
}

export default EditPlanPage;
