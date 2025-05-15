import React, { FC, useState, useEffect } from 'react';

import Card, {
    CardActions,
    CardBody,
    CardHeader,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import ProjectEditModal from './ProjectEditModal';
import ProjecteditModal2 from './ProjectEditModal2';

interface ICommonUpcomingEventsProps {
    isFluid?: boolean;
    filters?: {
        department?: string;
        designation?: string;
        role?: string;
        status?: string;
        gender?: string;
        employmentType?: string;
        searchInput?: string;
    };
}

interface Employee {
    gender: string;
    employmentType: string;
    designation: string;
    department: string;
    id: number;
    name: string;
    email: string;
    role: string;
    reportingTo: string;
    status: { name: string; color: string };
}

const LOCAL_STORAGE_KEY = 'commonUpcomingEvents_employees';

const CommonUpcomingEvents: FC<ICommonUpcomingEventsProps> = ({ isFluid, filters }) => {
    const [employees, setEmployees] = useState<Employee[]>(() => {
        try {
            const savedEmployees = localStorage.getItem(LOCAL_STORAGE_KEY);
            return savedEmployees
                ? JSON.parse(savedEmployees)
                : [
                    {
                        id: 1,
                        name: 'John Doe',
                        email: 'john.doe@example.com',
                        role: 'Manager',
                        department: 'Management',
                        designation: 'Manager',
                        reportingTo: 'Jane Smith',
                        status: { name: 'Active', color: 'success' },
                    },
                ];
        } catch (error) {
            console.error('Failed to load employees from localStorage:', error);
            return [
                {
                    id: 1,
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    role: 'Manager',
                    department: 'Management',
                    designation: 'Manager',
                    reportingTo: 'Jane Smith',
                    status: { name: 'Active', color: 'success' },
                },
            ];
        }
    });

    useEffect(() => {
        if (employees && employees.length > 0) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(employees));
        }
    }, [employees]);

    const filteredEmployees = employees.filter((employee) => {
        if (!filters) return true;

        const matchesSearch = filters.searchInput
            ? employee.name.toLowerCase().includes(filters.searchInput.toLowerCase()) ||
            employee.email.toLowerCase().includes(filters.searchInput.toLowerCase())
            : true;

        const matchesDepartment = filters.department
            ? employee.department === filters.department
            : true;

        const matchesDesignation = filters.designation
            ? employee.designation === filters.designation
            : true;

        const matchesRole = filters.role
            ? employee.role === filters.role
            : true;

        const matchesStatus = filters.status
            ? employee.status?.name === filters.status
            : true;

        const matchesGender = filters.gender
            ? employee.gender === filters.gender
            : true;

        const matchesEmploymentType = filters.employmentType
            ? employee.employmentType === filters.employmentType
            : true;

        return (
            matchesSearch &&
            matchesDepartment &&
            matchesDesignation &&
            matchesRole &&
            matchesStatus &&
            matchesGender &&
            matchesEmploymentType
        );
    });


    const handleAddEmployee = (newEmployee: Employee) => {
        if (newEmployee) {
            setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
            setIsProjectModalOpen(false);
        } else {
            console.error('Invalid employee data:', newEmployee);
            alert('Failed to add employee. Please check the input data.');
        }
    };

    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [isProjectModalOpen2, setIsProjectModalOpen2] = useState(false);

    return (
        <>
            <Card stretch={isFluid} style={{ height: '60vh' }}>
                <CardHeader borderSize={1}>
                    <CardActions>
                        <Button
                            icon="PersonAdd"
                            color="info"
                            isLight
                            tag="a"
                            onClick={() => setIsProjectModalOpen(true)}
                        >
                            Add Employee
                        </Button>
                        <Button
                            icon="PersonAdd"
                            color="info"
                            isLight
                            tag="a"
                            onClick={() => setIsProjectModalOpen2(true)}
                        >
                            Invite Employee
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
                    </CardActions>
                </CardHeader>
                <CardBody className="table-responsive" isScrollable={isFluid}>
                    <table className="table table-modern">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>User Role</th>
                                <th>Reporting To</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.length > 0 ? (
                                filteredEmployees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.id}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.department}</td>
                                        <td>{employee.designation}</td>
                                        <td>{employee.role}</td>
                                        <td>{employee.reportingTo}</td>
                                        <td>
                                            <span className={`badge bg-${employee.status.color}`}>
                                                {employee.status.name}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center text-muted">
                                        No matching employees found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
            <ProjectEditModal
                id="add-employee"
                isOpen={isProjectModalOpen}
                setIsOpen={setIsProjectModalOpen}
                onSubmit={handleAddEmployee}
            />
            <ProjecteditModal2
                id="0"
                isOpen={isProjectModalOpen2}
                setIsOpen={setIsProjectModalOpen2}
            />
        </>
    );
};

export default CommonUpcomingEvents;
