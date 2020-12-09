import React, { Component } from 'react';
import { PageHeader } from 'antd';
import { Redirect } from 'react-router';
import {withRouter} from 'react-router-dom';

class ComponentHeader extends Component {
    render() {
        const {title, returnURL} = this.props;

        return (
            <PageHeader
                className="site-page-header"
                onBack={() => {
                    this.props.history.push(returnURL);
                }}
                title={title}
            />
        )
    }
}

export default withRouter(ComponentHeader);
