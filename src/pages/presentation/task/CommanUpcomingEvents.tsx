// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable prettier/prettier */
// import React, { FC, useState ,useEffect} from 'react';
// import classNames from 'classnames';
// import dayjs from 'dayjs';
// import { FormikHelpers, useFormik } from 'formik';
// import Card, {
// 	CardActions,
// 	CardBody,
// 	CardHeader,
// 	CardLabel,
// 	CardTitle,
// } from '../../components/bootstrap/Card';
// import Button from '../../components/bootstrap/Button';
// import { priceFormat } from '../../helpers/helpers';
// import Dropdown, {
// 	DropdownItem,
// 	DropdownMenu,
// 	DropdownToggle,
// } from '../../components/bootstrap/Dropdown';
// import Icon from '../../components/icon/Icon';
// import FormGroup from '../../components/bootstrap/forms/FormGroup';
// import Input from '../../components/bootstrap/forms/Input';
// import Textarea from '../../components/bootstrap/forms/Textarea';
// import Checks from '../../components/bootstrap/forms/Checks';
// import Popovers from '../../components/bootstrap/Popovers';
// import data from '../../common/data/dummyEventsData';
// import USERS from '../../common/data/userDummyData';
// import EVENT_STATUS from '../../common/data/enumEventStatus';
// import Avatar from '../../components/Avatar';
// import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
// import useSortableData from '../../hooks/useSortableData';
// import useDarkMode from '../../hooks/useDarkMode';
// import { demoPagesMenu } from "../../menu";
// import ProjectEditModal from './ProjectEditModal';
// import { Modal, ModalTitle } from 'react-bootstrap';

// import SubHeader, {
//     SubHeaderLeft,
//     SubHeaderRight,
//     SubheaderSeparator,
// } from '../../layout/SubHeader/SubHeader';
// import { useNavigate } from 'react-router-dom';
// import TaskDetailsModal from './TaskDeatilsmodal';
// interface ICommonUpcomingEventsProps {
// 	isFluid?: boolean;
// }
// interface Employee {
// 	id: number;
// 	name: string;
// 	email: string;
// 	role: string;
// 	reportingTo: string;
// 	status: { name: string; color: string };
// }

// const LOCAL_STORAGE_KEY = 'commonUpcomingEvents_employees';

// const CommanUpcomingEvents: FC<ICommonUpcomingEventsProps> = ({ isFluid }) => {
//     const { themeStatus, darkModeStatus } = useDarkMode();
//     const [tableData, setTableData] = useState<any[]>([]); // State to store table data
//     const [selectedTask, setSelectedTask] = useState<any | null>(null);
//     const [isViewModalOpen, setIsViewModalOpen] = useState(false);

//     const navigate = useNavigate();
//      const [columns, setColumns] = useState([
//             'Incomplete',
//             'To Do',
//             'Doing',
//             'Complete',
//             'Waiting for Approval',
//         ]);

//     // Removed duplicate handleSaveTask function to avoid redeclaration error

//     // const [employees, setEmployees] = useState(() => {
//     //     try {
//     //         const savedEmployees = localStorage.getItem(LOCAL_STORAGE_KEY);
//     //         return savedEmployees
//     //             ? JSON.parse(savedEmployees)
//     //             : [
//     //                   {
//     //                       id: 1,
//     //                       name: 'John Doe',
//     //                       email: 'john.doe@example.com',
//     //                       role: 'Manager',
//     //                       reportingTo: 'Jane Smith',
//     //                       status: { name: 'Active', color: 'success' },
//     //                   },
//     //               ];
//     //     } catch (error) {
//     //         console.error('Failed to load employees from localStorage:', error);
//     //         return [
//     //             {
//     //                 id: 1,
//     //                 name: 'John Doe',
//     //                 email: 'john.doe@example.com',
//     //                 role: 'Manager',
//     //                 reportingTo: 'Jane Smith',
//     //                 status: { name: 'Active', color: 'success' },
//     //             },
//     //         ];
//     //     }
//     // });

//     // useEffect(() => {
//     //     if (employees && employees.length > 0) {
//     //         localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(employees));
//     //     }
//     // }, [employees]);
//     const handleSaveTask = (formData: any) => {
//         if (!formData.title || !formData.startDate || !formData.dueDate) {
//             alert('Please fill in all required fields.');
//             return;
//         }
    
