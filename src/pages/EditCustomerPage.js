import React, { Component } from 'react';
import {Container} from "reactstrap";
import EditCustomer from "../components/customers/EditCustomer";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";

class EditCustomerPage extends Component {

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
                <ComponentHeader returnURL="/customers" title="Edit Customer"/>
                <Container className="section-padding">
                    <EditCustomer customerID={params.customerID}/>
                </Container>
            </LayoutSide>
        )
    }
}

export default EditCustomerPage;
