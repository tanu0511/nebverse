/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import AddPassportModal from './AddPassportModal';
import AddVisaModal from './AddVisaModal';
import ViewVisaModal from './ViewVisaModal';

const nationalityOptions = [
  { value: 'AO', label: 'Angolan (ANGOLA)', flag: '🇦🇴' },
  { value: 'AL', label: 'Albanian (ALBANIA)', flag: '🇦🇱' },
  // Add more as needed
];

const PassportVisaPage: React.FC = () => {
  const [passport, setPassport] = useState<any | null>(null);
  const [addPassportOpen, setAddPassportOpen] = useState(false);
  const [editPassport, setEditPassport] = useState<any | null>(null);
  const [visas, setVisas] = useState<any[]>([]);
  const [addVisaOpen, setAddVisaOpen] = useState(false);

  // View Visa Modal state
  const [viewVisaOpen, setViewVisaOpen] = useState(false);
  const [selectedVisa, setSelectedVisa] = useState<any | null>(null);

  // Edit Visa Modal state
  const [editVisa, setEditVisa] = useState<any | null>(null);

  // Edit handler
  const handleEditPassport = () => {
    setEditPassport(passport);
    setAddPassportOpen(true);
  };

  // Delete handler
  const handleDeletePassport = () => {
    setPassport(null);
  };

  // Add/update handler
  const handleAddPassport = (data: any) => {
    const nat = nationalityOptions.find(n => n.value === data.nationality);
    setPassport({
      passportNumber: data.passportNumber,
      nationality: data.nationality,
      nationalityLabel: nat?.label ?? '',
      nationalityFlag: nat?.flag ?? '',
      issueDate: data.issueDate,
      expiryDate: data.expiryDate,
      scanCopyUrl: data.scanCopy ? URL.createObjectURL(data.scanCopy) : undefined,
    });
    setEditPassport(null);
  };

  const handleAddVisa = (data: any) => {
    if (editVisa) {
      setVisas(prev =>
        prev.map(v =>
          v.id === editVisa.id
            ? {
                ...v,
                visaNumber: data.visaNumber,
                country: data.country,
                issueDate: data.issueDate,
                expiryDate: data.expiryDate,
                scanCopyUrl: data.scanCopy ? URL.createObjectURL(data.scanCopy) : v.scanCopyUrl,
              }
            : v
        )
      );
      setEditVisa(null);
    } else {
      setVisas(prev => [
        ...prev,
        {
          id: prev.length + 1,
          visaNumber: data.visaNumber,
          country: data.country,
          issueDate: data.issueDate,
          expiryDate: data.expiryDate,
          scanCopyUrl: data.scanCopy ? URL.createObjectURL(data.scanCopy) : undefined,
        },
      ]);
    }
  };

  const handleDeleteVisa = (id: number) => {
    setVisas(prev => prev.filter(v => v.id !== id));
  };

  return (
    <PageWrapper title="Passport & Visa">
      <Page>
        <div className="row h-100">
          <div className="col-12 mb-1">
            <div className="d-flex align-items-center mb-1" style={{ minHeight: 0 }}>
              <Button
                color="primary" isLight
                className="mb-0"
               
                onClick={() => {
                  setEditPassport(null);
                  setAddPassportOpen(true);
                }}
              >
                <Icon icon="Add" className="me-2" /> Add Passport
              </Button>
            </div>
            <Card>
              <CardBody className="table-responsive" style={{ overflow: 'visible' }}>
                <h5 className="fw-bold mb-3">Passport Details</h5>
                {!passport ? (
                  <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 120 }}>
                    <Icon icon="List" size="3x" color="secondary" />
                    <div className="text-muted mt-2">- No record found. -</div>
                  </div>
                ) : (
                  <div className="row py-4">
                    <div className="col-md-12">
                      <table>
                        <tbody>
                          <tr>
                            <td className="text-muted pe-4 py-2">Passport Number</td>
                            <td>{passport.passportNumber}</td>
                          </tr>
                          <tr>
                            <td className="text-muted pe-4 py-2">Nationality</td>
                            <td>
                              <span style={{ fontSize: '1.5rem', verticalAlign: 'middle' }}>
                                {passport.nationalityFlag}
                              </span>{' '}
                              {passport.nationalityLabel}
                            </td>
                          </tr>
                          <tr>
                            <td className="text-muted pe-4 py-2">Issue Date</td>
                            <td>{passport.issueDate ? new Date(passport.issueDate).toDateString() : '--'}</td>
                          </tr>
                          <tr>
                            <td className="text-muted pe-4 py-2">Expiry Date</td>
                            <td>{passport.expiryDate ? new Date(passport.expiryDate).toDateString() : '--'}</td>
                          </tr>
                          <tr>
                            <td className="text-muted pe-4 py-2">Scan Copy</td>
                            <td>
                              {passport.scanCopyUrl ? (
                                <a
                                  href={passport.scanCopyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="fw-bold"
                                >
                                  <Icon icon="OpenInNew" className="me-1" />
                                  View Scan Copy
                                </a>
                              ) : (
                                '--'
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
          {/* VISA SECTION */}
          <div className="col-12">
            <Button
              color="primary" isLight
              className="mb-3"
              onClick={() => {
                setEditVisa(null);
                setAddVisaOpen(true);
              }}
            >
              <Icon icon="Add" className="me-2" /> Add Visa
            </Button>
            <Card stretch>
              <CardBody className="table-responsive" style={{ overflow: 'visible' }}>
                <h5 className="fw-bold mb-3">Visa Details</h5>
                <table className="table table-modern table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Visa Number</th>
                      <th>Country</th>
                      <th>Issue Date</th>
                      <th>Expiry Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visas.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center bg-light" style={{ height: 120 }}>
                          <div className="d-flex flex-column align-items-center justify-content-center">
                            <Icon icon="List" size="3x" color="secondary" />
                            <div className="text-muted mt-2">- No record found. -</div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      visas.map((visa, idx) => (
                        <tr key={visa.id}>
                          <td>{idx + 1}</td>
                          <td>{visa.visaNumber}</td>
                          <td>{visa.country}</td>
                          <td>{visa.issueDate ? new Date(visa.issueDate).toDateString() : '--'}</td>
                          <td>{visa.expiryDate ? new Date(visa.expiryDate).toDateString() : '--'}</td>
                          <td>
                            <Dropdown>
                              <DropdownToggle hasIcon={false}>
                                <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
                              </DropdownToggle>
                              <DropdownMenu isAlignmentEnd>
                                <Button
                                  color="link"
                                  className="dropdown-item"
                                  onClick={() => {
                                    setSelectedVisa(visa);
                                    setViewVisaOpen(true);
                                  }}
                                >
                                  <Icon icon="RemoveRedEye" className="me-2" /> View
                                </Button>
                                <Button
                                  color="link"
                                  className="dropdown-item"
                                  onClick={() => {
                                    setEditVisa(visa);
                                    setAddVisaOpen(true);
                                  }}
                                >
                                  <Icon icon="Edit" className="me-2" /> Edit
                                </Button>
                                <Button
                                  color="link"
                                  className="dropdown-item text-danger"
                                  onClick={() => handleDeleteVisa(visa.id)}
                                >
                                  <Icon icon="Delete" className="me-2" /> Delete
                                </Button>
                              </DropdownMenu>
                            </Dropdown>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </div>
        </div>
        <AddPassportModal
          isOpen={addPassportOpen}
          setIsOpen={setAddPassportOpen}
          onAddPassport={handleAddPassport}
          selectedPassport={editPassport}
        />
        <AddVisaModal
          isOpen={addVisaOpen}
          setIsOpen={setAddVisaOpen}
          onAddVisa={handleAddVisa}
          selectedVisa={editVisa}
        />
        <ViewVisaModal
          isOpen={viewVisaOpen}
          setIsOpen={setViewVisaOpen}
          visa={selectedVisa}
        />
      </Page>
    </PageWrapper>
  );
};

export default PassportVisaPage;