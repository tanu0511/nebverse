import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Deals from '../deals/Deals';
import NotePage from '../document/NotePage';
const TABS = [
    'Profile', 'Deals', 'Notes'
];

interface Lead {
    name: string;
    email: string;
    source?: string;
    companyName?: string;
    website?: string;
    mobile?: string;
    phoneNumber?: string;
    country?: string;
    state?: string;
    city?: string;
    postalCode?: string;
    address?: string;
    addedBy?: string;
    leadOwner?: string;
    createdAt?: string;
    note?: string;
    // Add any other lead-specific fields here
}

const LeadViewPage: React.FC = () => {
    const { email } = useParams();
    const [activeTab, setActiveTab] = useState('Profile');

    // Fetch leads from localStorage (or replace with your data source)
    const leads: Lead[] = JSON.parse(localStorage.getItem('leads') || '[]');
    const lead = leads.find((l) => l.email === email);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Lead Details</h2>

            {lead ? (
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
                                    ['Name', lead.name],
                                    ['Email', lead.email],
                                    ['Added By', lead.addedBy],
                                    ['Lead Owner', lead.leadOwner],
                                    ['Source', lead.source],
                                    ['Company Name', lead.companyName],
                                    ['Website', lead.website],
                                    ['Mobile', lead.mobile],
                                    ['Office Phone Number', lead.phoneNumber],
                                    ['Country', lead.country],
                                    ['State', lead.state],
                                    ['City', lead.city],
                                    ['Postal code', lead.postalCode],
                                    ['Address', lead.address],
                                    ['Created At', lead.createdAt],
                                    ['Note', lead.note],
                                ].map(([label, value], index) => (
                                    <div className="row mb-2" key={index}>
                                        <div className="col-5 text-muted">{label}</div>
                                        <div className="col-7">{value || '--'}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === 'Deals' && (
                        <div>
                          <Deals/>
                        </div>
                    )}
                    {activeTab === 'Notes' && (
                        <div>
                           <NotePage/>
                        </div>
                    )}
                </>
            ) : (
                <p>No lead details available.</p>
            )}
        </div>
    );
};

export default LeadViewPage;
