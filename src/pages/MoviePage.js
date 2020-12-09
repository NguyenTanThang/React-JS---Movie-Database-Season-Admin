import React, { Component } from 'react';
import {Container, Button, ButtonGroup} from "reactstrap";
import {Space, message} from "antd";
import {
    getAllMovies
} from "../actions/movieActions";
import {connect} from "react-redux";
import MovieList from "../components/movies/MovieList";
import MovieGridView from "../components/movies/MovieGridView";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {Link} from "react-router-dom";
import {getCurrentLoginStatus} from "../requests/authRequests";

class MoviePage extends Component {
    
    state = {
        currentView: "grid"
    }

    async componentDidMount() {
        const loggedIn = await getCurrentLoginStatus();
        if (!loggedIn) {
            message.error("You need to login first");
            this.props.history.push("/login");
        }
        this.props.getAllMovies();
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

    renderMovieView = () => {
        const {currentView} = this.state;

        if (currentView === "list") {
            return (
                <div className="table-container">
                    <MovieList movies={this.props.movies}/>
                </div>
            )
        } else if (currentView === "grid") {
            return <MovieGridView movies={this.props.movies}/>
        } else {
            return (
                <div className="table-container">
                    <MovieList movies={this.props.movies}/>
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
        const {renderChangeViewButtons, renderMovieView} = this;

        return (
            <LayoutSide>
                <ComponentHeader returnURL="/" title="Movies"/>
                <Container className="section-padding">
                    <div className="utils-box">
                        <Space>
                            <Link className="btn btn-primary" to="/movies/add">Add Movie</Link>
                            {renderChangeViewButtons()}
                        </Space>
                    </div>
                    {renderMovieView()}
                </Container>
            </LayoutSide>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllMovies: () => {
            dispatch(getAllMovies())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movieReducer.movies
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
