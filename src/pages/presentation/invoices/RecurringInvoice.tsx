import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import AddRecurringInvoice from './AddRecurringInvoice';
import PaginationButtons from '../../../components/PaginationButtons';
import InvoicePreviewModal from './InvoicePreviewModal';

interface Project {
    code: string;
    projectName: string;
    startDate: string;
    client: string;
    status: string;
    pinned?: boolean;
    nextInvoice?: string; 
    total?: string;
}

const RecurringInvoice: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
    const [editProjectIndex, setEditProjectIndex] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);
    const [previewModalOpen, setPreviewModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>(''); // <-- Dynamic search state

    // Dynamic search filter for projects
    const filteredProjects = projects.filter((project) =>
        searchTerm
            ? (project.code || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
              (project.projectName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
              (project.client || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
              (project.status || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
              (project.nextInvoice || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
              (project.total || '').toLowerCase().includes(searchTerm.toLowerCase())
            : true
    );

    // Sort pinned projects to the top, then paginate
    const sortedFilteredData = [...filteredProjects].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    const paginatedData = sortedFilteredData.slice((currentPage - 1) * perPage, currentPage * perPage);

    function handleStatusChange(index: number, value: string): void {
        const absoluteIndex = (currentPage - 1) * perPage + index;
        setProjects((prevProjects) =>
            prevProjects.map((project, i) =>
                i === absoluteIndex ? { ...project, status: value } : project,
            ),
        );
    }

    const handleView = (index: number) => {
        setSelectedProject(paginatedData[index]);
        setPreviewModalOpen(true);
    };

    const handleEdit = (index: number) => {
        setEditProjectIndex((currentPage - 1) * perPage + index);
        setEditModalStatus(true);
    };

    const handleDelete: (index: number) => void = (index: number) => {
        const absoluteIndex = (currentPage - 1) * perPage + index;
        setProjects((prevProjects) => prevProjects.filter((_, i) => i !== absoluteIndex));
    };

    return (
        <PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text}>
            <SubHeader>
                <SubHeaderLeft>
                    <label
                        className='border-0 bg-transparent cursor-pointer me-0'
                        htmlFor='searchInput'
                        aria-label='Search'>
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
                    <Button
                        icon='Add'
                        color='primary'
                        isLight
                        onClick={() => setEditModalStatus(true)}>
                        Add Recurring Invoice
                    </Button>

                    <Button
                        color='primary'
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
                                            <th>DT Row Index</th>
                                            <th>Client</th>
                                            <th>Start Date</th>
                                            <th>Next Invoice</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData.length > 0 ? (
                                            paginatedData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        {(currentPage - 1) * perPage + index + 1}
                                                    </td>
                                                    <td>{item?.client || 'N/A'}</td>
                                                    <td>{item?.startDate ? new Date(item.startDate).toDateString() : 'N/A'}</td>
                                                    <td>
                                                        {item?.nextInvoice ? (
                                                            <>
                                                                {item.nextInvoice.split('|')[0]}
                                                                {item.nextInvoice.split('|')[1] && (
                                                                    <span className="badge bg-warning text-dark ms-2" style={{ fontWeight: 600 }}>
                                                                        {item.nextInvoice.split('|')[1]}
                                                                    </span>
                                                                )}
                                                            </>
                                                        ) : 'N/A'}
                                                    </td>
                                                    <td>{item?.total || 'N/A'}</td>
                                                    <td>
                                                        <select
                                                            value={item.status}
                                                            onChange={(e) => handleStatusChange(index, e.target.value)}
                                                            className='form-select'
                                                            style={{ minWidth: 120 }}
                                                        >
                                                            <option value='active'>
                                                                &#x1F7E2; Active
                                                            </option>
                                                            <option value='inactive'>
                                                                &#x1F534; Inactive
                                                            </option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <div className='dropdown'>
                                                            <Button
                                                                color='primary'
                                                                isLight
                                                                className='dropdown-toggle'
                                                                data-bs-toggle='dropdown'
                                                                aria-expanded='false'>
                                                                <Icon icon='MoreVert' />
                                                            </Button>
                                                            <ul className='dropdown-menu'>
                                                                <li>
                                                                    <button
                                                                        className='dropdown-item'
                                                                        onClick={() =>
                                                                            handleView(index)
                                                                        }>
                                                                        <Icon
                                                                            icon='Visibility'
                                                                            className='me-2'
                                                                        />
                                                                        View
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className='dropdown-item'
                                                                        onClick={() =>
                                                                            handleEdit(index)
                                                                        }>
                                                                        <Icon
                                                                            icon='Edit'
                                                                            className='me-2'
                                                                        />
                                                                        Edit
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className='dropdown-item'
                                                                        onClick={() =>
                                                                            handleDelete(index)
                                                                        }>
                                                                        <Icon
                                                                            icon='Delete'
                                                                            className='me-2'
                                                                        />
                                                                        Delete
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={8} className='text-center'>
                                                    No data available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </CardBody>
                            <PaginationButtons
                                data={sortedFilteredData}
                                label='items'
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                                perPage={perPage}
                                setPerPage={setPerPage}
                            />
                        </Card>
                    </div>
                </div>
            </Page>
            <AddRecurringInvoice
                isOpen={editModalStatus}
                setIsOpen={(open: boolean) => {
                    setEditModalStatus(open);
                    if (!open) setEditProjectIndex(null); // Reset on close
                }}
                onAddProject={(newInvoice: any) => {
                    const newProject = {
                        code: newInvoice.code || '',
                        projectName: newInvoice.projectName || '',
                        startDate: newInvoice.startDate || '',
                        client: newInvoice.client || '',
                        status: newInvoice.status || 'active',
                        pinned: newInvoice.pinned,
                        nextInvoice: newInvoice.nextInvoice,
                        total: newInvoice.total,
                    };
                    setProjects((prevProjects) => {
                        if (editProjectIndex !== null) {
                            // Update existing project
                            return prevProjects.map((proj, idx) =>
                                idx === editProjectIndex ? newProject : proj
                            );
                        } else {
                            // Add new project
                            return [...prevProjects, newProject];
                        }
                    });
                    setEditProjectIndex(null); // Reset after save
                }}
                project={editProjectIndex !== null ? projects[editProjectIndex] : null}
            />
            <InvoicePreviewModal
                isOpen={previewModalOpen}
                setIsOpen={setPreviewModalOpen}
                project={selectedProject}
            />
        </PageWrapper>
    );
};

export default RecurringInvoice;