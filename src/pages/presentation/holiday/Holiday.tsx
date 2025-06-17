import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { Calendar, dayjsLocalizer, View as TView, Views } from 'react-big-calendar';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Button from '../../../components/bootstrap/Button';
import Card, { CardActions, CardBody, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../../../components/bootstrap/Modal';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import Checks from '../../../components/bootstrap/forms/Checks';
import PaginationButtons, { dataPagination } from '../../../components/PaginationButtons';
import useSortableData from '../../../hooks/useSortableData';
import useSelectTable from '../../../hooks/useSelectTable';
import useMinimizeAside from '../../../hooks/useMinimizeAside';
import { demoPagesMenu } from '../../../menu';
import useDarkMode from '../../../hooks/useDarkMode';
import AddHolidayModal from './AddHolidayModal';
import { TColor } from '../../../type/color-type';
import Icon from '../../../components/icon/Icon';

const localizer = dayjsLocalizer(dayjs);

interface IEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    color: TColor;
    department?: string;
    designation?: string;
    employmentType?: string;
}

const Holiday = () => {
    useDarkMode();
    useMinimizeAside();

    // Events
    const [events, setEvents] = useState<IEvent[]>([]); // Initialize as an empty array

    // Calendar View Mode
    const [viewMode, setViewMode] = useState<TView>(Views.MONTH);
    // Calendar Date
    const [date, setDate] = useState(new Date());

    // Add Holiday Modal State
    const [isAddHolidayOpen, setIsAddHolidayOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Track the selected date
    const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null); // Track the selected event
    const [isEventModalOpen, setIsEventModalOpen] = useState(false); // State for event details modal

    // Pagination and Sorting for Table
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const { items, requestSort, getClassNamesFor } = useSortableData(events);
    const [searchTerm, setSearchTerm] = useState('');
    const filteredItems = items.filter((event) => {
        const term = searchTerm.toLowerCase();
        return (
            event.title.toLowerCase().includes(term) ||
            (event.department && event.department.toLowerCase().includes(term)) ||
            (event.designation && event.designation.toLowerCase().includes(term))
        );
    });
    const onCurrentPageData = dataPagination(filteredItems, currentPage, perPage);
    const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageData);

    // Auto-navigate calendar to first filtered event when searching
    useEffect(() => {
        if (searchTerm && filteredItems.length > 0) {
            setDate(filteredItems[0].start);
        }
    }, [searchTerm, filteredItems]);

    // Function to add new holidays to the calendar
    const handleAddHoliday = (data: { holidays: { date: string; occasion: string; fromTime: string; toTime: string }[]; department: string; designation: string; employmentType: string }) => {
        const { holidays } = data;
        const newEvents = holidays.map((holiday) => {
            const start = dayjs(`${holiday.date}T${holiday.fromTime}`);
            const end = dayjs(`${holiday.date}T${holiday.toTime}`);
    
            if (!start.isValid() || !end.isValid()) {
                console.error('Invalid date:', { start, end });
                return null;
            }
    
            return {
                id: `${holiday.date}-${holiday.occasion}`.replace(/\s+/g, '-'),
                title: holiday.occasion,
                start: start.toDate(),
                end: end.toDate(),
                color: 'info' as TColor,
                department: data.department || '--',
                designation: data.designation || '--',
                employmentType: data.employmentType || '--',
            };
        }).filter((event) => event !== null);
    
        setEvents((prevEvents) => [...prevEvents, ...newEvents]);
        setIsAddHolidayOpen(false);      // Close the modal
        setSelectedDate(null);           // Clear selected date
        setSelectedEvent(null);          // Clear selected event
    };

    const handleSelectEvent = (event: IEvent) => {
        console.log('Event Clicked:', event); // Debugging log
        setSelectedEvent(event); // Set the selected event for displaying details
        setIsEventModalOpen(true); // Open the event details modal
    };

    const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
        setSelectedDate(slotInfo.start);
        setSelectedEvent(null); // Clear selected event
        setIsAddHolidayOpen(true);
    };

    const handleEditEvent = () => {
        console.log('Edit Event:', selectedEvent);
        if (selectedEvent) {
            setSelectedDate(selectedEvent.start); // Set the selected date to the event's start date
            setIsAddHolidayOpen(true); // Open the AddHolidayModal
        }
        setIsEventModalOpen(false); // Close the event details modal
    };

    const handleDeleteEvent = () => {
        console.log('Delete Event:', selectedEvent);
        if (selectedEvent) {
            setEvents((prevEvents) => prevEvents.filter((event) => event.id !== selectedEvent.id));
        }
        setIsEventModalOpen(false); // Close the modal after deleting
    };

    const [editingEventId, setEditingEventId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<IEvent>>({});

    // Start editing
    const handleStartEdit = (event: IEvent) => {
        setEditingEventId(event.id);
        setEditForm({ ...event });
    };

    // Save edit
    const handleSaveEdit = () => {
        setEvents((prevEvents) =>
            prevEvents.map((ev) =>
                ev.id === editingEventId ? { ...ev, ...editForm } : ev
            )
        );
        setEditingEventId(null);
        setEditForm({});
    };

    // Cancel edit
    const handleCancelEdit = () => {
        setEditingEventId(null);
        setEditForm({});
    };

    // Handle input change
    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    // When opening the modal for a new holiday (Add New Holiday button or onSelectSlot)
    const handleOpenAddHoliday = () => {
        setSelectedEvent(null); // Clear any selected event
        setSelectedDate(null); // Or set to the date you want
        setIsAddHolidayOpen(true);
    };

    return (
        <PageWrapper title={demoPagesMenu.appointment.subMenu.calendar.text}>
            <SubHeader>
                <SubHeaderLeft>
                    <Button
                        icon="ChevronLeft"
                        onClick={() => setDate(dayjs(date).subtract(1, viewMode === Views.MONTH ? 'month' : 'week').toDate())}
                        color="light"
                    />
                    <span className="mx-2">
                        {viewMode === Views.MONTH
                            ? dayjs(date).format('MMMM YYYY') // Show "This month"
                            : dayjs(date).format('MMMM D, YYYY')} {/* Show week/day */}
                    </span>
                    <Button
                        icon="ChevronRight"
                        onClick={() => setDate(dayjs(date).add(1, viewMode === Views.MONTH ? 'month' : 'week').toDate())}
                        color="light"
                    />
                </SubHeaderLeft>
                <SubHeaderRight>
                    <Button
                        icon="AreaChart"
                        onClick={handleOpenAddHoliday}
                        color="primary" isLight
                    >
                        Add New Holiday
                    </Button>
                </SubHeaderRight>
            </SubHeader>
            <Page container="fluid">
                {/* Search Bar above the calendar */}
                <div className="d-flex justify-content-end mb-3" style={{ maxWidth: 300, marginLeft: 'auto' }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by occasion, department, or designation"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="row h-100">
                    <Card stretch style={{ minHeight: 680 }}>
                        <CardHeader>
                            <CardActions>
                                <Button
                                    color="primary" isLight
                                    onClick={() => setIsAddHolidayOpen(true)}
                                >
                                    Add Holiday
                                </Button>
                            </CardActions>
                        </CardHeader>
                        <CardBody isScrollable>
                            <Calendar
                                selectable
                                toolbar={true}
                                localizer={localizer}
                                defaultView={Views.MONTH}
                                views={[Views.MONTH, Views.WEEK, Views.DAY]}
                                view={viewMode}
                                onView={(view) => setViewMode(view)}
                                date={date}
                                onNavigate={(newDate) => setDate(newDate)}
                                scrollToTime={new Date(1970, 1, 1, 6)}
                                defaultDate={new Date()}
                                events={filteredItems} // <-- change this line!
                                eventPropGetter={(event) => ({
                                    className: classNames({
                                        [`bg-l10-${event.color} text-${event.color}`]: event.color,
                                    }),
                                })}
                                popup
                                onSelectSlot={handleSelectSlot}
                                onSelectEvent={handleSelectEvent}
                                components={{
                                    event: ({ event }) => (
                                        <div
                                            onClick={() => handleSelectEvent(event)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <strong>{event.title}</strong>
                                        </div>
                                    ),
                                    month: {
                                        dateHeader: ({ date }) => (
                                            <div>{date.getDate()}</div>
                                        ),
                                    },
                                }}
                                min={new Date(1970, 1, 1, 0, 0, 0)}
                                max={new Date(1970, 1, 1, 23, 59, 59)}
                            />
                        </CardBody>
                    </Card>
                </div>

                {/* Event Details Modal */}
                <Modal isOpen={isEventModalOpen} setIsOpen={setIsEventModalOpen}>
                    <ModalHeader>
                        <ModalTitle id="holiday-details-title">Holiday Details</ModalTitle>
                        <Dropdown>
                            <DropdownToggle>
                                <Button icon="MoreVertical" color="light" />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={handleEditEvent}>Edit</DropdownItem>
                                <DropdownItem onClick={handleDeleteEvent}>Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </ModalHeader>
                    <ModalBody>
                        {selectedEvent && (
                            <>
                                <p><strong>Date:</strong> {dayjs(selectedEvent.start).format('ddd DD MMM YYYY')}</p>
                                <p><strong>Occasion:</strong> {selectedEvent.title}</p>
                                <p><strong>Department:</strong> {selectedEvent.department}</p>
                                <p><strong>Designation:</strong> {selectedEvent.designation}</p>
                                <p><strong>Employment Type:</strong> {selectedEvent.employmentType}</p>
                            </>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => setIsEventModalOpen(false)}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>

                {/* Add Holiday Modal */}
               <AddHolidayModal
  isOpen={isAddHolidayOpen}
  setIsOpen={setIsAddHolidayOpen}
  onSave={handleAddHoliday}
  selectedDate={selectedDate}
  existingEvent={selectedEvent ? { 
    date: dayjs(selectedEvent.start).format('YYYY-MM-DD'), 
    occasion: selectedEvent.title
  } : null}
/>
                {/* Table View */}
                <Card className="mt-4">
                    <CardHeader>
                        <CardLabel icon="Assignment">
                            <CardTitle>Holiday List</CardTitle>
                        </CardLabel>
                        {/* Search Bar */}
                        <div className="ms-auto" style={{ maxWidth: 300 }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by occasion, department, or designation"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </CardHeader>
                    <CardBody>
                        <table className="table table-modern">
                            <thead>
                                <tr>
                                    <th style={{ width: 50 }}>{SelectAllCheck}</th>
                                    <th
                                        onClick={() => requestSort('title')}
                                        className="cursor-pointer text-decoration-underline">
                                        Occasion{' '}
                                        <Icon icon="FilterList" size="lg" className={getClassNamesFor('title')} />
                                    </th>
                                    <th
                                        onClick={() => requestSort('start')}
                                        className="cursor-pointer text-decoration-underline">
                                        Date{' '}
                                        <Icon
                                            size="lg"
                                            className={getClassNamesFor('start')}
                                            icon="FilterList"
                                        />
                                    </th>
                                    <th>Day</th>
                                    <th>Department</th>
                                    <th>Designation</th>
                                    <th>Employment Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {onCurrentPageData.map((event) => (
                                    <tr key={event.id}>
                                        <td>
                                            <Checks
                                                id={event.id.toString()}
                                                name="selectedList"
                                                value={event.id}
                                                onChange={selectTable.handleChange}
                                                checked={(selectTable.values.selectedList as string[]).includes(event.id.toString())} // Cast selectedList to string[]
                                            />
                                        </td>
                                        {editingEventId === event.id ? (
                                            <>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        value={editForm.title || ''}
                                                        onChange={handleEditInputChange}
                                                        className="form-control"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="date"
                                                        name="start"
                                                        value={editForm.start ? dayjs(editForm.start).format('YYYY-MM-DD') : ''}
                                                        onChange={(e) =>
                                                            setEditForm((prev) => ({
                                                                ...prev,
                                                                start: dayjs(e.target.value).toDate(),
                                                                end: dayjs(e.target.value).toDate(),
                                                            }))
                                                        }
                                                        className="form-control"
                                                    />
                                                </td>
                                                <td>{editForm.start ? dayjs(editForm.start).format('dddd') : ''}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="department"
                                                        value={editForm.department || ''}
                                                        onChange={handleEditInputChange}
                                                        className="form-control"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="designation"
                                                        value={editForm.designation || ''}
                                                        onChange={handleEditInputChange}
                                                        className="form-control"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="employmentType"
                                                        value={editForm.employmentType || ''}
                                                        onChange={handleEditInputChange}
                                                        className="form-control"
                                                    />
                                                </td>
                                                <td>
                                                    <Button color="success" size="sm" onClick={handleSaveEdit}>Save</Button>{' '}
                                                    <Button color="secondary" size="sm" onClick={handleCancelEdit}>Cancel</Button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>{event.title}</td>
                                                <td>{dayjs(event.start).format('ddd DD MMM YYYY')}</td>
                                                <td>{dayjs(event.start).format('dddd')}</td>
                                                <td>{event.department}</td>
                                                <td>{event.designation}</td>
                                                <td>{event.employmentType}</td>
                                                <td>
                                                    <Dropdown>
                                                        <DropdownToggle>
                                                            <Button icon="MoreVertical" color="light" />
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem onClick={() => handleSelectEvent(event)}>View</DropdownItem>
                                                            <DropdownItem onClick={() => handleStartEdit(event)}>Edit</DropdownItem>
                                                            <DropdownItem onClick={() => handleDeleteEvent()}>Delete</DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardBody>
                    <PaginationButtons
                        data={filteredItems}
                        label="items"
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        perPage={perPage}
                        setPerPage={setPerPage}
                    />
                </Card>
            </Page>
        </PageWrapper>
    );
};

export default Holiday;