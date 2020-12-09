import React, {Component} from "react";
import { Modal } from 'antd';
import {
  deletePlan
} from "../../actions/planActions";
import {connect} from "react-redux";

class DeletePlan extends Component {
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
    const planID = this.props.planItem._id;
    this.props.deletePlan(planID);
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
          title="Delete Plan"
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
    deletePlan: (planID) => {
          dispatch(deletePlan(planID))
      },
  }
}

export default connect(null, mapDispatchToProps)(DeletePlan);