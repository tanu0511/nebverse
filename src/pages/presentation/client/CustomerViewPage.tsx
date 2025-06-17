import React, { useState } from 'react';
import { useParams} from 'react-router-dom';
// import Button from '../../../components/bootstrap/Button';
// import Invoice from './Invoice'; // Uncomment and adjust path if you have an Invoice component
import Invoices from '../invoices/Invoices'
import ProjectPage from '../project/ProjectPage'; // Import Projects component if needed
import { ProjectsProvider } from '../project/ProjectsContext'; // Adjust path as needed
import CreditNotePage from '../Finance/CreditNote';
import Payment from '../payment/Payment';
import TicketPage from '../ticket/TicketPage';
import Order from '../orders/Order';
import ContactPage from '../contact/ContactPage'; // Import ContactPage if needed
import Document from '../document/Document';
import NotePage from '../document/NotePage';
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
    gstNumber?: string;
    phoneNumber?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    companyName?: string;
    website?: string;
    taxName?: string;
    receiveEmailNotifications?: boolean;
    addedBy?: string;
    companyAddress?: string;
    shippingAddress?: string;
    note?: string;
    additionalField?: any;
}

const TABS = [
    'Profile', 'Projects', 'Invoices', 'Estimates', 'Credit Note',
    'Payments', 'Contacts', 'Documents', 'Notes', 'Tickets', 'Orders',
];

const CustomerViewPage: React.FC = () => {
    const { email } = useParams();
    // const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Profile');

    // Fetch customers from localStorage (or replace with your data source)
    const customers: Customer[] = JSON.parse(localStorage.getItem('customers') || '[]');
    const customer = customers.find((c) => c.email === email);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Client Details</h2>

            {customer ? (
                <>
                    {/* Tab Navigation */}
                    <ul className="nav nav-tabs mb-4">
                        {TABS.map((tab) => (
                            <li className="nav-item" key={tab}>
                                <button
                                    className={`nav-link${activeTab === tab ? ' active' : ''}`}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Tab Content */}
                    {activeTab === 'Profile' && (
                        <div className="card">
                            <div className="card-header fw-bold">Profile Info</div>
                            <div className="card-body">
                                {[
                                    ['Full Name', `${customer.salutation} ${customer.name}`],
                                    ['Email', customer.email],
                                    ['Company Name', customer.companyName],
                                    ['Mobile', customer.mobile],
                                    ['Gender', customer.gender ? `♂ ${customer.gender}` : '--'],
                                    ['Office Phone Number', customer.phoneNumber],
                                    ['Official Website', customer.website],
                                    ['GST/VAT Number', customer.gstNumber],
                                    ['Address', customer.companyAddress],
                                    ['State', customer.state],
                                    ['City', customer.city],
                                    ['Postal Code', customer.postalCode],
                                    ['Status', customer.status],
                                    ['Created At', customer.createdAt],
                                    ['Country', customer.country],
                                    ['Electronic Address', customer.electronicAddress],
                                    ['Note', customer.note],
                                ].map(([label, value], index) => (
                                    <div className="row mb-2" key={index}>
                                        <div className="col-5 text-muted">{label}</div>
                                        <div className="col-7">{value || '--'}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === 'Projects' && (
    <ProjectsProvider>
        <ProjectPage />
    </ProjectsProvider>
)}
                    {activeTab === 'Invoices' && (
                        <>
                            {/* <Invoice customer={customer} /> // Uncomment and use your actual Invoice component */}
                            <Invoices/>
                          
                        </>
                    )}
                      {activeTab === 'Credit Note' && (
                        <CreditNotePage/>
                      )}

                    {activeTab === 'Payments' && (
                        <Payment/>
                    )}
                    {activeTab === 'Tickets' && (
                        <TicketPage/>
                    )}
                   {
                    activeTab === 'Orders' && (
                        <Order/>
                   )}
                   {
                    activeTab === 'Contacts' &&(
                        <ContactPage/>
                    )
                   }
                  {
                    activeTab === 'Documents' &&(
                        <Document/>
                    )
                  }
                  {
                    activeTab === 'Notes' &&(
                        <NotePage/>
                    )
                  }
                    {/* Add similar blocks for other tabs if needed */}
                </>
            ) : (
                <p>No customer details available.</p>
            )}

            {/* <div className="mt-4">
                <Button color="secondary"isOutline onClick={() => navigate(-1)}>
                    Back
                </Button>
            </div> */}
        </div>
    );
};

export default CustomerViewPage;
