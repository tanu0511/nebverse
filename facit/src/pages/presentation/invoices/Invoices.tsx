/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
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
// import CustomerEditModal from './CreateInvoiceModal';
import CreateInvoiceModal from './CreateInvoiceModal';
import CreateTimeLogInvoice from './CreateTimeLogInvoice';
import PaginationButtons from '../../../components/PaginationButtons';

const Invoices: React.FC = () => {
    const [invoiceData, setInvoiceData] = useState<any[]>([]); // State for table data
    const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
    const [timeLogModalStatus, setTimeLogModalStatus] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);
    const [selectedInvoice, setSelectedInvoice] = useState<any>(null); // State for selected invoice (for editing)

    // Filtered data for pagination
    const filteredData = invoiceData.slice(
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

    const handleSaveInvoice = (invoice: any) => {
        if (selectedInvoice) {
            // Edit existing invoice
            setInvoiceData((prev) =>
                prev.map((item) =>
                    item.id === selectedInvoice.id ? { ...selectedInvoice, ...invoice } : item
                )
            );
        } else {
            // Add new invoice
            setInvoiceData((prev) => [
                ...prev,
                { id: Date.now(), ...invoice }, // Add a unique ID
            ]);
        }
        setEditModalStatus(false); // Close the modal
        setSelectedInvoice(null); // Reset selected invoice
    };

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
                        icon="Add"
                        color="primary"
                        isLight
                        onClick={() => {
                            setSelectedInvoice(null); // Reset selected invoice for new entry
                            setEditModalStatus(true);
                        }}
                    >
                        Create Invoice
                    </Button>
                    <Button
                        icon="Add"
                        color="primary"
                        isLight
                        onClick={() => setTimeLogModalStatus(true)} // Open TimeLog modal
                    >
                        Create TimeLog Invoice
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
                                            <th>Invoice Number</th>
                                            <th>Invoice Date</th>
                                            <th>Due Date</th>
                                            <th>Client</th>
                                            <th>Project</th>
                                            <th>Total</th>
                                            <th>Payment Gateway</th>
                                            <th>Transaction ID</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.length > 0 ? (
                                            filteredData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.invoiceNumber || 'N/A'}</td>
                                                    <td>{item.invoiceDate || 'N/A'}</td>
                                                    <td>{item.dueDate || 'N/A'}</td>
                                                    <td>{item.client || 'N/A'}</td>
                                                    <td>{item.project || 'N/A'}</td>
                                                    <td>{item.total || 'N/A'}</td>
                                                    <td>{item.paymentGateway || 'N/A'}</td>
                                                    <td>{item.transactionId || 'N/A'}</td>
                                                    <td>{item.status || 'Pending'}</td>
                                                    <td>
                                                        <Button
                                                            icon="Edit"
                                                            color="primary"
                                                            isLight
                                                            onClick={() => {
                                                                setSelectedInvoice(item); // Set selected invoice for editing
                                                                setEditModalStatus(true);
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={10} className="text-center">
                                                    No data available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </CardBody>
                            <PaginationButtons
                                data={invoiceData}
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
            <CreateInvoiceModal
                setIsOpen={setEditModalStatus}
                isOpen={editModalStatus}
                onSave={handleSaveInvoice} // Pass the save handler
                defaultValues={selectedInvoice} // Pass selected invoice for editing
            />
            <CreateTimeLogInvoice
                setIsOpen={setTimeLogModalStatus}
                isOpen={timeLogModalStatus}
            />
        </PageWrapper>
    );
};

export default Invoices;