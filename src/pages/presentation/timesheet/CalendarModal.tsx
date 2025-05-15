/* eslint-disable react-hooks/rules-of-hooks */
    import React, { useMemo } from 'react';
    import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar';
    import dayjs from 'dayjs';
    import 'react-big-calendar/lib/css/react-big-calendar.css';

    const localizer = dayjsLocalizer(dayjs);

    interface Props {
        isOpen: boolean;
        onClose: () => void;
    }

    const getRandomColor = () => {
        const colors = [
            '#28a74683', '#007bffa7', '#e83e8d58', '#fd7d144c', '#20c99690', '#6e42c1b5', '#17a3b8a0', '#ffc107a2', '#dc3546ab', '#6710f29d'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

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

        const CalendarModal: React.FC<Props> = ({ isOpen, onClose }) => {
            if (!isOpen) return null;

        // Read table data from localStorage and convert to calendar events
        const events = useMemo(() => {
            const saved = localStorage.getItem('timesheetTableData');
            if (!saved) return [];
            const tableData = JSON.parse(saved);
            return tableData.map((row: any) => ({
                title:` ${row.task} (${row.employee})`,
                employee: row.employee, // must be a unique string for each employee
                start: new Date(row.startTime),
                end: new Date(row.endTime),
                allDay: false,
            }));
        }, []);

        const employeeColors = useMemo(() => getEmployeeColors(events), [events]);
        return (
            <div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.2)' }}>
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Calendar</h5>
                            <button type="button" className="btn-close" onClick={onClose} />
                        </div>
                        <div className="modal-body">
                            <div style={{ height: 500 }}>
                                <Calendar
                                    localizer={localizer}
                                    events={events}
                                    startAccessor="start"
                                    endAccessor="end"
                                    style={{ height: 500 }}
                                    views={[Views.MONTH, Views.WEEK, Views.DAY]}
                                    defaultView={Views.MONTH}
                                eventPropGetter={(event: CalendarEvent) => ({
                                    style: {
                                        backgroundColor: employeeColors[event.employee] || '#c474c0',
                                        color: 'white',
                                        borderRadius: '4px',
                                        border: 'none'
                                    }
                                })}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default CalendarModal;