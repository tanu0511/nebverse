import React, { FC, useState } from 'react';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';
import useDarkMode from '../../../hooks/useDarkMode';
import AddSalaryModal from '../../presentation/payroll/AddSalaryModal';
interface ICommonUpcomingEventsProps {
	isFluid?: boolean;
}

interface EmployeeData {
	id: number;
	name: string;
	salaryCycle: string;
	salaryGroup: string;
	allowPayroll: string;
	netSalary: string;
}

const salaryCycleOptions = ['Monthly', 'Weekly', 'Bi-Weekly', 'Semi-Monthly'];
const payrollOptions = ['Yes', 'No'];

const CommonUpcomingEvents: FC<ICommonUpcomingEventsProps> = ({ isFluid }) => {
	useDarkMode();

	const [employeeSalaryData, setEmployeeSalaryData] = useState<EmployeeData[]>([
		{
			id: 1,
			name: 'Ranjana',
			salaryCycle: 'Monthly',
			salaryGroup: '--',
			allowPayroll: 'No',
			netSalary: '--',
		},
		{
			id: 2,
			name: 'atharvraj singh rana',
			salaryCycle: 'Semi-Monthly',
			salaryGroup: '--',
			allowPayroll: 'No',
			netSalary: '--',
		},
	]);

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);

	const [showModal, setShowModal] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(null);

	const handleChange = (id: number, field: keyof EmployeeData, value: string) => {
		const updated = employeeSalaryData.map((item) =>
			item.id === id ? { ...item, [field]: value } : item
		);
		setEmployeeSalaryData(updated);
	};

	const handleAddSalaryClick = (employee: EmployeeData) => {
		setSelectedEmployee(employee);
		setShowModal(true);
	};

	const handleSalarySubmit = (values: any) => {
		console.log('Saving salary for:', selectedEmployee?.name, values);
		// Update logic here if needed
	};

	return (
		<>
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardTitle tag='div' className='h3'>
						Employee Salary
					</CardTitle>
					<CardActions>
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
					</CardActions>
				</CardHeader>
				<CardBody className='table-responsive' isScrollable={isFluid}>
					<table className='table table-modern'>
						<thead>
							<tr>
								<th>Name</th>
								<th>Employee Salary Cycle</th>
								<th>Salary Group</th>
								<th>Allow Payroll Generate</th>
								<th>Net Salary (Monthly)</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{dataPagination(employeeSalaryData, currentPage, perPage).map((item) => (
								<tr key={item.id}>
									<td>{item.name}</td>
									<td>
										<select
											className='form-select'
											value={item.salaryCycle}
											onChange={(e) =>
												handleChange(item.id, 'salaryCycle', e.target.value)
											}>
											{salaryCycleOptions.map((option) => (
												<option key={option} value={option}>
													{option}
												</option>
											))}
										</select>
									</td>
									<td>{item.salaryGroup}</td>
									<td>
										<select
											className='form-select'
											value={item.allowPayroll}
											onChange={(e) =>
												handleChange(item.id, 'allowPayroll', e.target.value)
											}>
											{payrollOptions.map((option) => (
												<option key={option} value={option}>
													{option}
												</option>
											))}
										</select>
									</td>
									<td>{item.netSalary}</td>
									<td>
										<Button
											color='primary'
											size='sm'
											icon='Plus'
											onClick={() => handleAddSalaryClick(item)}>
											Add Salary
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</CardBody>
				<PaginationButtons
					data={employeeSalaryData}
					label='items'
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					perPage={perPage}
					setPerPage={setPerPage}
				/>
			</Card>

			{selectedEmployee && (
				<AddSalaryModal
					isOpen={showModal}
					onClose={() => setShowModal(false)}
					onSubmit={handleSalarySubmit}
					employeeName={selectedEmployee.name}
				/>
			)}
		</>
	);
};

export default CommonUpcomingEvents;
export { CommonUpcomingEvents as EmployeeSalary };