import React, { Component } from 'react';
import {Empty , Space} from "antd";
import DeleteMovie from "./DeleteMovie";
import {Link} from "react-router-dom";

class MovieGridItem extends Component {

    renderMoviePoster = () => {
        const {name, posterURL} = this.props.movieItem;

        if (posterURL) {
            return <img className="img-fluid" src={posterURL} alt={name}/>
        } else {
            return (
                <div className="spin-container">
                    <Empty description={"No Poster"}/>
                </div>
            )
        }
    }

    render() {
        const {name, _id} = this.props.movieItem;
        const {renderMoviePoster} = this;

        return (
            <div className="col-lg-3 col-md-4 col-sm-6 movie-item">
                <div className="movie-actions">
                    <Space>
                        <Link className="btn btn-warning" to={`/movies/edit/${_id}`}>
                            <i className="fas fa-pen"></i>
                        </Link>
                        <DeleteMovie movieItem={this.props.movieItem}/>
                    </Space>
                </div>
                <div className="movie-item-poster">
                    {renderMoviePoster()}
                </div>
                <div className="movie-item-desc">
                    <Link to={`/movies/details/${_id}`}>
                        <h4>{name}</h4>  
                    </Link> 
                </div>
            </div>
        )
    }
}

export default MovieGridItem;
