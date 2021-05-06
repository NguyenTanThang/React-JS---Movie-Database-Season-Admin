import React, {Component} from "react";
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import DeletePlan from "./DeletePlan";
import {parseDateMoment} from "../../utils/dateParser";
import {Link} from "react-router-dom";

class PlanList extends Component {
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
    const data = this.props.plans.map(plan => {
      plan.key = plan._id;
      return plan;
    });
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
        sorter: {
            compare: (a, b) => {
              if(a.name < b.name) { return -1; }
              if(a.name > b.name) { return 1; }
              return 0;
            },
            multiple: 3,
        },
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        sorter: {
            compare: (a, b) => {
              if(a.price < b.price) { return -1; }
              if(a.price > b.price) { return 1; }
              return 0;
            },
            multiple: 2,
        },
        render: (text) => {
          return `$${text}`
        }
      },
      {
        title: 'Duration',
        dataIndex: 'durationInDays',
        key: 'durationInDays',
        sorter: {
            compare: (a, b) => {
              if(a.durationInDays < b.durationInDays) { return -1; }
              if(a.durationInDays > b.durationInDays) { return 1; }
              return 0;
            },
            multiple: 2,
        },
        render: (text) => {
          return `${text} days`
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
                <Link to={`/plans/edit/${record._id}`} className="btn btn-warning">
                    <i className="fas fa-pen"></i>
                </Link>
                <DeletePlan planItem={record}/>
            </Space>
          )
        }
      },
    ];
    
    return (
      <Table columns={columns} loading={this.props.loading} dataSource={data} />
    )
  }
}

export default PlanList;
