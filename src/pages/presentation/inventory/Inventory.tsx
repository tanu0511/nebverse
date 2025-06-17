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
import AddInventory from './AddInventory';
import ViewInventoryModal from './ViewInventoryModal';

const Inventory = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
  const [inventory, setInventory] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [addDefaultValues, setAddDefaultValues] = useState<any>(null); // <-- Add this line

  // Dynamic search filter for all relevant fields
  const filteredData = inventory.filter(
    (item) =>
      searchTerm === '' ||
      (item.date && item.date.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.reason && item.reason.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.mode && item.mode.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle adding inventory from modal
  const handleAddInventory = (data: any) => {
    setInventory(prev => [
      ...prev,
      { ...data, id: Date.now() }
    ]);
  };

  return (
    <PageWrapper title="Inventory">
      <SubHeader>
        <SubHeaderLeft>
          <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
            <Icon icon="Search" size="2x" color="primary" />
          </label>
          <Input
            id="searchInput"
            type="search"
            className="border-0 shadow-none bg-transparent"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Button
            icon="Add"
            color="primary"
            isLight
            onClick={() => {
              setAddDefaultValues(null); // <-- Reset form to empty
              setAddModalOpen(true);
            }}
          >
            Add Inventory
          </Button>
          <Button
            color="info"
            icon="CloudDownload"
            isLight
            tag="a"
            to="/somefile.txt"
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
                      <th>Date</th>
                      <th>Reason</th>
                      <th>Mode Of Adjustment</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPagination(filteredData, currentPage, perPage).length > 0 ? (
                      dataPagination(filteredData, currentPage, perPage).map((item) => (
                        <tr key={item.id}>
                          <td>{item.date || 'N/A'}</td>
                          <td>{item.reason || 'N/A'}</td>
                          <td>{item.mode || 'N/A'}</td>
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
                                    setSelectedItem(item);
                                    setViewModalOpen(true);
                                  }}
                                >
                                  <Icon icon="Preview" className="me-2" /> View
                                </Button>
                                <Button color="link" className="dropdown-item text-danger">
                                  <Icon icon="Delete" className="me-2" /> Delete
                                </Button>
                              </DropdownMenu>
                            </Dropdown>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center">
                          No inventory records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </CardBody>
              <PaginationButtons
                data={filteredData}
                label="Inventory"
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>
          </div>
        </div>
      </Page>
      {/* Add Inventory Modal */}
      <AddInventory
        isOpen={addModalOpen}
        setIsOpen={setAddModalOpen}
        onAddInventory={handleAddInventory}
        defaultValues={addDefaultValues} // <-- Pass defaultValues as prop
      />
      {/* View Inventory Modal */}
      <ViewInventoryModal
        isOpen={viewModalOpen}
        setIsOpen={setViewModalOpen}
        item={selectedItem}
      />
    </PageWrapper>
  );
};

export default Inventory;