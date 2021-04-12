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
import {validateManagerRole} from "../requests/authRequests";

class SubscriptionPage extends Component {
    
    async componentDidMount() {
        await validateManagerRole();

        this.props.getAllSubscriptions();
    }

    render() {
        const {loading} = this.props;

        return (
            <>
            {/*
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
            */}
            <ComponentHeader returnURL="/" title="Subscriptions"/>
                <Container className="section-padding">
                    <div className="utils-box">
                        <Space>
                        </Space>
                    </div>
                    <div className="table-container">
                        <SubscriptionList loading={loading} subscriptions={this.props.subscriptions}/>
                    </div>
                </Container>
            </>
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
        subscriptions: state.subscriptionReducer.subscriptions,
        loading: state.loadingReducer.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionPage);
