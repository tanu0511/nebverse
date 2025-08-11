import React, { FC } from 'react';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
import USERS from '../../../common/data/usernishadummydata';
import addEmployeeData from '../hr/AddEmployee.json';
import signupData from '../auth/signup.json';

interface ICommonDashboardIncomeProps {
    activeTab: string;
}

const ActiveCompanies: FC<ICommonDashboardIncomeProps> = () => {
    const usersArray = Object.values(USERS);
    const addEmployeeArray = addEmployeeData.AddEmployee || [];
    const signupArray = signupData.users || [];

    const totalEmployees = usersArray.length + addEmployeeArray.length + signupArray.length;

    return (
        <div className="col-md-12">
            <Card>
                <CardBody>
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <div className="fw-semibold mb-2 text-dark">License Expirence</div>
                            <div className="fs-4 fw-bold text-danger">{totalEmployees}</div>
                        </div>
                        <div className="mt-1">
                            <Icon icon="Apartment" size="2x" color="secondary" />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default ActiveCompanies;