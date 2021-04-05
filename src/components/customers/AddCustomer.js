import React, { Component } from 'react';
import {
    connect
} from "react-redux";
import {
    addCustomer
} from "../../actions/customerActions";
import {
    addCustomerAsync
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

class AddCustomer extends Component {

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
        loadingCreate: false
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
            loadingCreate: true
        })
        const {username, email, password, validated} = this.state;

        //addCustomer({email, password, validated});
        const res = await addCustomerAsync({username, email, password, validated});

        this.setState({
            loadingCreate: false
        })

        if (res.data.success) {
            this.props.history.push(`/customers/details/${res.data.data.customerItem._id}`);
        }
    }

    render() {
        const {handleChange, handleSubmit, renderCustomerStatusOptions} = this;
        const {username, email, password, validated, loadingCreate} = this.state;

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
                        <TextField id="password" name="password" type="password" label="Password" variant="outlined" className="material-input" required onChange={handleChange} value={password}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Status</Label>
                        <FormControl variant="outlined" className="material-input">
                            <InputLabel id="validated">Status</InputLabel>
                            <Select
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
                        <Button type="primary" htmlType="submit" block loading={loadingCreate}>
                            Create
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addCustomer: (newCustomer) => {
            dispatch(addCustomer(newCustomer))
        }
    }
  }
  
export default connect(null, mapDispatchToProps)(withRouter(AddCustomer));
