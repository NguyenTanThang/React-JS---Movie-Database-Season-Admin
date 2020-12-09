import React, {Component} from "react";
import { Table, Input, Button, Space, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {parseDateMoment} from "../../utils/dateParser";
import {Link} from "react-router-dom";
import DeleteCustomer from "./DeleteCustomer"

class CustomerList extends Component {
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
    onFilter: (value, record) => {
        if (dataIndex === "roleID") {
            return record[dataIndex].role
            ? record[dataIndex].role.toString().toLowerCase().includes(value.toLowerCase())
            : ''
        }
        return record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : ''
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text, record) => {
        if (dataIndex === "roleID") {
            console.log(record);
        }
        return this.state.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[this.state.searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          )
    }
      ,
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
    const data = this.props.customers.map(customer => {
        customer.customerItem.key = customer.customerItem._id;
        return customer.customerItem;
    });
    const columns = [
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        ...this.getColumnSearchProps('email'),
        sorter: {
            compare: (a, b) => {
              if(a.email < b.email) { return -1; }
              if(a.email > b.email) { return 1; }
              return 0;
            },
            multiple: 4,
        },
        render: (text) => {
          return <a href={`mailto:${text}`} alt={text}>{text}</a>
        }
      },
      {
        title: 'Status',
        dataIndex: 'validated',
        key: 'validated',
        sorter: {
            compare: (a, b) => {
              if(a.validated < b.validated) { return -1; }
              if(a.validated > b.validated) { return 1; }
              return 0;
            },
            multiple: 3,
        },
        render: (text) => {
            if (text) {
                return <Tag color="green">Valid</Tag>
            }
            return <Tag color="red">Not valid</Tag>
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
        title: 'Last Modified',
        dataIndex: 'last_modified_date',
        key: 'last_modified_date',
        sorter: {
            compare: (a, b) => {
              return new Date(b.last_modified_date) - new Date(a.last_modified_date);
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
                <Link to={`/customers/details/${record._id}`} className="btn btn-primary">
                    <i className="fas fa-eye"></i>
                </Link>
                <Link to={`/customers/edit/${record._id}`} className="btn btn-warning">
                    <i className="fas fa-pen"></i>
                </Link>
                <DeleteCustomer customerItem={record}/>
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

export default CustomerList;
