/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import PaginationButtons, { PER_COUNT } from '../../../components/PaginationButtons';
import Input from '../../../components/bootstrap/forms/Input';
import Icon from '../../../components/icon/Icon';
import AddLeadsForm from './AddLeadsForm'; // <-- Import your modal form
import Dropdown, { DropdownToggle, DropdownMenu, DropdownItem } from '../../../components/bootstrap/Dropdown';
import {useNavigate} from 'react-router-dom';

const Lead: React.FC = () => {
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Add this state for leads
    const [leads, setLeads] = useState<any[]>([]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);

    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [employeeModalStatus, setEmployeeModalStatus] = useState(false);

    const navigate = useNavigate();

    // Handler to add a new lead
    const handleAddLead = (lead: any) => {
        setLeads(prev => [...prev, { ...lead, id: Date.now() }]);
        setIsAddModalOpen(false);
    };

    // New handlers for view, edit, change to client, and delete


    const handleChangeToClient = (lead: any) => {
        // Change to client logic here
    };

    const handleDelete = (idx: number) => {
        setLeads(prev => prev.filter((_, i) => i !== idx));
    };

    const handleViewEmployee = (id: string | number) => {
        navigate(`/lead/view/${id}`);
    };

    // Filtered data for pagination (add search if needed)
    const filteredData = leads;

    // After updating leads (add/edit/delete), always do:
    useEffect(() => {
      localStorage.setItem('leads', JSON.stringify(leads));
    }, [leads]);

    return (
        <PageWrapper title="Lead Contacts">
            <>
                <SubHeader>
                    <SubHeaderLeft>
                        <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
                            <Icon icon="Search" size="2x" color="primary" />
                        </label>
                        <Input
                            id="searchInput"
                            type="search"
                            className="border-0 shadow-none bg-transparent"
                            placeholder="Search employee..."
                            value={searchTerm}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        />
                    </SubHeaderLeft>
                    <SubHeaderRight>
                        <Button
                            color="primary"
                            icon="PersonAdd"
                            isLight
                            onClick={() => setIsAddModalOpen(true)} // <-- Open modal
                        >
                            Add Lead Contact
                        </Button>
                        <Button color="secondary" icon="Add" isLight onClick={() => {}}>
                            Lead Form
                        </Button>
                        <Button color="primary" icon="CloudDownload" isLight onClick={() => {}}>
                            Import
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
                    </SubHeaderRight>
                </SubHeader>

                {/* AddLeadsForm Modal */}
                {isAddModalOpen && (
                    <AddLeadsForm
                        isOpen={isAddModalOpen}
                        setIsOpen={setIsAddModalOpen}
                        onClose={() => setIsAddModalOpen(false)}
                        onAddLead={handleAddLead} // Pass handler here
                        onSubmit={handleAddLead}   // Also pass for onSubmit
                        isCreateDeal={false}
                        mode="lead"
                    />
                )}

                {employeeModalStatus && (
                    <AddLeadsForm
                        isOpen={employeeModalStatus}
                        setIsOpen={setEmployeeModalStatus}
                        onClose={() => setEmployeeModalStatus(false)}
                        onAddLead={(updatedLead: any) => {
                            setLeads(prev =>
                                prev.map(l => (l.id === updatedLead.id ? { ...l, ...updatedLead } : l))
                            );
                            setEmployeeModalStatus(false);
                        }}
                        onSubmit={(updatedLead: any) => {
                            setLeads(prev =>
                                prev.map(l => (l.id === updatedLead.id ? { ...l, ...updatedLead } : l))
                            );
                            setEmployeeModalStatus(false);
                        }}
                        isCreateDeal={false}
                        mode="lead"
                        leadToEdit={selectedEmployee}
                    />
                )}

                {/* Table */}
                <div className="row h-100">
                    <div className="col-12">
                        <Card stretch>
                            <CardBody isScrollable className="table-responsive">
                                <table className="table table-modern table-hover">
                                    <thead>
                                        <tr>
                                            <th>
                                                <input
                                                    type="checkbox"
                                                    checked={selectAll}
                                                    onChange={e => setSelectAll(e.target.checked)}
                                                />
                                            </th>
                                            <th>Contact Name</th>
                                            <th>Email</th>
                                            <th>Lead Owner</th>
                                            <th>Added By</th>
                                            <th>Created</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} className="text-center">
                                                    No data available in table
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredData.map((lead, idx) => (
                                                <tr key={lead.id || idx}>
                                                    <td>
                                                        <input type="checkbox" />
                                                    </td>
                                                    <td>{lead.name}</td>
                                                    <td>{lead.email}</td>
                                                    <td>{lead.leadOwner}</td>
                                                    <td>{lead.addedBy}</td>
                                                    <td>{lead.closeDate}</td>
                                                       <td>
																			  <Dropdown>
																				<DropdownToggle hasIcon={false}>
																				  <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
																				</DropdownToggle>
																				<DropdownMenu isAlignmentEnd>
																				  <Button
																					color="link"
																					className="dropdown-item"
																					onClick={() => {navigate(`/leads/view/${lead.email}`)}}
												 
																				  >
																					<Icon icon="RemoveRedEye" className="me-2" /> View
																				  </Button>
																				  <Button
																					color="link"
																					className="dropdown-item"
																					
																				  >
																					<Icon icon="Edit" className="me-2" /> Edit
																				  </Button>
																				  <Button
																					color="link"
																					className="dropdown-item text-danger"
																					onClick={() => handleDelete(lead.id)}
																				  >
																					<Icon icon="Delete" className="me-2" /> Delete
																				  </Button>
																				</DropdownMenu>
																			  </Dropdown>
																			</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                        <PaginationButtons
                            data={filteredData}
                            label="Employees"
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            perPage={perPage}
                            setPerPage={setPerPage}
                        />
                    </div>
                </div>
            </>
        </PageWrapper>
    );
};

export default Lead;