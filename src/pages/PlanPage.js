import React, { Component } from 'react';
import {Container} from "reactstrap";
import {
    getAllPlans,
} from "../actions/planActions";
import {connect} from "react-redux";
import PlanList from "../components/plans/PlanList";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {Space, message} from "antd";
import {Link} from "react-router-dom";
import {getCurrentLoginStatus} from "../requests/authRequests";

class PlanPage extends Component {
    
    async componentDidMount() {
        const loggedIn = await getCurrentLoginStatus();
        if (!loggedIn) {
            message.error("You need to login first");
            this.props.history.push("/login");
        }
        this.props.getAllPlans();
    }

    render() {
        return (
            <LayoutSide>
                <ComponentHeader returnURL="/" title="Plans"/>
                <Container className="section-padding">
                    <div className="utils-box">
                        <Space>
                            <Link className="btn btn-primary" to="/plans/add">Add Plan</Link>
                        </Space>
                    </div>
                    <div className="table-container">
                        <PlanList plans={this.props.plans}/>
                    </div>
                </Container>
            </LayoutSide>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllPlans: () => {
            dispatch(getAllPlans())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        plans: state.planReducer.plans
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanPage);
