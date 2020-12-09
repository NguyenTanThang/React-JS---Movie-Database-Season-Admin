import React, {Component} from "react";
import { Modal } from 'antd';
import {
  deleteMovie
} from "../../actions/movieActions";
import {connect} from "react-redux";

class DeleteMovie extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  handleOk = e => {
    const movieID = this.props.movieItem._id;
    this.props.deleteMovie(movieID);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <button className="btn btn-danger" onClick={this.showModal}>
          <i className="fas fa-trash" aria-hidden="true"></i>
        </button>
        <Modal
          title="Delete Movie"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          okButtonProps={{ type: "danger" }}
        >
          <h2>Are You Sure?</h2>
          <p>Once deleted the item cannot be recovered</p>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMovie: (movieID) => {
          dispatch(deleteMovie(movieID))
      },
  }
}

export default connect(null, mapDispatchToProps)(DeleteMovie);