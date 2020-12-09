import React, { Component } from 'react';
import {Container} from "reactstrap";
import AddCustomer from "../components/customers/AddCustomer";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";

class AddCustomerPage extends Component {

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
                <ComponentHeader returnURL="/customers" title="Add Customer"/>
                <Container className="section-padding">
                    <AddCustomer/>
                </Container>
            </LayoutSide>
        )
    }
}

export default AddCustomerPage;
