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


interface Award {
  id: number;
  name: string;
  parentDepartment?: string;
  date?: string;
  summary?: string;
}

const Payroll = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
  const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
  const [awards, setAwards] = useState<Award[]>([]);
  const [filteredAwards, setFilteredAwards] = useState<Award[]>(awards); // New state for filtered awards
  const [selectedAward, setSelectedAward] = useState<Award | undefined>(undefined);

  const { items } = useSortableData(filteredAwards); // Use filteredAwards for sorting and pagination

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filtered = awards.filter((award) =>
      award.name.toLowerCase().includes(value) || // Search by name
      (award.parentDepartment && award.parentDepartment.toLowerCase().includes(value)) // Search by category
    );
    setFilteredAwards(filtered); // Update filteredAwards dynamically
  };

  const handleDelete = (id: number) => {
    setAwards((prev) => prev.filter((award) => award.id !== id));
    setFilteredAwards((prev) => prev.filter((award) => award.id !== id)); // Update filteredAwards
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
            onChange={handleSearch} // Call handleSearch on input change
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Dropdown>
            <DropdownToggle hasIcon={false}>
              <Button icon='FilterAlt' color='dark' isLight className='btn-only-icon position-relative' aria-label='Filter'>
                {awards.length !== filteredAwards.length && (
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
          
        </SubHeaderRight>
      </SubHeader>

      <Page>
	  <div className="row mb-4">
    <div className="col-12">
      <Card>
        <CardBody>
          <h4 className="mb-4 fw-bold">Generate Payroll</h4>
          <div className="row g-3">
            <div className="col-md-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="includeExpenseClaims"
                />
                <label className="form-check-label" htmlFor="includeExpenseClaims">
                  Include Expense Claims
                </label>
              </div>
            </div>
			<div className="col-md-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="addTimelogsToSalary"
                />
                <label className="form-check-label" htmlFor="addTimelogsToSalary">
                  Add timelogs to salary
                </label>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="useAttendance"
                />
                <label className="form-check-label" htmlFor="useAttendance">
                  Use Attendance
                  <Popovers desc="Use attendance data for payroll" trigger="hover">
                    <Icon icon="Info" size="sm" className="ms-1" />
                  </Popovers>
                </label>
              </div>
            </div>
          </div>
		  <div className="row g-3 mt-3">
            <div className="col-md-4">
              <label htmlFor="departmentSelect" className="form-label">
                Department
              </label>
              <select className="form-select" id="departmentSelect">
                <option>--</option>
                <option>HR</option>
                <option>Finance</option>
                <option>Engineering</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="employeeSelect" className="form-label">
                Select Employee
                <Popovers desc="Select an employee for payroll" trigger="hover">
                  <Icon icon="Info" size="sm" className="ms-1" />
                </Popovers>
              </label>
              <select className="form-select" id="employeeSelect">
                <option>Nothing selected</option>
                <option>John Doe</option>
                <option>Jane Smith</option>
                <option>Michael Brown</option>
              </select>
            </div>
			<div className="col-md-2 d-flex align-items-end">
              <Button color="primary" icon="Send" className="w-75">
                Generate
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  </div>

        <div className='row h-100'>
          <div className='col-12'>
            <Card stretch>
              <CardBody isScrollable className='table-responsive'>
                <table className='table table-modern table-hover'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Net Salary</th>
                      <th>CTC</th>
                      <th>Duration</th>
                      <th>Paid On</th>
                      <th>Status</th>
                      <th>Action</th>

                    </tr>
                  </thead>
                  <tbody>
                    {dataPagination(items, currentPage, perPage).map((i) => (
                      <tr key={i.id}>
                        <td>{i.name}</td>
                        <td>{i.parentDepartment || 'N/A'}</td>
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
                                  setSelectedAward(i);
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
                data={filteredAwards} // Use filteredAwards for pagination
                label='Payroll'
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>
          </div>
        </div>
      </Page>

      {/* ✅ AddAward Modal */}
      
    </PageWrapper>
  );
};

export default Payroll;
