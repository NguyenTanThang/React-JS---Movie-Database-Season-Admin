import React, { Component } from 'react';
import { Descriptions } from 'antd';
import {convertKeyToText, checkIfIn} from "../../utils/utils";
import parse from 'html-react-parser';
import SeasonList from "../seasons/SeasonList";
import PhotoList from "../photos/PhotoList";
import {Link} from "react-router-dom";

class SeriesDetails extends Component {

    renderSeasonList = () => {
        const {seasons, seriesItem} = this.props;
        
        return <SeasonList seasons={seasons} currentSeriesID={seriesItem._id}/>
    }

    renderPhotoList = () => {
        const {photos, seriesItem, addPhoto} = this.props;
        return <PhotoList recordID={seriesItem._id} addPhoto={addPhoto} photos={photos}/>
    }

    renderSeriesDescriptionItems = () => {
        const {seriesItem} = this.props;
        const {imdbSeries} = seriesItem;
        let descriptionItems = [];
        let key = `cd`

        const seriesKeys = ["name", "genres", "rating", "IMDB_ID", "trailerURL", "posterURL", "description"]
        const specialSeriesKeys = ["name", "trailerURL", "posterURL", "description"];
        seriesKeys.map(seriesKey => {
            let privateKey = `${key}-${seriesKey}`;
            let privateLabel = convertKeyToText(seriesKey);
            if (checkIfIn(seriesKey, specialSeriesKeys)) {
                if (seriesKey === "posterURL") {
                    return descriptionItems.push(
                        <Descriptions.Item key={privateKey} span={2} label={privateLabel} className="text-center">
                            <img className="img-fluid" style={{width: "200px"}} src={seriesItem[seriesKey]} alt={seriesItem.name}/>
                        </Descriptions.Item>
                    )
                }
                if (seriesKey === "trailerURL") {
                    return descriptionItems.push(
                        <Descriptions.Item key={privateKey} span={1} label={privateLabel} className="text-center">
                            <video width="300" height="200" controls>
                                <source src={seriesItem[seriesKey]} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </Descriptions.Item>
                    )
                }
                if (seriesKey === "description") {
                    return descriptionItems.push(
                        <Descriptions.Item key={privateKey} span={3} label={privateLabel}>
                            {parse(seriesItem[seriesKey])}
                        </Descriptions.Item>
                    )
                }
                return descriptionItems.push(
                    <Descriptions.Item key={privateKey} span={3} label={privateLabel}>{seriesItem[seriesKey]}</Descriptions.Item>
                )
            }
            if (seriesKey === "genres") {
                return descriptionItems.push(
                    <Descriptions.Item key={privateKey} label={privateLabel}>
                        {seriesItem[seriesKey].join(", ")}
                    </Descriptions.Item>
                )
            }
            if (seriesKey === "rating") {
                return descriptionItems.push(
                    <Descriptions.Item key={privateKey} label={privateLabel}>
                        {seriesItem[seriesKey]}/10
                    </Descriptions.Item>
                )
            }
            return descriptionItems.push(
                <Descriptions.Item key={privateKey} label={privateLabel}>{seriesItem[seriesKey]}</Descriptions.Item>
            )
        })

        const imdbMovieKeys = ["Year", "Rated", "Released", "Runtime", "Actors", "Director"]
        imdbMovieKeys.map(imdbMovieKey => {
            let privateKey = `${key}-${imdbMovieKey}`;
            let privateLabel = imdbMovieKey;
            return descriptionItems.push(
                <Descriptions.Item key={privateKey} label={privateLabel}>{imdbSeries[imdbMovieKey]}</Descriptions.Item>
            )
        })

        descriptionItems.push(
            <Descriptions.Item key={"season-list"} span={3} label={"Season"}>{this.renderSeasonList()}</Descriptions.Item>
        )

        descriptionItems.push(
            <Descriptions.Item key={"photo-list"} span={3} label={"Photo"}>{this.renderPhotoList()}</Descriptions.Item>
        )

        /*
        descriptionItems.push(
            <Descriptions.Item key={`${key}episodes`} span={3} label={"Episodes"} className="text-center">
                {this.renderEpisodeTabs()}
            </Descriptions.Item>
        )
        */

        return descriptionItems;
    }

    render() {
        const {renderSeriesDescriptionItems} = this;
        const {seriesItem} = this.props;

        return (
            <div className="details-container series-details-container">
                <div className="details-actions">
                    <Link to={`/series/edit/${seriesItem._id}`} className="btn btn-warning">
                        <i className="fas fa-pen"></i>
                    </Link>
                </div>
                <Descriptions title="Series Details" layout="vertical" bordered>
                    {renderSeriesDescriptionItems()}
                </Descriptions>
            </div>
        )
    }
}

export default SeriesDetails;
