import React, { Component } from 'react';
import { Pagination } from 'antd';

class PaginationComponent extends Component {

    render() {
        const {pageObject, total, onChangePageNumber} = this.props;
        const {pageSize, currentPage} = pageObject;

        return (
            <Pagination
                total={total}
                pageSize={pageSize}
                defaultCurrent={currentPage}
                showQuickJumper
                onChange={onChangePageNumber}
                showTotal={total => `Total ${total} items`}
            />
        )
    }
}

export default PaginationComponent;
