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

const addresses = [
  {
    id: 1,
    location: 'rana',
    address: '201 , om gurudev plaza , Vijay nagar ,Indore(M.P.)',
    country: 'India',
    taxName: '--',
    isDefault: true,
  },
];

const BuisnessAdd = () => {
  const [search, setSearch] = React.useState('');

  const filteredAddresses = addresses.filter(addr =>
    addr.location.toLowerCase().includes(search.toLowerCase()) ||
    addr.address.toLowerCase().includes(search.toLowerCase()) ||
    addr.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageWrapper title="Business Address">
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
            placeholder="Search address..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Button color="primary" isLight>
            <Icon icon="Add" className="me-2" /> Add New Address
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
                      <th>Location</th>
                      <th >Address</th>
                      <th>Country</th>
                      <th>Tax Name</th>
                      <th>Default</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAddresses.length > 0 ? (
                      filteredAddresses.map((addr, idx) => (
                        <tr key={addr.id}>
                          <td>{idx + 1}</td>
                          <td>
                            <Icon icon="LocationOn" color="primary" className="me-1" />
                            <span className="fw-semibold">{addr.location}</span>
                          </td>
                          <td>{addr.address}</td>
                          <td>{addr.country}</td>
                          <td>{addr.taxName}</td>
                          <td>
                            {addr.isDefault && (
                              <span className="text-primary fw-semibold">
                                <Icon icon="RadioButtonChecked" className="me-1" /> Default
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
                          <div className="text-muted">No addresses found</div>
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

export default BuisnessAdd;