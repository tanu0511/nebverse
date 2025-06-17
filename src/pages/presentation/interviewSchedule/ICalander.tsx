// import React, { useState } from 'react';
// import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
// import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
// import Page from '../../../layout/Page/Page';
// import Button from '../../../components/bootstrap/Button';
// import Icon from '../../../components/icon/Icon';
// import Input from '../../../components/bootstrap/forms/Input';
// import Dropdown, { DropdownMenu, DropdownToggle} from '../../../components/bootstrap/Dropdown';
// import AddInterviewScheduleModal from './AddInterviewScheduleModal';
// import RescheduleInterviewModal from './RescheduleInterviewModal';
// import ViewInterviewScheduleModal from './ViewInterviewScheduleModal';

// function getCalendarMatrix(year: number, month: number) {
//   const firstDay = new Date(year, month, 1);
//   const lastDay = new Date(year, month + 1, 0);
//   const matrix: (number | '')[][] = [];
//   let week: (number | '')[] = new Array(7).fill('');
//   let dayOfWeek = firstDay.getDay();
//   for (let i = 1; i <= lastDay.getDate(); i++) {
//     week[dayOfWeek] = i;
//     if (dayOfWeek === 6 || i === lastDay.getDate()) {
//       matrix.push([...week]);
//       week = new Array(7).fill('');
//     }
//     dayOfWeek = (dayOfWeek + 1) % 7;
//   }
//   return matrix;
// }

// const HOURS = Array.from({ length: 24 }, (_, i) => `${i === 0 ? '12am' : i < 12 ? `${i}am` : i === 12 ? '12pm' : `${i - 12}pm`}`);

// const ICalander = () => {
//   const today = new Date();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [addModalOpen, setAddModalOpen] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
//   const [viewModalOpen, setViewModalOpen] = useState(false);
//   const [currentMonth, setCurrentMonth] = useState(today.getMonth());
//   const [currentYear, setCurrentYear] = useState(today.getFullYear());
//   const [view, setView] = useState<'month' | 'week' | 'day' | 'list'>('month');
//   const [, setEditIndex] = useState<number | null>(null);
//   const [rescheduleItem, setRescheduleItem] = useState<any>(null);
//   const [viewItem] = useState<any>(null);
//   const [, setEditData] = useState<any>(null);

//   const [schedules, setSchedules] = useState<{
//     id: any;
//     job: string;
//     candidate: string;
//     interviewer: string;
//     round: string;
//     interviewType: string;
//     startOn: string;
//     startTime: string;
//     commentInterviewer: string;
//     notifyCandidate: boolean;
//     commentCandidate: string;
//     sendReminder: boolean;
//     remindBefore: string;
//     remindUnit: string;
//   }[]>([]);

//   // Helper: get events for the current month from schedules
//   const getMonthEvents = () => {
//     return schedules
//       .filter(item => {
//         if (!item.startOn) return false;
//         const date = new Date(item.startOn);
//         return (
//           date.getFullYear() === currentYear &&
//           date.getMonth() === currentMonth
//         );
//       })
//       .map(item => {
//         const date = new Date(item.startOn);
//         // Try to parse hour/minute from item.startTime
//         let hour = undefined, minute = undefined;
//         if (item.startTime) {
//           const match = item.startTime.match(/(\d+):(\d+)\s*(am|pm)/i);
//           if (match) {
//             hour = parseInt(match[1], 10);
//             minute = parseInt(match[2], 10);
//             if (/pm/i.test(match[3]) && hour < 12) hour += 12;
//             if (/am/i.test(match[3]) && hour === 12) hour = 0;
//           }
//         }
//         return {
//           day: date.getDate(),
//           label: `${item.startTime || ''} ${item.candidate}`,
//           hour,
//           minute,
//           candidate: item.candidate,
//           startOn: item.startOn,
//           startTime: item.startTime,
//         };
//       });
//   };

//   const monthEvents = getMonthEvents();

