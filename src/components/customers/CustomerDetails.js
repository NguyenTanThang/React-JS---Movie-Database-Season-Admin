import React, { Component } from 'react';
import { Descriptions } from 'antd';
import {convertKeyToText, checkIfIn} from "../../utils/utils";
import SubscriptionList from "../subscriptions/SubscriptionList";

const restrictedKeys = [
    "__v",
    "_id",
    "password",
    "stripeCustomerID"
]

class CustomerDetails extends Component {

    renderCustomerDescriptionItems = () => {
        const {customerItem, subscriptions} = this.props;
        const currentCustomer = customerItem.customerItem;
        console.log(currentCustomer);
        let descriptionItems = [];

        for (var property in currentCustomer) {
            if (currentCustomer.hasOwnProperty(property)) {
                if (checkIfIn(property, restrictedKeys)) {
                    continue;
                }
                
              const label = convertKeyToText(property);
              const content = String(currentCustomer[property]);
              const key = `cd-${property}`

              descriptionItems.push(
                <Descriptions.Item key={key} span={2} label={label}>{content}</Descriptions.Item>
              )
            }
        }

        descriptionItems.push(
            <Descriptions.Item key={`cd-subscriptions`} label="Subscriptions" span={3}>
                <SubscriptionList subscriptions={subscriptions}/>
            </Descriptions.Item>
        );

        return descriptionItems;
    }

    render() {
        const {renderCustomerDescriptionItems} = this;

        return (
            <Descriptions title="Customer Details" layout="vertical" bordered>
                {renderCustomerDescriptionItems()}
            </Descriptions>
        )
    }
}

export default CustomerDetails;
