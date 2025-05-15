/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubheaderSeparator } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody, CardHeader } from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
import Button from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import ScrollspyNav from '../../../components/bootstrap/ScrollspyNav';

const reports = () => {
	const [selectedMonth, setSelectedMonth] = useState('04-2025');
	const [selectedMonth2, setSelectedMonth2] = useState('04-2025');
	const [department, setDepartment] = useState('All');
	const [designation, setDesignation] = useState('All');
	const { darkModeStatus } = useDarkMode();
	const [activeElementId, setActiveElementId] = useState('first');
	const [selectedCompanyMember, setSelectedCompanyMember] = useState('--');
const [companyTdsData, setCompanyTdsData] = useState<{ month: string; tds: string }[] | null>(null);
const [selectedEmployeeMember, setSelectedEmployeeMember] = useState('--');
const [employeeTdsData, setEmployeeTdsData] = useState<{ month: string; tds: string }[] | null>(null);
const companyTdsDataSource = {
    'company A': [
        { month: 'April 2025', tds: '₹5000' },
        { month: 'May 2025', tds: '₹5200' },
    ],
    'company B': [
        { month: 'April 2025', tds: '₹3000' },
        { month: 'May 2025', tds: '₹3500' },
    ],
};

const employeeTdsDataSource = {
    'atharvraj singh rana': [
        { month: 'April 2025', tds: '₹1000' },
        { month: 'May 2025', tds: '₹1200' },
    ],
    'jvqr vrv': [
        { month: 'April 2025', tds: '₹800' },
        { month: 'May 2025', tds: '₹900' },
    ],
	'Ranjana': [
        { month: 'April 2025', tds: '₹1000' },
        { month: 'May 2025', tds: '₹1200' },
    ],
    'SHAM': [
        { month: 'April 2025', tds: '₹800' },
        { month: 'May 2025', tds: '₹900' },
    ],
	'siya': [
        { month: 'April 2025', tds: '₹1000' },
        { month: 'May 2025', tds: '₹1200' },
    ]
};
const handleDownload = (type: 'monthly' | 'cumulative') => {
    const member = selectedCompanyMember !== '--' ? selectedCompanyMember : selectedEmployeeMember;
    alert(`Downloading ${type} sheet for ${selectedMonth}, Department: ${department}, Designation: ${designation}, Member: ${member}`);
};
	const handleCompanyMemberSelection = (member: keyof typeof companyTdsDataSource) => {
		setSelectedCompanyMember(member);
		setCompanyTdsData(companyTdsDataSource[member] || null);
	};
	const handleEmployeeMemberSelection = (member: keyof typeof employeeTdsDataSource) => {
		setSelectedEmployeeMember(member);
		setEmployeeTdsData(employeeTdsDataSource[member] || null);
	};
	return (
		<PageWrapper title={demoPagesMenu.pricingTable.text}>
			<SubHeader>
				<SubHeaderLeft>
					<ScrollspyNav
						items={['first', 'second', 'third']}
						setActiveId={setActiveElementId}
						offset={-500}
					/>
					<Button
						tag='a'
						to='#first'
						color='primary'
						isLight
						isActive={activeElementId === 'first'}>
						Exports
					</Button>
					<SubheaderSeparator />
					<Button
						tag='a'
						to='#second'
						color='secondary'
						isLight
						isActive={activeElementId === 'second'}>
						Company Tds Reports
					</Button>
					<SubheaderSeparator />
					<Button
						tag='a'
						to='#third'
						color='primary'
						isLight
						isActive={activeElementId === 'third'}>
						Employee Tds Reports
					</Button>
				</SubHeaderLeft>
			</SubHeader>

			<Page>
			      <div id='first' className='row scroll-margin'>
					<div className='col-12 mb-3'>
						<div className='display-6 fw-bold py-3'>Exports</div>
					</div>
					<div className='col-md-3'>
						<Card>
							<CardBody>
								<div className='row pt-5 g-4 text-center'>
									<div className='col-12'>
										<Icon icon='CalendarViewMonth' size='4x' color='info' />
									</div>
									<div className='col-12'>
										<h2>Select Month</h2>
									</div>
									<div className='col-12'>
										<input
											type="month"
											className="form-control w-100 py-3 text-uppercase"
											value={selectedMonth}
											onChange={(e) => setSelectedMonth(e.target.value)}
										/>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-md-3'>
						<Card>
							<CardBody>
								<div className='row pt-5 g-4 text-center'>
									<div className='col-12'>
										<Icon icon='CalendarViewMonth' size='4x' color='info' />
									</div>
									<div className='col-12'>
										<h2>Select Month</h2>
									</div>
									<div className='col-12'>
										<input
											type="month"
											className="form-control w-100 py-3 text-uppercase"
											value={selectedMonth2}
											onChange={(e) => setSelectedMonth2(e.target.value)}
										/>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-md-3'>
						<Card>
							<CardBody>
								<div className='row pt-5 g-4 text-center'>
									<div className='col-12'>
										<Icon icon='AccountBox' size='4x' color='info' />
									</div>
									<div className='col-12'>
										<label><h2> Department </h2> </label>
									</div>
									<div className='col-12'>
										<select
											className="form-control w-100 py-3 text-uppercase"
											value={department}
											onChange={(e) => setDepartment(e.target.value)}
										>
											<option value="All">All</option>
											<option value="HR">HR</option>
											<option value="Finance">Finance</option>
											<option value="IT">IT</option>
										</select>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-md-3'>
						<Card>
							<CardBody>
								<div className='row pt-5 g-4 text-center'>
									<div className='col-12'>
										<Icon icon='AccountBox' size='4x' color='info' />
									</div>
									<div className='col-12'>
										<label><h2>Designation</h2></label>
									</div>
									<div className='col-12'>
										<select
											className="form-control w-100 py-3 text-uppercase"
											value={designation}
											onChange={(e) => setDesignation(e.target.value)}
										>
											<option value="All">All</option>
											<option value="Manager">Manager</option>
											<option value="Developer">Developer</option>
											<option value="Analyst">Analyst</option>
										</select>
									</div>
								</div>
							</CardBody>

						</Card>
						<div className="row justify-content-center">
							<div className="col-md-6 text-center">
								<Button
									color="primary"
									className="w-100"
									onClick={() => handleDownload('monthly')}
								>
									<Icon icon="Download" size="lg" className="me-2" />
									Download Monthly Sheet
								</Button>
							</div>
							<div className="col-md-6 text-center">
								<Button
									color="secondary"
									className="w-100"
									onClick={() => handleDownload('cumulative')}
								>
									<Icon icon="Download" size="lg" className="me-2" />
									Download Cumulative Sheet
								</Button>
							</div>
						</div>
					</div>
				</div>

				<div id='second' className='row scroll-margin'>
					<div className='col-12 mb-5'>
						<div className='display-6 fw-bold py-3'>Company Tds Report</div>
					</div>

					<div className="row mb-4">
                    <div className="col-md-4">
                        <label className="form-label"><h6>Choose Member</h6></label>
                        <select
                            className="form-control"
                            value={selectedCompanyMember}
                            onChange={(e) => handleCompanyMemberSelection(e.target.value as keyof typeof companyTdsDataSource)}>
							
                            <option value="--">--</option>
                <option value="company A">Company A</option>
                <option value="company B">Company B</option>
                        </select>
                    </div>
					{companyTdsData && (
                        <div className="row mt-4">
                            <div className="col-12">
                                <h4 className="fw-bold">TDS Data for {selectedCompanyMember}</h4>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Month</th>
                                            <th>TDS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {companyTdsData.map((data, index) => (
                                            <tr key={index}>
                                                <td>{data.month}</td>
                                                <td>{data.tds}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
							</div>	
					)}
					</div>
					<div className='col-md-4'>
						<Card>
							<CardBody>
							<div className='row pt-5 g-4 align-items-center'>
									<div className='col-auto'>
										<Icon icon='Money' size='5x' color='warning' />
									</div>
									<div className='col'>
										<h2>TDS Charged</h2>
									</div>
									<div className='col-12'>
										<h3 className='display-1 fw-bold'>
											<span className='display-4 fw-bold text-center'>0</span>
										</h3>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					</div>
				<div id="third" className="row scroll-margin mt-6">
    <div className="col-12 my-3">
        <div className="display-6 fw-bold py-3">Employee TDS Reports</div>
    </div>
    <div className="row mb-4">
        <div className="col-md-4">
            <label className="form-label">
                <h6>Choose Member</h6>
            </label>
            <select
                className="form-control"
                value={selectedEmployeeMember}
                onChange={(e) => handleEmployeeMemberSelection(e.target.value as keyof typeof employeeTdsDataSource)}
            >
                <option value="--">--</option>
                <option value="atharvraj singh rana">atharvraj singh rana</option>
                <option value="jvqr vrv">jvqr vrv</option>
                <option value="Ranjana">Ranjana</option>
                <option value="SHAM">SHAM</option>
                <option value="siya">siya</option>
            </select>
        </div>
    </div>
    {employeeTdsData && (
        <div className="row mt-4">
            <div className="col-12">
                <h4 className="fw-bold">TDS Data for {selectedEmployeeMember}</h4>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>TDS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeTdsData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.month}</td>
                                <td>{data.tds}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
		
        </div>
    )}
		<div className='col-md-4'>
						<Card>
							<CardBody>
							<div className='row pt-5 g-4 align-items-center'>
									<div className='col-auto'>
										<Icon icon='Money' size='5x' color='warning' />
									</div>
									<div className='col'>
										<h2>TDS Charged</h2>
									</div>
									<div className='col-12'>
										<h3 className='display-1 fw-bold'>
											<span className='display-4 fw-bold text-center'>0</span>
										</h3>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
</div>
			</Page>
		</PageWrapper>
	);
};

export default reports;
