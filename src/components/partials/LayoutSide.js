import React, { Component } from 'react';
import SideNav from "./SideNav";

class LayoutSide extends Component {
    render() {
        return (
            <div className="wrapper">
                <SideNav/>
                <div className="main_content">
                    <div className="sidebar-open">
                        <i className="fas fa-bars" aria-hidden="true"></i>
                        <p>Menu</p>
                    </div>

                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default LayoutSide;
