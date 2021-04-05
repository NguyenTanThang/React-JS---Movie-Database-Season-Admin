import React, { Component } from 'react';
import {
    connect
} from "react-redux";
import {
    editCustomer
} from "../../actions/customerActions";
import {
    editCustomerAsync
} from "../../requests/customerRequests";
import {
    getCustomerByID
} from "../../requests/customerRequests";
import { Button } from 'antd';
import TextField from '@material-ui/core/TextField';
import {Form, FormGroup, Label} from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
    withRouter
} from "react-router-dom";

class EditCustomer extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        validated: "",
        customerStatusList: [
            {
                value: true,
                text: "Valid"
            },
            {
                value: false,
                text: "Not valid"
            }
        ],
        loadingUpdate: false
    }

    async componentDidMount() {
        const {customerID} = this.props;
        const customer = await getCustomerByID(customerID);
        const {email, validated, username} = customer.customerItem;
        this.setState({
            email, validated, username
        }, () => {
            console.log(this.state);
        })
    }

    renderCustomerStatusOptions = () => {
        const {customerStatusList} = this.state;

        return customerStatusList.map(customerStatusItem => {
            return (
                <MenuItem value={customerStatusItem.value}>{customerStatusItem.text}</MenuItem>
            )
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({
            loadingUpdate: true
        })

        const {editCustomer} = this.props;
        const {customerID} = this.props;
        const {email, password, validated, username} = this.state;

        //editCustomer(customerID, {email, password, validated});
        const res = await editCustomerAsync(customerID, {username, email, password, validated});

        this.setState({
            loadingUpdate: false
        })

        if (res.data.success) {
            this.props.history.push(`/customers/details/${customerID}`);
        }
    }

    render() {
        const {handleChange, handleSubmit, renderCustomerStatusOptions} = this;
        const {email, password, validated, username, loadingUpdate} = this.state;

        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Username</Label>
                        <TextField type="text" id="username" name="username" label="Username" variant="outlined" className="material-input" required onChange={handleChange} value={username}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <TextField type="email" id="email" name="email" label="Email" variant="outlined" className="material-input" required onChange={handleChange} value={email}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <TextField id="password" name="password" type="password" label="Leave empty if you want to keep the current password" variant="outlined" className="material-input" onChange={handleChange} value={password}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Status</Label>
                        <FormControl variant="outlined" className="material-input">
                            <InputLabel id="validated">Status</InputLabel>
                            <Select
                            defaultValue={validated}
                            labelId="validated"
                            id="validated"
                            name="validated"
                            value={validated}
                            onChange={handleChange}
                            label="Status"
                            required
                            >
                                {renderCustomerStatusOptions()}
                            </Select>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <Button type="primary" htmlType="submit" block loading={loadingUpdate}>
                            Save
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editCustomer: (customerID, updatedCustomer) => {
            dispatch(editCustomer(customerID, updatedCustomer))
        }
    }
  }
  
export default connect(null, mapDispatchToProps)(withRouter(EditCustomer));