//         setTableData((prevData) => [
//             ...prevData,
//             {
//                 ...formData,
//                 status: formData.status || 'Incomplete', // Default status if not provided
//             },
//         ]);
//         setIsModalOpen(false); // Close the modal after saving
//     };

//     // Function to handle status change
//     const handleStatusChange = (index: number, newStatus: string) => {
//         setTableData((prevData) =>
//             prevData.map((task, i) =>
//                 i === index ? { ...task, status: newStatus } : task
//             )
//         );
//     };
//     const handleAction = (index: number, action: string) => {
//         if (action === 'view') {
//             setSelectedTask(tableData[index]); // Set the selected task
//             setIsViewModalOpen(true); // Open the modal
//         } else if (action === 'edit') {
//             setSelectedTask({ ...tableData[index], index }); // Pass the task and its index
//             setEditingIndex(index); // Set the index of the row being edited
//             setIsModalOpen(true);
//         } else if (action === 'duplicate') {
//             setSelectedTask({ ...tableData[index] }); // Pre-fill the form with the duplicated task's data
//             setEditingIndex(null); // Ensure a new row is created
//             setIsModalOpen(true); // Open the modal
//         } else if (action === 'delete') {
//             setTableData((prevData) => prevData.filter((_, i) => i !== index));
//         }
//     };
//     const handleAddEmployee = (newEmployee: {
//         id: number;
//         name: string;
//         email: string;
//         role: string;
//         reportingTo: string;
//         status: { name: string; color: string };
//     }) => {
//         if (
//             newEmployee &&
//             newEmployee.id &&
//             newEmployee.name &&
//             newEmployee.email &&
//             newEmployee.role &&
//             newEmployee.reportingTo &&
//             newEmployee.status
//         ) {
// 			// setEmployees((prevEmployees: Employee[]) => [...prevEmployees, newEmployee]);


//             setIsProjectModalOpen(false);
//         } else {
//             console.error('Invalid employee data:', newEmployee);
//             alert('Failed to add employee. Please check the input data.');
//         }
//     };

//     const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false); // Added state for isModalOpen
//     const [defaultStatus, setDefaultStatus] = useState('');
//     const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track the row being edited
//     const [defaultValues, setDefaultValues] = useState(null);
//     const [isPinModalOpen, setIsPinModalOpen] = useState(false); // Track if the pin confirmation modal is open
// const [pinningIndex, setPinningIndex] = useState<number | null>(null); // Track the row being pinned

// const handlePinTask = (index: number) => {
//     setTableData((prevData) => {
//         const updatedData = prevData.map((row, i) =>
//             i === index ? { ...row, isPinned: !row.isPinned } : row
//         );

//         // Sort the table so pinned rows are at the top
//         return updatedData.sort((a, b) => (b.isPinned ? -1 : 1));
//     });

//     // Only show the confirmation modal for pinning, not unpinning
//     if (!tableData[index].isPinned) {
//         setPinningIndex(index); // Set the index of the row being pinned
//         setIsPinModalOpen(true); // Open the confirmation modal
//     }
// };

// const confirmPinTask = () => {
//     if (pinningIndex !== null) {
//         setTableData((prevData) => {
//             const updatedData = prevData.map((row, i) =>
//                 i === pinningIndex ? { ...row, isPinned: true } : row
//             );

//             // Sort the table so pinned rows are at the top
//             return updatedData.sort((a, b) => (b.isPinned ? -1 : 1));
//         });
//     }
//     setIsPinModalOpen(false); // Close the confirmation modal
//     setPinningIndex(null); // Reset the pinning index
// };
//     const handleEdit = (index: number) => {
//         setEditingIndex(index); // Set the index of the row being edited
//         setDefaultValues(tableData[index]); // Pass the row data to the modal
//         setIsModalOpen(true);
//     };
//     // const [isProjectModalOpen2, setIsProjectModalOpen2] = useState(false);
//     const handleAddTask = (taskData: any) => {
//         console.log('Task Data:', taskData); // Log the task data
//         // Add logic to save the task
//     };
//     const openModalWithStatus = (status: string) => {
//         setDefaultStatus(status); // Set the default status
//         setIsModalOpen(true); // Open the modal
//     };
//     const handleModalSubmit = (updatedData: any, index: number | null) => {
//         if (index !== null) {
//             // Update the existing row
//             setTableData((prevData) =>
//                 prevData.map((row, i) => (i === index ? updatedData : row))
//             );
//         } else {
//             // Add a new row
//             setTableData((prevData) => [...prevData, updatedData]);
//         }
//         setIsModalOpen(false);
//     };
    


