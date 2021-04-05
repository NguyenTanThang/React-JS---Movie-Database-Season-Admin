import React, { Component } from 'react';
import {Container} from "reactstrap";
import MovieDetails from "../components/movies/MovieDetails";
import ComponentHeader from "../components/partials/ComponentHeader";
import {getMovieByID} from "../requests/movieRequests";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message, Skeleton} from "antd";
import {getAllSubtitlesByMovieID} from "../actions/subtitleActions";
import {getAllPhotosByMovieID} from "../actions/photoActions";
import {connect} from "react-redux";

class MovieDetailsPage extends Component {

    state = {
        movieItem: "",
        loggedIn: false,
        loading: true
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
        this.props.getAllSubtitlesByMovieID(movieID);
        this.props.getAllPhotosByMovieID(movieID);
        localStorage.setItem("previousPathSubtitle", this.props.location.pathname);
        this.setState({
            movieItem,
            loading: false
        })
    }

    render() {
        const {movieItem, loggedIn, loading} = this.state;
        const {subtitles, photos} = this.props;

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

        if (!movieItem || !loggedIn) {
            return (<></>)
        }

        return (
            <>
            {/*
            <LayoutSide>
                <ComponentHeader returnURL="/movies" title="Movie Details"/>
                <Container className="section-padding">
                    <MovieDetails movieItem={movieItem} subtitles={subtitles}/>
                </Container>
            </LayoutSide>
            */}
            <ComponentHeader returnURL="/movies" title="Movie Details"/>
                <Container className="section-padding">
                    <MovieDetails movieItem={movieItem} subtitles={subtitles} photos={photos} />
                </Container>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSubtitlesByMovieID: (movieID) => {
            dispatch(getAllSubtitlesByMovieID(movieID))
        },
        getAllPhotosByMovieID: (movieID) => {
            dispatch(getAllPhotosByMovieID(movieID))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        subtitles: state.subtitleReducer.subtitles,
        photos: state.photoReducer.photos
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsPage);
