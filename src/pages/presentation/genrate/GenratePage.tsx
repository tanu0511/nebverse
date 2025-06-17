/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import Button from '../../../components/bootstrap/Button';
import Card, { CardBody, CardHeader } from '../../../components/bootstrap/Card';
import { useTemplateContext } from './TemplateContext'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Icon from '../../../components/icon/Icon';
import Dropdown, { DropdownToggle, DropdownMenu, DropdownItem } from '../../../components/bootstrap/Dropdown';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Input from '../../../components/bootstrap/forms/Input';
import PaginationButtons, { PER_COUNT } from '../../../components/PaginationButtons';

const variableList = [
  '#CURRENT_DATE##',
  '#EMPLOYEE_ID##',
  '#EMPLOYEE_NAME##',
  '#EMPLOYEE_ADDRESS##',
  '#EMPLOYEE_JOINING_DATE##',
  '#EMPLOYEE_EXIT_DATE##',
  '#EMPLOYEE_PROBATION_END_DATE##',
  '#EMPLOYEE_NOTICE_PERIOD_START_DATE##',
  '#EMPLOYEE_NOTICE_PERIOD_END_DATE##',
  '#EMPLOYEE_DOB##',
  '#EMPLOYEE_DEPARTMENT##',
  '#EMPLOYEE_DESIGNATION##',
  '#SIGNATORY##',
  '#SIGNATORY_DESIGNATION##',
  '#SIGNATORY_DEPARTMENT##',
  '#COMPANY_NAME##',
];

