import React from 'react';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Calendar, dayjsLocalizer, View as TView, Views } from 'react-big-calendar';
import { useFormik } from 'formik';
import { Calendar as DatePicker } from 'react-date-range';
import {
	// CalendarTodayButton,
	// CalendarViewModeButtons,
	getLabel,
	getViews,
} from '../../../components/extras/calendarHelper';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../../../menu';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Icon from '../../../components/icon/Icon';
import Button from '../../../components/bootstrap/Button';
import Popovers from '../../../components/bootstrap/Popovers';
import Page from '../../../layout/Page/Page';

import Card, {
	CardBody,
} from '../../../components/bootstrap/Card';
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../../components/bootstrap/OffCanvas';
import useDarkMode from '../../../hooks/useDarkMode';
import { TColor } from '../../../type/color-type';
import AddEventModal from './AddEventModal';
import EventForm from './EventForm';
import { EventProps } from 'react-big-calendar';
import EventDetailPage from './EventDetailPage';

const localizer = dayjsLocalizer(dayjs);

const MyEvent = ({ event: eventData }: EventProps<{ labelColor?: string; color?: TColor; start: Date; end: Date; name?: string; title?: string; icon?: string; users?: any[]; user?: { name?: string; src?: string } }>) => {
    useDarkMode();

    return (
        <div className='row g-2'>
            <div className='col text-truncate'>
                {eventData?.icon && <Icon icon={eventData?.icon} size='lg' className='me-2' />}
                {eventData?.name || eventData?.title}
            </div>
            {eventData?.user?.src && (
                <div className='col-auto'>
                    <div className='row g-1 align-items-baseline' />
                </div>
            )}
            {eventData?.users && <div className='col-auto' />}
        </div>
    );
};





