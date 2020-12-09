import React, { Component } from 'react';
import {Container} from "reactstrap";
import EditMovie from "../components/movies/EditMovie";
import LayoutSide from "../components/partials/LayoutSide";
import ComponentHeader from "../components/partials/ComponentHeader";
import {
    getAllGenres
} from "../actions/genreActions";
import {
    connect
} from "react-redux";
import {getCurrentLoginStatus} from "../requests/authRequests";
import {message} from "antd";

class EditMoviePage extends Component {

    state = {
        loggedIn: false
    }
    
    async componentDidMount() {
        const loggedIn = await getCurrentLoginStatus();
        this.setState({
            loggedIn
        })
        if (!loggedIn) {
            message.error("You need to login first");
            this.props.history.push("/login");
        }
        this.props.getAllGenres();
    }

    render() {
        const { match: { params }, genres } = this.props;
        const {loggedIn} = this.state;

        if (!loggedIn) {
            return (<></>)
        }

        return (
            <LayoutSide>
                <ComponentHeader returnURL="/movies" title="Edit Movie"/>
                <Container className="section-padding">
                    <EditMovie movieID={params.movieID} genres={genres}/>
                </Container>
            </LayoutSide>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllGenres: () => {
            dispatch(getAllGenres())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        genres: state.genreReducer.genres
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMoviePage);
