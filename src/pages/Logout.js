import React, { Component } from 'react';
import {setUserRole} from "../actions/authActions";
import {connect} from "react-redux";

class Logout extends Component {

    componentDidMount() {
        localStorage.clear();
        sessionStorage.clear();
        this.props.setUserRole("");
        this.props.history.push("/login");
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserRole: (user) => {
            dispatch(setUserRole(user))
        }
    }
}

export default connect(null, mapDispatchToProps)(Logout);