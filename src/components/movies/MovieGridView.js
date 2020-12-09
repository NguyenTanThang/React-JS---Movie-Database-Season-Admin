import React, { Component } from 'react';
import {Empty} from "antd";
import MovieGridItem from "./MovieGridItem";
import PaginationComponent from "../partials/PaginationComponent";
import {paginate} from "../../utils/utils";

export default class MovieGridView extends Component {

    state = {
        pageNumber: 1
    }

    onChangePageNumber = (pageNumber) => {
        this.setState({
            pageNumber
        })
    }

    renderMovieItems = () => {
        const {pageNumber} = this.state;
        const {movies} = this.props;
        const pageObject = paginate(movies.length, pageNumber);
        let currentMovies = movies;

        currentMovies = currentMovies.slice(pageObject.startIndex, pageObject.endIndex + 1);

        if (currentMovies.length === 0) {
            return (
                <div className="container text-center">
                    <Empty/>
                </div>
            )
        }
        return currentMovies.map(movieItem => {
            return (
                <MovieGridItem key={movieItem._id} movieItem={movieItem}/>
            )
        })
    }

    render() {
        const {pageNumber} = this.state;
        const {renderMovieItems, onChangePageNumber} = this;
        const {movies} = this.props;
        const pageObject = paginate(movies.length, pageNumber);

        return (
            <div>
                <div className="row movie-grid-list">
                    {renderMovieItems()}
                </div>
                <PaginationComponent pageObject={pageObject} total={movies.length} onChangePageNumber={onChangePageNumber}/>
            </div>
        )
    }
}
