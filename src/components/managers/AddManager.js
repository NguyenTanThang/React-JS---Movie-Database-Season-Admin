import React, { Component } from 'react';
import {
    connect
} from "react-redux";
import {
    addManager
} from "../../actions/managerActions";
import {
    addManagerAsync
} from "../../requests/managerRequests";
import {
    getAllManagerRoles
} from "../../requests/managerRoleRequests";
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

class AddManager extends Component {

    state = {
        username: "",
        password: "",
        roleID: "",
        managerRolesList: [],
        loadingCreate: false
    }

    async componentDidMount() {
        const managerRolesList = await getAllManagerRoles();
        this.setState({
            managerRolesList
        })
    }

    renderManagerRoleOptions = () => {
        const {managerRolesList} = this.state;

        return managerRolesList.map(managerRolesItem => {
            if (managerRolesItem.role === "admin") {
                return (<></>);
            }
            return (
                <MenuItem value={managerRolesItem._id}>{managerRolesItem.role}</MenuItem>
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

        const {addManager} = this.props;
        const {username, password, roleID} = this.state;

        //addManager({username, password, roleID});
        const res = await addManagerAsync({username, password, roleID})

        this.setState({
            loadingCreate: false
        })

        if (res.data) {
            if (res.data.success) {
                this.props.history.push(`/managers`);
            }
        }
    }

    render() {
        const {handleChange, handleSubmit, renderManagerRoleOptions, loadingCreate} = this;
        const {username, password, roleID} = this.state;

        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Username</Label>
                        <TextField id="username" name="username" label="Username" variant="outlined" className="material-input" required onChange={handleChange} value={username}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <TextField id="password" name="password" type="password" label="Password" variant="outlined" className="material-input" required onChange={handleChange} value={password}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Role</Label>
                        <FormControl variant="outlined" className="material-input">
                            <InputLabel id="roleID">Role</InputLabel>
                            <Select
                            labelId="roleID"
                            id="roleID"
                            name="roleID"
                            value={roleID}
                            onChange={handleChange}
                            label="Role"
                            required
                            >
                                {renderManagerRoleOptions()}
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
        addManager: (newManager) => {
            dispatch(addManager(newManager))
        }
    }
  }
  
export default connect(null, mapDispatchToProps)(withRouter(AddManager));
