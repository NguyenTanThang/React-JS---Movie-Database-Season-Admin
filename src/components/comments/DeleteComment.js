import React, {Component} from "react";
import { Modal } from 'antd';
import {
  deleteComment
} from "../../actions/commentActions";
import {connect} from "react-redux";

class DeleteComment extends Component {
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
    const commentID = this.props.commentItem._id;
    this.props.deleteComment(commentID);
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
          title="Delete Comment"
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
    deleteComment: (commentID) => {
          dispatch(deleteComment(commentID))
      },
  }
}

export default connect(null, mapDispatchToProps)(DeleteComment);