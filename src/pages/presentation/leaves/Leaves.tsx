import React, { useState, useEffect } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import CustomerEditModal from './CustomerEditModal';
import ViewLeaveModal from './ViewLeaveModal'; // Import the new modal component
import Dropdown, { DropdownToggle, DropdownMenu, DropdownItem } from '../../../components/bootstrap/Dropdown';
import DepartmentFilter from '../filter/DepartmentFilter';


const Leaves = () => {
    const [leaveData, setLeaveData] = useState<any[]>(() => {
        const savedData = localStorage.getItem('leaveData');
        return savedData ? JSON.parse(savedData) : [];
    });

    const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
    const [viewModalStatus, setViewModalStatus] = useState<boolean>(false);
    const [selectedLeave, setSelectedLeave] = useState<any | null>(null);
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const departments = ["HR", "Finance", "Engineering"];
    const [searchTerm, setSearchTerm] = useState<string>(''); // <-- Add searchTerm state

    useEffect(() => {
        localStorage.setItem('leaveData', JSON.stringify(leaveData));
    }, [leaveData]);

    // Filter leaveData dynamically based on searchTerm
    const filteredLeaveData = leaveData.filter((leave) =>
        leave.member?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leave.leaveType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leave.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leave.date?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleLeaveSubmit = (formValues: any) => {
        if (!selectedLeave) {
            // Add new leave
            setLeaveData((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    ...formValues,
                },
            ]);
        } else {
            // Edit existing leave
            setLeaveData((prev) =>
                prev.map((leave) => (leave.id === selectedLeave.id ? { ...leave, ...formValues } : leave))
            );
        }
        setEditModalStatus(false);
        setSelectedLeave(null); // Reset selected leave
    };

    const handleEdit = (leave: any) => {
        setSelectedLeave(leave); // Set the selected leave data
        setEditModalStatus(true); // Open the modal
    };

    const handleView = (leave: any) => {
        setSelectedLeave(leave); // Set the selected leave data
        setViewModalStatus(true); // Open the "View" modal
    };

    const handleDelete = (leaveId: string) => {
        setLeaveData((prev) => prev.filter((leave) => leave.id !== leaveId));
    };

    const handleStatusChange = (leaveId: string, newStatus: string) => {
        setLeaveData((prev) =>
            prev.map((leave) =>
                leave.id === leaveId ? { ...leave, status: newStatus } : leave
            )
        );
    };

    const handleApplyFilters = () => {
        // Handle filter logic here
        setFilterModalOpen(false);
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
                        placeholder="Search leave..."
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    />
                </SubHeaderLeft>
                <SubHeaderRight>
                    <Button
                        icon="UserPlus"
                        color="primary"
                        isLight
                        onClick={() => {
                            setSelectedLeave(null); // Reset selected leave for new entry
                            setEditModalStatus(true);
                        }}
                    >
                        Assign Leave
                    </Button>
                    <Button
                        icon="UserPlus"
                        color="primary"
                        isLight
                        onClick={() => {
                            setSelectedLeave(null); // Reset selected leave for new entry
                            setEditModalStatus(true);
                        }}
                    >
                        Add Leave
                    </Button>
                    <Button
                        icon="FilterList"
                        color="primary"
                        isLight
                        onClick={() => setFilterModalOpen(true)}
                    >
                        Filter
                    </Button>
                    <DepartmentFilter
                        isOpen={filterModalOpen}
                        setIsOpen={setFilterModalOpen}
                        onApplyFilters={handleApplyFilters}
                        departments={departments}
                    />
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
                                            <th>Employee</th>
                                            <th>Leave Date</th>
                                            <th>Duration</th>
                                            <th>Leave Status</th>
                                            <th>Leave Type</th>
                                            <th>Paid</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredLeaveData.map((leave) => (
                                            <tr key={leave.id}>
                                                <td>{leave.member}</td>
                                                <td>{leave.date}</td>
                                                <td>{leave.duration}</td>
                                                <td>{leave.status}</td>
                                                <td>{leave.leaveType}</td>
                                                <td>{leave.paid ? 'Yes' : 'No'}</td>
                                                <td>
                                                    <Dropdown direction="down">
                                                        <DropdownToggle>
                                                            <Icon icon="MoreVert" />
                                                        </DropdownToggle>
                                                        <DropdownMenu className="min-w-[10rem]">
                                                            <DropdownItem>
                                                                <Button
                                                                    className="w-full text-left"
                                                                    onClick={() => handleView(leave)} // Open the "View" modal
                                                                >
                                                                    <Icon icon="Preview" />
                                                                    View
                                                                </Button>
                                                            </DropdownItem>
                                                            <DropdownItem>
                                                                <Button
                                                                    className="w-full text-left"
                                                                    onClick={() => handleStatusChange(leave.id, 'Approved')}
                                                                >
                                                                    <Icon icon="Check" />
                                                                    Approve
                                                                </Button>
                                                            </DropdownItem>
                                                            <DropdownItem>
                                                                <Button
                                                                    className="w-full text-left"
                                                                    onClick={() => handleStatusChange(leave.id, 'Rejected')}
                                                                >
                                                                    <Icon icon="Cancel" />
                                                                    Reject
                                                                </Button>
                                                            </DropdownItem>
                                                            <DropdownItem>
                                                                <Button
                                                                    className="w-full text-left"
                                                                    onClick={() => handleEdit(leave)}
                                                                >
                                                                    <Icon icon="Edit" />
                                                                    Edit
                                                                </Button>
                                                            </DropdownItem>
                                                            <DropdownItem>
                                                                <Button
                                                                    className="w-full text-left text-red-500"
                                                                   
                                                                    onClick={() => handleDelete(leave.id)}
                                                                >
                                                                    <Icon icon="Delete" />
                                                                    Delete
                                                                </Button>
                                                            </DropdownItem>
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
                setIsOpen={setEditModalStatus}
                isOpen={editModalStatus}
                onSubmit={handleLeaveSubmit}
                initialData={selectedLeave} // Pass the selected leave data
            />
            <ViewLeaveModal
                isOpen={viewModalStatus}
                setIsOpen={setViewModalStatus}
                leave={selectedLeave} // Pass the selected leave data
            />
        </PageWrapper>
    );
};

export default Leaves;