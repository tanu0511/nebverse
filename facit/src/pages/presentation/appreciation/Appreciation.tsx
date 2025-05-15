/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import useSortableData from '../../../hooks/useSortableData';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import AddAward from './AddAward';
import ViewAwardModal from './ViewAwardModal';

interface Award {
  id: number;
  name: string;
  parentDepartment?: string;
  date?: string;
  summary?: string;
}

const Appreciation = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
  const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
  const [viewModalStatus, setViewModalStatus] = useState<boolean>(false);
  const [awards, setAwards] = useState<Award[]>([]);
  const [selectedAward, setSelectedAward] = useState<Award | undefined>(undefined);

  const filteredData = awards;
  const { items } = useSortableData(filteredData);

  const handleDelete = (id: number) => {
    setAwards((prev) => prev.filter((award) => award.id !== id));
  };

  return (
    <PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text}>
      <SubHeader>
        <SubHeaderLeft>
          <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
            <Icon icon="Search" size="2x" color="primary" />
          </label>
          <Input
            id="searchInput"
            type="search"
            className="border-0 shadow-none bg-transparent"
            placeholder="Search award..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value.toLowerCase();
              setAwards((prev) =>
                prev.filter((award) => award.name.toLowerCase().includes(value))
              );
            }}
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Button
            icon="PersonAdd"
            color="primary"
            isLight
            onClick={() => {
              setSelectedAward(undefined);
              setEditModalStatus(true);
            }}
          >
            Add Award
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
                      <th>Award Name</th>
                      <th>Given To</th>
                      <th>Given On</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPagination(items, currentPage, perPage).map((i) => (
                      <tr key={i.id}>
                        <td>{i.name}</td>
                        <td>{i.parentDepartment || 'N/A'}</td>
                        <td>{i.date || 'N/A'}</td>
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
                                  setSelectedAward(i);
                                  setViewModalStatus(true);
                                }}
                              >
                                <Icon icon="Visibility" className="me-2" />
                                View
                              </Button>
                              <Button
                                color="link"
                                className="dropdown-item"
                                onClick={() => {
                                  setSelectedAward(i);
                                  setEditModalStatus(true);
                                }}
                              >
                                <Icon icon="Edit" className="me-2" />
                                Update
                              </Button>
                              <Button
                                color="link"
                                className="dropdown-item text-danger"
                                onClick={() => handleDelete(i.id)}
                              >
                                <Icon icon="Delete" className="me-2" />
                                Delete
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
                label="Awards"
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>
          </div>
        </div>
      </Page>

      <AddAward
        isOpen={editModalStatus}
        setIsOpen={setEditModalStatus}
        onAddAward={(newAward) => {
          if (selectedAward) {
            setAwards((prev) =>
              prev.map((award) => (award.id === selectedAward.id ? { ...award, ...newAward } : award))
            );
          } else {
            setAwards((prev) => [...prev, { ...newAward, id: Date.now() }]);
          }
        }}
        selectedAward={selectedAward}
      />

      <ViewAwardModal
        isOpen={viewModalStatus}
        setIsOpen={setViewModalStatus}
        award={selectedAward}
      />
    </PageWrapper>
  );
};

export default Appreciation;
