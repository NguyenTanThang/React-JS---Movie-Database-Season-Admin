import React, {Component} from "react";
import { Modal, Button } from 'antd';
import TextField from '@material-ui/core/TextField';
import {Form, FormGroup, Label} from 'reactstrap';
import {
  editGenre,
} from "../../actions/genreActions";
import {connect} from "react-redux";

class EditGenre extends Component {
  state = { 
      visible: false,
      name: ""
    };

  componentDidMount() {
    const {genreItem} = this.props;
    const {name} = genreItem;

    this.setState({
        name
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {editGenre, genreItem} = this.props;
    const {name} = this.state;

    editGenre(genreItem, {name})
  }

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const {name} = this.state;
    const {handleSubmit, handleChange} = this;

    return (
      <>
        <button className="btn btn-warning" onClick={this.showModal}>
          <i className="fas fa-pen"></i>
        </button>
        <Modal
          title="Edit Genre"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          okButtonProps={{ style: {display: "none"} }}
        >
          <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>{`Genre's Name`}</Label>
                <TextField id="name" label="Genre's Name" variant="outlined" className="material-input" required value={name} onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
                <Button type="primary" htmlType="submit" block>
                    Update
                </Button>
            </FormGroup>
          </Form>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editGenre: (genreID, updatedGenre) => {
          dispatch(editGenre(genreID, updatedGenre))
      }
  }
}

export default connect(null, mapDispatchToProps)(EditGenre);