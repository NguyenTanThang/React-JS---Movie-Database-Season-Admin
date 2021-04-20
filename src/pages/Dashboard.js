import React, { Component } from 'react';
import {Skeleton} from "antd";
import {Container} from "reactstrap";
import { CSVLink } from "react-csv";
import {filterPercentageOfSubscribedUsers, filterRevenue, filterNewCustomer} from "../utils/utils";
import {
    getCustomerDashboardData,
    getRevenueData,
    getNewCustomerData
} from "../requests/dashboardRequests";
import DashboardBoxItem from "../components/dashboard/DashboardBoxItem";
import PieChart from "../components/dashboard/PieChart";
import LineChart from "../components/dashboard/LineChart";
import TabGenerator from "../components/partials/TabGenerator";
import {validateManagerRole} from "../requests/authRequests";

export default class Dashboard extends Component {

    state = {
        filteredRevenue: [],
        filteredNewCustomer: [],
        customerDashboardData: {},
        revenueYearList: [],
        newUserYearList: [],
        loading: true
    }

    async componentWillMount() {
        await validateManagerRole();

        const customerDashboardData = await getCustomerDashboardData();
        const {
            monthlyRevenueChartData, 
            revenueYearList
        } = await getRevenueData();
        const {
            monthlyNewUserChartData,
            newUserYearList
        } = await getNewCustomerData();
        this.setState({
            filteredRevenue: filterRevenue(monthlyRevenueChartData),
            customerDashboardData,
            revenueYearList,
            filteredNewCustomer: filterNewCustomer(monthlyNewUserChartData),
            newUserYearList,
            loading: false
        })
    }

    renderRevenueTabGen = () => {
        const {filteredRevenue, revenueYearList} = this.state;

        const tabContents = filteredRevenue.map((filteredRevenueItem, index) => {

            let csvData = [["Month", "Revenue", "Currency"]];

            for (let i = 0; i < filteredRevenueItem.labels.length; i++) {
                const revenue = filteredRevenueItem.data[i];
                const monthLabel = filteredRevenueItem.labels[i];
                
                csvData.push([monthLabel, revenue, "$"]);
            }

            csvData.push(["Total", filteredRevenueItem.total, "$"]);

            return (
            <>
                <h5>Total: {filteredRevenueItem.total}$</h5>
                <CSVLink 
                    filename={`Monthly Revenue of ${revenueYearList[index]}.csv`}
                    data={csvData}
                    target="_blank"
                    className="btn btn-success"
                >Download Excel</CSVLink>
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

    renderNewCustomerTabGen = () => {
        const {filteredNewCustomer, newUserYearList} = this.state;

        const tabContents = filteredNewCustomer.map((filteredNewCustomerItem, index) => {

            let csvData = [["Month", "New Customer"]];

            for (let i = 0; i < filteredNewCustomerItem.labels.length; i++) {
                const newCustomers = filteredNewCustomerItem.data[i];
                const monthLabel = filteredNewCustomerItem.labels[i];
                
                csvData.push([monthLabel, newCustomers]);
            }

            csvData.push(["Total", filteredNewCustomerItem.total]);

            return (
            <>
                <h5>Total: {filteredNewCustomerItem.total} customers</h5>
                <CSVLink 
                    filename={`Monthly New Customers of ${newUserYearList[index]}.csv`}
                    data={csvData}
                    target="_blank"
                    className="btn btn-success"
                >Download Excel</CSVLink>
                <LineChart data={[filteredNewCustomerItem]}
                labels={filteredNewCustomerItem.labels}
                title={`Monthly New Customers of ${newUserYearList[index]}`}
                />
            </>
            )
            
            
        })

        const tabHeaders = newUserYearList;

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
        const {renderDashboardBoxItems, renderRevenueTabGen, renderNewCustomerTabGen} = this;
        const {customerDashboardData, loading} = this.state;

        if (loading) {
            return (
                <Container className="section-padding">
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                </Container>
            )
        }

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
                        {renderNewCustomerTabGen()}
                    </div>
                    <div className="dashboard-list">
                        <PieChart labels={filteredPercentageOfSubscribedUsers.label} data={[filteredPercentageOfSubscribedUsers]} title={`Percentage of Subscribed Users`}/>
                    </div>
                </div>
            </div>
        )
    }
}
