/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react';
import { Calendar, dayjsLocalizer, Views, View } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Button, { ButtonGroup } from '../../../components/bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import ProjectEditModal from './ProjectEditModal';
import events from '../../../common/data/events';

const localizer = dayjsLocalizer(dayjs);

function getRandomColor() {
    // Generates a random pastel color
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 80%)`;
}

const getEmployeeColors = (events: any[]) => {
    let colorMap: { [employee: string]: string } = {};
    try {
        colorMap = JSON.parse(localStorage.getItem('employeeColorMap') || '{}');
    } catch {
        colorMap = {};
    }
    let changed = false;
    events.forEach(event => {
        if (event.employee && !colorMap[event.employee]) {
            colorMap[event.employee] = getRandomColor();
            changed = true;
        }
    });
    if (changed) {
        localStorage.setItem('employeeColorMap', JSON.stringify(colorMap));
    }
    return colorMap;
};

interface CalendarEvent {
    title: string;
    employee: string;
    start: Date;
    end: Date;
    allDay: boolean;
}

const CalenderPage: React.FC = () => {
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState<View>(Views.MONTH);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<any>(null);
    const [columns] = useState<any[]>([]); // Add your columns if needed

    // Ensure events is an array
    const calendarEvents: CalendarEvent[] = Array.isArray(events)
        ? events.map((event: any) => ({
            title: event.title || '',
            employee: event.employee || '',
            start: event.start ? new Date(event.start) : new Date(),
            end: event.end ? new Date(event.end) : new Date(),
            allDay: event.allDay ?? false,
        }))
        : [];

    const employeeColors = useMemo(() => getEmployeeColors(calendarEvents), [calendarEvents]);

    const handleAddTask = () => {
        setSelectedTask(null);
        setIsModalOpen(true);
    };

    const handleModalSubmit = (data: any) => {
        // Implement your logic to add/update event
        setIsModalOpen(false);
    };

    return (
        <div className="container">
            <SubHeader>
                <SubHeaderLeft>
                    <Button
                        icon="Add"
                        color="primary"
                        isLight
                        className="btn-icon-only"
                        onClick={handleAddTask}
                    >
                        Add Tasks
                    </Button>
                </SubHeaderLeft>
                <SubHeaderRight>
                    <ButtonGroup>
                    <Button
                        icon="list"
                        color="info"
                    
                        isLight
                        onClick={() => navigate('/work/task')}
                    />
                    <Button
                       icon="Assessment"
                                color="info"
                                isLight
                                onClick={() => navigate('/task-management')}
                    />
                    <Button
                        icon="CalendarToday"
                        color="info"
                        isLight
                        onClick={() => navigate('/calendar')}
                    />
                    <Button
                        icon="AssignmentLate"
                        color="info"
                        isLight
                    />
                    </ButtonGroup>
                </SubHeaderRight>
                
            </SubHeader>

            <div className="bg-white rounded shadow p-3 mt-3">
                <Calendar
                    localizer={localizer}
                    events={calendarEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600 }}
                    views={['month', 'week', 'day']}
                    view={currentView}
                    onView={setCurrentView}
                    eventPropGetter={event => ({
                        style: {
                            backgroundColor: employeeColors[event.employee] || '#b3c6ff',
                            color: '#222',
                        }
                    })}
                />
            </div>

            <ProjectEditModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                onSubmit={handleModalSubmit}
                defaultValues={selectedTask || {}}
                defaultStatus={selectedTask?.status || 'Pending'}
                columns={columns}
            />
        </div>
    );
};

export default CalenderPage;