import React, { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import AddEmergencyContactModal from './AddEmergencyContactModal';
import ViewEmergencyContactModal from './ViewEmergencyContactModal';

interface EmergencyContact {
  id: number;
  name: string;
  email: string;
  mobile: string;
  relationship: string;
  address?: string;
  isSelected?: boolean;
}

const EmergencyContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [editContact, setEditContact] = useState<EmergencyContact | undefined>(undefined);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<EmergencyContact | undefined>(undefined);

  // Filter contacts by search term
  const filteredData = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.mobile && c.mobile.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.relationship && c.relationship.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination
  const paginatedContacts = dataPagination(filteredData, currentPage, perPage);

  // Select all logic
  const handleSelectAll = (isChecked: boolean) => {
    setSelectAll(isChecked);
    setContacts((prev) =>
      prev.map((c) => ({
        ...c,
        isSelected: isChecked,
      }))
    );
  };

  // Row select logic
  const handleRowSelect = (id: number, isChecked: boolean) => {
    const updatedContacts = contacts.map((c) =>
      c.id === id ? { ...c, isSelected: isChecked } : c
    );
    setContacts(updatedContacts);

    // Update the select-all checkbox state
    const allSelected = updatedContacts.every((c) => c.isSelected);
    setSelectAll(allSelected);
  };

  // Add or update contact handler
  const handleAddContact = (contact: Omit<EmergencyContact, 'id' | 'isSelected'>) => {
    if (editContact) {
      // Update
      setContacts(prev =>
        prev.map(c =>
          c.id === editContact.id
            ? { ...c, ...contact }
            : c
        )
      );
      setEditContact(undefined);
    } else {
      // Add
      setContacts(prev => [
        ...prev,
        {
          id: Date.now(),
          ...contact,
          isSelected: false,
        },
      ]);
    }
  };

  // Delete contact handler
  const handleDeleteContact = (id: number) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  return (
    <PageWrapper title="Emergency Contacts">
      <SubHeader>
        <SubHeaderLeft>
          <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
            <Icon icon="Search" size="2x" color="primary" />
          </label>
          <Input
            id="searchInput"
            type="search"
            className="border-0 shadow-none bg-transparent"
            placeholder="Search emergency contact..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Button
            icon="Add"
            color="primary"
            isLight
            onClick={() => {
              setEditContact(undefined);
              setAddModalOpen(true);
            }}
          >
            Add Emergency Contact
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
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Relationship</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedContacts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center">
                          No emergency contacts found.
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
                          <td>{contact.name}</td>
                          <td>{contact.email}</td>
                          <td>{contact.mobile}</td>
                          <td>{contact.relationship}</td>
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
                                    setViewModalOpen(true);
                                  }}
                                >
                                  <Icon icon="RemoveRedEye" className="me-2" /> View
                                </Button>
                                <Button
                                  color="link"
                                  className="dropdown-item"
                                  onClick={() => {
                                    setEditContact(contact);
                                    setAddModalOpen(true);
                                  }}
                                >
                                  <Icon icon="Edit" className="me-2" /> Edit
                                </Button>
                                <Button
                                  color="link"
                                  className="dropdown-item text-danger"
                                  onClick={() => handleDeleteContact(contact.id)}
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
              <PaginationButtons
                data={filteredData}
                label="Emergency Contacts"
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>
          </div>
        </div>
      </Page>
      <AddEmergencyContactModal
        isOpen={addModalOpen}
        setIsOpen={setAddModalOpen}
        onAddContact={handleAddContact}
        selectedContact={editContact}
      />
      <ViewEmergencyContactModal
        isOpen={viewModalOpen}
        setIsOpen={setViewModalOpen}
        contact={selectedContact}
      />
    </PageWrapper>
  );
};

export default EmergencyContactsPage;