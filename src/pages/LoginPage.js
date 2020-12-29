import React, { Component } from 'react';
import {FormGroup, Label, Form} from "reactstrap";
import TextField from '@material-ui/core/TextField';
import { Button, message } from 'antd';
import {login, getCurrentLoginStatus} from "../requests/authRequests";
import {connect} from 'react-redux';
import {setUserRole} from "../actions/authActions";

class LoginPage extends Component {

    state = {
        username: "",
        password: ""
    }

    async componentDidMount() {
        const loggedIn = await getCurrentLoginStatus();
        if (loggedIn) {
            this.props.history.push("/");
            message.error("You have already logged in");
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
            const {username, password} = this.state;
            const resData = await login(username, password);
            if (resData.success) {
                this.props.setUserRole(resData.data);
                this.props.history.push("/");
            }
          } catch (error) {
              console.log(error);
          }
      }

    render() {
        const {handleChange, handleSubmit} = this;
        const {username, password} = this.state;

        return (
            <div className="login-page-container">
                <div className="login-form">
                    <h2>{"Let's Flix Management System"}</h2>

                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="username">Username:</Label>
                            <TextField id="username" label="Username" variant="outlined" className="material-input" name="username" required onChange={handleChange} value={username}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password:</Label>
                            <TextField id="password" type="password" label="Password" variant="outlined" className="material-input" required onChange={handleChange} value={password}/>
                        </FormGroup>
                        <FormGroup>
                            <Button type="primary" htmlType="submit" block>
                                Login
                            </Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserRole: (user) => {
            dispatch(setUserRole(user))
        }
    }
}

export default connect(null, mapDispatchToProps)(LoginPage);
