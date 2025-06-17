/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import useSortableData from '../../../hooks/useSortableData';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';
import AddContactModal from './AddContactModal'; // Import your modal
import ViewContactModal from './ViewContactModal'; // Add this import

interface Contact {
    id: number;
    title: string;
    name: string;
    email: string;
    phone: string;
    created: string;
    isSelected?: boolean;
}

const ContactPage: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
    const [addContactModalOpen, setAddContactModalOpen] = useState(false);
    const [viewContactModalOpen, setViewContactModalOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

    // Filter contacts by search term
    const filteredContacts = contacts.filter(
        (c) =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.phone.includes(searchTerm) ||
            c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sorting support
    const { items, requestSort, getClassNamesFor } = useSortableData(filteredContacts);

    // Pagination
    const paginatedContacts = dataPagination(items, currentPage, perPage);

    // Select all logic
    const handleSelectAll = (checked: boolean) => {
        setSelectAll(checked);
        setContacts((prev) =>
            prev.map((c) => ({
                ...c,
                isSelected: checked,
            }))
        );
    };

    // Row select logic
    const handleRowSelect = (id: number, checked: boolean) => {
        setContacts((prev) =>
            prev.map((c) => (c.id === id ? { ...c, isSelected: checked } : c))
        );
        // Update selectAll checkbox if all rows are selected
        const allSelected = contacts.length > 0 && contacts.every((c) => c.id === id ? checked : c.isSelected);
        setSelectAll(allSelected);
    };

    // Handle save from AddContactModal
    const handleAddContact = (data: Omit<Contact, 'id' | 'created'>) => {
        setContacts((prev) => [
            ...prev,
            {
                ...data,
                id: Date.now(),
                created: new Date().toDateString(),
            },
        ]);
    };

    return (
        <PageWrapper title="Contacts List">
            <SubHeader>
                <SubHeaderLeft>
                    <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
                        <Icon icon="Search" size="2x" color="primary" />
                    </label>
                    <Input
                        id="searchInput"
                        type="search"
                        className="border-0 shadow-none bg-transparent"
                        placeholder="Search contact..."
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    />
                </SubHeaderLeft>
                <SubHeaderRight>
                    <Button
                        color="primary"
                        icon="PersonAdd"
                        isLight
                        onClick={() => setAddContactModalOpen(true)}
                    >
                        Add Contact
                    </Button>
                    <Button color="info" icon="CloudDownload" isLight>
                        Export
                    </Button>
                </SubHeaderRight>
            </SubHeader>
            <Page>
                <div className="row h-100">
                    <div className="col-12">
                        <Card stretch>
                            <CardBody className='table-responsive' style={{ overflow: 'visible' }}>
                                <table className="table table-modern table-hover">
                                    <thead>
                                        <tr>
                                            <th>
                                                <input
                                                    type="checkbox"
                                                    checked={selectAll}
                                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                                />
                                            </th>
                                            <th >
                                                Title 
                                            </th>
                                            <th>
                                                Name
                                            </th>
                                            <th >
                                                Email   </th>
                                            <th>
                                                Phone 
                                            </th>
                                            <th >
                                                Created 
                                            </th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedContacts.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} className="text-center">
                                                    No contacts found.
                                                </td>
                                            </tr>
                                        ) : (
                                            paginatedContacts.map((contact) => (
                                                <tr key={contact.id}>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            checked={!!contact.isSelected}
                                                            onChange={(e) => handleRowSelect(contact.id, e.target.checked)}
                                                        />
                                                    </td>
                                                    <td>{contact.title}</td>
                                                    <td>{contact.name}</td>
                                                    <td>{contact.email}</td>
                                                    <td>{contact.mobile}</td>
                                                    <td>{contact.created}</td>
                                                    <td>
                                                        <Dropdown>
                                                            <DropdownToggle hasIcon={false}>
                                                                <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
                                                            </DropdownToggle>
                                                            <DropdownMenu isAlignmentEnd>
                                                                <Button
                                                                    color="link"
                                                                    className="dropdown-item"
                                                                    onClick={() => {
                                                                        setSelectedContact(contact);
                                                                        setViewContactModalOpen(true);
                                                                    }}
                                                                >
                                                                    <Icon icon="RemoveRedEye" className="me-2" /> View
                                                                </Button>
                                                                <Button color="link" className="dropdown-item">
                                                                    <Icon icon="Edit" className="me-2" /> Update
                                                                </Button>
                                                                <Button color="link" className="dropdown-item text-danger">
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
                                <PaginationButtons
                                    data={items}
                                    label="Contacts"
                                    setCurrentPage={setCurrentPage}
                                    currentPage={currentPage}
                                    perPage={perPage}
                                    setPerPage={setPerPage}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </Page>
            <AddContactModal
                isOpen={addContactModalOpen}
                setIsOpen={setAddContactModalOpen}
                onAddContact={handleAddContact}
            />
            <ViewContactModal
                isOpen={viewContactModalOpen}
                setIsOpen={setViewContactModalOpen}
                contact={selectedContact ?? undefined}
            />
        </PageWrapper>
    );
};

export default ContactPage;