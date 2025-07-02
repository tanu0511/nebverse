import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, { DropdownToggle, DropdownMenu } from '../../../components/bootstrap/Dropdown';
import PaginationButtons from '../../../components/PaginationButtons';
import AddProjectTemplateModal from './AddProjectTemplateModal';
import CustomerEditModal from './CustomerEditModal';
// import ViewModal from './ViewModal'; 
import { useProjectData } from './ProjectDataContext';

const PER_COUNT: { [key: string]: number } = { '5': 5, '10': 10, '20': 20 }; // Add or adjust as needed

// Define the Project interface
interface Project {
    projectName: string;
    members?: string;
    projectCategory: string;
}

const ProjectTemplate: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(PER_COUNT['5']);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCustomerEditModalOpen, setIsCustomerEditModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editData, setEditData] = useState<Project | null>(null);
    const { projectData, setProjectData } = useProjectData();
    const [searchTerm, setSearchTerm] = useState<string>(''); // <-- Add searchTerm state
    const navigate = useNavigate();

    // Dynamic search filter for all relevant fields
    const filteredData = projectData.filter((item) =>
        searchTerm === '' ||
        (item.projectName && item.projectName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.members && item.members.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.projectCategory && item.projectCategory.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleSaveProjectTemplate = (data: { projectName: string; projectCategory: string; allowManualLogs: boolean; summary: string; notes: string }) => {
        if (isEditMode && editData) {
            setProjectData((prevData) =>
                prevData.map((item) =>
                    item.projectName === editData.projectName
                        ? { ...item, projectName: data.projectName, projectCategory: data.projectCategory, summary: data.summary, notes: data.notes }
                        : item
                )
            );
        } else {
            setProjectData((prevData) => [
                ...prevData,
                {
                    projectName: data.projectName,
                    members: 'N/A',
                    projectCategory: data.projectCategory,
                    summary: data.summary,
                    notes: data.notes,
                },
            ]);
        }

        setIsModalOpen(false);
        setIsEditMode(false);
        setEditData(null);
    };

    const handleAction = (action: string, projectName: string) => {
        if (action === 'Edit') {
            const itemToEdit = projectData.find((item) => item.projectName === projectName);
            if (itemToEdit) {
                setEditData(itemToEdit); 
                setIsEditMode(true);
                setIsModalOpen(true); 
            }
        } else if (action === 'Delete') {
            setProjectData((prevData) => prevData.filter((item) => item.projectName !== projectName));
        } else if (action === 'Create Project') {
            setIsCustomerEditModalOpen(true); 
        } else {
            console.log(`${action} clicked for project: ${projectName}`);
        }
    };

    const handleAddProject = (): void => {
        setIsCustomerEditModalOpen(false);
    };

    useEffect(() => {
        if (!isModalOpen) {
            setEditData(null); 
        }
    }, [isModalOpen]);

    function dataPagination(data: Project[], currentPage: number, perPage: number) {
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = startIndex + perPage;
        return data.slice(startIndex, endIndex);
    }

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
                        placeholder='Search..'
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    />
                </SubHeaderLeft>
                <SubHeaderRight>
                    <Button
                        icon="Add"
                        color="primary"
                        isLight
                        onClick={() => {
                            setIsEditMode(false); 
                            setEditData(null); 
                            setIsModalOpen(true); 
                        }}
                    >
                        Add Project Template
                    </Button>
                </SubHeaderRight>
            </SubHeader>
            <Page>
                <div className='row h-100'>
                    <div className='col-12'>
                        <Card stretch>
                            <CardBody isScrollable className='table-responsive'>
                                <table className="table table-modern">
                                    <thead>
                                        <tr>
                                            <th>Project Name</th>
                                            <th>Members</th>
                                            <th>Project Category</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="text-center">
                                                    No data available in table
                                                </td>
                                            </tr>
                                        ) : (
                                            dataPagination(filteredData, currentPage, perPage).map((item: Project) => (
                                                <tr key={item.projectName}>
                                                    <td>{item.projectName}</td>
                                                    <td>{item.members}</td>
                                                    <td>{item.projectCategory}</td>
                                                    <td>
                                                      <Dropdown>
                                                        <DropdownToggle hasIcon={false}>
                                                          <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
                                                        </DropdownToggle>
                                                        <DropdownMenu isAlignmentEnd>
                                                          <Button
                                                            color="link"
                                                            className="dropdown-item"
                                                            onClick={() => {
                                                              navigate(`/project-template/view/${encodeURIComponent(item.projectName)}`, { state: { project: item } });
                                                            }}
                                                          >
                                                            <Icon icon="Visibility" className="me-2" /> View
                                                          </Button>
                                                          <Button
                                                            color="link"
                                                            className="dropdown-item"
                                                            onClick={() => handleAction('Create Project', item.projectName)}
                                                          >
                                                            <Icon icon="Add" className="me-2" /> Create Project
                                                          </Button>
                                                          <Button
                                                            color="link"
                                                            className="dropdown-item"
                                                            onClick={() => handleAction('Edit', item.projectName)}
                                                          >
                                                            <Icon icon="Edit" className="me-2" /> Edit
                                                          </Button>
                                                          <Button
                                                            color="link"
                                                            className="dropdown-item text-danger"
                                                            onClick={() => handleAction('Delete', item.projectName)}
                                                          >
                                                            <Icon icon="Delete" className="me-2" /> Delete
                                                          </Button>
                                                        </DropdownMenu>
                                                      </Dropdown>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </CardBody>
                            <PaginationButtons
                                data={filteredData}
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
            <AddProjectTemplateModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false); 
                    setIsEditMode(false); 
                    setEditData(null); 
                }}
                onSave={handleSaveProjectTemplate}
                editData={isEditMode && editData ? { projectName: editData.projectName, projectCategory: editData.projectCategory } : undefined}
            />
            <CustomerEditModal
                setIsOpen={setIsCustomerEditModalOpen}
                isOpen={isCustomerEditModalOpen}
                onAddProject={handleAddProject}
            />
            {/* <ViewModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                project={viewProject}
            /> */}
        </PageWrapper>
    );
};

export default ProjectTemplate;