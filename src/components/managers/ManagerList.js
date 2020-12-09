import React, {Component} from "react";
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {parseDateMoment} from "../../utils/dateParser";
import {Link} from "react-router-dom";
import DeleteManager from "./DeleteManager"

class ManagerList extends Component {
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
    const data = this.props.managers.map(manager => {
        manager.key = manager._id;
      return manager;
    });
    const columns = [
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        ...this.getColumnSearchProps('username'),
        sorter: {
            compare: (a, b) => {
              if(a.username < b.username) { return -1; }
              if(a.username > b.username) { return 1; }
              return 0;
            },
            multiple: 3,
        },
      },
      {
        title: 'Role',
        dataIndex: 'roleID',
        key: 'roleID',
        ...this.getColumnSearchProps('roleID'),
        sorter: {
            compare: (a, b) => {
              if(a.roleID.role < b.roleID.role) { return -1; }
              if(a.roleID.role > b.roleID.role) { return 1; }
              return 0;
            },
            multiple: 2,
        },
        render: (text) => {
            return text.role
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
                <Link to={`/managers/edit/${record._id}`} className="btn btn-warning">
                    <i className="fas fa-pen"></i>
                </Link>
                <DeleteManager managerItem={record}/>
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

export default ManagerList;
