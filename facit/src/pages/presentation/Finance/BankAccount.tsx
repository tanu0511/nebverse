/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight, SubheaderSeparator } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import useSortableData from '../../../hooks/useSortableData';
import Popovers from '../../../components/bootstrap/Popovers';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import AddBank from '../Finance/AddBank'; // Import the AddBank modal

interface Bank {
  id: number;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  accountType: string;
  currency: string;
  contactNumber: string;
  openingBalance: string;
  status: string;
  type: string;
  cashLocation?: string;
}

const BankAccountList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
  const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState<Bank | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredData = banks.filter((bank) =>
    bank.bankName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bank.accountHolderName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { items } = useSortableData(filteredData);

  const handleDelete = (id: number) => {
    setBanks((prev) => prev.filter((bank) => bank.id !== id));
  };

  return (
    <PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text}>
      <SubHeader>
        <SubHeaderLeft>
          <label className='border-0 bg-transparent cursor-pointer me-0' htmlFor='searchInput'>
            <Icon icon='Search' size='2x' color='primary' />
          </label>
          <Input
            id='searchInput'
            type='search'
            className='border-0 shadow-none bg-transparent'
            placeholder='Search..'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Dropdown>
            <DropdownToggle hasIcon={false}>
              <Button icon='FilterAlt' color='dark' isLight className='btn-only-icon position-relative' aria-label='Filter'>
                {banks.length !== filteredData.length && (
                  <Popovers desc='Filtering applied' trigger='hover'>
                    <span className='position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2'>
                      <span className='visually-hidden'>Filtering applied</span>
                    </span>
                  </Popovers>
                )}
              </Button>
            </DropdownToggle>
            <DropdownMenu isAlignmentEnd size='lg'>
              <div className='container py-2'>
                <div className='row g-3'>
                  <FormGroup label='Filter options' className='col-12'>
                    <p>Custom filters can go here.</p>
                  </FormGroup>
                </div>
              </div>
            </DropdownMenu>
          </Dropdown>
          <SubheaderSeparator />
          <Button icon='Add' color='primary' isLight onClick={() => {
            setSelectedBank(undefined);
            setEditModalStatus(true);
          }}>
            Add Bank Account
          </Button>
          <Button
            color='info'
            icon='CloudDownload'
            isLight
            tag='a'
            to='/somefile.txt'
            target='_blank'
            download>
            Export
          </Button>
        </SubHeaderRight>
      </SubHeader>

      <Page>
        <div className='row h-100'>
          <div className='col-12'>
            <Card stretch>
              <CardBody isScrollable className='table-responsive'>
                <table className='table table-modern table-hover'>
                  <thead>
                    <tr>
                      <th>Bank</th>
                      <th>Account Holder Name</th>
                      <th>Account Type</th>
                      <th>Type</th>
                      <th>Currency</th>
                      <th>Bank Balance</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPagination(items, currentPage, perPage).map((i) => (
                      <tr key={i.id}>
                        <td>{i.bankName}</td>
                        <td>{i.accountHolderName}</td>
                        <td>{i.accountType}</td>
                        <td>{i.type}</td>
                        <td>{i.currency}</td>
                        <td>{i.openingBalance}</td>
                        <td>{i.status}</td>
                        <td>
                          <Dropdown>
                            <DropdownToggle hasIcon={false}>
                              <Button icon='MoreVert' color='primary' isLight className='btn-icon' />
                            </DropdownToggle>
                            <DropdownMenu isAlignmentEnd>
                              <Button
                                color='link'
                                className='dropdown-item'
                                onClick={() => {
                                  setSelectedBank(i);
                                  setEditModalStatus(true);
                                }}>
                                <Icon icon='Edit' className='me-2' />
                                Update
                              </Button>
                              <Button
                                color='link'
                                className='dropdown-item text-danger'
                                onClick={() => handleDelete(i.id)}>
                                <Icon icon='Delete' className='me-2' />
                                Delete
                              </Button>
                            </DropdownMenu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
              <PaginationButtons
                data={filteredData}
                label='Banks'
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>
          </div>
        </div>
      </Page>

      <AddBank
        isOpen={editModalStatus}
        setIsOpen={setEditModalStatus}
        onAddBank={(newBank) => {
          if (selectedBank) {
            // Update case
            setBanks((prev) =>
              prev.map((bank) => (bank.id === selectedBank.id ? { ...bank, ...newBank } : bank))
            );
          } else {
            // Add new case
            setBanks((prev) => [...prev, { ...newBank, id: Date.now() }]);
          }
        }}
      />
    </PageWrapper>
  );
};

export default BankAccountList;
