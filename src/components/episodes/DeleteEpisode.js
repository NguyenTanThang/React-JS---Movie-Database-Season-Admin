import React, {Component} from "react";
import { Modal } from 'antd';
import {
  deleteEpisode
} from "../../actions/episodeActions";
import {connect} from "react-redux";

class DeleteEpisode extends Component {
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
    const episodeID = this.props.episodeItem._id;
    this.props.deleteEpisode(episodeID);
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
          title="Delete Episode"
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
    deleteEpisode: (episodeID) => {
          dispatch(deleteEpisode(episodeID))
      },
  }
}

export default connect(null, mapDispatchToProps)(DeleteEpisode);