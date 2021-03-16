import React, { Component } from 'react';
import {dashboardData} from "../helpers";
import {filterPercentageOfSubscribedUsers, filterRevenue} from "../utils/utils";
import {
    getCustomerDashboardData,
    getRevenueData
} from "../requests/dashboardRequests";
import DashboardBoxItem from "../components/dashboard/DashboardBoxItem";
import PieChart from "../components/dashboard/PieChart";
import LineChart from "../components/dashboard/LineChart";
import TabGenerator from "../components/partials/TabGenerator";

export default class Dashboard extends Component {

    state = {
        filteredRevenue: [],
        customerDashboardData: {},
        revenueYearList: []
    }

    async componentDidMount() {
        const customerDashboardData = await getCustomerDashboardData();
        const {monthlyRevenueChartData, revenueYearList} = await getRevenueData();
        this.setState({
            filteredRevenue: filterRevenue(monthlyRevenueChartData),
            customerDashboardData,
            revenueYearList
        })
    }

    renderRevenueTabGen = () => {
        const {filteredRevenue, revenueYearList} = this.state;

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
        const {customerDashboardData} = this.state;
        const {
            totalCustomer,
            validCustomer,
            activeCustomer,
            subscribedCustomer
        } = customerDashboardData;

        const dashboardBoxItems = [
            {
                title: "Total Customers",
                index: totalCustomer,
                iconString: `<i class="fas fa-users"></i>`
            },
            {
                title: "Valid Customers",
                index: validCustomer,
                iconString: `<i class="fas fa-user-check"></i>`
            },
            {
                title: "Subscribed Customers",
                index: subscribedCustomer,
                iconString: `<i class="fas fa-user-tag"></i>`
            },
            {
                title: "Active Customers",
                index: activeCustomer,
                iconString: `<i class="fas fa-user-clock"></i>`
            },
        ]

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
        const {customerDashboardData} = this.state;
        const {
            totalCustomer,
            subscribedCustomer
        } = customerDashboardData;
        const filteredPercentageOfSubscribedUsers = filterPercentageOfSubscribedUsers({
            totalUser: totalCustomer,
            subscribedUser: subscribedCustomer
        });

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
