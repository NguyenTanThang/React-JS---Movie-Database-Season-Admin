import React, { Component } from 'react';
import {
    connect
} from "react-redux";
import {
    editManager
} from "../../actions/managerActions";
import {
    getAllManagerRoles
} from "../../requests/managerRoleRequests";
import {
    editManagerAsync
} from "../../requests/managerRequests";
import {
    getManagerByID
} from "../../requests/managerRequests";
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

class EditManager extends Component {

    state = {
        username: "",
        password: "",
        roleID: "",
        managerRolesList: [],
        loadingUpdate: false
    }

    async componentDidMount() {
        const managerRolesList = await getAllManagerRoles();
        const {managerID} = this.props;
        const managerItem = await getManagerByID(managerID);
        const {username, roleID} = managerItem;
        this.setState({
            managerRolesList,
            username, roleID: roleID._id
        }, () => {
            console.log(this.state);
        })
    }

    renderManagerRoleOptions = () => {
        const {managerRolesList} = this.state;

        return managerRolesList.map(managerRolesItem => {
            return (
                <MenuItem key={managerRolesItem._id} value={managerRolesItem._id}>{managerRolesItem.role}</MenuItem>
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

        const {editManager} = this.props;
        const {managerID} = this.props;
        const {username, password, roleID} = this.state;

        //editManager(managerID, {username, password, roleID});
        const res = await editManagerAsync(managerID, {username, password, roleID});

        this.setState({
            loadingUpdate: false
        })

        if (res.data.success) {
            this.props.history.push(`/managers`);
        }
    }

    render() {
        const {handleChange, handleSubmit, renderManagerRoleOptions} = this;
        const {username, password, roleID, loadingUpdate} = this.state;

        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Username</Label>
                        <TextField id="username" name="username" label="Username" variant="outlined" className="material-input" required onChange={handleChange} value={username}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <TextField id="password" name="password" type="password" label="Leave empty if you want to keep the current password" variant="outlined" className="material-input" onChange={handleChange} value={password}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Role</Label>
                        <FormControl variant="outlined" className="material-input">
                            <InputLabel id="roleID">Role</InputLabel>
                            <Select
                            defaultValue={roleID}
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
        editManager: (managerID, updatedManager) => {
            dispatch(editManager(managerID, updatedManager))
        }
    }
  }
  
export default connect(null, mapDispatchToProps)(withRouter(EditManager));
