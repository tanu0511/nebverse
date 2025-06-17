import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight, SubheaderSeparator } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Popovers from '../../../components/bootstrap/Popovers';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import AddExpense from './AddExpense';
import ViewExpenseModal from './ViewExpenseModal';
interface ExpenseItem {
  id: number;
  itemName: string;
  price?: string;
  employees?: string;
  purchasedFrom?: string;
  purchasedDate?: string;
  status?: string;
  paymentMethod?: string;
  notes?: string;
  category?: string;
  
}

const Expenses = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isViewExpenseOpen, setIsViewExpenseOpen] = useState(false);
const [expenseToView, setExpenseToView] = useState<ExpenseItem | null>(null);
  const [expenseToUpdate, setExpenseToUpdate] = useState<ExpenseItem | null>(null);
  const navigate = useNavigate();

  // Dynamic search filter for all relevant fields
  const filteredData = expenses.filter((item) =>
    searchTerm === '' ||
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.price && item.price.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.employees && item.employees.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.purchasedFrom && item.purchasedFrom.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.purchasedDate && item.purchasedDate.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.status && item.status.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.paymentMethod && item.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.notes && item.notes.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = (id: number) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdate = (updatedExpense: ExpenseItem) => {
    setExpenseToUpdate(updatedExpense);
    setIsAddExpenseOpen(true); // Open the modal for update
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
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Dropdown>
            <DropdownToggle hasIcon={false}>
              <Button icon='FilterAlt' color='dark' isLight className='btn-only-icon position-relative' aria-label='Filter'>
                {expenses.length !== filteredData.length && (
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
          <Button
            icon='Add'
            color='primary'
            isLight
            onClick={() => {
              setExpenseToUpdate(null); // <-- Clear previous data
              setIsAddExpenseOpen(true);
            }}
          >
            Add Expense
          </Button>
          <Button
  icon='PublishedWithChanges'
  color='primary'
  isLight
  onClick={() => navigate('/recurring-expenses')} // <-- Use lowercase and hyphen for route
>
  Recurring Expenses
</Button>
          <Button color='info' icon='CloudDownload' isLight tag='a' to='/somefile.txt' target='_blank' download>
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
                      <th>Item Name</th>
                      <th>Price</th>
                      <th>Employees</th>
                      <th>Purchased From</th>
                      <th>Purchased Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      dataPagination(filteredData, currentPage, perPage).map((i) => (
                        <tr key={i.id}>
                          <td>{i.itemName}</td>
                          <td>{i.price || 'N/A'}</td>
                          <td>{i.employee || 'N/A'}</td>
                          <td>{i.purchasedFrom || 'N/A'}</td>
                          <td>{i.purchaseDate || 'N/A'}</td>
                          <td>
                            <select
                              className="form-select"
                              value={i.status || ''}
                              onChange={e => {
                                const newStatus = e.target.value;
                                setExpenses(prev =>
                                  prev.map(exp =>
                                    exp.id === i.id ? { ...exp, status: newStatus } : exp
                                  )
                                );
                              }}
                            >
                              <option value="">--</option>
                              <option value="Approved">Approved</option>
                              <option value="Pending">Pending</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>
                          <td>
                            <Dropdown>
                              <DropdownToggle hasIcon={false}>
                                <Button icon='MoreVert' color='primary' isLight className='btn-icon' />
                              </DropdownToggle>
                              <DropdownMenu isAlignmentEnd>
                                <Button
                                  color="link"
                                  className="dropdown-item"
                                  onClick={() => {
                                    setExpenseToView(i);
                                    setIsViewExpenseOpen(true);
                                  }}
                                >
                                  <Icon icon="RemoveRedEye" className="me-2" /> View
                                </Button>
                                <Button color='link' className='dropdown-item' onClick={() => handleUpdate(i)}>
                                  <Icon icon='Edit' className='me-2' />
                                  Update
                                </Button>
                                <Button color='link' className='dropdown-item text-danger' onClick={() => handleDelete(i.id)}>
                                  <Icon icon='Delete' className='me-2' />
                                  Delete
                                </Button>
                              </DropdownMenu>
                            </Dropdown>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className='text-center'>No data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </CardBody>
              <PaginationButtons
                data={filteredData}
                label='Expenses'
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>

            <AddExpense
  isOpen={isAddExpenseOpen}
  setIsOpen={setIsAddExpenseOpen}
  onAddExpense={(newExpense) =>
    setExpenses((prev) => [{ id: Date.now(), ...newExpense }, ...prev])
  }
  onUpdateExpense={(updatedExpense) => {
    setExpenses((prev) =>
      prev.map((exp) =>
        exp.id === updatedExpense.id ? updatedExpense : exp
      )
    );
    setExpenseToUpdate(null);
  }}
  expenseToUpdate={expenseToUpdate}
/>
<ViewExpenseModal
  isOpen={isViewExpenseOpen}
  setIsOpen={setIsViewExpenseOpen}
  expense={expenseToView}
/>

          </div>
        </div>
      </Page>
    </PageWrapper>
  );
};

export default Expenses;