//   // Helper: get events for the current week from schedules
//   const getWeekEvents = () => {
//     return schedules
//       .filter(item => {
//         if (!item.startOn) return false;
//         const date = new Date(item.startOn);
//         return (
//           date >= currentWeekStart &&
//           date < new Date(currentWeekStart.getTime() + 7 * 24 * 60 * 60 * 1000)
//         );
//       })
//       .map(item => {
//         const date = new Date(item.startOn);
//         let hour = undefined, minute = undefined;
//         if (item.startTime) {
//           const match = item.startTime.match(/(\d+):(\d+)\s*(am|pm)/i);
//           if (match) {
//             hour = parseInt(match[1], 10);
//             minute = parseInt(match[2], 10);
//             if (/pm/i.test(match[3]) && hour < 12) hour += 12;
//             if (/am/i.test(match[3]) && hour === 12) hour = 0;
//           }
//         }
//         return {
//           date,
//           day: date.getDate(),
//           hour,
//           minute,
//           label: `${item.startTime || ''} ${item.candidate}`,
//           candidate: item.candidate,
//         };
//       });
//   };

//   const weekEvents = getWeekEvents();

//   // Helper: get events for the current day from schedules
//   const getDayEvents = () => {
//     return schedules
//       .filter(item => {
//         if (!item.startOn) return false;
//         const date = new Date(item.startOn);
//         return (
//           date.getFullYear() === today.getFullYear() &&
//           date.getMonth() === today.getMonth() &&
//           date.getDate() === today.getDate()
//         );
//       })
//       .map(item => {
//         let hour = undefined, minute = undefined;
//         if (item.startTime) {
//           const match = item.startTime.match(/(\d+):(\d+)\s*(am|pm)/i);
//           if (match) {
//             hour = parseInt(match[1], 10);
//             minute = parseInt(match[2], 10);
//             if (/pm/i.test(match[3]) && hour < 12) hour += 12;
//             if (/am/i.test(match[3]) && hour === 12) hour = 0;
//           }
//         }
//         return {
//           hour,
//           minute,
//           label: `${item.startTime || ''} ${item.candidate}`,
//           candidate: item.candidate,
//         };
//       });
//   };

//   const dayEvents = getDayEvents();

//   // Helper: group events by date for list view
//   const getListEvents = () => {
//     const grouped: { [date: string]: typeof schedules } = {};
//     schedules.forEach(item => {
//       if (!item.startOn) return;
//       const date = new Date(item.startOn);
//       const key = date.toDateString();
//       if (!grouped[key]) grouped[key] = [];
//       grouped[key].push(item);
//     });
//     return grouped;
//   };

//   const listEvents = getListEvents();

//   function handleSearch(value: string) {
//     setSearchTerm(value);
//   }

//   function handlePrev() {
//     if (view === 'month') {
//       if (currentMonth === 0) {
//         setCurrentMonth(11);
//         setCurrentYear(currentYear - 1);
//       } else {
//         setCurrentMonth(currentMonth - 1);
//       }
//     } else if (view === 'week') {
//       setCurrentWeekStart(prev => {
//         const prevDate = new Date(prev);
//         prevDate.setDate(prevDate.getDate() - 7);
//         return prevDate;
//       });
//     }
//   }

//   function handleNext() {
//     if (view === 'month') {
//       if (currentMonth === 11) {
//         setCurrentMonth(0);
//         setCurrentYear(currentYear + 1);
//       } else {
//         setCurrentMonth(currentMonth + 1);
//       }
//     } else if (view === 'week') {
//       setCurrentWeekStart(prev => {
//         const nextDate = new Date(prev);
//         nextDate.setDate(nextDate.getDate() + 7);
//         return nextDate;
//       });
//     }
//   }

//   function handleToday() {
//     setCurrentMonth(today.getMonth());
//     setCurrentYear(today.getFullYear());
//     setCurrentWeekStart(getStartOfWeek(today));
//   }

//   // --- Week View Logic ---
//   function getStartOfWeek(date: Date) {
//     const d = new Date(date);
//     const day = d.getDay();
//     d.setDate(d.getDate() - day);
//     d.setHours(0, 0, 0, 0);
//     return d;
//   }
//   const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(today));
//   const weekDays = Array.from({ length: 7 }, (_, i) => {
//     const d = new Date(currentWeekStart);
//     d.setDate(d.getDate() + i);
//     return d;
//   });

//   const monthNames = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];
//   const calendarDays = getCalendarMatrix(currentYear, currentMonth);


