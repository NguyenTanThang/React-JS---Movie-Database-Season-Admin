import React, {Component} from "react";
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import DeleteComment from "./DeleteComment";
import {parseDateMoment} from "../../utils/dateParser";

class CommentList extends Component {
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
    const data = this.props.comments.map((comment, index) => {
      comment.key = comment._id;
      return comment;
    });
    const columns = [
      {
        title: 'Content',
        dataIndex: 'content',
        key: 'content',
        ...this.getColumnSearchProps('content'),
        sorter: {
            compare: (a, b) => {
              if(a.content < b.content) { return -1; }
              if(a.content > b.content) { return 1; }
              return 0;
            },
            multiple: 3,
        }
      },
      {
        title: 'Customer',
        dataIndex: 'customerID',
        key: 'customerID',
        ...this.getColumnSearchProps('customerID'),
        sorter: {
            compare: (a, b) => {
              if(a.customerID.username < b.customerID.username) { return -1; }
              if(a.customerID.username > b.customerID.username) { return 1; }
              return 0;
            },
            multiple: 4,
        },
        render: (text) => {
            return text.username
        }
      },
      {
        title: 'Created Date',
        dataIndex: 'created_date',
        key: 'created_date',
        sorter: {
            compare: (a, b) => {
              return new Date(a.created_date) - new Date(b.created_date);
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
              return new Date(a.last_modified_date) - new Date(b.last_modified_date);
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
              <DeleteComment commentItem={record}/>
            </Space>
          )
        }
      },
    ];

    return (
      <>
        <div className="pb-1 pt-1"></div>
        <Table columns={columns} dataSource={data} />
      </>
    )
  }
}

export default CommentList;
