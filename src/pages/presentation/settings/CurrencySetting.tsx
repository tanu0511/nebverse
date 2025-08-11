import React from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';

const currencies = [
  {
    id: 1,
    name: 'Dollars',
    symbol: '$',
    code: 'USD',
    rate: 86.7,
    format: '$1,000.00',
    isDefault: false,
  },
  {
    id: 2,
    name: 'Rupee',
    symbol: '₹',
    code: 'INR',
    rate: 1,
    format: '₹1,000.00',
    isDefault: true,
  },
];

const CurrencySetting = () => {
  return (
    <PageWrapper title="Currency Settings">
      <SubHeader>
        <SubHeaderLeft>
          <Button color="primary" isLight>
            <Icon icon="Add" className="me-2" /> Add New Currency
          </Button>
        </SubHeaderLeft>
      </SubHeader>
      <Page>
        <div className="row h-100">
          <div className="col-12">
            <Card stretch style={{ overflow: 'visible' }}>
              <CardBody className="table-responsive" style={{ overflow: 'visible' }}>
                <h4 className="mb-4">Currency Settings</h4>
                <table className="table table-modern table-hover">
                  <thead>
                    <tr>
                      <th>Currency Name</th>
                      <th>Currency Symbol</th>
                      <th>Currency Code</th>
                      <th>Exchange Rate</th>
                      <th>Currency Format <Icon icon="HelpOutline" size="sm" className="ms-1" /></th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currencies.map((currency) => (
                      <tr key={currency.id}>
                        <td>
                          {currency.name}
                          {currency.isDefault && (
                            <span className="badge bg-primary ms-2">Default</span>
                          )}
                        </td>
                        <td>{currency.symbol}</td>
                        <td>{currency.code}</td>
                        <td>{currency.rate}</td>
                        <td>{currency.format}</td>
                        <td>
                          <Button color="primary" isLight size="sm" className="me-2">
                            <Icon icon="Edit" className="me-1" /> Edit
                          </Button>
                          {!currency.isDefault && (
                            <Button color="primary" isLight size="sm">
                              <Icon icon="Delete" className="me-1" /> Delete
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </div>
        </div>
      </Page>
    </PageWrapper>
  );
};

export default CurrencySetting;
