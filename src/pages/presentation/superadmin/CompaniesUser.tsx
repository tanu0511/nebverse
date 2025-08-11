import React from 'react';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card';

const companies = [
  {
    name: 'API test',
    logo: '/assets/company1.png',
    totalUsers: 67,
    employees: 1,
    clients: 0,
  },
  {
    name: 'Quality Webs',
    logo: '/assets/company2.png',
    totalUsers: 40,
    employees: 6,
    clients: 34,
  },
  {
    name: 'nisha jasnani',
    logo: '/assets/company1.png',
    totalUsers: 28,
    employees: 2,
    clients: 26,
  },
  {
    name: 'RPM Advertise',
    logo: '/assets/company1.png',
    totalUsers: 17,
    employees: 17,
    clients: 0,
  },
  {
    name: 'NebVerse_Demo',
    logo: '/assets/company1.png',
    totalUsers: 12,
    employees: 10,
    clients: 2,
  },
];

const CompaniesUser = () => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardLabel icon="Groups" iconColor="primary">
          <CardTitle tag="div" className="h5">
            Companies With Most Users
          </CardTitle>
        </CardLabel>
      </CardHeader>
      <CardBody className="p-0">
        <div className="table-responsive">
          <table className="table mb-0" style={{ borderRadius: '12px', overflow: 'hidden' }}>
            <thead style={{ background: '#f8fafc' }}>
              <tr>
                <th style={{ width: 40, border: 'none', color: '#94a3b8', fontWeight: 500 }}>#</th>
                <th style={{ border: 'none', color: '#94a3b8', fontWeight: 500 }}>Company Name</th>
                <th style={{ border: 'none', color: '#94a3b8', fontWeight: 500 }}>Total Users</th>
                <th style={{ border: 'none', color: '#94a3b8', fontWeight: 500 }}>Employees</th>
                <th style={{ border: 'none', color: '#94a3b8', fontWeight: 500 }}>Clients</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, idx) => (
                <tr key={company.name} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td>{idx + 1}</td>
                  <td>
                    <img
                      src={company.logo}
                      alt="user"
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        marginRight: 8,
                        verticalAlign: 'middle',
                        border: '1px solid #e5e7eb',
                        background: '#fff',
                      }}
                    />
                    {company.name}
                  </td>
                  <td>{company.totalUsers}</td>
                  <td>{company.employees}</td>
                  <td>{company.clients}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default CompaniesUser;
