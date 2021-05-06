import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import {validateManagerRole} from "../../requests/authRequests";
import { authenticationService } from '../../services';

class PrivateRoute extends React.Component {
    render() {
        const { component: Component, roles, ...rest } = this.props;

        return (
            <Route {...rest} render={props => {
                const currentUser = authenticationService.currentUserValue;
                if (!currentUser) {
                    // not logged in so redirect to login page with the return url
                    return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                }
        
                // check if route is restricted by role
                if (roles && roles.indexOf(currentUser.roleID.role) === -1) {
                    // role not authorised so redirect to home page
                    return <Redirect to={{ pathname: '/'}} />
                }
        
                // authorised so return component
                return <Component {...props} />
            }} />
        )
     }
}

/*
const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={async props => {
        const currentUser = authenticationService.currentUserValue;
        const managerRecord = await validateManagerRole(currentUser._id);
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser.roleID.role) === -1) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/'}} />
        }

        if (managerRecord.roleID.role !== currentUser.roleID.role) {
            // faker
            return authenticationService.logout();
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)
*/

export default PrivateRoute;