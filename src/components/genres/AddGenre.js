import React, {Component} from "react";
import { Modal, Button } from 'antd';
import TextField from '@material-ui/core/TextField';
import {Form, FormGroup, Label} from 'reactstrap';

class AddGenre extends Component {
  state = { 
    visible: false,
    name: ""
   };

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
    const {addGenre} = this.props;
    const {name} = this.state;

    addGenre(name);

    this.setState({
      visible: false,
      name: ""
    })
  }

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const {handleChange, handleSubmit} = this;
    const {name} = this.state;

    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Add Genre
        </Button>
        <Modal
          title="Create new Genre"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          okButtonProps={{ style: {display: "none"} }}
        >
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>{`Genre's Name`}</Label>
              <TextField id="name" label="Genre's Name" variant="outlined" className="material-input" required onChange={handleChange} value={name}/>
            </FormGroup>
            <FormGroup>
                <Button type="primary" htmlType="submit" block>
                    Create
                </Button>
            </FormGroup>
          </Form>
        </Modal>
      </>
    );
  }
}

export default AddGenre;