//     // const defaultStatus = { name: 'Pending', color: 'warning' }; // Define defaultStatus

//     return (
//         <>
//             <Card stretch={isFluid}>
//             <SubHeader>
//                 <SubHeaderLeft>
//                     <Button
//                         icon="Add"
//                         color="primary"
//                         isLight
//                         className="btn-icon-only"
//                         onClick={() => openModalWithStatus('Incomplete')}
//                     >
//                         Add Tasks
//                     </Button>
// 					<Button icon='Layers' color='primary' isLight >
// 						My Task
// 					</Button>
// 							<Button
// 								color='info'
// 								icon='CloudDownload'
// 								isLight
// 								tag='a'
// 								to='/somefile.txt'
// 								target='_blank'
// 								download>
// 								Export
// 							</Button>

//                 </SubHeaderLeft>
// 				<SubHeaderRight>
// 				<Button
//         icon="List"
//         color="primary" isLight
//         className="me-2"
//     >
//         {/* Left Icon Button */}
//     </Button>
//     <Button
//                     icon="Assessment" // Replace with a valid icon name
//                     color="primary" isLight
//                     className="me-2"
//                     onClick={() => navigate('/TaskManagementPage')} // Navigate to the desired page
//                 >
//                     {/* Right Icon Button */}
//                 </Button>
// <Button
//     icon="CalendarToday" // Replace with a valid icon name
//     color="primary" isLight
//     className="me-2"
//     onClick={() => navigate('/calendar')} // Navigate to the desired page
// >
//     {/* Right Icon Button */}
// </Button>

// <Button
//     icon="AssignmentLate" // Replace with a valid icon name
//    color="primary" isLight
//     className="me-2"
//     onClick={() => navigate(`${demoPagesMenu.listPages.subMenu.listBoxed.path}`)} // Navigate to the desired page
// >

//     {/* Right Icon Button */}
// </Button>
// 				</SubHeaderRight>
//             </SubHeader>
                     
//                 <CardBody className="table-responsive" isScrollable={isFluid}>
//                     <table className="table table-modern">
//                         <thead>
//                             <tr>
//                                 <th>Code</th>
//                                 <th>Task</th>
//                                 <th>Completed On</th>
//                                 <th>Start Date</th>
//                                 <th>Due Date</th>
//                                 <th>Estimate Time</th>
//                                 <th>Hours Logged</th>
//                                 <th>Assigned To</th>
//                                 <th>Stauts</th>
//                                 <th>Action</th>
//                             </tr>

//                         </thead>
//                         <tbody>
//     {tableData.length > 0 ? (
//         tableData.map((task, index) => (
//             <tr key={index}>
//                 <td>--</td>
//                 <td>
//                     {task.title}
//                     {task.isPinned && (
//                         <div className="text-primary mt-1">
//                             <strong>Pinned</strong>
//                         </div>
//                     )}
//                 </td>
//                 <td>--</td>
//                 <td>{task.startDate}</td>
//                 <td>{task.dueDate}</td>
//                 <td>--</td>
//                 <td>--</td>
//                 <td>--</td>


