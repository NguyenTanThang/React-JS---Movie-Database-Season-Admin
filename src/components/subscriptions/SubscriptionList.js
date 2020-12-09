import React, {Component} from "react";
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import DeleteSubscription from "./DeleteSubscription";
import {parseDateMoment} from "../../utils/dateParser";

class SubscriptionList extends Component {
  state = {
    searchText: '',
    searchedColumn: '',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const data = this.props.subscriptions.map(subscription => {
    subscription.key = subscription._id;
      return subscription;
    });
    const columns = [
      {
        title: 'Email',
        dataIndex: 'customerID',
        key: 'customerID',
        sorter: {
            compare: (a, b) => {
              if(a.customerID.email < b.customerID.email) { return -1; }
              if(a.customerID.email > b.customerID.email) { return 1; }
              return 0;
            },
            multiple: 3,
        },
        render: (record) => {
          if (!record) {
            return "Non-existing User"
          }
          let text = record.email
          return <a href={`mailto:${text}`} alt={text}>{text}</a>
        }
      },
      {
        title: 'Plan',
        dataIndex: 'planID',
        key: 'planID',
        sorter: {
            compare: (a, b) => {
              if(a.name < b.name) { return -1; }
              if(a.name > b.name) { return 1; }
              return 0;
            },
            multiple: 2,
        },
        render: (record) => {
          return record.name
        }
      },
      {
        title: 'Created Date',
        dataIndex: 'created_date',
        key: 'created_date',
        sorter: {
            compare: (a, b) => {
              return new Date(b.created_date) - new Date(a.created_date);
            },
            multiple: 2,
        },
        render: (text) => {
          return parseDateMoment(text)
        }
      },
      {
        title: 'Ended Date',
        dataIndex: 'ended_date',
        key: 'ended_date',
        sorter: {
            compare: (a, b) => {
              return new Date(b.ended_date) - new Date(a.ended_date);
            },
            multiple: 1,
        },
        render: (text) => {
          return parseDateMoment(text)
        }
      },
      {
        title: 'Actions',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          return (
            <Space>
                <DeleteSubscription subItem={record}/>
            </Space>
          )
        }
      },
    ];
    
    return (
      <Table columns={columns} dataSource={data} />
    )
  }
}

export default SubscriptionList;
