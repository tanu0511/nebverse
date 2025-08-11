import React from 'react';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card';

const companies = [
  {
    name: 'Quality Verse',
    logo: '/assets/company1.png',
    package: 'Trial (monthly)',
    date: 'Thu 31 Jul 2025 11:20 am (4 days ago)',
  },
  {
    name: 'dqqdqq',
    logo: '/assets/company2.png',
    package: 'Trial (monthly)',
    date: 'Thu 31 Jul 2025 10:18 am (4 days ago)',
  },
  {
    name: 'vivek',
    logo: '/assets/company3.png',
    package: 'Default (monthly)',
    date: 'Tue 24 Jun 2025 12:43 pm (1 month ago)',
  },
  {
    name: 'Vibrant Group',
    logo: '/assets/company4.png',
    package: 'Default (monthly)',
    date: 'Tue 17 Jun 2025 03:52 pm (1 month ago)',
  },
  {
    name: 'FINARROW CONSULTANCY SERVICES PVT LTD',
    logo: '/assets/company5.png',
    package: 'Default (monthly)',
    date: 'Fri 30 May 2025 05:30 pm (2 months ago)',
  },
];

const NewRegCompanies = () => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardLabel icon="Business" iconColor="info">
          <CardTitle tag="div" className="h5">
            Newly Registered Companies
          </CardTitle>
        </CardLabel>
      </CardHeader>
      <CardBody className="p-0">
        <div className="table-responsive">
          <table className="table mb-0" style={{ borderRadius: '12px', overflow: 'hidden' }}>
            <thead style={{ background: '#f8fafc' }}>
              <tr>
                <th style={{ width: 40, border: 'none', color: '#94a3b8', fontWeight: 500 }}>#</th>
                <th style={{ border: 'none', color: '#94a3b8', fontWeight: 500 }}>Name</th>
                <th style={{ border: 'none', color: '#94a3b8', fontWeight: 500 }}>Packages</th>
                <th style={{ border: 'none', color: '#94a3b8', fontWeight: 500 }}>Date</th>
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
                  <td>{company.package}</td>
                  <td>{company.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default NewRegCompanies;
