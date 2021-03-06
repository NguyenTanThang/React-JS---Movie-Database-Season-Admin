import React, { Component } from 'react';
import { Descriptions } from 'antd';
import {convertKeyToText, checkIfIn} from "../../utils/utils";
import parse from 'html-react-parser';
import EpisodeList from "../episodes/EpisodeList";
import PhotoList from "../photos/PhotoList";
import {Link} from "react-router-dom";
import CommentList from "../comments/CommentList";

class SeasonDetails extends Component {

    renderEpisodeList = () => {
        const {episodes, seasonItem} = this.props;
        
        return <EpisodeList episodes={episodes} currentSeasonID={seasonItem._id}/>
    }

    renderPhotoList = () => {
        const {photos, seasonItem, addPhoto} = this.props;
        return <PhotoList recordID={seasonItem._id} addPhoto={addPhoto} photos={photos}/>
    }

    renderCommentList = () => {
        const {comments} = this.props;
        return <CommentList comments={comments}/>
    }

    renderSeasonDescriptionItems = () => {
        const {renderCommentList} = this;
        const {seasonItem} = this.props;
        let descriptionItems = [];
        let key = `cd`

        const seriesKeys = ["name", "rating", "trailerURL", "posterURL", "description"]
        const specialSeriesKeys = ["name", "trailerURL", "posterURL", "description"];
        seriesKeys.map(seriesKey => {
            let privateKey = `${key}-${seriesKey}`;
            let privateLabel = convertKeyToText(seriesKey);
            if (checkIfIn(seriesKey, specialSeriesKeys)) {
                if (seriesKey === "posterURL") {
                    return descriptionItems.push(
                        <Descriptions.Item key={privateKey} span={2} label={privateLabel} className="text-center">
                            <img className="img-fluid" style={{width: "200px"}} src={seasonItem[seriesKey]} alt={seasonItem.name}/>
                        </Descriptions.Item>
                    )
                }
                if (seriesKey === "trailerURL") {
                    return descriptionItems.push(
                        <Descriptions.Item key={privateKey} span={1} label={privateLabel} className="text-center">
                            <video width="300" height="200" controls>
                                <source src={seasonItem[seriesKey]} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </Descriptions.Item>
                    )
                }
                if (seriesKey === "description") {
                    return descriptionItems.push(
                        <Descriptions.Item key={privateKey} span={3} label={privateLabel}>
                            {parse(seasonItem[seriesKey])}
                        </Descriptions.Item>
                    )
                }
                return descriptionItems.push(
                    <Descriptions.Item key={privateKey} span={3} label={privateLabel}>{seasonItem[seriesKey]}</Descriptions.Item>
                )
            }
            if (seriesKey === "rating") {
                return descriptionItems.push(
                    <Descriptions.Item key={privateKey} span={3} label={privateLabel}>
                        {seasonItem[seriesKey]}/5
                    </Descriptions.Item>
                )
            }
            return descriptionItems.push(
                <Descriptions.Item key={privateKey} label={privateLabel}>{seasonItem[seriesKey]}</Descriptions.Item>
            )
        })

        descriptionItems.push(
            <Descriptions.Item key={"episode-list"} span={3} label={"Episodes"}>{this.renderEpisodeList()}</Descriptions.Item>
        )

        descriptionItems.push(
            <Descriptions.Item key={"photo-list"} span={3} label={"Photo"}>{this.renderPhotoList()}</Descriptions.Item>
        )

        descriptionItems.push(
            <Descriptions.Item key={"Comments"} span={3} label={"Comments"}>
                {renderCommentList()}
            </Descriptions.Item>
        )

        return descriptionItems;
    }

    render() {
        const {renderSeasonDescriptionItems} = this;
        const {seasonItem} = this.props;

        return (
            
            <div className="details-container season-details-container">
                <div className="details-actions">
                    <Link to={`/seasons/edit/${seasonItem._id}`} className="btn btn-warning">
                        <i className="fas fa-pen"></i>
                    </Link>
                </div>
                <Descriptions title="Season Details" layout="vertical" bordered>
                    {renderSeasonDescriptionItems()}
                </Descriptions>
            </div>
        )
    }
}

export default SeasonDetails;
