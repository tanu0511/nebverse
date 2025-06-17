/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';
import AddNoteModal from './AddNoteModal';
import ViewNoteModal from './ViewNoteModal';

interface Note {
  id: number;
  title: string;
  type: string;
  detail: string;
  created: string;
  isSelected?: boolean;
}

const NotePage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
  const [addNoteModalOpen, setAddNoteModalOpen] = useState(false);
  const [viewNoteModalOpen, setViewNoteModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | undefined>(undefined);
  const [editNote, setEditNote] = useState<Note | undefined>(undefined);

  // Filter notes by search term
  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const paginatedNotes = dataPagination(filteredNotes, currentPage, perPage);

  // Select all logic
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setNotes((prev) =>
      prev.map((n) => ({
        ...n,
        isSelected: checked,
      }))
    );
  };

  // Row select logic
  const handleRowSelect = (id: number, checked: boolean) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isSelected: checked } : n))
    );
    const allSelected = notes.length > 0 && notes.every((n) => n.id === id ? checked : n.isSelected);
    setSelectAll(allSelected);
  };

  // Add or update note handler
  const handleAddNote = (note: { title: string; type: string; detail: string }) => {
    if (editNote) {
      // Update
      setNotes(prev =>
        prev.map(n =>
          n.id === editNote.id
            ? { ...n, title: note.title, type: note.type, detail: note.detail }
            : n
        )
      );
      setEditNote(undefined);
    } else {
      // Add
      setNotes(prev => [
        ...prev,
        {
          id: Date.now(),
          title: note.title,
          type: note.type,
          detail: note.detail,
          created: new Date().toLocaleString(),
          isSelected: false,
        },
      ]);
    }
  };

  // Delete note handler
  const handleDeleteNote = (id: number) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  return (
    <PageWrapper title="Notes List">
      <SubHeader>
        <SubHeaderLeft>
          <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
            <Icon icon="Search" size="2x" color="primary" />
          </label>
          <Input
            id="searchInput"
            type="search"
            className="border-0 shadow-none bg-transparent"
            placeholder="Search note..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Button
            color="primary"
            icon="Add"
            isLight
            onClick={() => {
              setEditNote(undefined);
              setAddNoteModalOpen(true);
            }}
          >
            Add Note
          </Button>
          <Button color="info" icon="CloudDownload" isLight>
            Export
          </Button>
        </SubHeaderRight>
      </SubHeader>
      <Page>
        <div className="row h-100">
          <div className="col-12">
            <Card stretch>
              <CardBody className='table-responsive' style={{ overflow: 'visible' }}>
                <table className="table table-modern table-hover">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                      </th>
                      <th>Note Title</th>
                      <th>Note Type</th>
                      <th>Created</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedNotes.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center">
                          No notes found.
                        </td>
                      </tr>
                    ) : (
                      paginatedNotes.map((note) => (
                        <tr key={note.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={!!note.isSelected}
                              onChange={(e) => handleRowSelect(note.id, e.target.checked)}
                            />
                          </td>
                          <td>{note.title}</td>
                          <td>
                            <span className="badge bg-primary">
                              <Icon icon="Public" className="me-1" /> {note.type}
                            </span>
                          </td>
                          <td>{note.created}</td>
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
                                    setSelectedNote(note);
                                    setViewNoteModalOpen(true);
                                  }}
                                >
                                  <Icon icon="RemoveRedEye" className="me-2" /> View
                                </Button>
                                <Button
                                  color="link"
                                  className="dropdown-item"
                                  onClick={() => {
                                    setEditNote(note);
                                    setAddNoteModalOpen(true);
                                  }}
                                >
                                  <Icon icon="Edit" className="me-2" /> Update
                                </Button>
                                <Button
                                  color="link"
                                  className="dropdown-item text-danger"
                                  onClick={() => handleDeleteNote(note.id)}
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
                <PaginationButtons
                  data={filteredNotes}
                  label="Notes"
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  perPage={perPage}
                  setPerPage={setPerPage}
                />
              </CardBody>
            </Card>
          </div>
        </div>
      </Page>
      <AddNoteModal
        isOpen={addNoteModalOpen}
        setIsOpen={setAddNoteModalOpen}
        onAddNote={handleAddNote}
        selectedNote={editNote}
      />
      <ViewNoteModal
        isOpen={viewNoteModalOpen}
        setIsOpen={setViewNoteModalOpen}
        note={selectedNote}
      />
    </PageWrapper>
  );
};

export default NotePage;