import React, { Component } from 'react';
import {Container} from "reactstrap";
import AddPlan from "../components/plans/AddPlan";
import ComponentHeader from "../components/partials/ComponentHeader";
import {validateManagerRole} from "../requests/authRequests";

class AddPlanPage extends Component {

    async componentDidMount() {
        await validateManagerRole();
    }

    render() {
        
        return (
            <>
            {/*
            <LayoutSide>
                <ComponentHeader returnURL="/plans" title="Add Plan"/>
                <Container className="section-padding">
                    <AddPlan/>
                </Container>
            </LayoutSide>
            */}
                <ComponentHeader returnURL="/plans" title="Add Plan"/>
                <Container className="section-padding">
                    <AddPlan/>
                </Container>
            </>
        )
    }
}

export default AddPlanPage;
