import React, { Component } from 'react';
import {Container} from "reactstrap";
import EditCustomer from "../components/customers/EditCustomer";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";
import {validateManagerRole} from "../requests/authRequests";

class EditCustomerPage extends Component {

    async componentDidMount() {
        await validateManagerRole();
    }

    render() {
        const { match: { params } } = this.props;

        return (
            <>
            {/*
            <LayoutSide>
                <ComponentHeader returnURL="/customers" title="Edit Customer"/>
                <Container className="section-padding">
                    <EditCustomer customerID={params.customerID}/>
                </Container>
            </LayoutSide>
            */}
            <ComponentHeader returnURL="/customers" title="Edit Customer"/>
                <Container className="section-padding">
                    <EditCustomer customerID={params.customerID}/>
                </Container>
            </>
        )
    }
}

export default EditCustomerPage;
