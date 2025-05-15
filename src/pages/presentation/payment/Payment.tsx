/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */

import React, { useState } from 'react';
import Button from '../../../components/bootstrap/Button';
import Dropdown from '../../../components/bootstrap/Dropdown';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardActions, CardBody, CardHeader } from '../../../components/bootstrap/Card';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Select from '../../../components/bootstrap/forms/Select';
interface PaymentData {
    code: string;
    project: string;
    invoice: string;
    client: string;
    order: string;
    amount: string;
    paidOn: string;
    paymentGateway: string;
    status: string;
}


const Payment = () => {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [tableData, setTableData] = useState<PaymentData[]>([]); // Explicitly type the state
    const [formData, setFormData] = useState<PaymentData>({
        code: '',
        project: '',
        invoice: '',
        client: '',
        order: '',
        amount: '',
        paidOn: '',
        paymentGateway: '',
        status: '',
    });

    const handleOpenPaymentModal = () => {
        setIsPaymentModalOpen(true);
    };

    const handleClosePaymentModal = () => {
        setIsPaymentModalOpen(false);
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSavePayment = () => {
        setTableData((prev) => [...prev, formData]); // Add form data to table
        setFormData({
            code: '',
            project: '',
            invoice: '',
            client: '',
            order: '',
            amount: '',
            paidOn: '',
            paymentGateway: '',
            status: '',
        }); // Reset form
        setIsPaymentModalOpen(false); // Close modal
    };
    const [isBulkPaymentModalOpen, setIsBulkPaymentModalOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [viewData, setViewData] = useState<PaymentData | null>(null); // State for viewing details
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

const handleOpenBulkPaymentModal = () => {
    setIsBulkPaymentModalOpen(true);
};

const handleCloseBulkPaymentModal = () => {
    setIsBulkPaymentModalOpen(false);
};
const handleDeleteRow = (index: number) => {
    setTableData((prev) => prev.filter((_, i) => i !== index)); // Remove the row at the specified index
};
const handleViewRow = (row: PaymentData) => {
    setViewData(row); // Set the data to be viewed
    setIsViewModalOpen(true); // Open the view modal
};
const [isDropdownOpen, setIsDropdownOpen] = useState<boolean[]>([]); // State to track dropdown visibility

const toggleDropdown = (index: number) => {
    setIsDropdownOpen((prev) => {
        const newState = [...prev];
        newState[index] = !newState[index]; // Toggle the visibility for the specific index
        return newState;
    });
};
    return (
        <PageWrapper>
            <Page>
                <Card stretch data-tour="list">
                    <CardHeader>
                        <CardActions>
                            <Button
                                icon="Add"
                                color="primary"
                                onClick={handleOpenPaymentModal}
                                className="btn-icon-only"
                            >
                                Add Payment
                            </Button>
                            <Button
                                icon="Add"
                                color="primary"
                                onClick={handleOpenBulkPaymentModal}
                                className="btn-icon-only"
                            >
                                Add Bulk Payment
                            </Button>
                            <Button
                            color="info"
                            icon="CloudDownload"
                            isLight
                            tag="a"
                            to="/somefile.txt"
                            target="_blank"
                            download
                        >
                            Export
                        </Button>
                        </CardActions>
                    </CardHeader>
                    <CardBody className="table-responsive">
                        <table className="table table-modern table-hover">
                            <thead>
                                <tr>
                                   
                                    <th scope="col">Code</th>
                                    <th scope="col">Project</th>
                                    <th scope="col">Invoice#</th>
                                    <th scope="col">Client</th>
                                    <th scope="col">Order#</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Paid On</th>
                                    <th scope="col">Payment Gateway</th>
                                    <th scope="col">Status</th>
                                    <th scope="col" className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Add your table rows here */}
                                {tableData.length > 0 ? (
                                    tableData.map((row, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{row.project}</td>
                                            <td>{row.invoice}</td>
                                            <td>{row.client}</td>
                                            <td>{row.order}</td>
                                            <td>{row.amount}</td>
                                            <td>{row.paidOn}</td>
                                            <td>{row.paymentGateway}</td>
                                            <td>{row.status}</td>
                                            <td className="text-end">
    <Dropdown>
        <Button
            className="btn btn-light btn-icon-only"
            onClick={() => toggleDropdown(index)} // Toggle dropdown visibility
        >
            <i className="bi bi-three-dots"/>
        </Button>
        <div className={`dropdown-menu ${isDropdownOpen[index] ? 'show' : ''}`}>
            <button className="dropdown-item" onClick={() => handleViewRow(row)}>
                View
            </button>
            <button className="dropdown-item" onClick={() => handleDeleteRow(index)}>
                Delete
            </button>
        </div>
    </Dropdown>
</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td  className="text-center text-muted">
                                            No data available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </Page>

            {/* Always render modal, control visibility via isOpen */}
            <Modal isOpen={isPaymentModalOpen} setIsOpen={setIsPaymentModalOpen} size="lg">
                <ModalHeader setIsOpen={setIsPaymentModalOpen}>
                    <ModalTitle id="payment-details-title">Payment Details</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className="row g-3">
                        <div className="col-md-4">
                            <FormGroup label="Code">
                                <Input
                                    type="text"
                                    name="code"
                                    value={formData.code}
                                    onChange={handleInputChange}
                                    placeholder="Enter Code"
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <FormGroup label="Project">
                                <Input
                                    type="text"
                                    name="project"
                                    value={formData.project}
                                    onChange={handleInputChange}
                                    placeholder="Enter Project"
                                />
                                 </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <FormGroup label="Invoice#">
                                <Input
                                    type="text"
                                    name="invoice"
                                    value={formData.invoice}
                                    onChange={handleInputChange}
                                    placeholder="Enter Invoice#"
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <FormGroup label="Client">
                                <Input
                                    type="text"
                                    name="client"
                                    value={formData.client}
                                    onChange={handleInputChange}
                                    placeholder="Enter Client"
                                />
                                 </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <FormGroup label="Order#">
                                <Input
                                    type="text"
                                    name="order"
                                    value={formData.order}
                                    onChange={handleInputChange}
                                    placeholder="Enter Order#"
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <FormGroup label="Amount">
                                <Input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    placeholder="Enter Amount"
                                />
                                 </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <FormGroup label="Paid On">
                                <Input
                                    type="date"
                                    name="paidOn"
                                    value={formData.paidOn}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <FormGroup label="Payment Gateway">
                                <Input
                                    type="text"
                                    name="paymentGateway"
                                    value={formData.paymentGateway}
                                    onChange={handleInputChange}
                                    placeholder="Enter Payment Gateway"
                                />
                            </FormGroup>
                            </div>
                        <div className="col-md-4">
                            <FormGroup label="Status">
                                <Input
                                    type="text"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    placeholder="Enter Status"
                                />
                            </FormGroup>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={handleClosePaymentModal}>
                        Close
                    </Button>
                    <Button color="primary" onClick={handleSavePayment}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
<Modal isOpen={isBulkPaymentModalOpen} setIsOpen={setIsBulkPaymentModalOpen} size="xl">
    <ModalHeader setIsOpen={setIsBulkPaymentModalOpen}>
        <ModalTitle id="bulk-payment-title">Add Bulk Payment</ModalTitle>
    </ModalHeader>
    <ModalBody>
        <div className="row">
            <div className="col-md-3">
                <FormGroup label="Filter invoices by client">
                    <Select ariaLabel="Filter invoices by client">
                        <option>--</option>
                        <option>Client A</option>
                        <option>Client B</option>
                    </Select>
                </FormGroup>
            </div>
            <div className="col-md-3">
                <FormGroup label="Select Payment Method">
                    <Select ariaLabel="Select Payment Method">
                        <option>--</option>
                        <option>Method A</option>
                        <option>Method B</option>
                    </Select>
                </FormGroup>
            </div>
        </div>
        <div className="table-responsive mt-4">
            <table className="table table-modern table-hover">
                <thead>
                    <tr>
                        <th scope="col">Invoice Number#</th>
                        <th scope="col">Payment Date*</th>
                        <th scope="col">Payment Method</th>
                        <th scope="col">Offline Payment Methods</th>
                        <th scope="col">Bank Account</th>
                        <th scope="col">Transaction ID</th>
                        <th scope="col">Amount Received*</th>
                        <th scope="col">Invoice Balance Due</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center">
                            <i className="bi bi-database fs-4 text-muted"></i>
                            <p className="text-muted mt-2">- No record found. -</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </ModalBody>
    <ModalFooter>
        <Button color="secondary" onClick={handleCloseBulkPaymentModal}>
            Cancel
        </Button>
    </ModalFooter>
</Modal>
        </PageWrapper>
    );
};

export default Payment;
