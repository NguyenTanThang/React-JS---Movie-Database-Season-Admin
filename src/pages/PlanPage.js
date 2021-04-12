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
import {validateManagerRole} from "../requests/authRequests";

class PlanPage extends Component {
    
    async componentDidMount() {
        await validateManagerRole();
        this.props.getAllPlans();
    }

    render() {
        const {loading} = this.props;

        return (
            <>
            {/*
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
            */}
            <ComponentHeader returnURL="/" title="Plans"/>
                <Container className="section-padding">
                    <div className="utils-box">
                        <Space>
                            <Link className="btn btn-primary" to="/plans/add">Add Plan</Link>
                        </Space>
                    </div>
                    <div className="table-container">
                        <PlanList loading={loading} plans={this.props.plans}/>
                    </div>
                </Container>
            </>
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
        plans: state.planReducer.plans,
        loading: state.loadingReducer.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanPage);