const Event = () => {
	useDarkMode();

	// FOR DEV

	// Calendar View Mode
	const [viewMode, setViewMode] = useState<TView>(Views.MONTH);

	// Initialize Formik
	const formik = useFormik({
		initialValues: {
			eventAllDay: false,
			eventStart: dayjs().toISOString(),
			eventEnd: dayjs().add(1, 'hour').toISOString(),
		},
		onSubmit: (values) => {
			console.log('Form submitted:', values);
		},
	});
	// Calendar Date
	const [date, setDate] = useState(new Date());
	// Item edit panel status
	const [toggleInfoEventCanvas, setToggleInfoEventCanvas] = useState(false);
	const setInfoEvent = () => setToggleInfoEventCanvas(!toggleInfoEventCanvas);
	const [eventAdding, setEventAdding] = useState(false);
	// Event item state
	const [eventItem, setEventItem] = useState<any>(null);
	const [events, setEvents] = useState<any[]>([]);
	const [showAddEventModal, setShowAddEventModal] = useState(false);

	// State for selected event and OffCanvas
	const [selectedEvent, setSelectedEvent] = useState<any>(null);
	const [showEventDetail, setShowEventDetail] = useState(false);

	// Add event handler
	const handleAddEvent = (event: any) => {
		if (isEditing) {
			setEvents(prev =>
				prev.map(ev => (ev.id === event.id ? { ...ev, ...event } : ev))
			);
			setIsEditing(false);
		} else {
			setEvents(prev => [...prev, event]);
		}
		setShowAddEventModal(false);
		setEventAdding(false);
	};

	// Delete event handler
	const handleDeleteEvent = (eventToDelete: any) => {
		setEvents(events.filter(ev => ev.id !== eventToDelete.id));
		setShowEventDetail(false);
	};

	// Calendar Unit Type
	// Calendar Date Label
	const calendarDateLabel = getLabel(date, viewMode);

	// Change view mode

	// View modes; Month, Week, Work Week, Day and Agenda
	const views = getViews();

	// New Event
	const handleSelect = ({ start, end }: { start: any; end: any }) => {
		setEventAdding(true);
		setEventItem({ start, end });
	};

	useEffect(() => {
		if (eventAdding) {
			setInfoEvent();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [eventAdding]);

	useEffect(() => {
		if (eventItem) {
			formik.setValues({
				...eventItem,
				// map fields as needed
			});
		}
	}, [eventItem, formik]);


	const eventPropGetter = (
		event: { labelColor?: string },
	) => {
		return {
			style: {
				backgroundColor: event.labelColor || '#1976d2', // fallback to default if not set
				color: '#fff',
				borderRadius: '4px',
				border: 'none',
				display: 'block',
			},
		};
	};

	// END:: Calendar
	const [isEditing, setIsEditing] = useState(false);

	return (
		<PageWrapper title={demoPagesMenu.appointment.subMenu.calendar.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Icon icon='Info' className='me-2' size='2x' />
					<span className='text-muted' />
				</SubHeaderLeft>
				<SubHeaderRight>
					<Popovers
						desc={
							<DatePicker
								onChange={(item) => setDate(item)}
								date={date}
								color={process.env.REACT_APP_PRIMARY_COLOR}
							/>
						}
						placement='bottom-end'
						className='mw-100'
						trigger='click'>
						<Button color='light'>{calendarDateLabel}</Button>
					</Popovers>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='mb-3'>
					<Button
						color='primary'
						className='px-4'
						onClick={() => setShowAddEventModal(true)}>
						<i className='fa fa-plus me-2' /> Add Event
					</Button>
				</div>
				<Card stretch style={{ minHeight: 600 }}>
					<CardBody>
						<Calendar
							localizer={localizer}
							defaultView={Views.MONTH}
							views={views}
							view={viewMode}
							date={date}
							onNavigate={(_date) => setDate(_date)}
							onSelectEvent={(event) => {
								setSelectedEvent(event);
								setShowEventDetail(true);
							}}
							onSelectSlot={handleSelect}
							onView={setViewMode}
							selectable
							components={{
								event: (props: EventProps<{ labelColor?: string; color?: TColor; start: Date; end: Date; name?: string; icon?: string; users?: any[]; user?: { name?: string; src?: string } }>) => (
									<MyEvent {...props} />
								),
							}}
							eventPropGetter={eventPropGetter}
							events={events}
							style={{ minHeight: 600 }}
						/>
					</CardBody>
				</Card>
				{showEventDetail && selectedEvent && (
					<div
						style={{
							position: 'fixed',
							top: 0,
							left: 0,
							width: '100vw',
							height: '100vh',
							background: 'rgba(0,0,0,0.3)',
							zIndex: 2000,
							overflow: 'auto',
						}}
					>
						<div style={{
							maxWidth: 700,
							margin: '40px auto',
							background: '#fff',
							borderRadius: 8,
							boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
							padding: 0,
						}}>
							<EventDetailPage
								event={selectedEvent}
								onClose={() => setShowEventDetail(false)}
								onDelete={handleDeleteEvent}
								onEdit={() => {
									setShowEventDetail(false);      // Close the detail modal
									setEventItem(selectedEvent);    // Set the event to edit
									setIsEditing(true);             // Mark as editing
									setEventAdding(false);          // Make sure it's not add mode
									setToggleInfoEventCanvas(true); // Open the OffCanvas
								}}
							/>
						</div>
					</div>
				)}
				<OffCanvas
					setOpen={(status: boolean) => {
						setToggleInfoEventCanvas(status);
						setEventAdding(false);
						setIsEditing(false);
					}}
					isOpen={toggleInfoEventCanvas}
					titleId='canvas-title'>
					<OffCanvasHeader
						setOpen={(status: boolean) => {
							setToggleInfoEventCanvas(status);
							setEventAdding(false);
							setIsEditing(false);
						}}
						className='p-4'>
						<OffCanvasTitle id='canvas-title'>
								{isEditing ? 'Edit Event' : 'Add Event'}
						</OffCanvasTitle>
					</OffCanvasHeader>
					<OffCanvasBody className='p-4'>
						<EventForm
							initialValues={eventItem}
							onSubmit={(values: any) => {
								if (isEditing) {
									setEvents(prev =>
										prev.map(ev => (ev.id === eventItem.id ? { ...ev, ...values } : ev))
									);
								} else {
									setEvents(prev => [...prev, { ...values, id: Date.now() }]);
								}
								setToggleInfoEventCanvas(false);
								setIsEditing(false);
								setEventAdding(false);
							}}
							onCancel={() => {
								setToggleInfoEventCanvas(false);
								setIsEditing(false);
								setEventAdding(false);
							}}
						/>
					</OffCanvasBody>
				</OffCanvas>
				<AddEventModal
					show={showAddEventModal}
					onClose={() => setShowAddEventModal(false)}
					onAddEvent={handleAddEvent}
				/>
			</Page>
		</PageWrapper>
	);
};

export default Event;