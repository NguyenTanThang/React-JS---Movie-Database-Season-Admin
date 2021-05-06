import React, {Component} from "react";
import { Modal, Button } from 'antd';
import {Form, FormGroup, Label} from 'reactstrap';
import FileUploader from "../partials/FileUploader";
import { message } from 'antd';
import {getFileExtension} from "../../utils/utils";
import {
    acceptImageExt,
    isObjectEmpty
} from "../../utils/validator";
import {
  addPhoto
} from "../../actions/photoActions";
import {
  withRouter
} from "react-router-dom";
import {
  connect
} from "react-redux";

class AddPhoto extends Component {
  state = { 
    visible: false,
    photoFile: {},
    loadingCreate: false
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
    this.setState({
      loadingCreate: true
    })
    const {addPhoto, recordID} = this.props;
    const {photoFile} = this.state;

    if (!photoFile || isObjectEmpty(photoFile)) {
      this.setState({
        photoFile: {},
        loadingCreate: false
      })
      return message.warning("Please select a file");
    }

    addPhoto({recordID, photoFile});

    setTimeout(() => {
      this.setState({
        visible: false,
        photoFile: {},
        loadingCreate: false
      })
    }, 2000);
  }

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const fileExt = getFileExtension(file.name);
        if (!acceptImageExt(fileExt)) {
            message.warning("Poster can only be PNG, JPEG or JPG file. Although the file's name is visible it will not be uploaded", 5);
        } else {
            this.setState({
                [e.target.name]: file
            })
        }
    }
}

  render() {
    const {handleSubmit, handleFileChange} = this;
    const {photoFile, loadingCreate} = this.state;

    return (
      <>
        <button className="btn btn-primary" onClick={this.showModal}>
          Add Photo
        </button>
        <Modal
          title="Create new Photo"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          okButtonProps={{ style: {display: "none"} }}
        >
          <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Photo</Label>
                <FileUploader labelTitle="Photo" inputName="photoFile" currentFile={photoFile} handleFileChange={handleFileChange}/>
            </FormGroup>
            <FormGroup>
                <Button type="primary" htmlType="submit" block loading={loadingCreate}>
                    Add
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
      addPhoto: (newPhoto) => {
          dispatch(addPhoto(newPhoto))
      }
  }
}

export default connect(null, mapDispatchToProps)(withRouter(AddPhoto));