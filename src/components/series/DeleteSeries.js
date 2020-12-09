import React, {Component} from "react";
import { Modal } from 'antd';
import {
  deleteSeries
} from "../../actions/seriesActions";
import {connect} from "react-redux";

class DeleteSeries extends Component {
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
    const seriesID = this.props.seriesItem._id;
    this.props.deleteSeries(seriesID);
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
          title="Delete Series"
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
    deleteSeries: (seriesID) => {
          dispatch(deleteSeries(seriesID))
      },
  }
}

export default connect(null, mapDispatchToProps)(DeleteSeries);