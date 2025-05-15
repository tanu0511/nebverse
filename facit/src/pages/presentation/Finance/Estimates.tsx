/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import Button from '../../../components/bootstrap/Button';
import Card, { CardBody, CardHeader } from '../../../components/bootstrap/Card';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Dropdown, { DropdownToggle, DropdownMenu, DropdownItem } from '../../../components/bootstrap/Dropdown';

const Estimates = () => {
    const data = [
        {
            id: 'EST#001',
            project: '--',
            clientName: 'Akhilesh Gupta',
            clientImage: 'path/to/client-image.jpg',
            total: '₹0.00',
            validTill: 'Fri 02 May 2025',
            created: 'Wed 02 Apr 2025',
            estimateRequestNumber: '--',
            status: 'Waiting',
            statusColor: 'warning',
            action: 'Not Sent',
        },
    ];

    const [tableData] = useState(data);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    // Pagination logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <PageWrapper>
            <SubHeader>
                <SubHeaderLeft>
                    <h6>Sales List</h6>
                </SubHeaderLeft>
                <SubHeaderRight>
                    <Button color="primary" className="me-2">
                        + Create Estimate
                    </Button>
                    <Button color="secondary" className="me-2">
                        Estimate Template
                    </Button>
                    <Button color="info">Export</Button>
                </SubHeaderRight>
            </SubHeader>
            <Page container="fluid">
                <Card stretch>
                    <CardHeader>
                        <h6>Estimates</h6>
                    </CardHeader>
                    <CardBody className="table-responsive">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Estimate</th>
                                    <th>Project</th>
                                    <th>Client</th>
                                    <th>Total</th>
                                    <th>Valid Till</th>
                                    <th>Created</th>
                                    <th>Estimate Request Number</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRows.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.id}</td>
                                        <td>{row.project}</td>
                                        <td>
                                            <img
                                                src={row.clientImage}
                                                alt="Client"
                                                style={{
                                                    width: '30px',
                                                    borderRadius: '50%',
                                                    marginRight: '8px',
                                                }}
                                            />
                                            {row.clientName}
                                        </td>
                                        <td>{row.total}</td>
                                        <td>{row.validTill}</td>
                                        <td>{row.created}</td>
                                        <td>{row.estimateRequestNumber}</td>
                                        <td>
                                            <span className={`badge bg-${row.statusColor}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td>
                                            <Dropdown>
                                                <DropdownToggle>
                                                    <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem>View</DropdownItem>
                                                    <DropdownItem>Edit</DropdownItem>
                                                    <DropdownItem>Delete</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                            <span className="badge bg-secondary ms-2">{row.action}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                            <span>
                                Showing {indexOfFirstRow + 1} to{' '}
                                {Math.min(indexOfLastRow, tableData.length)} of {tableData.length}{' '}
                                entries
                            </span>
                            <div>
                                <Button
                                    className="me-2"
                                    color="secondary"
                                    size="sm"
                                    isDisable={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >
                                    Previous
                                </Button>
                                <Button
                                    color="secondary"
                                    size="sm"
                                    isDisable={indexOfLastRow >= tableData.length}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Page>
        </PageWrapper>
    );
};

export default Estimates;
