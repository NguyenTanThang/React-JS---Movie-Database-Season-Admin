import React, {Component} from "react";
import { Modal } from 'antd';
import {
  deleteManager
} from "../../actions/managerActions";
import {connect} from "react-redux";

class DeleteManager extends Component {
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
    const managerID = this.props.managerItem._id;
    this.props.deleteManager(managerID);
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
          title="Delete Manager"
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
    deleteManager: (managerID) => {
          dispatch(deleteManager(managerID))
      },
  }
}

export default connect(null, mapDispatchToProps)(DeleteManager);