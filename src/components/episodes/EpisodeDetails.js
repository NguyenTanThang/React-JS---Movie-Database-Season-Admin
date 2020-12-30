import React, { Component } from 'react';
import { Descriptions } from 'antd';
import {convertKeyToText, checkIfIn} from "../../utils/utils";
import parse from 'html-react-parser';
import SubtitleList from "../subtitles/SubtitleList";
import {Link} from "react-router-dom";

class EpisodeDetails extends Component {

    renderSubtitleList = () => {
        const {subtitles, episodeItem} = this.props;
        return <SubtitleList videoID={episodeItem._id} subtitles={subtitles}/>
    }

    renderEpisodeDescriptionItems = () => {
        const {episodeItem} = this.props;
        const {renderSubtitleList} = this;
        let descriptionItems = [];
        let key = `cd`

        const seriesKeys = ["name", "rating", "episodeURL", "episodeNum", "description"]
        const specialSeriesKeys = ["name", "episodeURL", "description"];
        seriesKeys.map(seriesKey => {
            let privateKey = `${key}-${seriesKey}`;
            let privateLabel = convertKeyToText(seriesKey);
            if (checkIfIn(seriesKey, specialSeriesKeys)) {
                if (seriesKey === "episodeURL") {
                    return descriptionItems.push(
                        <Descriptions.Item key={privateKey} span={3} label={privateLabel} className="text-center">
                            <video width="300" height="200" controls>
                                <source src={episodeItem[seriesKey]} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </Descriptions.Item>
                    )
                }
                if (seriesKey === "description") {
                    return descriptionItems.push(
                        <Descriptions.Item key={privateKey} span={3} label={privateLabel}>
                            {parse(episodeItem[seriesKey])}
                        </Descriptions.Item>
                    )
                }
                return descriptionItems.push(
                    <Descriptions.Item key={privateKey} span={3} label={privateLabel}>{episodeItem[seriesKey]}</Descriptions.Item>
                )
            }
            if (seriesKey === "rating") {
                return descriptionItems.push(
                    <Descriptions.Item key={privateKey} span={3} label={privateLabel}>
                        {episodeItem[seriesKey]}/10
                    </Descriptions.Item>
                )
            }
            return descriptionItems.push(
                <Descriptions.Item key={privateKey} span={3} label={privateLabel}>{episodeItem[seriesKey]}</Descriptions.Item>
            )
        })

        descriptionItems.push(
            <Descriptions.Item key={"Subtitles"} span={3} label={"Subtitles"}>
                {renderSubtitleList()}
            </Descriptions.Item>
        )

        return descriptionItems;
    }

    render() {
        const {renderEpisodeDescriptionItems} = this;
        const {episodeItem} = this.props;

        return (
            
            <div className="details-container season-details-container">
                <div className="details-actions">
                    <Link to={`/episodes/edit/${episodeItem._id}`} className="btn btn-warning">
                        <i className="fas fa-pen"></i>
                    </Link>
                </div>
                <Descriptions title="Episode Details" layout="vertical" bordered>
                    {renderEpisodeDescriptionItems()}
                </Descriptions>
            </div>
        )
    }
}

export default EpisodeDetails;
