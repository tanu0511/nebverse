/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState,useEffect } from 'react';
import Input from '../../../components/bootstrap/forms/Input';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../components/bootstrap/Button';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../../components/bootstrap/Modal';

const VendorDetailsPage: React.FC = () => {
    const location = useLocation();
    const [history] = useState<{ id: number; date: { day: string; month: string }; title: string; description: string; user: string; timeAgo: string; detailsLink?: string }[]>([]); // State for history
    const navigate = useNavigate();
    const vendor = location.state?.vendor; // Retrieve vendor data from state

    const [notes, setNotes] = useState<{ id: number; title: string; type: string; detail: string }[]>([]); // State for notes
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [newNote, setNewNote] = useState({ title: '', type: 'Public', detail: '' }); // State for the new note
     const [contacts, setContacts] = useState<{ id: number; title: string; name: string; email: string; phone: string; created: string }[]>([]); // State for contacts
    const [isContactModalOpen, setIsContactModalOpen] = useState(false); // State to control contact modal visibility
    const [newContact, setNewContact] = useState({ title: '', name: '', email: '', phone: '', created: '' }); // State for the new contact
    const [purchaseOrders, setPurchaseOrders] = useState<{ id: number; orderNumber: string; vendor: string; purchaseDate: string; expectedDate: string; totalAmount: string; billedStatus: string; deliveryStatus: string }[]>([]); // State for purchase orders
    const [isPurchaseOrderModalOpen, setIsPurchaseOrderModalOpen] = useState(false); // State to control purchase order modal visibility
    const [newPurchaseOrder, setNewPurchaseOrder] = useState<{ orderNumber: string; vendor: string; purchaseDate: string; expectedDate: string; totalAmount: string; billedStatus: string; deliveryStatus: string; product: string; note: string; terms: string; file?: File }>({ orderNumber: '', vendor: '', purchaseDate: '', expectedDate: '', totalAmount: '', billedStatus: '', deliveryStatus: '', product: '', note: '', terms: '' }); // State for the new purchase order
    const [bills, setBills] = useState<{ id: number; billNumber: string; vendor: string; billDate: string; total: string; status: string; purchaseOrder?: string }[]>([]); // State for bills
    const [isBillModalOpen, setIsBillModalOpen] = useState(false); // State to control bill modal visibility
    const [newBill, setNewBill] = useState<{ billNumber: string; vendor: string; billDate: string; total: string; status: string; purchaseOrder: string; note: string; file?: File }>({ billNumber: '', vendor: '', billDate: '', total: '', status: '', purchaseOrder: '', note: '' }); // State for the new bill
    const [payments, setPayments] = useState<{ id: number; vendorName: string; paidOn: string; amount: string }[]>([]); // State for payments
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // State to control payment modal visibility
    const [newPayment, setNewPayment] = useState({ vendorName: '', paidOn: '', amount: '' }); // State for the new payment

    const handleAddPayment = () => {
        setPayments((prevPayments) => [
            ...prevPayments,
            { id: prevPayments.length + 1, ...newPayment },
        ]);
        setNewPayment({ vendorName: '', paidOn: '', amount: '' }); // Reset the form
        setIsPaymentModalOpen(false); // Close the modal
    };

    const handleDeletePayment = (id: number) => {
        setPayments((prevPayments) => prevPayments.filter((payment) => payment.id !== id));
    };

     const handleAddBill = () => {
        setBills((prevBills) => [
            ...prevBills,
            { id: prevBills.length + 1, ...newBill },
        ]);
        setNewBill({ billNumber: '', vendor: '', billDate: '', total: '', status: '', purchaseOrder: '', note: '' }); // Reset the form
        setIsBillModalOpen(false); // Close the modal
    };

    const handleDeleteBill = (id: number) => {
        setBills((prevBills) => prevBills.filter((bill) => bill.id !== id));
    };
    const handleAddPurchaseOrder = () => {
    setPurchaseOrders((prevOrders) => [
        ...prevOrders,
        {
            id: prevOrders.length + 1,
            orderNumber: newPurchaseOrder.orderNumber,
            vendor: newPurchaseOrder.vendor,
            purchaseDate: newPurchaseOrder.purchaseDate,
            expectedDate: newPurchaseOrder.expectedDate,
            totalAmount: newPurchaseOrder.totalAmount,
            billedStatus: newPurchaseOrder.billedStatus,
            deliveryStatus: newPurchaseOrder.deliveryStatus,
        },
    ]);
    setNewPurchaseOrder({ orderNumber: '', vendor: '', purchaseDate: '', expectedDate: '', totalAmount: '', billedStatus: '', deliveryStatus: '', product: '', note: '', terms: '' }); // Reset the form
    setIsPurchaseOrderModalOpen(false); // Close the modal
};

    const handleDeletePurchaseOrder = (id: number) => {
        setPurchaseOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    };

     const handleExportPurchaseOrders = () => {
        const csvContent = [
            ['Order Number', 'Vendor', 'Purchase Date', 'Expected Date', 'Total Amount', 'Billed Status', 'Delivery Status'],
            ...purchaseOrders.map((order) => [order.orderNumber, order.vendor, order.purchaseDate, order.expectedDate, order.totalAmount, order.billedStatus, order.deliveryStatus]),
        ]
            .map((row) => row.join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'purchase_orders.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

     const handleAddContact = () => {
    setContacts((prevContacts) => [
        ...prevContacts,
        { id: prevContacts.length + 1, ...newContact, created: new Date().toLocaleString() },
    ]);
    setNewContact({ title: '', name: '', email: '', phone: '', created: '' }); // Reset the form
    setIsContactModalOpen(false); // Close the modal
};

    const handleExportContacts = () => {
        const csvContent = [
            ['Title', 'Name', 'Email', 'Phone', 'Created'],
            ...contacts.map((contact) => [contact.title, contact.name, contact.email, contact.phone, contact.created]),
        ]
            .map((row) => row.join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'contacts.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

  const handleAddNote = () => {
    setNotes((prevNotes) => [
        ...prevNotes,
        { id: prevNotes.length + 1, ...newNote },
    ]);
    setNewNote({ title: '', type: 'Public', detail: '' }); // Reset the form
    setIsModalOpen(false); // Close the modal
};

    const handleDeleteNote = (id: number) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    };

    const handleDeleteContact = (id: number) => {
        setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
    }

    if (!vendor) {
        return (
            <div className="container mt-4">
                <h4>No Vendor Selected</h4>
                <Button color="primary" onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            </div>
        );
    }
    //  const [notes, setNotes] = useState<{ id: number; title: string; type: string; detail: string }[]>([]);

    // Load notes from localStorage on component mount
    useEffect(() => {
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
        }
    }, []);

    // Save notes to localStorage whenever they change
    useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);
    useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);
    useEffect(() => {
    localStorage.setItem('purchaseOrders', JSON.stringify(purchaseOrders));
    }, [purchaseOrders]);
    useEffect(() => {
    localStorage.setItem('bills', JSON.stringify(bills));
}, [bills]);
useEffect(() => {
    localStorage.setItem('payments', JSON.stringify(payments));
}, [payments]);
   

    return (
        <div className="container mt-4">
        {/* Add a little space between the tab buttons */}
        <style>
            {`
                #vendor-details-tabs .nav-link {
                    margin-right: 8px;
                }
                #vendor-details-tabs .nav-link:last-child {
                    margin-right: 0;
                }
            `}
        </style>
        <Tabs defaultActiveKey="overview" id="vendor-details-tabs" className="mb-3">
            <Tab eventKey="overview" title="Overview">
                <div className="row">
                    <div className="col-md-12">
                        <Card>
                            <CardHeader>
                                <CardLabel>
                                    <CardTitle>{vendor.primaryName}</CardTitle>
                                </CardLabel>
                            </CardHeader>
                            <CardBody>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6>Company Name</h6>
                                        <p>{vendor.companyName || '--'}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h6>Email</h6>
                                        <p>{vendor.email || '--'}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h6>Phone</h6>
                                        <p>{vendor.phone || '--'}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h6>Official Website</h6>
                                        <p>{vendor.website || '--'}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h6>Opening Balance</h6>
                                        <p>{vendor.openingBalance || '₹0.00'}</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </Tab>
            <Tab eventKey="notes" title="Notes">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Button color="primary" isLight onClick={() => setIsModalOpen(true)}>
                        + Add Note
                    </Button>
                </div>
                <table className="table table-modern table-hover">
                    <thead>
                        <tr>
                            <th>Note Title</th>
                            <th>Note Type</th>
                            <th>Note Detail</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes.length > 0 ? (
                            notes.map((note) => (
                                <tr key={note.id}>
                                    <td>{note.title}</td>
                                    <td>{note.type}</td>
                                    <td>{note.detail}</td>
                                    <td>
                                        <Button
                                            color="danger"
                                            size="sm"
                                            onClick={() => handleDeleteNote(note.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center">
                                    No data available in table
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Tab>
            <Tab eventKey="contacts" title="Contacts">
                 <div className="d-flex justify-content-between align-items-center mb-3">
                    <Button color="primary" isLight onClick={() => setIsContactModalOpen(true)}>
                        + Add Contact
                    </Button>
                    <Button color="info" isLight onClick={handleExportContacts}>
                        Export
                    </Button>
                </div>
                <table className="table table-modern table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Created</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.length > 0 ? (
                            contacts.map((contact) => (
                                <tr key={contact.id}>
                                    <td>{contact.title}</td>
                                    <td>{contact.name}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.phone}</td>
                                    <td>{contact.created}</td>
                                    <td>
                                        <Button
                                            color="danger"
                                            size="sm"
                                            onClick={() => handleDeleteContact(contact.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center">
                                    No data available in table
                                </td>
                            </tr>
                        )}
                         </tbody>
                </table>
            </Tab>
            <Tab eventKey="purchaseOrders" title="Purchase Orders">
                 <div className="d-flex justify-content-between align-items-center mb-3">
                    <Button color="primary" isLight onClick={() => setIsPurchaseOrderModalOpen(true)}>
                        + Add Order
                    </Button>
                    <Button color="info" isLight onClick={handleExportPurchaseOrders}>
                        Export
                    </Button>
                </div>
                  <table className="table table-modern table-hover">
                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>Vendor</th>
                            <th>Purchase Date</th>
                            <th>Expected Date</th>
                            <th>Total Amount</th>
                            <th>Billed Status</th>
                            <th>Delivery Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchaseOrders.length > 0 ? (
                            purchaseOrders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.orderNumber}</td>
                                    <td>{order.vendor}</td>
                                    <td>{order.purchaseDate}</td>
                                    <td>{order.expectedDate}</td>
                                    <td>{order.totalAmount}</td>
                                    <td>{order.billedStatus}</td>
                                    <td>{order.deliveryStatus}</td>
                                    <td>
                                        <Button
                                            color="danger"
                                            size="sm"
                                            onClick={() => handleDeletePurchaseOrder(order.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center">
                                    No data available in table
                                </td>
                                    </tr>
                        )}
                    </tbody>
                </table>
            </Tab>
            <Tab eventKey="bills" title="Bills">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Button color="primary" isLight onClick={() => setIsBillModalOpen(true)}>
                        + Create Bill
                    </Button>
                </div>
                <table className="table table-modern table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Purchase Bill Number</th>
                            <th>Vendor</th>
                            <th>Bill Date</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.length > 0 ? (
                            bills.map((bill) => (
                                <tr key={bill.id}>
                                    <td>{bill.id}</td>
                                    <td>{bill.billNumber}</td>
                                    <td>{bill.vendor}</td>
                                    <td>{bill.billDate}</td>
                                    <td>{bill.total}</td>
                                    <td>{bill.status}</td>
                                    <td>
                                        <Button
                                            color="danger"
                                            size="sm"
                                            onClick={() => handleDeleteBill(bill.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center">
                                    No data available in table
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Tab>
            <Tab eventKey="payments" title="Payments">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Button color="primary" isLight onClick={() => setIsPaymentModalOpen(true)}>
                        + Add Vendor Payment
                    </Button>
                </div>
                <table className="table table-modern table-hover">
                    <thead>
                        <tr>
                            <th>D T Row Index</th>
                            <th>Vendor Name</th>
                            <th>Paid On</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length > 0 ? (
                            payments.map((payment) => (
                                <tr key={payment.id}>
                                    <td>{payment.id}</td>
                                    <td>{payment.vendorName}</td>
                                    <td>{payment.paidOn}</td>
                                    <td>{payment.amount}</td>
                                    <td><Button
                                            color="danger"
                                            size="sm"
                                            onClick={() => handleDeletePayment(payment.id)}
                                        >
                                            Delete
                                        </Button></td>
                                        </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">
                                    No data available in table
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Tab>
            <Tab eventKey="history" title="History">
                <div className="mt-3">
        {history.length > 0 ? (
            history.map((event) => (
                <Card key={event.id} className="mb-3">
                    <CardBody>
                        <div className="d-flex align-items-center">
                            <div className="me-3">
                                <div className="text-center">
                                    <h5 className="mb-0">{event.date.day}</h5>
                                    <small>{event.date.month}</small>
                                </div>
                            </div>
                            <div>
                                <h6 className="mb-1">{event.title}</h6>
                                <p className="mb-1">{event.description}</p>
                                <small className="text-muted">
                                    {event.user} - {event.timeAgo}
                                </small>
                                {event.detailsLink && (
                                    <a href={event.detailsLink} className="ms-2">
                                        View Details
                                    </a>
                                )}
                            </div>
                        </div>
                    </CardBody>
                     </Card>
            ))
        ) : (
            <p className="text-center">No history available.</p>
        )}
    </div>
            </Tab>
        </Tabs>

            {/* Add Note Modal */}
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalHeader>Add Vendor Note</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Note Title *</label>
                        <Input
                            type="text"
                            value={newNote.title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewNote({ ...newNote, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Note Type</label>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="type"
                                    value="Public"
                                    checked={newNote.type === 'Public'}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewNote({ ...newNote, type: e.target.value })}
                                />{' '}
                                Public
                            </label>
                            <label className="ms-3">
                                <input
                                    type="radio"
                                    name="type"
                                    value="Private"
                                    checked={newNote.type === 'Private'}
                                    onChange={(e) => setNewNote({ ...newNote, type: e.target.value })}
                                />{' '}
                                Private
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Note Detail</label>
                        <textarea
                            className="form-control"
                            value={newNote.detail}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewNote({ ...newNote, detail: e.target.value })}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleAddNote}>
                        Save
                    </Button>
                    <Button color="secondary" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={isContactModalOpen} setIsOpen={setIsContactModalOpen} onClose={() => setIsContactModalOpen(false)}>
                <ModalHeader>Add Contact</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Title</label>
                        <Input
                            type="text"
                            placeholder="e.g. Manager"
                            value={newContact.title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewContact({ ...newContact, title: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Contact Name *</label>
                        <Input
                            type="text"
                            placeholder="e.g. John Doe"
                            value={newContact.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewContact({ ...newContact, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email *</label>
                        <Input
                            type="email"
                            placeholder="e.g. johndoe@example.com"
                            value={newContact.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewContact({ ...newContact, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <Input
                            type="text"
                            placeholder="e.g. 1234567890"
                            value={newContact.phone}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewContact({ ...newContact, phone: e.target.value })}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleAddContact}>
                        Save
                    </Button>
                    <Button color="secondary" onClick={() => setIsContactModalOpen(false)}>
                        Cancel
                    </Button>
                    </ModalFooter>
            </Modal>
            <Modal isOpen={isPurchaseOrderModalOpen} setIsOpen={setIsPurchaseOrderModalOpen} onClose={() => setIsPurchaseOrderModalOpen(false)}>
    <ModalHeader>Add Purchase Order</ModalHeader>
    <ModalBody>
        <div className="form-group">
            <label>Order Number</label>
            <Input
                type="text"
                placeholder="e.g. PO12345"
                value={newPurchaseOrder.orderNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPurchaseOrder({ ...newPurchaseOrder, orderNumber: e.target.value })}
            />
        </div>
        <div className="form-group">
            <label>Vendor</label>
            <Input
                type="text"
                placeholder="e.g. Vendor Name"
                value={newPurchaseOrder.vendor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPurchaseOrder({ ...newPurchaseOrder, vendor: e.target.value })}
            />
        </div>
        <div className="form-group">
            <label>Purchase Date</label>
            <Input
                type="date"
                value={newPurchaseOrder.purchaseDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPurchaseOrder({ ...newPurchaseOrder, purchaseDate: e.target.value })}
            />
        </div>
        <div className="form-group">
            <label>Expected Date</label>
            <Input
                type="date"
                value={newPurchaseOrder.expectedDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPurchaseOrder({ ...newPurchaseOrder, expectedDate: e.target.value })}
            />
        </div>
        <div className="form-group">
            <label>Total Amount</label>
            <Input
                type="text"
                placeholder="e.g. 1000.00"
                value={newPurchaseOrder.totalAmount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPurchaseOrder({ ...newPurchaseOrder, totalAmount: e.target.value })}
            />
        </div>
        <div className="form-group">
            <label>Billed Status</label>
            <Input
                type="text"
                placeholder="e.g. Billed/Unbilled"
                value={newPurchaseOrder.billedStatus}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPurchaseOrder({ ...newPurchaseOrder, billedStatus: e.target.value })}
            />
        </div>
        <div className="form-group">
            <label>Delivery Status</label>
            <Input
                type="text"
                placeholder="e.g. Delivered/Pending"
                value={newPurchaseOrder.deliveryStatus}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPurchaseOrder({ ...newPurchaseOrder, deliveryStatus: e.target.value })}
            />
        </div>
        <div className="form-group">
            <label>Select Product</label>
            <Input
                type="text"
                placeholder="e.g. Product Name"
                value={newPurchaseOrder.product}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPurchaseOrder({ ...newPurchaseOrder, product: e.target.value })}
            />
        </div>

        {/* Add Item Section */}
        <div className="form-group mt-3">
            <Button color="link" onClick={() => console.log('Add Item clicked')}>
                + Add Item
            </Button>
        </div>

        {/* Note for the Recipient */}
        <div className="form-group">
            <label>Note for the Recipient</label>
            <textarea
                className="form-control"
                placeholder="e.g. Thank you for your business"
                value={newPurchaseOrder.note || ''}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewPurchaseOrder({ ...newPurchaseOrder, note: e.target.value })}
            />
        </div>

        {/* Terms and Conditions */}
        <div className="form-group">
            <label>Terms and Conditions</label>
            <textarea
                className="form-control"
                placeholder="e.g. Payment due within 30 days"
                value={newPurchaseOrder.terms || ''}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewPurchaseOrder({ ...newPurchaseOrder, terms: e.target.value })}
            />
        </div>

        {/* Add File */}
        <div className="form-group">
            <label>Add File</label>
            <Input
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        setNewPurchaseOrder({ ...newPurchaseOrder, file });
                    }
                }}
            />
        </div>
    </ModalBody>
    <ModalFooter>
        <Button color="primary" onClick={handleAddPurchaseOrder}>
            Save
        </Button>
        <Button color="secondary" onClick={() => setIsPurchaseOrderModalOpen(false)}>
            Cancel
        </Button>
    </ModalFooter>
</Modal>
<Modal isOpen={isBillModalOpen} setIsOpen={setIsBillModalOpen} onClose={() => setIsBillModalOpen(false)}>
    <ModalHeader>Bill</ModalHeader>
    <ModalBody>
        <div className="form-group">
            <label>Bill Number *</label>
            <Input
                type="text"
                placeholder="e.g. BL#001"
                value={newBill.billNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewBill({ ...newBill, billNumber: e.target.value })}
                required
            />
        </div>
        <div className="form-group">
            <label>Select Vendor *</label>
            <Input
                type="text"
                placeholder="e.g. Vendor Name"
                value={newBill.vendor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewBill({ ...newBill, vendor: e.target.value })}
                required
            />
        </div>
        <div className="form-group">
            <label>Bill Date *</label>
            <Input
                type="date"
                value={newBill.billDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewBill({ ...newBill, billDate: e.target.value })}
                required
            />
        </div>
        <div className="form-group">
            <label>Purchase Order</label>
            <select
                className="form-control"
                value={newBill.purchaseOrder || ''}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewBill({ ...newBill, purchaseOrder: e.target.value })}
            >
                <option value="">--</option>
                {purchaseOrders.map((order) => (
                    <option key={order.id} value={order.orderNumber}>
                        {order.orderNumber}
                    </option>
                ))}
            </select>
        </div>
        <div className="form-group">
            <label>Note for the Recipient</label>
            <textarea
                className="form-control"
                placeholder="e.g. Thank you for your business"
                value={newBill.note || ''}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewBill({ ...newBill, note: e.target.value })}
            />
        </div>
        <div className="form-group">
            <label>Add File</label>
            <Input
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        setNewBill({ ...newBill, file });
                    }
                }}
            />
        </div>
    </ModalBody>
    <ModalFooter>
        <Button color="primary" onClick={handleAddBill}>
            Save
        </Button>
        <Button color="secondary" onClick={() => setIsBillModalOpen(false)}>
            Cancel
        </Button>
    </ModalFooter>
</Modal>
<Modal isOpen={isPaymentModalOpen} setIsOpen={setIsPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)}>
    <ModalHeader>Add Payment</ModalHeader>
    <ModalBody>
        <div className="form-group">
            <label>Vendor *</label>
            <select
                className="form-control"
                value={newPayment.vendorName}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewPayment({ ...newPayment, vendorName: e.target.value })}
                required
            >
                <option value="">Select Vendor</option>
                {bills.map((bill) => (
                    <option key={bill.id} value={bill.vendor}>
                        {bill.vendor}
                    </option>
                ))}
            </select>
        </div>

        <h5 className="mt-4">Bill Details</h5>
        <table className="table table-modern table-hover">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Bill</th>
                    <th>Purchase Order</th>
                    <th>Bill Amount</th>
                    <th>Amount Due</th>
                    <th>Payment</th>
                </tr>
            </thead>
            <tbody>
                {bills.length > 0 ? (
                    bills
                        .filter((bill) => bill.vendor === newPayment.vendorName)
                        .map((bill) => (
                            <tr key={bill.id}>
                                <td>{bill.billDate}</td>
                                <td>{bill.billNumber}</td>
                                <td>{bill.purchaseOrder || '--'}</td>
                                <td>{bill.total}</td>
                                <td>{bill.total}</td>
                                <td>
                                    <Input
                                        type="text"
                                        placeholder="Enter Payment"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            console.log(`Payment for Bill ${bill.billNumber}: ${e.target.value}`)
                                        }
                                    />
                                </td>
                            </tr>
                        ))
                ) : (
                    <tr>
                        <td colSpan={6} className="text-center">
                            - There are No Bills for the selected vendor -
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </ModalBody>
    <ModalFooter>
        <Button color="primary" onClick={handleAddPayment}>
            Save
        </Button>
        <Button color="secondary" onClick={() => setIsPaymentModalOpen(false)}>
            Cancel
        </Button>
    </ModalFooter>
</Modal>

        </div>
    );
};

export default VendorDetailsPage;