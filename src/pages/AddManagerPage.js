import React, { Component } from 'react';
import {Container} from "reactstrap";
import AddManager from "../components/managers/AddManager";
import ComponentHeader from "../components/partials/ComponentHeader";
import {validateManagerRole} from "../requests/authRequests";

class AddManagerPage extends Component {

    async componentDidMount() {
        await validateManagerRole();
    }

    render() {
        return (
            <>
            {/*
            <LayoutSide>
                <ComponentHeader returnURL="/managers" title="Add Manager"/>
                <Container className="section-padding">
                    <AddManager/>
                </Container>
            </LayoutSide>
            */}
                <ComponentHeader returnURL="/managers" title="Add Manager"/>
                <Container className="section-padding">
                    <AddManager/>
                </Container>
            </>
        )
    }
}

export default AddManagerPage;
