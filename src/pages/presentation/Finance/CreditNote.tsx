/* eslint-disable @typescript-eslint/no-unused-vars */
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

interface CreditNote {
  isSelected: unknown;
  id: number;
  creditNote: string;
  invoice: string;
  name: string;
  total: string;
  creditNoteDate: string;
  status: string;
}

const CreditNotePage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
  const [creditNotes, setCreditNotes] = useState<CreditNote[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectAll, setSelectAll] = useState<boolean>(false);

  // Filtered and paginated data
  const filteredData = creditNotes.filter((note) =>
    note.creditNote.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.invoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const items = filteredData; // For compatibility with dataPagination if needed

  const handleDelete = (id: number) => {
    setCreditNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const handleSelectAll = (isChecked: boolean) => {
    setSelectAll(isChecked);
    setCreditNotes((prev) =>
      prev.map((note) => ({
        ...note,
        isSelected: isChecked,
      }))
    );
  };

  const handleRowSelect = (id: number, isChecked: boolean) => {
    setCreditNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isSelected: isChecked } : note
      )
    );
    const allSelected = creditNotes.every((note) =>
      note.id === id ? isChecked : note.isSelected
    );
    setSelectAll(allSelected);
  };

  return (
    <PageWrapper title="Credit Notes">
      <SubHeader>
        <SubHeaderLeft>
          <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
            <Icon icon="Search" size="2x" color="primary" />
          </label>
          <Input
            id="searchInput"
            type="search"
            className="border-0 shadow-none bg-transparent"
            placeholder="Search credit note..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Button
            color="info"
            icon="CloudDownload"
            isLight
            tag="a"
            to="/credit-notes-export.txt"
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
                      <th>
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                      </th>
                      <th>Credit Note</th>
                      <th>Invoice</th>
                      <th>Name</th>
                      <th>Total</th>
                      <th>Credit Note Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPagination(items, currentPage, perPage).length > 0 ? (
                      dataPagination(items, currentPage, perPage).map((note) => (
                        <tr key={note.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={note.isSelected || false}
                              onChange={(e) => handleRowSelect(note.id, e.target.checked)}
                            />
                          </td>
                          <td>{note.creditNote}</td>
                          <td>{note.invoice}</td>
                          <td>{note.name}</td>
                          <td>{note.total}</td>
                          <td>{note.creditNoteDate}</td>
                          <td>{note.status}</td>
                          <td>
                            <Dropdown>
                              <DropdownToggle hasIcon={false}>
                                <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
                              </DropdownToggle>
                              <DropdownMenu isAlignmentEnd>
                                <Button
                                  color="link"
                                  className="dropdown-item text-danger"
                                  onClick={() => handleDelete(note.id)}
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
                        <td colSpan={8} className="text-center bg-light">
                          No data available in table
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </CardBody>
              <PaginationButtons
                data={filteredData}
                label="Credit Notes"
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

export default CreditNotePage;