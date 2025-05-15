// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import React, { FC, useState, useEffect } from 'react';
// import Icon from '../../../components/icon/Icon';
// import Card, {
//     CardActions,
//     CardBody,
//     CardHeader, 
//     CardTitle,
// } from '../../../components/bootstrap/Card';
// import Button from '../../../components/bootstrap/Button';
// import PaginationButtons, { dataPagination, PER_COUNT} from '../../../components/PaginationButtons';    
// import AddProjectTemplateModal from './AddProjectTemplateModal';
// // import CustomerEditModal from '../presentation/crm/CustomerEditModal'; 
// import CustomerEditModal from '../crm/CustomerEditModal';
// import PageWrapper from '../../../layout/PageWrapper/PageWrapper';

// interface ICommonUpcomingEventsProps {
//     isFluid?: boolean;
// }

// interface Project {
//     projectName: string;
//     members: string;
//     projectCategory: string;
// }

// const ProjectTemplate: FC<ICommonUpcomingEventsProps> = ({ isFluid }) => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [perPage, setPerPage] = useState(PER_COUNT['5']);
//     const [isModalOpen, setIsModalOpen] = useState(false); // For AddProjectTemplateModal
//     const [isCustomerEditModalOpen, setIsCustomerEditModalOpen] = useState(false); // For CustomerEditModal
//     const [isEditMode, setIsEditMode] = useState(false); // Track if the modal is in edit mode
//     const [editData, setEditData] = useState<Project | null>(null); // Store the data to edit
//     const [projectData, setProjectData] = useState<Project[]>([]); // Store the list of projects

//     const handleSaveProjectTemplate = (data: { projectName: string; projectCategory: string; allowManualLogs: boolean; summary: string; notes: string }) => {
//         if (isEditMode && editData) {
//             // Update the existing item
//             setProjectData((prevData) =>
//                 prevData.map((item) =>
//                     item.projectName === editData.projectName
//                         ? { ...item, projectName: data.projectName, projectCategory: data.projectCategory }
//                         : item
//                 )
//             );
//         } else {
//             // Add a new item
//             setProjectData((prevData) => [
//                 ...prevData,
//                 {
//                     projectName: data.projectName,
//                     members: 'N/A', // Update dynamically if needed
//                     projectCategory: data.projectCategory,
//                 },
//             ]);
//         }

//         // Reset the modal state
//         setIsModalOpen(false); // Close the modal
//         setIsEditMode(false); // Reset edit mode
//         setEditData(null); // Clear edit data
//     };

//     const handleAction = (action: string, projectName: string) => {
//         if (action === 'Edit') {
//             const itemToEdit = projectData.find((item) => item.projectName === projectName);
//             if (itemToEdit) {
//                 setEditData(itemToEdit); // Set the data to edit
//                 setIsEditMode(true); // Enable edit mode
//                 setIsModalOpen(true); // Open the modal
//             }
//         } else if (action === 'Delete') {
//             setProjectData((prevData) => prevData.filter((item) => item.projectName !== projectName));
//         } else if (action === 'Create Project') {
//             setIsCustomerEditModalOpen(true); // Open the CustomerEditModal
//         } else {
//             console.log(`${action} clicked for project: ${projectName}`);
//         }
//     };

//     const handleAddProject = (project: Project): void => {
//         console.log('Adding project:', project);

//         // Ensure the project object has all required fields
//         if (!project.projectName || !project.projectCategory) {
//             console.error('Project Name and Project Category are required.');
//             return;
//         }

//         // Add the new project to the projectData state
//         setProjectData((prevData) => [
//             ...prevData,
//             {
//                 projectName: project.projectName,
//                 members: project.members || 'N/A', // Default to 'N/A' if members are not provided
//                 projectCategory: project.projectCategory,
//             },
//         ]);
//         setIsCustomerEditModalOpen(false); // Close the CustomerEditModal after adding the project
//     };

//     useEffect(() => {
//         if (!isModalOpen) {
//             setEditData(null); // Clear edit data
//         }
//     }, [isModalOpen]);

