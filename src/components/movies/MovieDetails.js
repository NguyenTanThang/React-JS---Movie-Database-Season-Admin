import React, { Component } from 'react';
import { Descriptions } from 'antd';
import {convertKeyToText, checkIfIn} from "../../utils/utils";
import parse from 'html-react-parser';

class MovieDetails extends Component {

    renderMovieDescriptionItems = () => {
        const {movieItem} = this.props;
        const {imdbMovie} = movieItem;
        let descriptionItems = [];
        let key = `cd`

        const movieKeys = ["name", "genres", "rating", "IMDB_ID", "trailerURL", "posterURL", "movieURL", "description"]
        const specialMovieKeys = ["name", "trailerURL", "posterURL", "movieURL", "description"];
        movieKeys.map(movieKey => {
            let privateKey = `${key}-${movieKey}`;
            let privateLabel = convertKeyToText(movieKey);
            if (checkIfIn(movieKey, specialMovieKeys)) {
                if (movieKey === "posterURL") {
                    return descriptionItems.push(
                        <Descriptions.Item key={privateKey} span={1} label={privateLabel} className="text-center">
                            <img className="img-fluid" src={movieItem[movieKey]} alt={movieItem.name}/>
                        </Descriptions.Item>
                    )
                }
                if (movieKey === "trailerURL") {
                    return descriptionItems.push(
                        <Descriptions.Item key={privateKey} span={1} label={privateLabel}>
                            <video width="300" height="200" controls className="ml-auto mr-auto">
                                <source src={movieItem[movieKey]} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </Descriptions.Item>
                    )
                }
                if (movieKey === "movieURL") {
                    return descriptionItems.push(
                        <Descriptions.Item key={privateKey} span={1} label={privateLabel}>
                            <video width="300" height="200" controls className="ml-auto mr-auto">
                                <source src={movieItem[movieKey]} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </Descriptions.Item>
                    )
                }
                if (movieKey === "description") {
                    return descriptionItems.push(
                        <Descriptions.Item key={privateKey} span={3} label={privateLabel}>
                            {parse(movieItem[movieKey])}
                        </Descriptions.Item>
                    )
                }
                return descriptionItems.push(
                    <Descriptions.Item key={privateKey} span={3} label={privateLabel}>{movieItem[movieKey]}</Descriptions.Item>
                )
            }
            if (movieKey === "genres") {
                return descriptionItems.push(
                    <Descriptions.Item key={privateKey} label={privateLabel}>
                        {movieItem[movieKey].join(", ")}
                    </Descriptions.Item>
                )
            }
            if (movieKey === "rating") {
                return descriptionItems.push(
                    <Descriptions.Item key={privateKey} label={privateLabel}>
                        {movieItem[movieKey]}/10
                    </Descriptions.Item>
                )
            }
            return descriptionItems.push(
                <Descriptions.Item key={privateKey} label={privateLabel}>{movieItem[movieKey]}</Descriptions.Item>
            )
        })

        const imdbMovieKeys = ["Year", "Rated", "Released", "Runtime", "Actors", "Director"]
        imdbMovieKeys.map(imdbMovieKey => {
            let privateKey = `${key}-${imdbMovieKey}`;
            let privateLabel = imdbMovieKey;
            return descriptionItems.push(
                <Descriptions.Item key={privateKey} label={privateLabel}>{imdbMovie[imdbMovieKey]}</Descriptions.Item>
            )
        })

        return descriptionItems;
    }

    render() {
        const {renderMovieDescriptionItems} = this;

        return (
            <Descriptions title="Movie Details" layout="vertical" bordered>
                {renderMovieDescriptionItems()}
            </Descriptions>
        )
    }
}

export default MovieDetails;
