// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useMemo, useState } from 'react';
// import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar';
// import dayjs from 'dayjs';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
// import Button from '../../../components/bootstrap/Button';
// import { useNavigate } from 'react-router-dom';
// import ProjectEditModal from './ProjectEditModal';

// const localizer = dayjsLocalizer(dayjs);



// const getEmployeeColors = (events: any[]) => {
//     let colorMap: { [employee: string]: string } = {};
//     try {
//         colorMap = JSON.parse(localStorage.getItem('employeeColorMap') || '{}');
//     } catch {
//         colorMap = {};
//     }
//     let changed = false;
//     events.forEach(event => {
//         if (event.employee && !colorMap[event.employee]) {
//             colorMap[event.employee] = getRandomColor();
//             changed = true;
//         }
//     });
//     if (changed) {
//         localStorage.setItem('employeeColorMap', JSON.stringify(colorMap));
//     }
//     return colorMap;
// };

// interface CalendarEvent {
//     title: string;
//     employee: string;
//     start: Date;
//     end: Date;
//     allDay: boolean;
// }

// const CalenderPage: React.FC = () => {

//     // Read table data from localStorage and convert to calendar events


//     const employeeColors = useMemo(() => getEmployeeColors(events), [events]);
//     const [currentView, setCurrentView] = useState<string>(Views.MONTH); // Track the current view
//     const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
//     const [selectedTask, setSelectedTask] = useState<any>(null); // State to track the selected task



   

//     return (
//         <div className="container mt-4">
//             <SubHeader>
//                 <SubHeaderLeft>
//                     <Button
//                         icon="Add"
//                         color="primary"
//                         isLight
//                         className="btn-icon-only"
//                         onClick={handleAddTask}
//                     >
//                         Add Tasks
//                     </Button>
//                 </SubHeaderLeft>
//                 <SubHeaderRight>
//                     <Button
//                         icon="list"
//                         color="primary"
//                         isLight
//                         className="me-2"
//                         onClick={() => navigate('/hr-dashboard')}
//                     />
//                     <Button
//                         icon="Assessment"
//                         color="primary"
//                         isLight
//                         className="me-2"
//                         onClick={() => navigate('/TaskManagementPage')}
//                     />
//                     <Button
//                         icon="CalendarToday"
//                         color="primary"
//                         isLight
//                         className="me-2"
//                         onClick={() => navigate('/calendar')}
//                     />
//                     <Button
//                         icon="AssignmentLate"
//                         color="primary"
//                         isLight
//                         className="me-2"
//                         onClick={() => navigate('/some-other-page')}
//                     />
//                 </SubHeaderRight>
//             </SubHeader>
          
//             {/* <ProjectEditModal
//                 isOpen={isModalOpen}
//                 setIsOpen={setIsModalOpen}
//                 onSubmit={handleModalSubmit}
//                 defaultValues={selectedTask || {}}
//                 defaultStatus={selectedTask?.status || 'Pending'}
//                 columns={columns}
//             /> */}
//         </div>
//     );
// };

// export default CalenderPage;