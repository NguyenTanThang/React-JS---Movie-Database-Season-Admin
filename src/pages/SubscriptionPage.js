import React, { Component } from 'react';
import {Container} from "reactstrap";
import {
    getAllSubscriptions,
} from "../actions/subscriptionActions";
import {connect} from "react-redux";
import SubscriptionList from "../components/subscriptions/SubscriptionList";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {Space, message} from "antd";
import {getCurrentLoginStatus} from "../requests/authRequests";

class SubscriptionPage extends Component {
    
    async componentDidMount() {
        const loggedIn = await getCurrentLoginStatus();
        if (!loggedIn) {
            message.error("You need to login first");
            this.props.history.push("/login");
        }
        this.props.getAllSubscriptions();
    }

    render() {
        return (
            <LayoutSide>
                <ComponentHeader returnURL="/" title="Subscriptions"/>
                <Container className="section-padding">
                    <div className="utils-box">
                        <Space>
                        </Space>
                    </div>
                    <div className="table-container">
                        <SubscriptionList subscriptions={this.props.subscriptions}/>
                    </div>
                </Container>
            </LayoutSide>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSubscriptions: () => {
            dispatch(getAllSubscriptions())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        subscriptions: state.subscriptionReducer.subscriptions
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionPage);
