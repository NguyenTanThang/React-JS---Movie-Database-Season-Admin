import React, {Component} from "react";
import { Modal } from 'antd';
import {
  deleteSubtitle
} from "../../actions/subtitleActions";
import {connect} from "react-redux";

class DeleteSubtitle extends Component {
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
    const subtitleID = this.props.subtitleItem._id;
    this.props.deleteSubtitle(subtitleID);
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
          title="Delete Subtitle"
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
    deleteSubtitle: (subtitleID) => {
          dispatch(deleteSubtitle(subtitleID))
      },
  }
}

export default connect(null, mapDispatchToProps)(DeleteSubtitle);