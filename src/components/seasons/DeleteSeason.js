import React, {Component} from "react";
import { Modal } from 'antd';
import {
  deleteSeason
} from "../../actions/seasonActions";
import {connect} from "react-redux";

class DeleteSeason extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleOk = e => {
    console.log(e);
    const seasonID = this.props.seasonItem._id;
    this.props.deleteSeason(seasonID);
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
          title="Delete Season"
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
    deleteSeason: (seasonID) => {
          dispatch(deleteSeason(seasonID))
      },
  }
}

export default connect(null, mapDispatchToProps)(DeleteSeason);