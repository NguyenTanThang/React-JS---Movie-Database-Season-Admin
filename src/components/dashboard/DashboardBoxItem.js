import React, { Component } from 'react';
import parse from "html-react-parser";

class DashboardBoxItem extends Component {
    render() {
        const {title, index, iconString} = this.props.dashboardBoxItem;
        return (
            <div className="dashboard-box-item">
                <div className="dashboard-box-item__header">
                    <div  className="dashboard-box-item-header__icon">
                        {parse(iconString)}
                    </div>
                    <h4>{title}</h4>
                </div>
                <h3>{index}</h3>
            </div>
        )
    }
}

export default DashboardBoxItem;
