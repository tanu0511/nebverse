import React, { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import AddSkillsModal from './AddSkillsModal';

type Skill = {
  id: number;
  name: string;
};

const SkillsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
  const [searchTerm, setSearchTerm] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editSkill, setEditSkill] = useState<Skill | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Search handler
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const filteredData = skills.filter(
    (item: Skill) =>
      (item.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add new skills
  const handleSaveSkills = (newSkills: string[]) => {
    setSkills((prev) => [
      ...prev,
      ...newSkills
        .filter((name) => !prev.some((s) => s.name.toLowerCase() === name.toLowerCase()))
        .map((name, i) => ({ id: Date.now() + i, name })),
    ]);
  };

  // Edit skill
  const handleEditSkill = (updatedSkills: string[]) => {
    if (editSkill && updatedSkills[0]) {
      setSkills((prev) =>
        prev.map((s) =>
          s.id === editSkill.id ? { ...s, name: updatedSkills[0] } : s
        )
      );
    }
    setEditSkill(null);
    setEditModalOpen(false);
  };

  const handleDeleteSkill = (id: number) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  // Checkbox handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredData.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((sid) => sid !== id)
    );
  };

  return (
    <PageWrapper title="Jobs">
      <SubHeader>
        <SubHeaderLeft>
          <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
            <Icon icon="Search" size="2x" color="primary" />
          </label>
          <Input
            id="searchInput"
            type="search"
            className="border-0 shadow-none bg-transparent"
            placeholder="Search Skills..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
            value={searchTerm}
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Button
            icon='Add'
            color='primary'
            isLight
            onClick={() => setAddModalOpen(true)}
          >
            Add Skills
          </Button>
        </SubHeaderRight>
      </SubHeader>
      <Page>
        <div className="row h-100">
          <div className="col-12">
            <Card stretch>
              <CardBody isScrollable className="table-responsive">
                <table className="table table-modern table-hover align-middle">
                  <thead>
                    <tr>
                      <th style={{ width: '15%', textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          checked={
                            filteredData.length > 0 &&
                            selectedIds.length === filteredData.length
                          }
                          onChange={handleSelectAll}
                          aria-label="Select all"
                        />
                      </th>
                      <th style={{ width: '45%', textAlign: 'center' }}>Name</th>
                      <th style={{ width: '40%', textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPagination(filteredData, currentPage, perPage).length > 0 ? (
                      dataPagination(filteredData, currentPage, perPage).map((item) => (
                        <tr key={item.id} style={{ height: '56px' }}>
                          <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(item.id)}
                              onChange={(e) =>
                                handleSelectRow(item.id, e.target.checked)
                              }
                              aria-label={`Select ${item.name}`}
                            />
                          </td>
                          <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                            {item.name || 'N/A'}
                          </td>
                          <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                            <Dropdown>
                              <DropdownToggle hasIcon={false}>
                                <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
                              </DropdownToggle>
                              <DropdownMenu isAlignmentEnd>
                                <Button
                                  color="link"
                                  className="dropdown-item"
                                  onClick={() => {
                                    setEditSkill(item);
                                    setEditModalOpen(true);
                                  }}
                                >
                                  <Icon icon="Edit" className="me-2" /> Edit
                                </Button>
                                <Button
                                  color="link"
                                  className="dropdown-item text-danger"
                                  onClick={() => handleDeleteSkill(item.id)}
                                >
                                  <Icon icon="Delete" className="me-2" /> Delete
                                </Button>
                              </DropdownMenu>
                            </Dropdown>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="text-center">
                          No records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </CardBody>
              <PaginationButtons
                data={filteredData}
                label="Skills"
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>
          </div>
        </div>
      </Page>
      {/* Add Modal */}
      <AddSkillsModal
        isOpen={addModalOpen}
        setIsOpen={setAddModalOpen}
        onSave={handleSaveSkills}
      />
      {/* Edit Modal */}
      <AddSkillsModal
        isOpen={editModalOpen}
        setIsOpen={setEditModalOpen}
        onSave={handleEditSkill}
        initialSkills={editSkill ? [editSkill.name] : undefined}
      />
    </PageWrapper>
  );
};

export default SkillsPage;