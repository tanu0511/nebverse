/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import CustomerEditModal from '../Finance/CustomerEditModal';
import PaginationButtons from '../../../components/PaginationButtons';

const EInvoice: React.FC = () => {
    // Temporary data for demonstration
    const employeeData = [
        {
            code: '001',
            invoice: 'INV-001',
            project: 'Project A',
            client: 'Client X',
            total: '$1000',
            invoiceDate: '2023-01-01',
            status: 'Paid',
        },
        {
            code: '002',
            invoice: 'INV-002',
            project: 'Project B',
            client: 'Client Y',
            total: '$2000',
            invoiceDate: '2023-02-01',
            status: 'Pending',
        },
    ];

    const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);

    // Filtered data for pagination
    const filteredData = employeeData.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    const formik = useFormik({
        initialValues: {
            searchInput: '',
        },
        onSubmit: (values) => {
            console.log('Search submitted:', values);
        },
    });
    
    return (
        <PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text}>
            <SubHeader>
                <SubHeaderLeft>
                    <label
                        className="border-0 bg-transparent cursor-pointer me-0"
                        htmlFor="searchInput"
                        aria-label="Search"
                    >
                        <Icon icon="Search" size="2x" color="primary" />
                    </label>
                    <Input
                        id="searchInput"
                        type="search"
                        className="border-0 shadow-none bg-transparent"
                        placeholder="Search.."
                        onChange={formik.handleChange}
                        value={formik.values.searchInput}
                    />
                </SubHeaderLeft>
                <SubHeaderRight>
                    <Button
                        icon="FilterAlt"
                        color="primary"
                        isLight
                        className="btn-only-icon position-relative"
                        aria-label="Filter"
                    />
                    <Button
                        icon="Settings"
                        color="primary"
                        isLight
                        onClick={() => setEditModalStatus(true)}
                    >
                        Setting
                    </Button>
                    <Button
                        color="primary"
                        icon="CloudDownload"
                        isLight
                        tag="a"
                        to="/somefile.txt"
                        target="_blank"
                        download
                    >
                        Export
                    </Button>
                </SubHeaderRight>
            </SubHeader>
            <Page>
                <div className="row h-100">
                    <div className="col-12">
                        <Card stretch>
                            <CardBody isScrollable className="table-responsive">
                                <table className="table table-modern table-hover">
                                    <thead>
                                        <tr>
                                            <th>Code</th>
                                            <th>Invoice</th>
                                            <th>Project</th>
                                            <th>Client</th>
                                            <th>Total</th>
                                            <th>Invoice Date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.length > 0 ? (
                                            filteredData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item?.code || 'N/A'}</td>
                                                    <td>{item?.invoice || 'N/A'}</td>
                                                    <td>{item?.project || 'N/A'}</td>
                                                    <td>{item?.client || 'N/A'}</td>
                                                    <td>{item?.total || 'N/A'}</td>
                                                    <td>{item?.invoiceDate || 'N/A'}</td>
                                                    <td>{item?.status || 'N/A'}</td>
                                                    <td>
                                                        <Button
                                                            icon="Edit"
                                                            color="primary"
                                                            isLight
                                                            onClick={() => setEditModalStatus(true)}
                                                        >
                                                            Edit
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={8} className="text-center">
                                                    No data available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </CardBody>
                            <PaginationButtons
                                data={employeeData}
                                label="items"
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                                perPage={perPage}
                                setPerPage={setPerPage}
                            />
                        </Card>
                    </div>
                </div>
            </Page>
            <CustomerEditModal
                setIsOpen={setEditModalStatus}
                isOpen={editModalStatus}
            />
        </PageWrapper>
    );
};

export default EInvoice;
