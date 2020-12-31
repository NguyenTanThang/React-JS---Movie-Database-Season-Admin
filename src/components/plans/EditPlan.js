import React, { Component } from 'react';
import {
    connect
} from "react-redux";
import {
    editPlan
} from "../../actions/planActions";
import {
    getPlanByID,
    editPlanAsync
} from "../../requests/planRequests";
import { Button } from 'antd';
import TextField from '@material-ui/core/TextField';
import {Form, FormGroup, Label} from 'reactstrap';
import {
    withRouter
} from "react-router-dom";

class EditPlan extends Component {

    state = {
        name: "",
        price: "",
        description: "",
        durationInDays: "",
    }

    async componentDidMount() {
        const {planID} = this.props;
        const planItem = await getPlanByID(planID);
        const {name, price, description, durationInDays} = planItem;
        this.setState({
            name, price, description, durationInDays
        }, () => {
            console.log(this.state);
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const {editPlan} = this.props;
        const {planID} = this.props;
        const {name, price, description, durationInDays} = this.state;

        //editPlan(planID, {name, price, description, durationInDays});
        const res = await editPlanAsync(planID, {name, price, description, durationInDays})
        
        if (res.data.success) {
            this.props.history.push(`/plans`);
        }
    }

    render() {
        const {handleChange, handleSubmit} = this;
        const {name, price, description, durationInDays} = this.state;

        return (
            <div>
                <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Name</Label>
                    <TextField id="name" name="name" label="Name" variant="outlined" className="material-input" required onChange={handleChange} value={name}/>
                </FormGroup>
                <FormGroup>
                    <Label>Price</Label>
                    <TextField id="price" name="price" type="number" label="Price" variant="outlined" className="material-input" required onChange={handleChange} value={price}/>
                </FormGroup>
                <FormGroup>
                    <Label>Duration In Days</Label>
                    <TextField id="durationInDays" name="durationInDays" type="number" label="Duration In Days" variant="outlined" className="material-input" required onChange={handleChange} value={durationInDays}/>
                </FormGroup>
                <FormGroup>
                    <Label>Description</Label>
                    <TextField id="description" name="description" label="Description" variant="outlined" className="material-input" required onChange={handleChange} value={description}/>
                </FormGroup>
                    <FormGroup>
                        <Button type="primary" htmlType="submit" block>
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
        editPlan: (planID, updatedPlan) => {
            dispatch(editPlan(planID, updatedPlan))
        }
    }
  }
  
export default connect(null, mapDispatchToProps)(withRouter(EditPlan));
