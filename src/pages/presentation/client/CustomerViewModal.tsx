import React from 'react';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

// Define the Customer interface
interface Customer {

    salutation: string;
    name: string;
    email: string;
    country: string;
    mobile: string;
    createdAt: string;
    gender: string;
    language: string;
    clientCategory: string;
    clientSubCategory: string;
    loginAllowed: boolean;
    status: string;
    electronicAddress: string;
    // electronicAddress: string; // Add missing property
    gstNumber?: string; // Add missing fields
    phoneNumber?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    companyName?: string;
    website?: string;
    taxName?: string;
    receiveEmailNotifications?: boolean;
    addedBy?: string; // Add missing property
    companyAddress?: string;
    shippingAddress?: string;
    note?: string;
    additionalField?: any; // Add missing property
}

interface CustomerViewModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    customer: Customer | null;
}

const CustomerViewModal: React.FC<CustomerViewModalProps> = ({ isOpen, setIsOpen, customer }) => {
    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="lg">
            <ModalHeader>
                <ModalTitle id="client-details-title">Client Details</ModalTitle>
            </ModalHeader>
            <ModalBody>
                {customer ? (
                    <>
                        {/* Tab Navigation */}
                        <ul className="nav nav-tabs mb-4">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Projects</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Invoices</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Estimates</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Credit Note</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Payments</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Contacts</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Documents</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Notes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Tickets</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Orders</a>
                            </li>
                        </ul>
                        {/* Profile Info Card */}
                        <div className="card mb-0">
                            <div className="card-header fw-bold">Profile Info</div>
                            <div className="card-body">
                                <div className="row mb-2">
                                    <div className="col-5 text-muted">Full Name</div>
                                    <div className="col-7">{customer.salutation} {customer.name}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-5 text-muted">Email</div>
                                    <div className="col-7">{customer.email}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-5 text-muted">Company Name</div>
                                    <div className="col-7">{customer.companyName || '--'}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-5 text-muted">Mobile</div>
                                    <div className="col-7">{customer.mobile}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-5 text-muted">Gender</div>
                                    <div className="col-7">{customer.gender ? <>♂ {customer.gender}</> : '--'}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-5 text-muted">Office Phone Number</div>
                                    <div className="col-7">{customer.phoneNumber || '--'}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-5 text-muted">Official Website</div>
                                    <div className="col-7">{customer.website || '--'}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-5 text-muted">GST/VAT Number</div>
                                    <div className="col-7">{customer.gstNumber || '--'}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-5 text-muted">Address</div>
                                    <div className="col-7">{customer.companyAddress || '--'}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-5 text-muted">State</div>
                                    <div className="col-7">{customer.state || '--'}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-5 text-muted">City</div>
                                    <div className="col-7">{customer.city || '--'}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-5 text-muted">Postal code</div>
                                    <div className="col-7">{customer.postalCode || '--'}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-5 text-muted">Status</div>
                                    <div className="col-7">{customer.status || '--'}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-5 text-muted">Created At</div>
                                    <div className="col-7">{customer.createdAt || '--'}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-5 text-muted">Country</div>
                                    <div className="col-7">{customer.country || '--'}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-5 text-muted">Electronic Address</div>
                                    <div className="col-7">{customer.electronicAddress || '--'}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-5 text-muted">Note</div>
                                    <div className="col-7">{customer.note || '--'}</div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>No customer details available.</p>
                )}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => setIsOpen(false)}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default CustomerViewModal;