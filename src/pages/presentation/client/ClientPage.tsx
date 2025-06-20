/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import CustomerEditModal from './CustomerEditModal';
import CustomerViewModal from './CustomerViewModal';
import Input from '../../../components/bootstrap/forms/Input';
import AddClientModal from './AddClientModal';
import Icon from '../../../components/icon/Icon';
{/* <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" /> */}




  const ClientPage = () => {
    interface Customer {

		salutation: string;
		name: string;
		email: string;
		country: string;
		mobile: string;
		createdAt: string;
		gender: string;
		language: string;
		clientCategory: string;
		clientSubCategory: string;
		loginAllowed: boolean;
		status: string;
        electronicAddress: string;
        // electronicAddress: string; // Add missing property
        gstNumber?: string; // Add missing fields
		phoneNumber?: string;
		city?: string;
		state?: string;
		postalCode?: string;
		address?: string;
		companyName?: string;
		website?: string;
		taxName?: string;
		receiveEmailNotifications?: boolean;
        addedBy?: string; // Add missing property
		companyAddress?: string;
    	shippingAddress?: string;
    	note?: string;
        additionalField?: any; // Add missing property
    }
    const navigate = useNavigate();
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean[]>([]); // State to track dropdown visibility
	const [employeeModalStatus, setEmployeeModalStatus] = useState<boolean>(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Customer | undefined>(undefined);
	const [originalEmail, setOriginalEmail] = useState<string | undefined>(undefined);
	const toggleDropdown = (index: number) => {
		setIsDropdownOpen((prev) => {
			const newState = [...prev];
			newState[index] = !newState[index]; // Toggle the visibility for the specific index
			return newState;
		});
	};
	const handleDeleteRow = (index: number) => {
		setCustomers((prev) => prev.filter((_, i) => i !== index)); // Remove the row at the specified index
		localStorage.setItem('customers', JSON.stringify(customers.filter((_, i) => i !== index))); // Update localStorage
	};
	const handleViewRow = (row: Customer) => {
		setViewData(row); // Set the data to be viewed
		setIsViewModalOpen(true); // Open the view modal
	};

    const [customers, setCustomers] = useState<Customer[]>(() => {
        const storedCustomers = localStorage.getItem('customers');
        return storedCustomers ? JSON.parse(storedCustomers) : [];
    });
	
	
    const handleSaveCustomer = (customerData: Customer) => {
  setCustomers((prev) => {
    // Use originalEmail to find the row, fallback to customerData.email if not set
    const keyEmail = originalEmail || customerData.email;
    const existingIndex = prev.findIndex((c) => c.email === keyEmail);
    if (existingIndex !== -1) {
      // Update existing customer
      const updatedCustomers = [...prev];
      updatedCustomers[existingIndex] = customerData;
      localStorage.setItem('customers', JSON.stringify(updatedCustomers));
      return updatedCustomers;
    }
    // Add new customer
    const newCustomers = [...prev, customerData];
    localStorage.setItem('customers', JSON.stringify(newCustomers));
    return newCustomers;
  });
  setEmployeeModalStatus(false); // Close the modal
  setOriginalEmail(undefined); // Reset after save
};
    const handleAddOrUpdateEmployee = (employee: Customer) => {
        let updatedList: Customer[];
        if (selectedEmployee) {
          updatedList = masterEmployeeList.map((emp) =>
            emp.email === selectedEmployee.email ? { ...employee, id: selectedEmployee.email } : emp
          );
        } else {
          updatedList = [...masterEmployeeList, { ...employee,  }];
        }
        setMasterEmployeeList(updatedList);
        setEmployees(updatedList);
      };
    //   const [employeeModalStatus, setEmployeeModalStatus] = useState<boolean>(false);
    //   const [selectedEmployee, setSelectedEmployee] = useState<Customer | null>(null);

		const [tableData, setTableData] = useState<Customer[]>([]); // Explicitly type the state
        const [masterEmployeeList, setMasterEmployeeList] = useState<Customer[]>([]);
        const [employees, setEmployees] = useState<Customer[]>([]);
    const [viewData, setViewData] = useState<Customer | null>(null); // State for viewing details
	const [isViewModalOpen, setIsViewModalOpen] = useState(false); 
    const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [editData, setEditData] = useState<Customer | null>(null); // State for editing row
    return (
        <PageWrapper title="Customers List">
            <SubHeader>
  <SubHeaderLeft>
    <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
      {/* <i className="material-icons text-primary" style={{ fontSize: 24 }}>search</i> */}
    </label>
    <Input
      id="searchInput"
      type="search"
      className="border-0 shadow-none bg-transparent"
      placeholder="Search client..."
      // onChange={handleSearch} // implement search logic if needed
    />
  </SubHeaderLeft>
  <SubHeaderRight>
    <Button
      icon="Add"
      color="primary"
      isLight
      onClick={() => {
        setEmployeeModalStatus(true);
        setSelectedEmployee(undefined);
      }}
      className="btn-icon-only"
    >
      Add Client
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
            <Page>
                <div className="row h-100">
                    <div className="col-12">
                        <Card stretch>
                            <CardBody isScrollable className="table-responsive">
                                <table className="table table-modern table-hover">
                                    <thead>
                                        <tr>
										    <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Mobile</th>
                                            <th>Status</th>
                                            <th>Created</th>
											<th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers.map((client, index) => (
                                            <tr key={index}>
												<td>{index + 1}</td> 
                                                <td>{client.name}</td>
                                                <td>{client.email}</td>
                                                <td>{client.mobile}</td>
                                                <td>{client.status}</td>
                                                <td>{client.createdAt}</td>
												<td>
<Dropdown>
    <DropdownToggle hasIcon={false}>
      <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
    </DropdownToggle>
    <DropdownMenu isAlignmentEnd>
      <Button
        color="link"
        className="dropdown-item"
        onClick={() => navigate(`/clients/view/${client.email}`)}
      >
        <Icon icon="RemoveRedEye" className="me-2" /> View
      </Button>
      <Button
        color="link"
        className="dropdown-item"
        onClick={() => {
          setSelectedEmployee(client);
          setOriginalEmail(client.email);
          setEmployeeModalStatus(true);
        }}
      >
        <Icon icon="Edit" className="me-2" /> Update
      </Button>
      <Button
        color="link"
        className="dropdown-item text-danger"
        onClick={() => handleDeleteRow(index)}
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
                        </Card>
                    </div>
                </div>
            </Page>
			<CustomerEditModal
    isOpen={employeeModalStatus}
    setIsOpen={(status) => {
        setEmployeeModalStatus(status);
        if (!status) {
          setSelectedEmployee(undefined);
          setOriginalEmail(undefined);
        }
    }}
    selectedEmployee={selectedEmployee} // Pass the selected customer
    onAddEmployee={handleSaveCustomer} // Handle save
/>
<AddClientModal
  isOpen={employeeModalStatus}
  setIsOpen={(status) => {
    setEmployeeModalStatus(status);
    if (!status) setSelectedEmployee(undefined);
  }}
  selectedEmployee={selectedEmployee} // <-- use the correct prop name
  onAddEmployee={handleSaveCustomer}
/>
<CustomerViewModal
  isOpen={isViewModalOpen}
  setIsOpen={setIsViewModalOpen}
  customer={viewData}
/>
        </PageWrapper>
    );
};

export default ClientPage;