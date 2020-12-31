import React, { Component } from 'react';
import {Container} from "reactstrap";
import {
    getAllManagers
} from "../actions/managerActions";
import {connect} from "react-redux";
import ManagerList from "../components/managers/ManagerList";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {Link} from "react-router-dom";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {Space, message} from "antd";

class ManagerPage extends Component {
    
    async componentDidMount() {
        const loggedIn = await getCurrentLoginStatus();
        if (!loggedIn) {
            message.error("You need to login first");
            this.props.history.push("/login");
        }
        this.props.getAllManagers();
    }

    render() {
        const {loading} = this.props;

        return (
            <>
            {/*
            <LayoutSide>
                <ComponentHeader returnURL="/" title="Managers"/>
                <Container className="section-padding">
                    <div className="utils-box">
                        <Space>
                            <Link className="btn btn-primary" to="/managers/add">Add Manager</Link>
                        </Space>
                    </div>
                    <div className="table-container">
                        <ManagerList managers={this.props.managers}/>
                    </div>
                </Container>
            </LayoutSide>
            */}
            <ComponentHeader returnURL="/" title="Managers"/>
                <Container className="section-padding">
                    <div className="utils-box">
                        <Space>
                            <Link className="btn btn-primary" to="/managers/add">Add Manager</Link>
                        </Space>
                    </div>
                    <div className="table-container">
                        <ManagerList loading={loading} managers={this.props.managers}/>
                    </div>
                </Container>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllManagers: () => {
            dispatch(getAllManagers())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        managers: state.managerReducer.managers,
        loading: state.loadingReducer.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerPage);
