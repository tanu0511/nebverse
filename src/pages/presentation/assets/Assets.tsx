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
import AddAssetModal from './AddAssetModal';
import LendAssetModal from './LentAssetModal';
import ReturnAssetModal from './ReturnAssetModal';
import ViewAssetModal from './ViewAssetModal';

type Asset = {
  id: number;
  assetPicture?: string;
  assetName?: string;
  lentTo?: string;
  status?: string;
  date?: string; 
  startOn?: string;
  startTime?: string;
  name?: string;
};

const Assets = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [addAssetModalOpen, setAddAssetModalOpen] = useState(false);
  const [lendModalOpen, setLendModalOpen] = useState(false);
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [returnAsset, setReturnAsset] = useState<Asset | null>(null);
  const [viewAsset, setViewAsset] = useState<Asset | null>(null);
  const [editAsset, setEditAsset] = useState<Asset | null>(null);
  
  const [assetData, setAssetData] = useState<Asset[]>([]);

  const employees = [
    { id: 1, name: 'Atharva', status: 'Inactive' },
    { id: 2, name: 'John Doe', status: 'Active' },
  ];

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const filteredData = assetData.filter(
    (item: Asset) =>
      (item.assetPicture || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.assetName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.lentTo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.status || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredData.map((item: Asset) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleLend = (asset: Asset) => {
    setSelectedAsset(asset);
    setLendModalOpen(true);
  };

  const handleLendSave = (data: { employee: string; dateGiven: string; dateReturn: string; notes: string }) => {
    setAssetData(prev =>
      prev.map(asset =>
        asset.id === selectedAsset?.id
          ? {
              ...asset,
              lentTo: data.employee,
              startOn: data.dateGiven,
              date: data.dateGiven, 
              startTime: data.dateReturn, 
              estimatedReturn: data.dateReturn,
              notes: data.notes,
              status: 'Lent',
            }
          : asset
      )
    );
    setSelectedAsset(null);
  };

  const handleReturn = (asset: Asset) => {
    setReturnAsset(asset);
    setReturnModalOpen(true);
  };

  const handleReturnSave = (data: { returnDate: string; notes: string }) => {
    setAssetData(prev =>
      prev.map(asset =>
        asset.id === returnAsset?.id
          ? {
              ...asset,
              status: 'Available',
              returnDate: data.returnDate,
              notes: data.notes,
              lentTo: undefined,
              startOn: undefined,
              estimatedReturn: undefined,
              date: undefined, 
            }
          : asset
      )
    );
    setReturnAsset(null);
  };

  const handleDelete = (id: number) => {
    setAssetData(prev => prev.filter(asset => asset.id !== id));
  };

  const handleView = (asset: Asset) => {
    setViewAsset(asset);
    setViewModalOpen(true);
  };

  return (
    <PageWrapper title="Asset">
      <SubHeader>
        <SubHeaderLeft>
          <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
            <Icon icon="Search" size="2x" color="primary" />
          </label>
          <Input
            id="searchInput"
            type="search"
            className="border-0 shadow-none bg-transparent"
            placeholder="Search Asset..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
            value={searchTerm}
          />
        </SubHeaderLeft>
        <SubHeaderRight>
          <Button
            icon='Add'
            color='primary'
            isLight
            onClick={() => setAddAssetModalOpen(true)}
          >
            Add New Asset
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
                      <th style={{  textAlign: 'center' }}>
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
                      <th>Asset Picture</th>
                      <th>Asset Name</th>
                      <th>Lent To</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Action</th> 
                    </tr>
                  </thead>
                  <tbody>
                    {dataPagination(filteredData, currentPage, perPage).length > 0 ? (
                      dataPagination(filteredData, currentPage, perPage).map((item, idx) => (
                        <tr key={item.id} style={{ height: '56px' }}>
                          <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                            {/* Show row number instead of checkbox */}
                            {(currentPage - 1) * perPage + idx + 1}
                          </td>
                          <td>
                            {item.assetPicture
                              ? <img src={item.assetPicture} alt="Asset" style={{ maxHeight: 40, maxWidth: 60, objectFit: 'cover' }} />
                              : '-'}
                          </td>
                          <td>{item.assetName || '-'}</td>
                          <td>{item.lentTo || '-'}</td>
                           <td>
                            {item.status && (
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  background:
                                    item.status === 'Lent'
                                      ? '#ffeaea'
                                      : 'transparent',
                                  padding: item.status === 'Lent' ? '2px 8px' : undefined,
                                  borderRadius: item.status === 'Lent' ? '6px' : undefined,
                                }}
                              >
                                <span
                                  style={{
                                    display: 'inline-block',
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    marginRight: 6,
                                    background:
                                      item.status === 'Available'
                                        ? '#2ecc40'
                                        : item.status === 'Lent'
                                        ? '#ffb300'
                                        : item.status === 'Lost'
                                        ? '#ffc107'
                                        : item.status === 'Damaged'
                                        ? '#ff69b4'
                                        : item.status === 'Non Functional'
                                        ? '#e53935'
                                        : item.status === 'Under Maintenance'
                                        ? '#343a40'
                                        : '#adb5bd',
                                  }}
                                />
                                {item.status}
                              </span>
                            )}
                          </td> 
                          <td>
                            {item.startOn || item.estimatedReturn ? (
                              <div>
                                {item.startOn && (
                                  <div>
                                    Given Date: {new Date(item.startOn).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
                                  </div>
                                )}
                                {item.estimatedReturn && (
                                  <div>
                                    Estimated Return: {new Date(item.estimatedReturn).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
                                  </div>
                                )}
                              </div>
                            ) : (
                              item.date || '-'
                            )}
                          </td>
                          <td>
                            <Dropdown>
                              <DropdownToggle hasIcon={false}>
                                <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
                              </DropdownToggle>
                              <DropdownMenu isAlignmentEnd>
                                <Button color="link" className="dropdown-item" onClick={() => handleView(item)}>
                                  <Icon icon="Visibility" className="me-2" /> View
                                </Button>
                                <Button
                                  color="link"
                                  className="dropdown-item"
                                  onClick={() => {
                                    setEditAsset(item);
                                    setAddAssetModalOpen(true);
                                  }}
                                >
                                  <Icon icon="Edit" className="me-2" /> Edit
                                </Button>

                                {!(["Under Maintenance", "Damaged", "Non Functional","Lost"].includes(item.status || "")) && (
                                  item.lentTo && item.startOn && item.estimatedReturn ? (
                                    <Button
                                      color="link"
                                      className="dropdown-item"
                                      onClick={() => handleReturn(item)}
                                    >
                                      <Icon icon="Autorenew" className="me-2" /> Return
                                    </Button>
                                  ) : (
                                    <Button
                                      color="link"
                                      className="dropdown-item"
                                      onClick={() => handleLend(item)}
                                    >
                                      <Icon icon="redo" className="me-2" /> Lent
                                    </Button>
                                  )
                                )}
                                <Button
                                  color="link"
                                  className="dropdown-item text-danger"
                                  onClick={() => handleDelete(item.id)}
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
                        <td colSpan={7} className="text-center">
                          No records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </CardBody>
              <PaginationButtons
                data={filteredData}
                label="Asset"
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>
          </div>
        </div>
      </Page>
      <AddAssetModal
        isOpen={addAssetModalOpen}
        setIsOpen={(open) => {
          setAddAssetModalOpen(open);
          if (!open) setEditAsset(null); 
        }}
        onSave={(asset) => {
          if (editAsset) {
            setAssetData(prev =>
              prev.map(a => (a.id === editAsset.id ? { ...a, ...asset, id: editAsset.id } : a))
            );
            setEditAsset(null);
          } else {
            setAssetData(prev => [
              ...prev,
              {
                ...asset,
                id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1,
                name: asset.assetName,
              },
            ]);
          }
          setAddAssetModalOpen(false);
        }}
      />
      <LendAssetModal
        isOpen={lendModalOpen}
        setIsOpen={setLendModalOpen}
        onSave={handleLendSave}
        employees={employees}
        asset={selectedAsset}
      />
      <ReturnAssetModal
        isOpen={returnModalOpen}
        setIsOpen={setReturnModalOpen}
        asset={returnAsset}
        onSave={handleReturnSave}
      />
      <ViewAssetModal
        isOpen={viewModalOpen}
        setIsOpen={setViewModalOpen}
        asset={viewAsset}
      />
    </PageWrapper>
  );
};

export default Assets;