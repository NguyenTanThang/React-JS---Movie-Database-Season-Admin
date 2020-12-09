import React, { Component } from 'react';
import {FormGroup, Label, Form} from "reactstrap";
import TextField from '@material-ui/core/TextField';
import { Button, message } from 'antd';
import {changeUserPassword, getCurrentLoginStatus} from "../requests/authRequests";
import LayoutSide from "../components/partials/LayoutSide";

class ChangePasswordPage extends Component {

    state = {
        oldPassword: "",
        newPassword: ""
    }

    async componentDidMount() {
        const loggedIn = await getCurrentLoginStatus();
        if (!loggedIn) {
            this.props.history.push("/login");
            message.error("You need to login first");
        }
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      }

      handleSubmit = async (e) => {
          try {
            e.preventDefault();
            const {oldPassword, newPassword} = this.state;
            const resData = await changeUserPassword(oldPassword, newPassword);
            if (resData.success) {
                this.props.history.push("/");
            }
          } catch (error) {
              console.log(error);
          }
      }

    render() {
        const {handleChange, handleSubmit} = this;
        const {oldPassword, newPassword} = this.state;

        return (
            <LayoutSide>
                <div className="login-page-container">
                    <div className="login-form">
                        <h2>{"Change Password"}</h2>

                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="oldPassword">Current Password:</Label>
                                <TextField id="oldPassword" type="password" label="Current Password" variant="outlined" className="material-input" required onChange={handleChange} value={oldPassword}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="newPassword">New Password:</Label>
                                <TextField id="newPassword" type="password" label="New Password" variant="outlined" className="material-input" required onChange={handleChange} value={newPassword}/>
                            </FormGroup>
                            <FormGroup>
                                <Button type="primary" htmlType="submit" block>
                                    Change Password
                                </Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </LayoutSide>
        )
    }
}

export default ChangePasswordPage;
