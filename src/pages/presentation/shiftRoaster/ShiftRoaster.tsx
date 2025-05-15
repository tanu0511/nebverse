
import React, { useState } from 'react';
import dayjs from 'dayjs';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Button from '../../../components/bootstrap/Button';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Avatar from '../../../components/Avatar';
import UserImage from '../../../assets/img/wanna/wanna1.png';
import UserImageWebp from '../../../assets/img/wanna/wanna1.webp';
import BulkShiftModal from './BulkShiftModal';
import SubHeader, { SubHeaderRight } from '../../../layout/SubHeader/SubHeader';

const employees = [
    {
        id: 1,
        name: 'Atharvraj Singh Rana',
        role: "It's you",
        image: UserImage,
    },
    {
        id: 2,
        name: 'Atharva',
        role: 'Developer',
        image: UserImage,
    },
];

const shiftTypes = {
    full: { label: 'Full Day', icon: '✅', color: 'success' },
    half: { label: 'Half Day', icon: '⏳', color: 'warning' },
    sick: { label: 'Sick Leave', icon: '🤒', color: 'danger' },
    festival: { label: 'Festival', icon: '🎉', color: 'info' },
    event: { label: 'Event', icon: '📅', color: 'secondary' },
    none: { label: '-', icon: '-', color: '' },
};

const ShiftRoaster = () => {
    const startDate = dayjs('2025-02-17');
    const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
    const [currentWeekStart, setCurrentWeekStart] = useState(startDate);
    const [assignedShifts, setAssignedShifts] = useState<{ [key: string]: keyof typeof shiftTypes }>({});

    const handlePrevWeek = () => setCurrentWeekStart(currentWeekStart.subtract(7, 'day'));
    const handleNextWeek = () => setCurrentWeekStart(currentWeekStart.add(7, 'day'));

    const [selectedShiftData, setSelectedShiftData] = useState<{
        employee: number;
        date: string;
        shift: 'full' | 'half' | 'sick' | 'festival' | 'event' | 'none';
    } | null>(null);

    const weekDates = Array.from({ length: 7 }, (_, i) => currentWeekStart.add(i, 'day'));

    const handleBulkSubmit = (data: {
        department: string;
        employee: number | 'all';
        shift: 'full' | 'half' | 'sick' | 'festival' | 'event' | 'none';
        date: string;
    }) => {
        if (data.employee === 'all') {
            const updatedShifts = { ...assignedShifts };
            employees.forEach(emp => {
                const key = `${emp.id}_${data.date}`;
                updatedShifts[key] = data.shift;
            });
            setAssignedShifts(updatedShifts);
        } else {
            const key = `${data.employee}_${data.date}`;
            setAssignedShifts((prev) => ({ ...prev, [key]: data.shift }));
        }
    };

    return (
        <PageWrapper title="Shift Management">
            <SubHeader>
                <SubHeaderRight>
                    <Button icon="Add" color="primary" isLight onClick={() => setIsBulkModalOpen(true)}>
                        Assign Bulk Shifts
                    </Button>
                    <Button
                        color="info"
                        icon="CloudDownload"
                        isLight
                        tag="a"
                        to="/somefile.txt"
                        target="_blank"
                        download
                    >
                        Export
                    </Button>
                </SubHeaderRight>
            </SubHeader>

            <Page container="fluid">
                <Card>
                    <CardBody>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <Button onClick={handlePrevWeek} icon="ArrowBackIos" isLight />
                            <h5 className="m-0">
                                {weekDates[0].format('D MMM YYYY')} - {weekDates[6].format('D MMM YYYY')}
                            </h5>
                            <Button onClick={handleNextWeek} icon="ArrowForwardIos" isLight />
                        </div>

                        <table className="table table-modern table-hover">
                            <thead className="table-Light">
                                <tr>
                                    <th style={{ width: '20%' }}>Employee</th>
                                    {weekDates.map((day, index) => (
                                        <th key={index}>
                                            <div>{day.format('DD')}</div>
                                            <div className="small fw-light text-uppercase">{day.format('dddd')}</div>
                                            <div className="text-muted small">{day.format('MMM')}</div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((user) => (
                                    <tr key={user.id}>
                                        <td className="text-start">
                                            <div className="d-flex align-items-center">
                                                <Avatar src={user.image} srcSet={UserImageWebp} size={38} />
                                                <div className="ms-2">
                                                    <div className="fw-bold text-capitalize">{user.name}</div>
                                                    <small className="text-muted">{user.role}</small>
                                                </div>
                                            </div>
                                        </td>
                                        {weekDates.map((date, i) => {
                                            const key = `${user.id}_${date.format('YYYY-MM-DD')}`;
                                            const shiftKey = assignedShifts[key] || 'none';
                                            const shift = shiftTypes[shiftKey];
                                            return (
                                                <td
                                                    key={i}
                                                    onClick={() => {
                                                        setSelectedShiftData({
                                                            employee: user.id,
                                                            date: date.format('YYYY-MM-DD'),
                                                            shift: shiftKey as keyof typeof shiftTypes,
                                                        });
                                                        setIsBulkModalOpen(true);
                                                    }}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <span className={`text-${shift.color}`}>
                                                        {shift.icon === '-' ? '+' : shift.icon}
                                                    </span>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="d-flex flex-wrap gap-3 align-items-center mt-3">
                            {Object.entries(shiftTypes).map(
                                ([key, val]) =>
                                    key !== 'none' && (
                                        <span key={key} className={`text-${val.color}`}>
                                            {val.icon} {val.label}
                                        </span>
                                    )
                            )}
                            <span className="text-danger ms-auto">
                                <i className="bi bi-star-fill me-1" /> Holiday
                            </span>
                        </div>

                        <BulkShiftModal
                            isOpen={isBulkModalOpen}
                            onClose={() => {
                                setIsBulkModalOpen(false);
                                setSelectedShiftData(null);
                            }}
                            initialData={selectedShiftData}
                            onSubmit={(data) => {
                                handleBulkSubmit(data);
                                setIsBulkModalOpen(false);
                                setSelectedShiftData(null);
                            }}
                        />
                    </CardBody>
                </Card>
            </Page>
        </PageWrapper>
    );
};

export default ShiftRoaster;
