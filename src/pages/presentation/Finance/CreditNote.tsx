/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, ChangeEvent } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Input from '../../../components/bootstrap/forms/Input';

import Dropdown, {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from '../../../components/bootstrap/Dropdown';

import { DateRange, DefinedRange, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const CreditNotePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [clientFilter, setClientFilter] = useState('All');
    const [duration, setDuration] = useState('Select Duration');
    const [isCustomRange, setIsCustomRange] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [dateRange, setDateRange] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);

    const FilterSidebar = () => {
        return (
            <div className='filter-sidebar'>
                <DropdownMenu isAlignmentEnd size='lg'>
                    <div className='container py-2'>
                        <div className='row g-3'>
                            <p>Custom filters can go here.</p>
                        </div>
                    </div>
                </DropdownMenu>
            </div>
        );
    };

    const handleDurationChange = (range: string) => {
        let startDate: Date | null = null;
        let endDate: Date | null = null;
        const today = new Date();
        setIsCustomRange(range === 'Custom Range');

        if (range === 'Today') {
            startDate = endDate = today;
        } else if (range === 'Last 30 Days') {
            startDate = new Date(today);
            startDate.setDate(today.getDate() - 30);
            endDate = today;
        } else if (range === 'This Month') {
            startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        } else if (range === 'Last Month') {
            startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            endDate = new Date(today.getFullYear(), today.getMonth(), 0);
        } else if (range === 'Last 90 Days') {
            startDate = new Date(today);
            startDate.setDate(today.getDate() - 90);
            endDate = today;
        } else if (range === 'Last 6 Months') {
            startDate = new Date(today);
            startDate.setMonth(today.getMonth() - 6);
            endDate = today;
        } else if (range === 'Last 1 Year') {
            startDate = new Date(today);
            startDate.setFullYear(today.getFullYear() - 1);
            endDate = today;
        } else if (range === 'Custom Range') {
            setDuration('Select start and end dates');
            return;
        }

        const startDateStr = startDate?.toLocaleDateString() || '';
        const endDateStr = endDate?.toLocaleDateString() || '';

        setStartDate(startDate);
        setEndDate(endDate);
        setDuration(`${startDateStr} To ${endDateStr}`);
        setIsCustomRange(false);
    };

    const handleCustomRange = (start: Date, end: Date) => {
        const startStr = start.toLocaleDateString();
        const endStr = end.toLocaleDateString();
        setStartDate(start);
        setEndDate(end);
        setDuration(`${startStr} To ${endStr}`);
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleCancel = () => setIsCustomRange(false);
    const handleApply = () => setIsCustomRange(true);

    return (
        <PageWrapper title='Credit Note'>
            <SubHeader>
                <SubHeaderLeft>
                        <Input
                        className='ms-3'
                        placeholder='Start typing to search'
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </SubHeaderLeft>

                <SubHeaderRight>
                    <div>
                        <Button
                            color='light'
                            icon='FilterList'
                            isLight
                            onClick={() => setIsFilterOpen(true)}>
                            Filters
                        </Button>
                        {isFilterOpen && <FilterSidebar />}
                    </div>
                </SubHeaderRight>
            </SubHeader>

            <Page>
                <Card>
                    <CardBody>
                    <Button
								color='info'
								icon='CloudDownload'
								isLight
								tag='a'
								to='/somefile.txt'
								target='_blank'
								download>
								Export
							</Button>
                        <div className='table-responsive'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Credit Note</th>
                                        <th>Invoice</th>
                                        <th>Name</th>
                                        <th>Total</th>
                                        <th>Credit Note Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={7} className='text-center'>
                                            No data available in table
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='d-flex justify-content-between align-items-center mt-3'>
                                <div>
                                    Show{' '}
                                    <select className='form-select d-inline w-auto'>
                                        <option>25</option>
                                        <option>50</option>
                                        <option>100</option>
                                    </select>{' '}
                                    entries
                                </div>
                                <div>Showing 0 to 0 of 0 entries</div>
                                <div>
                                    <Button color='light' isLight className='me-1'>
                                        Previous
                                    </Button>
                                    <Button color='light' isLight>
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Page>
        </PageWrapper>
    );
};

export default CreditNotePage;