//                 <td>
//     <Dropdown>
//         <DropdownToggle>
//             <span className="d-flex align-items-center">
//                 <span
//                     className="me-2"
//                     style={{
//                         width: '10px',
//                         height: '10px',
//                         borderRadius: '50%',
//                         backgroundColor:
//                             task.status === 'Incomplete'
//                                 ? 'red'
//                                 : task.status === 'Complete'
//                                 ? 'green'
//                                 : 'orange',
//                     }}
//                 ></span>
//                 {task.status}
//             </span>
//         </DropdownToggle>
//         <DropdownMenu>
//             <DropdownItem onClick={() => handleStatusChange(index, 'Incomplete')}>
//                 <span className="d-flex align-items-center">
//                     <span
//                         className="me-2"
//                         style={{
//                             width: '10px',
//                             height: '10px',
//                             borderRadius: '50%',
//                             backgroundColor: 'red',
//                         }}
//                     ></span>
//                     Incomplete
//                 </span>
//             </DropdownItem>
//             <DropdownItem onClick={() => handleStatusChange(index, 'To Do')}>
//                 <span className="d-flex align-items-center">
//                     <span
//                         className="me-2"
//                         style={{
//                             width: '10px',
//                             height: '10px',
//                             borderRadius: '50%',
//                             backgroundColor: 'yellow',
//                         }}
//                     ></span>
//                     To Do
//                 </span>
//             </DropdownItem>
//             <DropdownItem onClick={() => handleStatusChange(index, 'Doing')}>
//                 <span className="d-flex align-items-center">
//                     <span
//                         className="me-2"
//                         style={{
//                             width: '10px',
//                             height: '10px',
//                             borderRadius: '50%',
//                             backgroundColor: 'blue',
//                         }}
//                     ></span>
//                     Doing
//                 </span>
//             </DropdownItem>
//             <DropdownItem onClick={() => handleStatusChange(index, 'Complete')}>
//                 <span className="d-flex align-items-center">
//                     <span
//                         className="me-2"
//                         style={{
//                             width: '10px',
//                             height: '10px',
//                             borderRadius: '50%',
//                             backgroundColor: 'green',
//                         }}
//                     ></span>
//                     Complete
//                 </span>
//             </DropdownItem>
//         </DropdownMenu>
//     </Dropdown>
// </td>
// <td>
//     <Dropdown>
//         <DropdownToggle hasIcon={false}>
//             <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
//         </DropdownToggle>
//         <DropdownMenu isAlignmentEnd>
//             <Button
//                 color="link"
//                 className="dropdown-item"
//                 onClick={() => handleAction(index, 'view')}
//             >
//                 <Icon icon="RemoveRedEye" className="me-2" /> View
//             </Button>
//             <Button
//                 color="link"
//                 className="dropdown-item"
//                 onClick={() => handleEdit(index)}
//             >
//                 <Icon icon="Edit" className="me-2" /> Edit
//             </Button>
//             <Button
//                 color="link"
//                 className="dropdown-item"
//                 onClick={() => handleAction(index, 'duplicate')}
//             >
//                 <Icon icon="ContentCopy" className="me-2" /> Duplicate
//             </Button>
//             <Button
//     color="link"
//     className="dropdown-item"
//     onClick={() => handlePinTask(index)}
// >
//     <Icon icon="PushPin" className="me-2" />
//     {task.isPinned ? "Unpin Task" : "Pin Task"}
// </Button>
//             <Button
//                 color="link"
//                 className="dropdown-item text-danger"
//                 onClick={() => handleAction(index, 'delete')}
//             >
//                 <Icon icon="Delete" className="me-2" /> Delete
//             </Button>
//         </DropdownMenu>
//     </Dropdown>
// </td>
//             </tr>
//         ))
//     ) : (
//         <tr>
//             <td colSpan={9} className="text-center">
//                 No tasks available.
//             </td>
//         </tr>
//     )}
// </tbody>
//                     </table>
//                 </CardBody>
//             </Card>
//             <ProjectEditModal
//                 isOpen={isModalOpen}
//                 setIsOpen={setIsModalOpen}
//                 onSubmit={(data) => handleModalSubmit(data, editingIndex)} // Pass index to onSubmit
//                 defaultValues={selectedTask} // Pass default values for editing
//                 defaultStatus={defaultStatus}
//                 columns={columns} // Pass the columns array
//             />
//             <TaskDetailsModal
//     task={selectedTask}
//     isOpen={isViewModalOpen}
//     onClose={() => setIsViewModalOpen(false)}
// />
// <Modal show={isPinModalOpen} onHide={() => setIsPinModalOpen(false)}>
//     <Modal.Header closeButton>
//         <ModalTitle>Are you sure?</ModalTitle>
//     </Modal.Header>
//     <Modal.Body>
//         Do you want to pin this task?
//     </Modal.Body>
//     <Modal.Footer>
//         <Button color="secondary" onClick={() => setIsPinModalOpen(false)}>
//             Cancel
//         </Button>
//         <Button color="primary" onClick={confirmPinTask}>
//             Yes, Pin It!
//         </Button>
//     </Modal.Footer>
// </Modal>
           
//         </>
//     );
// };

// export default CommanUpcomingEvents;
