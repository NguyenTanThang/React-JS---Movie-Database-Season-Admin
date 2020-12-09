import React, { Component } from 'react';
import {Empty} from "antd";
import SeasonGridItem from "./SeasonGridItem";

export default class SeasonGridView extends Component {

    renderSeasonItems = () => {
        const {seasons} = this.props;
        if (seasons.length === 0) {
            return (
                <div className="container text-center">
                    <Empty/>
                </div>
            )
        }
        return seasons.map(seasonItem => {
            return (
                <SeasonGridItem key={seasonItem._id} seasonItem={seasonItem}/>
            )
        })
    }

    render() {
        const {renderSeasonItems} = this;

        return (
            <div className="row movie-grid-list">
                {renderSeasonItems()}
            </div>
        )
    }
}
