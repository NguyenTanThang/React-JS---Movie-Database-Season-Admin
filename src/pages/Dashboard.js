import React, { Component } from 'react';
import {dashboardData} from "../helpers";
import {filterPercentageOfSubscribedUsers, filterRevenue} from "../utils/utils";
import DashboardBoxItem from "../components/dashboard/DashboardBoxItem";
import PieChart from "../components/dashboard/PieChart";
import LineChart from "../components/dashboard/LineChart";
import TabGenerator from "../components/partials/TabGenerator";

export default class Dashboard extends Component {

    state = {
        filteredPercentageOfSubscribedUsers: [],
        filteredRevenue: []
    }

    componentDidMount() {
        const {pieChartData, monthlyRevenueChartData} = dashboardData;
        this.setState({
            filteredPercentageOfSubscribedUsers: filterPercentageOfSubscribedUsers(pieChartData),
            filteredRevenue: filterRevenue(monthlyRevenueChartData)
        })
    }

    renderRevenueTabGen = () => {
        const {revenueYearList} = dashboardData;
        const {filteredRevenue} = this.state;

        const tabContents = filteredRevenue.map((filteredRevenueItem, index) => {
            return (
            <>
                <h5>Total: {filteredRevenueItem.total}$</h5>
                <LineChart data={[filteredRevenueItem]}
                labels={filteredRevenueItem.labels}
                title={`Monthly Revenue of ${revenueYearList[index]}`}
                />
            </>
            )
            
            
        })

        const tabHeaders = revenueYearList;

        return <TabGenerator tabContents={tabContents} tabHeaders={tabHeaders}/>
    }

    renderDashboardBoxItems = () => {
        const {dashboardBoxItems} = dashboardData;

        return dashboardBoxItems.map(dashboardBoxItem => {
            return (
                <div className="col-lg-3 col-md-6 col-sm-12">
                    <DashboardBoxItem dashboardBoxItem={dashboardBoxItem}/>
                </div>
            )
        })
    }

    render() {
        const {renderDashboardBoxItems, renderRevenueTabGen} = this;
        const {filteredPercentageOfSubscribedUsers} = this.state;

        return (
            <div className="dashboard-page">
                <div className="container">
                    <div className="dashboard-list dashboard-header">
                        <h2>General Data</h2>
                        <div className="row">
                            {renderDashboardBoxItems()}
                        </div>
                    </div>
                    <div className="dashboard-list">
                        {renderRevenueTabGen()}
                    </div>
                    <div className="dashboard-list">
                        <PieChart labels={filteredPercentageOfSubscribedUsers.label} data={[filteredPercentageOfSubscribedUsers]} title={`Percentage of Subscribed Users`}/>
                    </div>
                </div>
            </div>
        )
    }
}