// Add New Template "page" component
const AddNewTemplate = ({
  onBack,
  onSave,
  letterTypes,
  templates,
  editData,
}: {
  onBack: () => void;
  onSave: (letter: { employee: string; letterType: string; created: string; description: string }) => void;
  letterTypes: string[];
  templates: { title: string; description: string }[];
  editData?: any;
}) => {
  const [letterType, setLetterType] = useState(editData?.letterType || '');
  const [employee, setEmployee] = useState(editData?.employee || '');
  const [employeeName, setEmployeeName] = useState(editData?.employeeName || '');
  const [space, setSpace] = useState({ left: 20, right: 20, top: 20, bottom: 20 });
  const [editableDescription, setEditableDescription] = useState(editData?.description || '');

  // Update description when letter type changes
  useEffect(() => {
    // Only update description if not editing (i.e., no editData or letterType changed and not editing)
    if (!editData) {
      const tpl = templates.find(t => t.title === letterType);
      setEditableDescription(tpl ? tpl.description : '');
    }
    // If editing, do not overwrite the description
    // Optionally, you can add logic to update description only if letterType changes and not editing
  }, [letterType, templates, editData]);

  const previewStyle = {
    marginLeft: space.left,
    marginRight: space.right,
    marginTop: space.top,
    marginBottom: space.bottom,
    background: '#fff',
    minHeight: 200,
    borderRadius: 8,
    padding: 16,
    boxSizing: 'border-box' as const,
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob(
      [
        `<html><head><meta charSet="utf-8" /></head><body>${editableDescription}</body></html>`
      ],
      { type: 'text/html' }
    );
    element.href = URL.createObjectURL(file);
    element.download = `${letterType || 'letter'}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${letterType || 'Letter'}</title>
          </head>
          <body>
            ${editableDescription}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  const handleSave = () => {
    if (employee && letterType) {
      onSave({
        employee,
        letterType,
        created: new Date().toDateString(),
        description: editableDescription,
      });
      onBack();
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Left: Letter Details */}
        <div className="col-md-7 mb-3">
          <Card>
            <CardHeader>
              <div className="fw-bold fs-5">Letter Details</div>
            </CardHeader>
            <CardBody>
              <div className="mb-3">
                <label className="form-label">Letter Type</label>
                <select
                  className="form-select"
                  value={letterType}
                  onChange={e => setLetterType(e.target.value)}
                >
                  <option value="">--</option>
                  {letterTypes.map((type, idx) => (
                    <option key={idx} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Employees <Icon icon="HelpOutline" style={{ fontSize: 15 }} />
                </label>
                <select
                  className="form-select"
                  value={employee}
                  onChange={e => setEmployee(e.target.value)}
                >
                  <option value="">--</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Employee Name</label>
                <input
                  className="form-control"
                  placeholder="Enter employee name"
                  value={employeeName}
                  onChange={e => setEmployeeName(e.target.value)}
                />
              </div>
              <div className="mb-2 fw-bold" style={{ color: 'green' }}>
                Adjust space setting (in pixel)
              </div>
              <div className="row">
                <div className="col">
                  <label className="form-label">Left</label>
                  <input
                    type="number"
                    className="form-control"
                    value={space.left}
                    onChange={e => setSpace(s => ({ ...s, left: +e.target.value }))}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Right</label>
                  <input
                    type="number"
                    className="form-control"
                    value={space.right}
                    onChange={e => setSpace(s => ({ ...s, right: +e.target.value }))}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Top</label>
                  <input
                    type="number"
                    className="form-control"
                    value={space.top}
                    onChange={e => setSpace(s => ({ ...s, top: +e.target.value }))}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Bottom</label>
                  <input
                    type="number"
                    className="form-control"
                    value={space.bottom}
                    onChange={e => setSpace(s => ({ ...s, bottom: +e.target.value }))}
                  />
                </div>
              </div>
              <div className="mb-5 mt-4">
                <label className="form-label">Description</label>
                <ReactQuill
                  value={editableDescription}
                  onChange={setEditableDescription}
                  style={{ height: 150 }}
                />
              </div>
              <div className="mt-5 mb-4">
                <div className=" mb-3" style={{ fontSize: 14 }}>Available Variables :</div>
                <div className="row">
                  {variableList.map((variable, idx) => (
                    <div className="col-md-6 col-sm-6 mb-2" key={idx}>
                      <span
                        className="d-inline-flex align-items-center text-secondary"
                        style={{
                          cursor: 'pointer',
                          fontSize: 11,
                          background: '#f8f9fa',
                          borderRadius: 4,
                          padding: '4px 10px',
                          marginRight: 6,
                          transition: 'background 0.2s'
                        }}
                        onClick={() => setEditableDescription((desc: string) => desc + variable)}
                      >
                        <Icon icon="ContentCopy" className="me-2 text-secondary" style={{ fontSize: 15 }} />
                        <span>{variable}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="d-flex justify-content-end mt-4">
                <Button color="secondary" className="me-2" onClick={onBack}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onClick={handleSave}
                  isDisable={!(employeeName || employee) || !letterType}
                >
                  Save
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
        {/* Right: Preview Letter */}
        <div className="col-md-5 mb-3">
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <div className="fw-bold fs-5">Preview Letter</div>
              <div>
                <Button color="primary" size="sm" className="me-2" onClick={handleDownload}>
                  Download
                </Button>
                <Button color="success" size="sm" onClick={handlePrint}>
                  Print
                </Button>
              </div>
            </CardHeader>
            <CardBody style={{ minHeight: 200 }}>
              <div style={previewStyle}>
                {editableDescription ? (
                  <div dangerouslySetInnerHTML={{ __html: editableDescription }} />
                ) : (
                  <div className="text-muted">Select a Letter Type to preview its description.</div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};


const GenratePage = () => {
  // Table state (empty for now)
  const [data, setData] = useState<any[]>([]);
  const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewLetter, setViewLetter] = useState<any | null>(null);

  // Show add new "page" state
  const [showAdd, setShowAdd] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editLetter, setEditLetter] = useState<any | null>(null);

  // Dynamic search/filter state
  const [search, setSearch] = useState('');
  // Dynamic search filter for all relevant fields
  const filteredData = data.filter(
    (row) =>
      (row.employee && row.employee.toLowerCase().includes(search.toLowerCase())) ||
      (row.letterType && row.letterType.toLowerCase().includes(search.toLowerCase())) ||
      (row.created && row.created.toLowerCase().includes(search.toLowerCase()))
  );
  const paginatedData = filteredData.slice((currentPage - 1) * perPage, currentPage * perPage);

  const { templates } = useTemplateContext();

  const handleSaveLetter = (letter: { employee: string; letterType: string; created: string; description: string }) => {
    if (editIndex !== null) {
      setData(prev => prev.map((item, idx) => idx === editIndex ? { ...letter } : item));
      setEditIndex(null);
      setEditLetter(null);
    } else {
      setData(prev => [
        ...prev,
        {
          ...letter,
        },
      ]);
    }
    setShowAdd(false);
  };

  const handleDelete = (idxToDelete: number) => {
    setData(prev => prev.filter((_, idx) => idx !== idxToDelete));
  };

  if (viewLetter) {
    return (
      <div className="container-fluid mt-4">
        <div className="fw-bold fs-4 mb-3">
          {viewLetter.employee} - {viewLetter.letterType}
        </div>
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center">
            <div className="fw-bold fs-5">Letter Details</div>
            <div>
              <Button color="primary" size="sm" className="me-2"
                onClick={() => {
                  const element = document.createElement('a');
                  const file = new Blob(
                    [
                      `<!DOCTYPE html><html><head><meta charset="utf-8" /></head><body>${viewLetter.description || ''}</body></html>`
                    ],
                    { type: 'text/html' }
                  );
                  element.href = URL.createObjectURL(file);
                  element.download = `${viewLetter.letterType || 'letter'}.html`;
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}>
                Download
              </Button>
              <Button color="success" size="sm"
                onClick={() => {
                  const printWindow = window.open('', '', 'width=800,height=600');
                  if (printWindow) {
                    printWindow.document.write(`
                      <html>
                        <head>
                          <title>${viewLetter.letterType || 'Letter'}</title>
                        </head>
                        <body>
                          ${viewLetter.description || ''}
                        </body>
                      </html>
                    `);
                    printWindow.document.close();
                    printWindow.focus();
                    printWindow.print();
                  }
                }}>
                Print
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <div dangerouslySetInnerHTML={{ __html: viewLetter.description || '' }} />
          </CardBody>
        </Card>
        <Button color="secondary" className="mt-3" onClick={() => setViewLetter(null)}>
          Back
        </Button>
      </div>
    );
  }

  // If showAdd is true, show the AddNewTemplate "page"
  if (showAdd) {
    return (
      <AddNewTemplate
        onBack={() => {
          setShowAdd(false);
          setEditIndex(null);
          setEditLetter(null);
        }}
        onSave={handleSaveLetter}
        letterTypes={templates.map(t => t.title)}
        templates={templates}
        editData={editLetter}
      />
    );
  }

  return (
    <PageWrapper title="Generated Letters">
      <SubHeader>
        <SubHeaderLeft>
          <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
            <Icon icon="Search" size="2x" color="primary" />
          </label>
          <Input
            id="searchInput"
            type="search"
            className="border-0 shadow-none bg-transparent"
            placeholder="Search letter..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Button
            icon="Add"
            color="primary"
            isLight
            onClick={() => setShowAdd(true)}
          >
            Add New
          </Button>
          <Button
            color="info"
            icon="CloudDownload"
            isLight
            tag="a"
            to="/letters-export.txt"
            target="_blank"
            download
          >
            Export
          </Button>
        </SubHeaderRight>
      </SubHeader>
      <Page>
        <div className="row h-100">
          <div className="col-12">
            <Card stretch>
              <CardBody isScrollable className="table-responsive">
                <table className="table table-modern table-hover">
                  <thead>
                    <tr>
                      <th>Employees</th>
                      <th>Letter Type</th>
                      <th>Created</th>
                      <th style={{ textAlign: "right" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center bg-light">
                          No data available in table
                        </td>
                      </tr>
                    )}
                    {paginatedData.map((row, idx) => (
                      <tr key={idx}>
                        <td>{row.employee}</td>
                        <td>{row.letterType}</td>
                        <td>{row.created}</td>
                        <td style={{ textAlign: "right" }}>
                          <Dropdown>
                            <DropdownToggle hasIcon={false}>
                              <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
                            </DropdownToggle>
                            <DropdownMenu isAlignmentEnd>
                              <Button
                                color="link"
                                className="dropdown-item"
                                onClick={() => setViewLetter(row)}
                              >
                                <Icon icon="RemoveRedEye" className="me-2" /> View
                              </Button>
                              <Button
                                color="link"
                                className="dropdown-item"
                                onClick={() => {
                                  const element = document.createElement('a');
                                  const file = new Blob(
                                    [
                                      `<html><head><meta charSet="utf-8" /></head><body>${row.description || ''}</body></html>`
                                    ],
                                    { type: 'text/html' }
                                  );
                                  element.href = URL.createObjectURL(file);
                                  element.download = `${row.letterType || 'letter'}.html`;
                                  document.body.appendChild(element);
                                  element.click();
                                  document.body.removeChild(element);
                                }}
                              >
                                <Icon icon="Download" className="me-2" /> Download
                              </Button>
                              <Button
                                color="link"
                                className="dropdown-item"
                                onClick={() => {
                                  setData(prev => [
                                    ...prev,
                                    {
                                      ...row,
                                      created: new Date().toDateString(),
                                    },
                                  ]);
                                }}
                              >
                                <Icon icon="ContentCopy" className="me-2" /> Duplicate
                              </Button>
                              <Button
                                color="link"
                                className="dropdown-item"
                                onClick={() => {
                                  const realIndex = (currentPage - 1) * perPage + idx;
                                  setEditIndex(realIndex);
                                  setEditLetter(row);
                                  setShowAdd(true);
                                }}
                              >
                                <Icon icon="Edit" className="me-2" /> Edit
                              </Button>
                              <Button
                                color="link"
                                className="dropdown-item text-danger"
                                onClick={() => handleDelete(idx)}
                              >
                                <Icon icon="Delete" className="me-2" /> Delete
                              </Button>
                            </DropdownMenu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
              <PaginationButtons
                data={filteredData}
                label="Letters"
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>
          </div>
        </div>
      </Page>
    </PageWrapper>
  );
};

export default GenratePage;