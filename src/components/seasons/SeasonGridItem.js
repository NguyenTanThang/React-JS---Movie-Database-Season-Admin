import React, { Component } from 'react';
import {Empty , Space} from "antd";
import DeleteSeason from "./DeleteSeason";
import {Link} from "react-router-dom";

class SeasonGridItem extends Component {

    renderSeasonPoster = () => {
        const {name, posterURL} = this.props.seasonItem;

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
        const {name, _id} = this.props.seasonItem;
        const {renderSeasonPoster} = this;

        return (
            <div className="col-lg-3 col-md-4 col-sm-12 movie-item season-item">
                <div className="movie-actions season-actions">
                    <Space>
                        <Link className="btn btn-warning" to={`/seasons/edit/${_id}`}>
                            <i className="fas fa-pen"></i>
                        </Link>
                        <DeleteSeason seasonItem={this.props.seasonItem}/>
                    </Space>
                </div>
                <div className="movie-item-poster  season-item-poster">
                    {renderSeasonPoster()}
                </div>
                <div className="movie-item-desc season-item-desc">
                    <Link to={`/seasons/details/${_id}`}>
                        <h4>{name}</h4>  
                    </Link>
                </div>
            </div>
        )
    }
}

export default SeasonGridItem;
