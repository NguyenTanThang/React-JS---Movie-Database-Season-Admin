import React, { Component } from 'react';
import {Container} from "reactstrap";
import AddCustomer from "../components/customers/AddCustomer";
import ComponentHeader from "../components/partials/ComponentHeader";
import {validateManagerRole} from "../requests/authRequests";

class AddCustomerPage extends Component {

    async componentDidMount() {
        await validateManagerRole();
    }

    render() {
        return (
            <>
                {/*
                <LayoutSide>
                    <ComponentHeader returnURL="/customers" title="Add Customer"/>
                    <Container className="section-padding">
                        <AddCustomer/>
                    </Container>
                </LayoutSide>
                */}
                <ComponentHeader returnURL="/customers" title="Add Customer"/>
                <Container className="section-padding">
                    <AddCustomer/>
                </Container>
            </>
        )
    }
}

export default AddCustomerPage;