//   return (
//     <><PageWrapper title="InterviewSchedule">
//           <SubHeader>
//               <SubHeaderLeft>
//                   <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
//                       <Icon icon="Search" size="2x" color="primary" />
//                   </label>
//                   <Input
//                       id="searchInput"
//                       type="search"
//                       className="border-0 shadow-none bg-transparent"
//                       placeholder="Search Interview Schedule..."
//                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
//                       value={searchTerm} />
//               </SubHeaderLeft>
//               <SubHeaderRight>
//                   <Button
//                       icon='Add'
//                       color='primary'
//                       isLight
//                       onClick={() => setAddModalOpen(true)}
//                   >
//                       Add interview Schedule
//                   </Button>
//                   <Button
//                       icon='FormatListBulleted'
//                       className="input-group-text"
//                       color='primary'
//                       isLight />
//                   <Button
//                       icon='CalendarToday'
//                       className="input-group-text"
//                       color='primary'
//                       isLight />
//               </SubHeaderRight>
//           </SubHeader>
//           <Page>
//               <div className="row h-100">
//                   <div className="col-9">
//                       <div className="bg-white rounded p-3" style={{ minHeight: 600 }}>
//                           <div className="d-flex justify-content-between align-items-center mb-3">
//                               <div>
//                                   <Button color="light" isLight className="me-2" onClick={handlePrev}>
//                                       <Icon icon="ChevronLeft" />
//                                   </Button>
//                                   <Button color="light" isLight onClick={handleNext}>
//                                       <Icon icon="ChevronRight" />
//                                   </Button>
//                                   <Button color="light" isLight className="ms-3" onClick={handleToday}>
//                                       today
//                                   </Button>
//                               </div>
//                               <div className="fw-bold">
//                                   {view === 'month'
//                                       ? `${monthNames[currentMonth]} ${currentYear}`
//                                       : view === 'week'
//                                           ? `${monthNames[weekDays[0].getMonth()]} ${weekDays[0].getDate()} - ${weekDays[6].getMonth() === weekDays[0].getMonth() ? '' : `${monthNames[weekDays[6].getMonth()]} `}${weekDays[6].getDate()}, ${weekDays[6].getFullYear()}
//                     : ''}
//                 </div>
//                 <div>
//                   <Button color={view === 'month' ? 'primary' : 'light'} isLight className={` : }me-1${view === 'month' ? ' active' : ''}`} onClick={() => setView('month')}>
//                                   month
//                               </Button>
//                               <Button color={view === 'week' ? 'primary' : 'light'} isLight className={me - 1} $ {...view === 'week' ? ' active' : ''} />} onClick={() => setView('week')}>
//                               week
//                           </Button>
//                           <Button color={view === 'day' ? 'primary' : 'light'} isLight className={me - 1} $ {...view === 'day' ? ' active' : ''} />} onClick={() => setView('day')}>
//                           day
//                       </Button>
//                       <Button color={view === 'list' ? 'primary' : 'light'} isLight className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>
//                           list
//                       </Button>
//                   </div>
//               </div>
//               {view === 'month' && (
//                   <table className="table table-bordered text-center mb-0" style={{ tableLayout: 'fixed' }}>
//                       <thead>
//                           <tr>
//                               <th>Sun</th>
//                               <th>Mon</th>
//                               <th>Tue</th>
//                               <th>Wed</th>
//                               <th>Thu</th>
//                               <th>Fri</th>
//                               <th>Sat</th>
//                           </tr>
//                       </thead>
//                       <tbody>
//                           {calendarDays.map((week, i) => (
//                               <tr key={i}>
//                                   {week.map((day, j) => (
//                                       <td key={j} style={{ height: 80, verticalAlign: 'top', padding: 4 }}>
//                                           {day}
//                                           {typeof day === 'number' &&
//                                               monthEvents
//                                                   .filter(e => e.day === day)
//                                                   .map((e, idx) => (
//                                                       <div
//                                                           key={idx}
//                                                           className="bg-primary text-white rounded mt-2 px-2"
//                                                           style={{ fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
//                                                       >
//                                                           {e.label}
//                                                       </div>
//                                                   ))}
//                                       </td>
//                                   ))}
//                               </tr>
//                           ))}
//                       </tbody>
//                   </table>
//               )}
//               {view === 'week' && (
//                   <div style={{ overflowX: 'auto' }}>
//                       <table className="table table-bordered text-center mb-0" style={{ minWidth: 1200 }}>
//                           <thead>
//                               <tr>
//                                   <th style={{ width: 70 }}>all-day</th>
//                                   {weekDays.map((d, i) => (
//                                       <th key={i}>{$}{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()]} ${d.getMonth() + 1}/${d.getDate()}}</th>
//                                   ))}
//                               </tr>
//                           </thead>
//                           <tbody>
//                               {HOURS.map((hour, rowIdx) => (
//                                   <tr key={hour}>
//                                       <td style={{ width: 70, fontSize: 12, textAlign: 'right', paddingRight: 8 }}>{hour}</td>
//                                       {weekDays.map((d, colIdx) => {
//                                           const events = weekEvents.filter(
//                                               e => e.date.getDate() === d.getDate() &&
//                                                   e.date.getMonth() === d.getMonth() &&
//                                                   e.hour === rowIdx
//                                           );
//                                           return (
//                                               <td key={colIdx} style={{ height: 32, verticalAlign: 'top', padding: 0 }}>
//                                                   {events.map((event, idx) => (
//                                                       <div
//                                                           key={idx}
//                                                           className="bg-primary text-white rounded px-2 mb-1"
//                                                           style={{ fontSize: 12, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
//                                                       >
//                                                           {event.label.split(' ').map((txt, i) => <div key={i}>{txt}</div>)}
//                                                       </div>
//                                                   ))}
//                                               </td>
//                                           );
//                                       })}
//                                   </tr>
//                               ))}
//                           </tbody>
//                       </table>
//                   </div>
//               )}
//               {view === 'day' && (
//                   <div style={{ overflowX: 'auto' }}>
//                       <table className="table table-bordered text-center mb-0" style={{ minWidth: 900 }}>
//                           <thead>
//                               <tr>
//                                   <th style={{ width: 70 }}>all-day</th>
//                                   <th>
//                                       {$}{monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}}
//                                       <div style={{ fontWeight: 400, fontSize: 14 }}>
//                                           {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][today.getDay()]}
//                                       </div>
//                                   </th>
//                               </tr>
//                           </thead>
//                           <tbody>
//                               {HOURS.map((hour, rowIdx) => (
//                                   <tr key={hour}>
//                                       <td style={{ width: 70, fontSize: 12, textAlign: 'right', paddingRight: 8 }}>{hour}</td>
//                                       <td style={{ height: 32, verticalAlign: 'top', padding: 0 }}>
//                                           {dayEvents.find(e => e.hour === rowIdx) && (
//                                               <div className="bg-primary text-white rounded px-2" style={{ fontSize: 12, margin: 0 }}>
//                                                   {dayEvents.find(e => e.hour === rowIdx)?.label.split(' ').map((txt, i) => <div key={i}>{txt}</div>)}
//                                               </div>
//                                           )}
//                                       </td>
//                                   </tr>
//                               ))}
//                           </tbody>
//                       </table>
//                   </div>
//               )}
//               {view === 'list' && (
//                   <div className="bg-white rounded" style={{ minHeight: 200 }}>
//                       {Object.keys(listEvents).length === 0 ? (
//                           <div className="text-muted p-3">No upcoming interview.</div>
//                       ) : (
//                           Object.entries(listEvents).map(([dateStr, items]) => (
//                               <div key={dateStr}>
//                                   <div className="d-flex justify-content-between align-items-center px-3 py-2" style={{ background: '#f3f4f6' }}>
//                                       <span className="fw-bold" style={{ color: '#888' }}>
//                                           {new Date(dateStr).toLocaleDateString(undefined, { weekday: 'long' })}
//                                       </span>
//                                       <span className="fw-bold" style={{ color: '#888' }}>
//                                           {new Date(dateStr).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
//                                       </span>
//                                   </div>
//                                   {items.map((item, idx) => (
//                                       <div
//                                           key={idx}
//                                           style={{
//                                               background: '#6c757d',
//                                               color: '#fff',
//                                               fontWeight: 400,
//                                               fontSize: 16,
//                                               padding: '8px 16px',
//                                               display: 'flex',
//                                               alignItems: 'center',
//                                               borderRadius: 12,
//                                               margin: 12,
//                                           }}
//                                       >
//                                           <span style={{ minWidth: 90 }}>{item.startTime}</span>
//                                           <span style={{ marginLeft: 32 }}>{item.candidate}</span>
//                                       </div>
//                                   ))}
//                               </div>
//                           ))
//                       )}
//                   </div>
//               )}
//           </div>
//       </div><div className="col-3">
//               <div className="bg-white rounded p-3" style={{ minHeight: 600 }}>
//                   <div className="fw-bold mb-2">Interview Schedule</div>
//                   {schedules.length === 0 ? (
//                       <div className="text-muted">No upcoming interview.</div>
//                   ) : (
//                       schedules.map((item: {
//                           job: string;
//                           candidate: string;
//                           interviewer: string;
//                           round: string;
//                           interviewType: string;
//                           startOn: string;
//                           startTime: string;
//                           commentInterviewer: string;
//                           notifyCandidate: boolean;
//                           commentCandidate: string;
//                           sendReminder: boolean;
//                           remindBefore: string;
//                           remindUnit: string;
//                       }, idx) => (
//                           <div key={idx} className="d-flex align-items-start mb-4 pb-3 border-bottom" style={{ gap: 16 }}>
//                               <div className="border rounded text-center px-2 py-1" style={{ minWidth: 48 }}>
//                                   <div style={{ fontSize: 13, color: '#6c757d', fontWeight: 500 }}>
//                                       {item.startOn.split(' ')[1] || ''}
//                                   </div>
//                                   <div style={{ fontSize: 18, fontWeight: 700 }}>
//                                       {item.startOn.split(' ')[2] || ''}
//                                   </div>
//                               </div>
//                               <div style={{ flex: 1 }}>
//                                   <div style={{ fontWeight: 600 }}>{item.candidate}</div>
//                                   <div style={{ fontSize: 13, color: '#6c757d' }}>
//                                       {item.startOn && item.startTime
//                                           ? $ : }{item.startOn.replace(/ /g, ' ')} , ${item.startTime}
//                                       : ''}
//                                   </div>
//                                   <div style={{ fontSize: 13 }}>{item.commentInterviewer}</div>
//                               </div>
//                               <div>
//                                   <Dropdown>
//                                       <DropdownToggle hasIcon={false}>
//                                           <Button icon="MoreHoriz" />
//                                       </DropdownToggle>
//                                       <DropdownMenu>
//                                           <Button
//                                               color="link"
//                                               className="dropdown-item"
//                                               onClick={() => {
//                                                   setEditIndex(idx);
//                                                   setEditData(item);
//                                                   setEditModalOpen(true);
//                                               } }
//                                           >
//                                               <Icon icon="Edit" className="me-2" /> Edit
//                                           </Button>
//                                           <Button
//                                               color="link"
//                                               className="dropdown-item"
//                                               onClick={() => {
//                                                   setRescheduleItem(item);
//                                                   setRescheduleModalOpen(true);
//                                               } }
//                                           >
//                                               <Icon icon="Autorenew" className="me-2" /> Reschedule Interview
//                                           </Button>
//                                           <Button
//                                               color="link"
//                                               className="dropdown-item text-danger"
//                                               onClick={() => { setSchedules(prev => prev.filter((_, i) => i !== idx)); } }
//                                           >
//                                               <Icon icon="Delete" className="me-2" /> Delete
//                                           </Button>
//                                       </DropdownMenu>
//                                   </Dropdown>
//                               </div>
//                           </div>
//                       ))
//                   )}
//               </div>
//           </div></>
//         </div>
//       </Page>
//       <AddInterviewScheduleModal
//         isOpen={addModalOpen}
//         setIsOpen={setAddModalOpen}
//         onSave={(data) => {
//           setSchedules(prev => [...prev, data]);
//           setAddModalOpen(false);
//         }}
//       />
//       <AddInterviewScheduleModal
//         isOpen={editModalOpen}
//         setIsOpen={(open) => {
//           setEditModalOpen(open);
//           if (!open) setEditData(null);
//         }}
//         onSave={(data) => {
//           setSchedules(prev =>
//             prev.map((s) =>
//               s.id === data.id ? data : s
//             )
//           );
//           setEditModalOpen(false);
//           setEditData(null);
//         }}
//       />
//       <RescheduleInterviewModal
//         isOpen={rescheduleModalOpen}
//         setIsOpen={setRescheduleModalOpen}
//         interview={rescheduleItem}
//         onSave={(updated) => {
//           setSchedules(prev =>
//             prev.map(item =>
//               item.id === updated.id
//                 ? { ...item, startOn: updated.startOn, startTime: updated.startTime }
//                 : item
//             )
//           );
//           setRescheduleModalOpen(false);
//           setRescheduleItem(null);
//         }}
//       />
//       <ViewInterviewScheduleModal
//         isOpen={viewModalOpen}
//         setIsOpen={setViewModalOpen}
//         data={viewItem}
//         onEdit={(item) => {
//           setEditData(item);
//           setEditModalOpen(true);
//           setViewModalOpen(false); // Optionally close the view modal
//         }}
//       />
//     </PageWrapper>
//   );
// };

// export default ICalander;