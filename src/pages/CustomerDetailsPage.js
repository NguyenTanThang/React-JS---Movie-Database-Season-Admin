import React, { Component } from 'react';
import {Container} from "reactstrap";
import CustomerDetails from "../components/customers/CustomerDetails";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getCustomerByID} from "../requests/customerRequests";
import {getSubByCustomerID} from "../requests/subscriptionRequests";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message, Skeleton} from "antd";
import {connect} from "react-redux";
import {getAllSubscriptionsByCustomerID} from "../actions/subscriptionActions";

class CustomerDetailsPage extends Component {

    state = {
        customerItem: "",
        loggedIn: false,
        subscriptionList: [],
        loading: true
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
        const {customerID} = this.props.match.params;
        const customerItem = await getCustomerByID(customerID);
        const subscriptionList = await getSubByCustomerID(customerID);
        this.props.getAllSubscriptionsByCustomerID(customerID);
        this.setState({
            customerItem,
            subscriptionList,
            loading: false
        })
    }

    render() {
        const {customerItem, loggedIn, subscriptionList, loading} = this.state;
        const {subscriptions} = this.props;

        if (loading) {
            return (
                <Container className="section-padding">
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                </Container>
            )
        }

        if (!customerItem || !loggedIn) {
            return (<></>)
        }

        return (
            <>
            {/*
            <LayoutSide>
                <ComponentHeader returnURL="/customers" title="Customer Details"/>
                <Container className="section-padding">
                    <CustomerDetails customerItem={customerItem} subscriptionList={subscriptionList} subscriptions={subscriptions}/>
                </Container>
            </LayoutSide>
            */}
            <ComponentHeader returnURL="/customers" title="Customer Details"/>
                <Container className="section-padding">
                    <CustomerDetails customerItem={customerItem} subscriptionList={subscriptionList} subscriptions={subscriptions}/>
                </Container>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSubscriptionsByCustomerID: (cusID) => {
            dispatch(getAllSubscriptionsByCustomerID(cusID))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        subscriptions: state.subscriptionReducer.subscriptions
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailsPage);
