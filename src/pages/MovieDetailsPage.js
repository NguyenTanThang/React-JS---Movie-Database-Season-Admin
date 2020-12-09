import React, { Component } from 'react';
import {Container} from "reactstrap";
import MovieDetails from "../components/movies/MovieDetails";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getMovieByID} from "../requests/movieRequests";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";

class MovieDetailsPage extends Component {

    state = {
        movieItem: "",
        loggedIn: false
    }

    async componentDidMount() {
        const loggedIn = await getCurrentLoginStatus();
        this.setState({
            loggedIn
        })
        if (!loggedIn) {
            message.error("You need to login first");
            return this.props.history.push("/login");
        }

        const {movieID} = this.props.match.params;
        const movieItem = await getMovieByID(movieID);
        this.setState({
            movieItem
        })
    }

    render() {
        const {movieItem, loggedIn} = this.state;

        if (!movieItem || !loggedIn) {
            return (<></>)
        }

        return (
            <LayoutSide>
                <ComponentHeader returnURL="/movies" title="Movie Details"/>
                <Container className="section-padding">
                    <MovieDetails movieItem={movieItem}/>
                </Container>
            </LayoutSide>
        )
    }
}

export default MovieDetailsPage;
