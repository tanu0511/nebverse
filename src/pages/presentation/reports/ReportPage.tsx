/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
import { ApexOptions } from 'apexcharts';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
} from '../../../layout/SubHeader/SubHeader';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
import Chart from '../../../components/extras/Chart';
import useDarkMode from '../../../hooks/useDarkMode';
import axios from 'axios'; // If you use axios, otherwise use fetch
import classNames from 'classnames';
import Input from '../../../components/bootstrap/forms/Input';

const ReportPage = () => {
	const { darkModeStatus } = useDarkMode();

	// const { id } = useParams();
	// const navigate = useNavigate();

	// @ts-ignore
	// const itemData = tableData.filter((item) => item.id.toString() === id.toString());
	

	// Add state for your summary data
	const [summary, setSummary] = useState({
		jobApplications: 6,
		jobPosted: 2,
		candidateHired: 1,
		interviewSchedule: 2,
	});

	useEffect(() => {
		// Replace with your actual API endpoint
		axios.get('/api/summary')
			.then(res => {
				setSummary({
					jobApplications: res.data.jobApplications,
					jobPosted: res.data.jobPosted,
					candidateHired: res.data.candidateHired,
					interviewSchedule: res.data.interviewSchedule,
				});
			})
			.catch(() => {
				// Optionally handle error
			});
	}, []);

	// Define your card colors (must match your CSS classes)
	const CARD_COLORS = [
		'#f7e5b9', // warning (Job Application)
		'#c0f7ef', // success (Job Posted)
		'#cec9fa', // primary (Candidate Hired)
		'#fdcddb', // secondary (Interview Schedule)
	];

	const pieSeries = [
		summary.jobApplications,
		summary.jobPosted,
		summary.candidateHired,
		summary.interviewSchedule,
	];

	const pieOptions = {
		chart: {
			type: 'pie',
		},
		labels: [
			'Job Application',
			'Job Posted',
			'Candidate Hired',
			'Interview Schedule',
		],
		colors: CARD_COLORS,
		legend: {
			position: 'bottom',
			 labels: {
            colors: '#000', // <-- legend text color black
        },
		},
		dataLabels: {
			enabled: true,
		
		},
		tooltip: {
			y: {
				formatter: (val: number) => val.toString(),
			},
		},
	};

	const [search, setSearch] = useState(''); // <-- Add search state

    // Example: If you have a data array to filter, use this pattern:
    // const filteredData = data.filter(item =>
    //   item.name.toLowerCase().includes(search.toLowerCase()) ||
    //   item.type.toLowerCase().includes(search.toLowerCase())
    // );

	return (
		<PageWrapper title={demoPagesMenu.sales.subMenu.product.text}>
			<SubHeader>
				<SubHeaderLeft>
					<label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
                        <Icon icon="Search" size="2x" color="primary" />
                    </label>
                    <Input
                        id="searchInput"
                        type="search"
                        className="border-0 shadow-none bg-transparent"
                        placeholder="Search reports..."
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    />
				</SubHeaderLeft>
				<SubHeaderRight>
					<></>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div style={{ background: '#f6f8fa', minHeight: '100vh', padding: '20px' }}>
					<div className='row mb-4'>
						<div className='col-md-3 mb-3'>
							<Card
								className={classNames('transition-base rounded-2 mb-0 text-dark', {
									'bg-l25-warning bg-l10-warning-hover': !darkModeStatus,
									'bg-lo50-warning bg-lo25-warning-hover': darkModeStatus,
								})}
							>
								<CardBody>
									<div className='d-flex justify-content-between align-items-center'>
										<span>Job Application</span>
										<Icon icon='DynamicFeed' size='2x' />
									</div>
									<div>
										<a
											href='#'
											style={{
												color: '#1976d2',
												fontWeight: 600,
												fontSize: 18,
											}}>
											{summary.jobApplications}
										</a>
									</div>
								</CardBody>
							</Card>
						</div>
						<div className='col-md-3 mb-3'>
							<Card
								className={classNames('transition-base rounded-2 mb-0 text-dark', {
									'bg-l25-success bg-l10-success-hover': !darkModeStatus,
									'bg-lo50-success bg-lo25-success-hover': darkModeStatus,
								})}
							>
								<CardBody>
									<div className='d-flex justify-content-between align-items-center'>
										<span>Job Posted</span>
										<Icon icon='DynamicFeed' size='2x' />
									</div>
									<div>
										<a
											href='#'
											style={{
												color: '#1976d2',
												fontWeight: 600,
												fontSize: 18,
											}}>
											{summary.jobPosted}
										</a>
									</div>
								</CardBody>
							</Card>
						</div>
						<div className='col-md-3 mb-3'>
							<Card
								className={classNames('transition-base rounded-2 mb-0 text-dark', {
									'bg-l25-primary bg-l10-primary-hover': !darkModeStatus,
									'bg-lo50-primary bg-lo25-primary-hover': darkModeStatus,
								})}
							>
								<CardBody>
									<div className='d-flex justify-content-between align-items-center'>
										<span>Candidate Hired</span>
										<Icon icon='DynamicFeed' size='2x' />
									</div>
									<div>
										<a
											href='#'
											style={{
												color: '#1976d2',
												fontWeight: 600,
												fontSize: 18,
											}}>
											{summary.candidateHired}
										</a>
									</div>
								</CardBody>
							</Card>
						</div>
						<div className='col-md-3 mb-3'>
							<Card
								className={classNames('transition-base rounded-2 mb-0 text-dark', {
									'bg-l25-secondary bg-l10-secondary-hover': !darkModeStatus,
									'bg-lo50-secondary bg-lo25-secondary-hover': darkModeStatus,
								})}
							>
								<CardBody>
									<div className='d-flex justify-content-between align-items-center'>
										<span>Interview Schedule</span>
										<Icon icon='DynamicFeed' size='2x' />
									</div>
									<div>
										<a
											href='#'
											style={{
												color: '#1976d2',
												fontWeight: 600,
												fontSize: 18,
											}}>
											{summary.interviewSchedule}
										</a>
									</div>
								</CardBody>
							</Card>
						</div>
					</div>
					<div className='row'>
						<div className='col-12'>
							<Card
								style={{
									minHeight: 300,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}>
								<CardBody className='d-flex flex-column align-items-center justify-content-center'>
									{pieSeries.every(val => val === 0) ? (
										<>
											<Icon
												icon='PieChartOutline'
												size="lg"
												style={{ color: '#b0b8c1' }}
											/>
											<div
												className='mt-3'
												style={{ color: '#b0b8c1', fontSize: 20 }}>
												- Not enough data -
											</div>
										</>
									) : (
										<Chart
											options={pieOptions as ApexOptions}
											series={pieSeries}
											type="pie"
											height={300}
											color='black'
										/>
									)}
								</CardBody>
							</Card>
						</div>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default ReportPage;