//     return (
//         <>
//             <Card stretch>
//                 <CardHeader borderSize={1}>
//                     <CardTitle tag="div" className="h3">
//                         Project Template
//                     </CardTitle>
//                     <CardActions>
//                         <Button
//                             icon="Add"
//                             color="primary"
//                             isLight
//                             onClick={() => {
//                                 setIsEditMode(false); // Disable edit mode
//                                 setEditData(null); // Clear edit data
//                                 setIsModalOpen(true); // Open the modal
//                             }}
//                         >
//                             Add Project Template
//                         </Button>
//                     </CardActions>
//                 </CardHeader>
//                 <CardBody className="table-responsive" isScrollable={isFluid}>
//                     <table className="table table-modern">
//                         <thead>
//                             <tr>
//                                 <th>Project Name</th>
//                                 <th>Members</th>
//                                 <th>Project Category</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {projectData.length === 0 ? (
//                                 <tr>
//                                     <td colSpan={4} className="text-center">
//                                         No data available in table
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 dataPagination(projectData, currentPage, perPage).map((item: Project) => (
//                                     <tr key={item.projectName}>
//                                         <td>{item.projectName}</td>
//                                         <td>{item.members}</td>
//                                         <td>{item.projectCategory}</td>
//                                         <td>
//                                             <div className="dropdown">
//                                                 <button
//                                                     className="btn btn-light dropdown-toggle"
//                                                     type="button"
//                                                     id={`dropdownMenuButton-${item.projectName}`}
//                                                     data-bs-toggle="dropdown"
//                                                     aria-expanded="false"
//                                                 >
//                                                     <Icon icon="MoreVert" />
//                                                 </button>
//                                                 <ul
//                                                     className="dropdown-menu"
//                                                     aria-labelledby={`dropdownMenuButton-${item.projectName}`}
//                                                 >
//                                                     <li>
//                                                         <button
//                                                             className="dropdown-item"
//                                                             onClick={() => handleAction('View', item.projectName)}
//                                                         >
//                                                             <Icon icon="Visibility" className="me-2" />
//                                                             View
//                                                         </button>
//                                                     </li>
//                                                     <li>
//                                                         <button
//                                                             className="dropdown-item"
//                                                             onClick={() => handleAction('Create Project', item.projectName)}
//                                                         >
//                                                             <Icon icon="Add" className="me-2" />
//                                                             Create Project
//                                                         </button>
//                                                     </li>
//                                                     <li>
//                                                         <button
//                                                             className="dropdown-item"
//                                                             onClick={() => handleAction('Edit', item.projectName)}
//                                                         >
//                                                             <Icon icon="Edit" className="me-2" />
//                                                             Edit
//                                                         </button>
//                                                     </li>
//                                                     <li>
//                                                         <button
//                                                             className="dropdown-item text-danger"
//                                                             onClick={() => handleAction('Delete', item.projectName)}
//                                                         >
//                                                             <Icon icon="Delete" className="me-2" />
//                                                             Delete
//                                                         </button>
//                                                     </li>
//                                                 </ul>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </CardBody>
//                 <PaginationButtons
//                     data={projectData}
//                     label="items"
//                     setCurrentPage={setCurrentPage}
//                     currentPage={currentPage}
//                     perPage={perPage}
//                     setPerPage={setPerPage}
//                 />
//             </Card>
//             <AddProjectTemplateModal
//                 isOpen={isModalOpen}
//                 onClose={() => {
//                     setIsModalOpen(false); // Close the modal
//                     setIsEditMode(false); // Reset edit mode
//                     setEditData(null); // Clear edit data
//                 }}
//                 onSave={handleSaveProjectTemplate}
//                 editData={isEditMode && editData ? { projectName: editData.projectName, projectCategory: editData.projectCategory } : undefined}
//             />
//             <CustomerEditModal
//                 setIsOpen={setIsCustomerEditModalOpen}
//                 isOpen={isCustomerEditModalOpen}
//                 onAddProject={handleAddProject}
//             />
//         </>
//     );
// };

// const WrappedProjectTemplate: FC<ICommonUpcomingEventsProps> = (props) => (
//     <PageWrapper>
//         <ProjectTemplate {...props} />
//     </PageWrapper>
// );

// export default WrappedProjectTemplate;