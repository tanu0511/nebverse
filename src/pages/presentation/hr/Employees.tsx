import React, { useState,useEffect } from 'react';
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
import AddEmployee from './AddEmployee';
import ViewEmployeeModal from './ViewEmployeeModal';
import FilterModal from './FilterModal'; // Import the FilterModal component
import { Employee } from './Employee';

const Employees = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
  const [employeeModalStatus, setEmployeeModalStatus] = useState<boolean>(false);
  const [viewModalStatus, setViewModalStatus] = useState<boolean>(false);
  const [filterModalStatus, setFilterModalStatus] = useState<boolean>(false); // State for Filter Modal
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>(undefined);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [masterEmployeeList, setMasterEmployeeList] = useState<Employee[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<string[]>(['IT', 'HR', 'Finance']); // State for departments
  const [designations] = useState<string[]>(['Manager', 'Developer', 'Designer']); // State for designations

// Fetch employees from API on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8000/api/v1/employee/employees', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('API DATA:', data);
        setEmployees(Array.isArray(data) ? data : []);
        setMasterEmployeeList(Array.isArray(data) ? data : []); // <-- Add this line
      })
      .catch((err) => {
        console.error('Failed to fetch employees:', err);
      });
  }, []);

  // Update filteredData to use searchTerm
  const filteredData = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (emp.email && emp.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (emp.employeeId && emp.employeeId.toString().includes(searchTerm)) ||
    (emp.department && emp.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (emp.designation && emp.designation.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const { items } = useSortableData(filteredData);

  const handleDelete = (id: number) => {
    const updatedList = masterEmployeeList.filter((emp) => emp.id !== id);
    setMasterEmployeeList(updatedList);
    setEmployees(updatedList);
  };

  const handleAddOrUpdateEmployee = (employee: Employee) => {
    let updatedList: Employee[];
    if (selectedEmployee) {
      updatedList = masterEmployeeList.map((emp) =>
        emp.id === selectedEmployee.id ? { ...employee, id: selectedEmployee.id } : emp
      );
    } else {
      updatedList = [...masterEmployeeList, { ...employee, id: Date.now() }];
    }
    setMasterEmployeeList(updatedList);
    setEmployees(updatedList);
  };

  const handleViewEmployee = (employee: Employee) => {
    console.log('Selected Employee:', employee);
    setSelectedEmployee(employee);
    setViewModalStatus(true);
  };

  const handleApplyFilters = (filters: Record<string, string>) => {
    const filtered = masterEmployeeList.filter((emp) => {
      return (
        (filters.department === 'All' || emp.department === filters.department) &&
        (filters.designation === 'All' || emp.designation === filters.designation) &&
        (filters.role === 'All' || emp.userRole === filters.role) &&
        (filters.status === 'All' || emp.status === filters.status) &&
        (filters.gender === 'All' || emp.gender === filters.gender) &&
        (filters.employmentType === 'All' || emp.employmentType === filters.employmentType)
      );
    });
    setEmployees(filtered);
  };

  const handleAddDepartment = (newDepartment: string) => {
    if (!departments.includes(newDepartment)) {
      setDepartments((prev) => [...prev, newDepartment]);
    }
  };

  const handleSelectAll = (isChecked: boolean) => {
    setSelectAll(isChecked);
    const updatedEmployees = employees.map((emp) => ({
      ...emp,
      isSelected: isChecked, // Add an `isSelected` property to each employee
    }));
    setEmployees(updatedEmployees);
  };

  const handleRowSelect = (id: number, isChecked: boolean) => {
    const updatedEmployees = employees.map((emp) =>
      emp.id === id ? { ...emp, isSelected: isChecked } : emp
    );
    setEmployees(updatedEmployees);

    // Update the select-all checkbox state
    const allSelected = updatedEmployees.every((emp) => emp.isSelected);
    setSelectAll(allSelected);
  };

  return (
    <PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text}>
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
            icon="FilterAlt"
            color="primary"
            isLight
            aria-label="Filter"
            onClick={() => setFilterModalStatus(true)} // Open the Filter Modal
          >
            Filter
          </Button>
          <Button
            icon="PersonAdd"
            color="primary"
            isLight
            onClick={() => {
              setSelectedEmployee(undefined);
              setEmployeeModalStatus(true);
            }}
          >
            Add Employee
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

      <Page>
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
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                      </th>
                      <th>Employee ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>User Role</th>
                      <th>Designation</th>
                      <th>Department</th>
                      <th>Reporting To</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPagination(items, currentPage, perPage).map((i) => (
                      <tr key={i.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={i.isSelected || false}
                            onChange={(e) => handleRowSelect(i.id, e.target.checked)}
                          />
                        </td>
                        <td>{i.employeeId || 'N/A'}</td>
                        <td>{i.name}</td>
                        <td>{i.email || 'N/A'}</td>
                        <td>
                          <select
                            className="form-select"
                            value={i.userRole || ''}
                            onChange={(e) => {
                              const updatedRole = e.target.value;

                              // Update the specific employee's role in the employees state
                              const updatedEmployees = employees.map((emp) =>
                                emp.id === i.id ? { ...emp, userRole: updatedRole } : emp
                              );

                              setEmployees(updatedEmployees); // Update the state
                              setMasterEmployeeList(updatedEmployees); // Keep masterEmployeeList in sync
                            }}
                          >
                            <option value="App Administrator">App Administrator</option>
                            <option value="Employee">Employee</option>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                          </select>
                        </td>
                        <td>{i.designation || 'N/A'}</td>
                        <td>{i.department || 'N/A'}</td>
                        <td>{i.reportingTo || 'N/A'}</td>
                        <td>{i.status || 'N/A'}</td>
                        <td>
                          <Dropdown>
                            <DropdownToggle hasIcon={false}>
                              <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
                            </DropdownToggle>
                            <DropdownMenu isAlignmentEnd>
                              <Button
                                color="link"
                                className="dropdown-item"
                                onClick={() => handleViewEmployee(i)}
                              >
                                <Icon icon="RemoveRedEye" className="me-2" /> View
                              </Button>
                              <Button
                                color="link"
                                className="dropdown-item"
                                onClick={() => {
                                  setSelectedEmployee(i);
                                  setEmployeeModalStatus(true);
                                }}
                              >
                                <Icon icon="Edit" className="me-2" /> Update
                              </Button>
                              <Button
                                color="link"
                                className="dropdown-item text-danger"
                                onClick={() => handleDelete(i.id)}
                              >
                                <Icon icon="Delete" className="me-2" /> Delete
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
                label="Employees"
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>
          </div>
        </div>
      </Page>

      {/* Filter Modal */}
      <FilterModal
        isOpen={filterModalStatus}
        setIsOpen={setFilterModalStatus}
        onApplyFilters={handleApplyFilters}
        departments={departments} // Pass departments dynamically
        designations={designations} // Pass designations dynamically
      />

      <AddEmployee
        isOpen={employeeModalStatus}
        setIsOpen={(status) => {
          setEmployeeModalStatus(status);
          if (!status) setSelectedEmployee(undefined);
        }}
        selectedEmployee={selectedEmployee || undefined}
        onAddEmployee={(employee) => {
          const fullEmployee: Employee = {
            ...employee,
            id: selectedEmployee?.id || Date.now(),
            name: employee.employeeName || '',
            email: employee.employeeEmail || '',
            profilePicture:
              employee.profilePicture instanceof File
                ? URL.createObjectURL(employee.profilePicture)
                : employee.profilePicture,
            hourlyRate: Number(employee.hourlyRate) || 0,
            loginAllowed: true,
            emailNotifications: true,
            skills: employee.skills || '',
            probationPeriod: '',
          };
          handleAddOrUpdateEmployee(fullEmployee);
        }}
        onAddDepartment={handleAddDepartment}
      />

      <ViewEmployeeModal
        isOpen={viewModalStatus}
        setIsOpen={setViewModalStatus}
        employee={{
          employeeId: selectedEmployee?.employeeId || 'N/A',
          email: selectedEmployee?.email || 'N/A',
          userRole: selectedEmployee?.userRole || 'N/A',
          reportingTo: selectedEmployee?.reportingTo || 'N/A',
          designation: selectedEmployee?.designation || 'N/A',
          department: selectedEmployee?.department || 'N/A',
          joiningDate: selectedEmployee?.joiningDate || 'N/A',
          mobile: selectedEmployee?.mobile || 'N/A',
          gender: selectedEmployee?.gender || 'N/A',
          address: selectedEmployee?.address || 'N/A',
          about: selectedEmployee?.about || 'N/A',
          profilePicture: selectedEmployee?.profilePicture instanceof File
            ? URL.createObjectURL(selectedEmployee.profilePicture)
            : selectedEmployee?.profilePicture || null,
          country: selectedEmployee?.country || 'N/A',
          dateOfBirth: selectedEmployee?.dateOfBirth || 'N/A',
          maritalStatus: selectedEmployee?.maritalStatus || 'N/A',
          language: selectedEmployee?.language || 'N/A',
          status: selectedEmployee?.status || 'Active',
          exitDate: selectedEmployee?.exitDate || '',
          noticePeriodEndDate: selectedEmployee?.noticePeriodEndDate || '',
          noticePeriodStartDate: selectedEmployee?.noticePeriodStartDate || '',
          slackMemberId: selectedEmployee?.slackMemberId || 'N/A',
          probationEndDate: selectedEmployee?.probationEndDate || 'N/A',
          skills: selectedEmployee?.skills || '',
          employmentType: selectedEmployee?.employmentType || 'N/A',
          hourlyRate: selectedEmployee?.hourlyRate?.toString() || '0',
        }}
      />
    </PageWrapper>
  );
};

export default Employees;