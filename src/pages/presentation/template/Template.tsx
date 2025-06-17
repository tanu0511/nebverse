import React, { useState } from 'react';
import Button from '../../../components/bootstrap/Button';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
import Dropdown, { DropdownToggle, DropdownMenu } from '../../../components/bootstrap/Dropdown';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../../components/bootstrap/Modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTemplateContext } from '../../presentation/genrate/TemplateContext';
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

const Template = () => {
  const { templates, setTemplates } = useTemplateContext();
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [viewModal, setViewModal] = useState(false);
  const [viewTemplate, setViewTemplate] = useState<{ title: string; description: string } | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Dynamic search filter for all relevant fields
  const filteredTemplates = templates.filter(
    tpl =>
      tpl.title.toLowerCase().includes(search.toLowerCase()) ||
      (tpl.description && tpl.description.toLowerCase().includes(search.toLowerCase()))
  );
  const sortedTemplates = [...filteredTemplates].sort((a, b) =>
    sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
  );
  const paginatedTemplates = sortedTemplates.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  // Save handler
  const handleSave = () => {
    if (title.trim()) {
      if (editingId !== null) {
        setTemplates(prev =>
          prev.map(t =>
            t.id === editingId ? { ...t, title: title.trim(), description } : t
          )
        );
      } else {
        setTemplates(prev => [
          ...prev,
          {
            id: prev.length ? Math.max(...prev.map(t => t.id)) + 1 : 1,
            title: title.trim(),
            description,
          },
        ]);
      }
    }
    setShowModal(false);
    setTitle('');
    setDescription('');
    setEditingId(null);
  };

  const handleCancel = () => {
    setShowModal(false);
    setTitle('');
    setDescription('');
    setEditingId(null);
  };

  const handleEdit = (tpl: { id: number; title: string; description: string }) => {
    setTitle(tpl.title);
    setDescription(tpl.description);
    setShowModal(true);
    setEditingId(tpl.id);
  };

  const handleDelete = (id: number) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
  };

  return (
    <PageWrapper title="Templates">
      <SubHeader>
        <SubHeaderLeft>
          <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
            <Icon icon="Search" size="2x" color="primary" />
          </label>
          <Input
            id="searchInput"
            type="search"
            className="border-0 shadow-none bg-transparent"
            placeholder="Search template..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Button
            icon="Add"
            color="primary"
            isLight
            onClick={() => {
              setTitle('');
              setDescription('');
              setEditingId(null);
              setShowModal(true);
            }}
          >
            Add Template
          </Button>
        </SubHeaderRight>
      </SubHeader>
      <Page>
        <div className="row h-100">
          <div className="col-12">
            <Card stretch>
              <CardBody isScrollable className="table-responsive">
                <table className="table table-modern table-hover align-middle mb-0">
                  <thead>
                    <tr>
                      <th
                        style={{ cursor: 'pointer', minWidth: 180 }}
                        onClick={() => setSortAsc((asc) => !asc)}
                      >
                        Title{' '}
                        <Icon icon={sortAsc ? 'ArrowUpward' : 'ArrowDownward'} />
                      </th>
                      <th style={{ width: 120, textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTemplates.length === 0 && (
                      <tr>
                        <td colSpan={2} className="text-center bg-light">
                          No templates found
                        </td>
                      </tr>
                    )}
                    {paginatedTemplates.map((tpl) => (
                      <tr key={tpl.id}>
                        <td>{tpl.title}</td>
                        <td style={{ textAlign: 'right' }}>
                          <Dropdown>
                            <DropdownToggle hasIcon={false}>
                              <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
                            </DropdownToggle>
                            <DropdownMenu isAlignmentEnd>
                              <Button
                                color="link"
                                className="dropdown-item"
                                onClick={() => {
                                  setViewTemplate({ title: tpl.title, description: tpl.description });
                                  setViewModal(true);
                                }}
                              >
                                <Icon icon="RemoveRedEye" className="me-2" /> View
                              </Button>
                              <Button
                                color="link"
                                className="dropdown-item"
                                onClick={() => handleEdit(tpl)}
                              >
                                <Icon icon="Edit" className="me-2" /> Edit
                              </Button>
                              <Button
                                color="link"
                                className="dropdown-item text-danger"
                                onClick={() => handleDelete(tpl.id)}
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
                data={sortedTemplates}
                label="Templates"
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>
          </div>
        </div>
      </Page>

      {/* Add/Edit Template Modal */}
      <Modal isOpen={showModal} setIsOpen={setShowModal} size="lg">
        <ModalHeader setIsOpen={setShowModal}>
          <h5 className="mb-0">{editingId !== null ? 'Edit Template' : 'Add Template'}</h5>
        </ModalHeader>
        <ModalBody>
          <div className="mb-3">
            <label htmlFor="templateTitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="templateTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="templateDescription" className="form-label">
              Description
            </label>
            <ReactQuill
              className="mb-5"
              value={description}
              onChange={setDescription}
              id="templateDescription"
              style={{ height: 190 }}
            />
          </div>
          <div className="mb-3 mt-5">
            <label className="form-label">Variables</label>
            <div className="d-flex flex-wrap">
              {variableList.map((variable, index) => (
                <Button
                  key={index}
                  color="secondary"
                  className="me-2 mb-2"
                  onClick={() => setDescription((desc) => desc + variable)}
                >
                  {variable}
                </Button>
              ))}
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="justify-content-end">
          <Button color="secondary" className="me-2" onClick={handleCancel}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </Modal>

      {/* View Template Modal */}
      <Modal isOpen={viewModal} setIsOpen={setViewModal} size="lg">
        <ModalHeader setIsOpen={setViewModal}>
          <h5 className="mb-0">Show Template</h5>
        </ModalHeader>
        <ModalBody>
          {viewTemplate && (
            <div>
              <div className="fw-bold fs-4 text-center mb-4">{viewTemplate.title}</div>
              <div
                style={{ minHeight: 300 }}
                dangerouslySetInnerHTML={{ __html: viewTemplate.description || '' }}
              />
            </div>
          )}
        </ModalBody>
      </Modal>
    </PageWrapper>
  );
};

export default Template;