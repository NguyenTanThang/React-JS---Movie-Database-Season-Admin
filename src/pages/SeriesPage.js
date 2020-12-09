import React, { Component } from 'react';
import {Container, Button, ButtonGroup} from "reactstrap";
import {Space, message} from "antd";
import {
    getAllSeries
} from "../actions/seriesActions";
import {connect} from "react-redux";
import SeriesList from "../components/series/SeriesList";
import SeriesGridView from "../components/series/SeriesGridView";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {Link} from "react-router-dom";
import {getCurrentLoginStatus} from "../requests/authRequests";

class SeriesPage extends Component {
    
    state = {
        currentView: "grid"
    }

    async componentDidMount() {
        const loggedIn = await getCurrentLoginStatus();
        if (!loggedIn) {
            message.error("You need to login first");
            this.props.history.push("/login");
        }
        this.props.getAllSeries();
    }

    renderChangeViewButtons = () => {
        const {changeView} = this;
        const {currentView} = this.state;
        let gridButton = (<Button onClick={() => {changeView("grid")}} color="dark">
                    <i className="fas fa-th-large" aria-hidden="true"></i>
                </Button>)
        let listButton = (
            <Button color="dark" onClick={() => {changeView("list")}}>
            <i className="fas fa-list" aria-hidden="true"></i>
            </Button>
        )

        if (currentView === "grid") {
            listButton = (
                <Button color="light" onClick={() => {changeView("list")}}>
                <i className="fas fa-list" aria-hidden="true"></i>
                </Button>
            )
        } else if (currentView === "list") {
            gridButton = (<Button color="light" onClick={() => {changeView("grid")}}>
                    <i className="fas fa-th-large" aria-hidden="true"></i>
                </Button>)
        } else {
            listButton = (
                <Button color="light" onClick={() => {changeView("list")}}>
                <i className="fas fa-list" aria-hidden="true"></i>
                </Button>
            )
        }

        return (
            <ButtonGroup>
                {gridButton}
                {listButton}
            </ButtonGroup>
        )
    }

    renderSeriesView = () => {
        const {currentView} = this.state;

        if (currentView === "list") {
            return (
                <div className="table-container">
                    <SeriesList series={this.props.series}/>
                </div>
            )
        } else if (currentView === "grid") {
            return <SeriesGridView series={this.props.series}/>
        } else {
            return (
                <div className="table-container">
                    <SeriesList series={this.props.series}/>
                </div>
            )
        }
    }

    changeView = (currentView) => {
        this.setState({
            currentView
        })
    }

    render() {
        const {renderChangeViewButtons, renderSeriesView} = this;

        return (
            <LayoutSide>
                <ComponentHeader returnURL="/" title="Series"/>
                <Container className="section-padding">
                    <div className="utils-box">
                        <Space>
                            <Link className="btn btn-primary" to="/series/add">Add Series</Link>
                            {renderChangeViewButtons()}
                        </Space>
                    </div>
                    {renderSeriesView()}
                </Container>
            </LayoutSide>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSeries: () => {
            dispatch(getAllSeries())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        series: state.seriesReducer.series
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesPage);
