/* eslint-disable prettier/prettier */
import React from "react";
import { Modal, ModalBody } from "reactstrap";

interface Customer {
    contractNumber: string;
    startDate: string;
    endDate: string;
    contractType: string;
    subject: string;
    notes: string;
    officePhone: string;
    description: string;
    currency: string;
    contractValue: number | string | null;
    clientName: string;
    client: string;
    companyName: string;
    phoneNumber: string;
    logoUrl?: string; // ← dynamic image URL bhi chala sake
}

interface PublicProps {
    isOpen: boolean;
    toggle: () => void;
    customer: Customer | null; // ← null safe banaya
}

const Public: React.FC<PublicProps> = ({ isOpen, toggle, customer }) => {
    if (!customer) return null; // agar customer nahi hai to modal show nahi kare

    const formattedContractValue = Number(customer.contractValue ?? 0).toFixed(2);

    return (
        <Modal isOpen={isOpen} toggle={toggle} size="xl" centered>
            <ModalBody>
                <div className="d-flex flex-wrap justify-content-between">
                    {/* Left Section */}
                    <div style={{ flex: "1 1 40%", minWidth: "300px" }}>
                        <img
                            src={customer.logoUrl || "/default-logo.png"}
                            alt="Logo"
                            style={{
                                width: "80%",
                                maxWidth: "150px",
                                height: "auto",
                                objectFit: "contain",
                                marginBottom: "1rem",
                            }}
                        />
                        <p><strong>Client Name:</strong> {customer.client || "No Client Name Available"}</p>
                        <p><strong>Company Name:</strong> {customer.companyName}</p>
                        <p><strong>Office Phone Number:</strong> {customer.officePhone}</p>


                    </div>

                    {/* Right Section */}
                    <div style={{ flex: "1 1 55%", minWidth: "300px" }}>
                        <h4 className="fw-bold text-end">CONTRACT</h4>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td><strong>Contract Number</strong></td>
                                    <td>{customer.contractNumber}</td>
                                </tr>
                                <tr>
                                    <td><strong>Start Date</strong></td>
                                    <td>{customer.startDate}</td>
                                </tr>
                                <tr>
                                    <td><strong>End Date</strong></td>
                                    <td>{customer.endDate}</td>
                                </tr>
                                <tr>
                                    <td><strong>Contract Type</strong></td>
                                    <td>{customer.contractType}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <hr />

                {/* Subject, Notes, Description */}
                <div className="mt-4">
                    <h5>Subject</h5>
                    <p>{customer.subject}</p>

                    <h5>Notes</h5>
                    <p>{customer.notes}</p>

                    <h5>Description</h5>
                    {customer.description}
                </div>

                {/* Contract Value */}
                <div className="text-end mt-4">
                    <h5>
                        Contract Value: {customer.currency} {formattedContractValue}
                    </h5>
                </div>


                {/* Cancel Button */}
                <div className="d-flex justify-content-end mt-4">
                    <button className="btn btn-secondary" onClick={toggle}>
                        Cancel
                    </button>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default Public;