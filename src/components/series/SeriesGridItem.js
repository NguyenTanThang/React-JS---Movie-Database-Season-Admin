import React, { Component } from 'react';
import {Empty , Space} from "antd";
import DeleteSeries from "./DeleteSeries";
import {Link} from "react-router-dom";

class SeriesGridItem extends Component {

    renderSeriesPoster = () => {
        const {name, posterURL} = this.props.seriesItem;

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
        const {name, _id} = this.props.seriesItem;
        const {renderSeriesPoster} = this;

        return (
            <div className="col-lg-3 col-md-4 col-sm-12 movie-item series-item">
                <div className="movie-actions series-actions">
                    <Space>
                        <Link className="btn btn-warning" to={`/series/edit/${_id}`}>
                            <i className="fas fa-pen"></i>
                        </Link>
                        <DeleteSeries seriesItem={this.props.seriesItem}/>
                    </Space>
                </div>
                <div className="movie-item-poster  series-item-poster">
                    {renderSeriesPoster()}
                </div>
                <div className="movie-item-desc series-item-desc">
                    <Link to={`/series/details/${_id}`}>
                        <h4>{name}</h4>  
                    </Link>
                </div>
            </div>
        )
    }
}

export default SeriesGridItem;
