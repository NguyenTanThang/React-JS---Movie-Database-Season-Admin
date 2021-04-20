import React, {Component} from "react";
import { Modal } from 'antd';
import {
  deletePhoto
} from "../../actions/photoActions";
import {connect} from "react-redux";

class DeletePhoto extends Component {
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
    const photoID = this.props.photoItem._id;
    this.props.deletePhoto(photoID);
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
          title="Delete Photo"
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
    deletePhoto: (photoID) => {
          dispatch(deletePhoto(photoID))
      },
  }
}

export default connect(null, mapDispatchToProps)(DeletePhoto);