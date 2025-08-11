import React from 'react';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card';

const packageCounts = [
  { name: 'Default', total: 1200 },
  { name: 'Multiverse', total: 3 },
  { name: 'Moon', total: 1 },
  { name: 'Earth RPM', total: 1 },
  { name: 'Multiverse', total: 0 },
  // { name: 'Earth', total: 0 },
  // { name: 'Earth', total: 0 },
  // { name: 'Moon', total: 1 },
];

const PackageCount = () => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardLabel icon="Inventory" iconColor="warning">
          <CardTitle tag="div" className="h5">
            Package Company Count
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
                <th style={{ border: 'none', color: '#94a3b8', fontWeight: 500 }}>Total Companies</th>
              </tr>
            </thead>
            <tbody>
              {packageCounts.map((pkg, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td>{idx + 1}</td>
                  <td>{pkg.name}</td>
                  <td>{pkg.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default PackageCount;
