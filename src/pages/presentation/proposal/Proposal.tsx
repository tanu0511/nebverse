/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/react-in-jsx-scope */

import { useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Button from '../../../components/bootstrap/Button';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, { DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';
import Icon from '../../../components/icon/Icon';
import CreateProposalModal from './CreateProposalModal';
import ViewProposalModal from './ViewProposalModal';
import { useNavigate } from 'react-router-dom';

const Proposal = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedProposal, setSelectedProposal] = useState<any>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    interface TableRow {
        proposal: string;
        deals: string;
        contactName: string;
        total: string;
        date: string;
        validTill: string;
        status: string;
        items: any[];
        subTotal: number;
        discount: number;
        tax: number;
    }

    const [tableData, setTableData] = useState<TableRow[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);

    const handleView = (row: TableRow) => {
        setSelectedProposal(row);
        setIsViewModalOpen(true);
    };

    const handleEdit = (row: TableRow, index: number) => {
        setSelectedProposal(row);
        setEditIndex(index);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleDelete = (index: number) => {
        if (window.confirm('Are you sure you want to delete this proposal?')) {
            setTableData((prev) => prev.filter((_, i) => i !== index));
        }
    };

    const handleDownload = (row: TableRow) => {
        alert(`Downloading proposal: ${row.proposal}`);
        // Add your download logic here
    };

    const handleActionChange = (action: string, row: TableRow, index: number) => {
        switch (action) {
            case 'view':
                handleView(row);
                break;
            case 'edit':
                handleEdit(row, index);
                break;
            case 'delete':
                handleDelete(index);
                break;
            default:
                break;
        }
    };

    const handleSave = (formData: any) => {
        const subTotal = formData.items.reduce(
            (sum: number, item: any) => sum + item.quantity * item.unitPrice,
            0
        );
        const discount =
            formData.discountType === '%'
                ? (formData.discount / 100) * subTotal
                : formData.discount;
        const tax = 0; // Add tax logic if needed
        const total = subTotal - discount + tax;

        const newRow: TableRow = {
            proposal: `Proposal#${editIndex !== null ? editIndex + 1 : tableData.length + 1}`,
            deals: formData.deal,
            contactName: formData.leadContacts,
            total: total.toFixed(2),
            date: new Date().toLocaleDateString(),
            validTill: formData.validTill,
            status: formData.requireSignature ? 'Pending Signature' : 'Completed',
            items: formData.items,
            subTotal,
            discount,
            tax,
        };

        if (isEditMode && editIndex !== null) {
            const updatedData = [...tableData];
            updatedData[editIndex] = newRow;
            setTableData(updatedData);
        } else {
            setTableData((prev) => [...prev, newRow]);
        }

        setIsEditMode(false);
        setEditIndex(null);
    };

    const filteredData = tableData;
    const paginatedData = dataPagination(filteredData, currentPage, perPage);

    return (
        <PageWrapper title="Proposals">
            <SubHeader>
                <SubHeaderLeft>
                    <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
                        <Icon icon="Search" size="2x" color="primary" />
                    </label>
                    <Input
                        id="searchInput"
                        type="search"
                        className="border-0 shadow-none bg-transparent"
                        placeholder="Search proposals..."
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const searchQuery = e.target.value.toLowerCase();
                            setTableData((prev) =>
                                prev.filter((row) =>
                                    row.proposal.toLowerCase().includes(searchQuery)
                                )
                            );
                        }}
                    />
                </SubHeaderLeft>
                <SubHeaderRight>
                    <Button
                        icon="add"
                        color="primary"
                        isLight
                        onClick={() => {
                            setSelectedProposal(null);
                            setIsEditMode(false);
                            setIsModalOpen(true);
                        }}
                    >
                        Create Proposal
                    </Button>
                    <Button
                        icon="Layers"
                        color="primary"
                        isLight
                        onClick={() => navigate('/Proposal-Template')}
                    >
                        Proposal Template
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
                                            <th>Proposal</th>
                                            <th>Deals</th>
                                            <th>Contact Name</th>
                                            <th>Total</th>
                                            <th>Date</th>
                                            <th>Valid Till</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData.length > 0 ? (
                                            paginatedData.map((row, index) => (
                                                <tr key={index}>
                                                    <td>{row.proposal}</td>
                                                    <td>{row.deals}</td>
                                                    <td>{row.contactName}</td>
                                                    <td>{row.total}</td>
                                                    <td>{row.date}</td>
                                                    <td>{row.validTill}</td>
                                                    <td>
                                                        <span
                                                            className={`badge bg-${
                                                                row.status === 'Pending Signature'
                                                                    ? 'warning'
                                                                    : 'success'
                                                            }`}
                                                        >
                                                            {row.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <Dropdown>
                                                            <DropdownToggle hasIcon={false}>
                                                                <Button
                                                                    icon="MoreVert"
                                                                    color="primary"
                                                                    isLight
                                                                    className="btn-icon"
                                                                />
                                                            </DropdownToggle>
                                                            <DropdownMenu isAlignmentEnd>
                                                                <Button
                                                                    color="link"
                                                                    className="dropdown-item"
                                                                    onClick={() => handleView(row)}
                                                                >
                                                                    <Icon icon="RemoveRedEye" className="me-2" /> View
                                                                </Button>
                                                                <Button
                                                                    color="link"
                                                                    className="dropdown-item"
                                                                    onClick={() => handleEdit(row, index)}
                                                                >
                                                                    <Icon icon="Edit" className="me-2" /> Edit
                                                                </Button>
                                                                <Button
                                                                    color="link"
                                                                    className="dropdown-item"
                                                                    onClick={() => handleDownload(row)}
                                                                >
                                                                    <Icon icon="CloudDownload" className="me-2" /> Download
                                                                </Button>
                                                                <Button
                                                                    color="link"
                                                                    className="dropdown-item text-danger"
                                                                    onClick={() => handleDelete(index)}
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
                                                <td colSpan={8} className="text-center">
                                                    No data available in table
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </CardBody>
                            <PaginationButtons
                                data={filteredData}
                                label="Proposals"
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                                perPage={perPage}
                                setPerPage={setPerPage}
                            />
                        </Card>
                    </div>
                </div>
            </Page>

            <CreateProposalModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                onSave={handleSave}
                defaultValues={selectedProposal}
                isEdit={isEditMode}
            />

            <ViewProposalModal
                isOpen={isViewModalOpen}
                setIsOpen={setIsViewModalOpen}
                proposalData={selectedProposal}
            />
        </PageWrapper>
    );
};

export default Proposal;