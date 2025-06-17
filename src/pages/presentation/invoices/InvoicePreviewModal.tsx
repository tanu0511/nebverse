import React from 'react';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface InvoicePreviewModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    project: any; 
}

interface Item {
    description: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    amount: number;
}

const InvoicePreviewModal: React.FC<InvoicePreviewModalProps> = ({ isOpen, setIsOpen, project }) => {
    if (!isOpen || !project) return null;

    // Example: You may want to get items, discount, etc. from project if available
    const items: Item[] = Array.isArray(project.items) ? project.items : [];
    const subTotal = typeof project.subTotal === 'number'
        ? project.subTotal
        : items.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.unitPrice)), 0);
    const discount = typeof project.discount === 'number' ? project.discount : 0;
    const discountType = project.discountType || '%';
    const discountAmount = discountType === '%' ? (subTotal * discount / 100) : discount;
    const total = typeof project.total === 'number'
        ? project.total
        : subTotal - discountAmount;

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="xl">
            <ModalHeader setIsOpen={setIsOpen}>
                <ModalTitle id="invoice-preview-title">Invoice Preview</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <div style={{ background: '#f8f9fa', padding: 24 }}>
                    {/* Recurring Details */}
                    <div style={{ border: '1px solid #eee', borderRadius: 6, marginBottom: 24, padding: 16 }}>
                        <h6 className="mb-3">Recurring Details</h6>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="text-muted small">Completed/Total Invoice</div>
                                <div className="fw-bold">{project.completedInvoices || '2/7987980'}</div>
                            </div>
                            <div className="col-md-12">
                                <div className="text-muted small">Last Invoice Date</div>
                                <div className="fw-bold">{project.lastInvoiceDate || 'Fri 02 May 2025'}</div>
                            </div>
                            <div className="col-md-12">
                                <div className="text-muted small">Next invoice Date</div>
                                <div className="fw-bold">{project.nextInvoice?.split('|')[0] || 'Fri 16 May 2025'}</div>
                            </div>
                        </div>
                    </div>

                    {/* Invoice Header */}
                    <div className="row mb-4">
                        <div className="col-md-6 d-flex align-items-center">
                            <img src="/logo192.png" alt="Logo" style={{ width: 60, height: 60, borderRadius: '50%', marginRight: 16 }} />
                            <div>
                                <div className="fw-bold">{project.companyName || 'rana'}</div>
                                <div>{project.companyName || 'rana'}</div>
                                <div>{project.companyPhone || '9691144265'}</div>
                            </div>
                        </div>
                        <div className="col-md-6 text-end">
                            <h5 className="fw-bold">INVOICE</h5>
                            <div>
                                <span className="text-muted small">Invoice Date</span>
                                <span className="ms-2 fw-bold">{project.invoiceDate ? new Date(project.invoiceDate).toDateString() : 'Fri 18 Apr 2025'}</span>
                            </div>
                            <div>
                                <span className="text-muted small">Due Date</span>
                                <span className="ms-2 fw-bold">{project.dueDate || '--'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Billed To */}
                    <div className="mb-3">
                        <span className="text-muted small">Billed To</span>
                        <div className="fw-bold">{project.client || 'Akhilesh Gupta'}</div>
                    </div>

                    {/* Items Table */}
                    <table className="table table-bordered" style={{ background: '#fff' }}>
                        <thead style={{ background: '#f5f6fa' }}>
                            <tr>
                                <th style={{ minWidth: 300 }}>Description</th>
                                <th style={{ minWidth: 150, textAlign: 'center' }}>Quantity</th>
                                <th style={{ minWidth: 180, textAlign: 'right' }}>Unit Price (INR)</th>
                                <th style={{ minWidth: 180, textAlign: 'right' }}>Amount (INR)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item: Item, idx: number) => (
                                <tr key={idx}>
                                    <td>{item.description}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <div className="fw-bold">{item.quantity}</div>
                                        <div className="text-muted small">{item.unit}</div>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>{Number(item.unitPrice).toFixed(2)}</td>
                                    <td style={{ textAlign: 'right' }}>
                                        {(Number(item.quantity) * Number(item.unitPrice)).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3} className="text-end" style={{ background: '#f5f6fa' }}>Sub Total</td>
                                <td style={{ textAlign: 'right' }}>{subTotal.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan={3} className="text-end" style={{ background: '#f5f6fa' }}>Discount</td>
                                <td style={{ textAlign: 'right' }}>
                                    {discountAmount.toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3} className="text-end" style={{ background: '#f5f6fa', fontWeight: 600 }}>Total</td>
                                <td style={{ textAlign: 'right', fontWeight: 600 }}>{total.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>

                    {/* Note and Terms */}
                    <div className="mt-4">
                        <div className="mb-2"><b>Note</b></div>
                        <div>{project.note || ''}</div>
                        <div className="mt-3 text-end">
                            <b>Terms and Conditions</b>
                            <div>Thank you for your business.</div>
                        </div>
                    </div>
                </div>
                <div className="text-end mt-3">
                    <Button color="secondary" onClick={() => setIsOpen(false)}>Close</Button>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default InvoicePreviewModal;