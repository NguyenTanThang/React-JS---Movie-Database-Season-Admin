import React, { Component } from 'react';
import {Empty} from "antd";
import SeriesGridItem from "./SeriesGridItem";

export default class SeriesGridView extends Component {

    renderSeriesItems = () => {
        const {series} = this.props;
        if (series.length === 0) {
            return (
                <div className="container text-center">
                    <Empty/>
                </div>
            )
        }
        return series.map(seriesItem => {
            return (
                <SeriesGridItem key={seriesItem._id} seriesItem={seriesItem}/>
            )
        })
    }

    render() {
        const {renderSeriesItems} = this;

        return (
            <div className="row movie-grid-list">
                {renderSeriesItems()}
            </div>
        )
    }
}
