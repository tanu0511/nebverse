import React, { FC } from 'react';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../components/bootstrap/Card';
// import useDarkMode from '../../../../hooks/useDarkMode';
import USERS from '../../../../common/data/usernishadummydata';
import addEmployeeData from '../../hr/AddEmployee.json';
import signupData from '../../auth/signup.json';

interface ICommonDashboardIncomeProps {
	activeTab: string;
}

const CommonDashboardIncome: FC<ICommonDashboardIncomeProps> = ({ activeTab }) => {
	// const darkModeStatus = useDarkMode();

	const usersArray = Object.values(USERS);
	const addEmployeeArray = addEmployeeData.AddEmployee || [];
	const signupArray = signupData.users || [];

	const totalEmployees = usersArray.length + addEmployeeArray.length + signupArray.length;

	return (
		<div className='col-md-9'>
			<Card>
				<CardHeader>
					<CardLabel icon='PersonPin' iconColor='success'>
						<CardTitle tag='div' className='h5'>
							Total Employee
						</CardTitle>
						<CardSubTitle tag='div' className='h6'>
							{activeTab}
						</CardSubTitle>
					</CardLabel>
				</CardHeader>
				<CardBody>
					<h4 className='text-end text-warning'>{totalEmployees}</h4>
				</CardBody>
			</Card>
		</div>
	);
};

export default CommonDashboardIncome;
