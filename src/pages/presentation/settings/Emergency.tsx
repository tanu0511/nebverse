/* eslint-disable react/self-closing-comp */
import React from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import Input from '../../../components/bootstrap/forms/Input';


const emergencyContacts = [
  {
    id: 1,
    name: 'Rana Kapoor',
    email: 'rana.kapoor@example.com',
    mobile: '+91 9876543210',
    relationship: 'Brother',
    isPrimary: true,
  },
  {
    id: 2,
    name: 'Neha Sharma',
    email: 'neha.sharma@example.com',
    mobile: '+91 9123456780',
    relationship: 'Friend',
    isPrimary: false,
  },
];

const Emergency = () => {
  const [search, setSearch] = React.useState('');

  const filteredContacts = emergencyContacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase()) ||
    contact.email.toLowerCase().includes(search.toLowerCase()) ||
    contact.mobile.includes(search) ||
    contact.relationship.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageWrapper title="Emergency Contacts">
      <SubHeader>
        <SubHeaderLeft>
          <label
            className="border-0 bg-transparent cursor-pointer me-0"
            htmlFor="searchInput"
          >
            <Icon icon="Search" size="2x" color="primary" />
          </label>
          <Input
            id="searchInput"
            type="search"
            className="border-0 shadow-none bg-transparent"
            placeholder="Search emergency contacts..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Button color="primary" isLight>
            <Icon icon="Add" className="me-2" /> Add Emergency Contact
          </Button>
        </SubHeaderRight>
      </SubHeader>

      <Page>
        <div className="row h-100">
          <div className="col-12">
            <Card stretch style={{ overflow: 'visible' }}>
              <CardBody className="table-responsive" style={{ overflow: 'visible' }}>
                <table className="table table-modern table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Relationship</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.length > 0 ? (
                      filteredContacts.map((contact, idx) => (
                        <tr key={contact.id}>
                          <td>{idx + 1}</td>
                          <td>
                            <Icon icon="Person" color="primary" className="me-1" />
                            <span className="fw-semibold">{contact.name}</span>
                          </td>
                          <td>{contact.email}</td>
                          <td>{contact.mobile}</td>
                          <td>{contact.relationship}</td>
                          <td>
                            {contact.isPrimary && (
                              <span className="text-primary fw-semibold">
                                <Icon icon="Star" className="me-1" /> Primary
                              </span>
                            )}
                          </td>
                          <td>
                            <Dropdown>
                              <DropdownToggle hasIcon={false}>
                                <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
                              </DropdownToggle>
                              <DropdownMenu isAlignmentEnd>
                                <Button color="link" className="dropdown-item">
                                  <Icon icon="Edit" className="me-2" /> Edit
                                </Button>
                                <Button color="link" className="dropdown-item text-danger">
                                  <Icon icon="Delete" className="me-2" /> Delete
                                </Button>
                              </DropdownMenu>
                            </Dropdown>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-4">
                          <Icon icon="SearchOff" size="2x" className="text-muted mb-2" />
                          <div className="text-muted">No emergency contacts found</div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </div>
        </div>
      </Page>
    </PageWrapper>
  );
};

export default Emergency;
