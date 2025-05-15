import React, { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import useSortableData from '../../../hooks/useSortableData';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import AddRecur from './AddRecurr';

interface RecurringExpense {
  id: number;
  itemName: string;
  currency: string;
  price: string;
  employee?: string;
  project?: string;
  bankAccount?: string;
  expenseCategory?: string;
  purchasedFrom?: string;
  billFrequency?: string;
  status?: string;
}

const RecurringExpense = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
  const [recurModalStatus, setRecurModalStatus] = useState<boolean>(false);
  const [recurringExpenses, setRecurringExpenses] = useState<RecurringExpense[]>([]);
  const [selectedRecur, setSelectedRecur] = useState<RecurringExpense | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredData = recurringExpenses.filter((expense) =>
    expense.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { items } = useSortableData(filteredData);

  const handleDelete = (id: number) => {
    setRecurringExpenses((prev) => prev.filter((expense) => expense.id !== id));
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
            placeholder='Search...'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchTerm(e.target.value);
            }}
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Button
            icon='Add'
            color='primary'
            isLight
            onClick={() => {
              setSelectedRecur(undefined);
              setRecurModalStatus(true);
            }}>
            Add Recurring Expense
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
                      <th>#</th>
                      <th>Item Name</th>
                      <th>Price</th>
                      <th>Employees</th>
                      <th>Next Expense</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPagination(items, currentPage, perPage).map((expense, index) => (
                      <tr key={expense.id}>
                        <td>{index + 1}</td>
                        <td>{expense.itemName}</td>
                        <td>{expense.price}</td>
                        <td>{expense.employee || 'N/A'}</td>
                        <td>{expense.billFrequency || 'N/A'}</td>
                        <td>{expense.status || 'N/A'}</td>
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
                                  setSelectedRecur(expense);
                                  setRecurModalStatus(true);
                                }}>
                                <Icon icon='Edit' className='me-2' />
                                Update
                              </Button>
                              <Button
                                color='link'
                                className='dropdown-item text-danger'
                                onClick={() => handleDelete(expense.id)}>
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
                label='Recurring Expenses'
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>
          </div>
        </div>
      </Page>

      <AddRecur
        isOpen={recurModalStatus}
        setIsOpen={setRecurModalStatus}
        selectedRecur={selectedRecur}
        onAddRecur={(newRecur) => {
          if (selectedRecur) {
            setRecurringExpenses((prev) =>
              prev.map((expense) =>
                expense.id === selectedRecur.id ? { ...expense, ...newRecur } : expense
              )
            );
          } else {
            setRecurringExpenses((prev) => [...prev, { ...newRecur, id: Date.now() }]);
          }
        }}
      />
    </PageWrapper>
  );
};

export default RecurringExpense;
