/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from '../../../components/bootstrap/Dropdown';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';
import CustomerEditModal from './CustomerEditModal';
import CustomerViewModal from './CustomerViewModal';
import CreateContractModal from './CreateContractModal';

const ContractTemplate = () => {
    const navigate = useNavigate();

    const [customers, setCustomers] = useState<
        { subject: string; description: string; contractType: string; contractValue: string; currency: string; isSelected?: boolean }[]
    >([]);
    const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
    const [viewModalStatus, setViewModalStatus] = useState<boolean>(false);
    const [createContractModalStatus, setCreateContractModalStatus] = useState<boolean>(false);
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [selectedCustomer, setSelectedCustomer] = useState<{
        subject: string;
        description: string;
        contractType: string;
        contractValue: string;
        currency: string;
    } | null>(null);

    const handleSaveCustomer = (data: {
        subject: string;
        description: string;
        contractType: string;
        contractValue: string;
        currency: string;
    }) => {
        if (selectedCustomer) {
            const updatedCustomers = customers.map((customer) =>
                customer === selectedCustomer ? { ...data } : customer
            );
            setCustomers(updatedCustomers);
            setSelectedCustomer(null);
        } else {
            setCustomers((prev) => [...prev, data]);
        }
    };

    const handleViewCustomer = (customer: {
        subject: string;
        description: string;
        contractType: string;
        contractValue: string;
        currency: string;
    }) => {
        setSelectedCustomer(customer);
        setViewModalStatus(true);
    };

    const handleDeleteCustomer = (index: number) => {
        setCustomers((prev) => prev.filter((_, i) => i !== index));
    };

    const paginatedCustomers = dataPagination(customers, currentPage, perPage);

    const handleSelectAll = () => {
        setSelectAll((prev) => !prev);
        setCustomers((prev) =>
            prev.map((customer) => ({
                ...customer,
                isSelected: !selectAll,
            }))
        );
    };

    const handleRowSelect = (index: number) => {
        setCustomers((prev) =>
            prev.map((customer, i) =>
                i === index ? { ...customer, isSelected: !customer.isSelected } : customer
            )
        );
    };

    useEffect(() => {
        const allSelected = customers.every((customer) => customer.isSelected);
        setSelectAll(allSelected);
    }, [customers]);

    return (
        <PageWrapper title="Customers List">
            <SubHeader>
                <SubHeaderRight>
                    <Button
                        icon="Add"
                        color="primary"
                        isLight
                        onClick={() => {
                            setSelectedCustomer(null);
                            setEditModalStatus(true);
                        }}
                    >
                        Add Contract Template
                    </Button>
                </SubHeaderRight>
            </SubHeader>

            <Page>
                <div className="row h-100">
                    <div className="col-12">
                        <Card stretch style={{ overflow: "visible" }}>
                            <CardBody className="table-responsive" style={{ overflow: "visible" }}>
                                <table className="table table-modern table-hover">
                                    <thead>
                                        <tr>
                                            <th>
                                                <input
                                                    type="checkbox"
                                                    checked={selectAll}
                                                    onChange={handleSelectAll}
                                                />
                                            </th>
                                            <th>Subject</th>
                                            <th>Amount</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedCustomers.map((customer, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={customer.isSelected || false}
                                                        onChange={() => handleRowSelect(index)}
                                                    />
                                                </td>
                                                <td>{customer.subject}</td>
                                                <td>{customer.contractValue}</td>
                                                <td>
                                                    <Dropdown>
                                                        <DropdownToggle>
                                                            <Icon icon="MoreVert" size="lg" />
                                                        </DropdownToggle>
                                                        <DropdownMenu
                                                            style={{
                                                                position: 'absolute',
                                                                top: '100%',
                                                                left: '0',
                                                                zIndex: 9999,  // ⭐ zIndex high kar do
                                                                whiteSpace: 'nowrap',
                                                                overflow: "visible",
                                                                maxWidth: 'none',
                                                            }}
                                                        >

                                                            <DropdownItem onClick={() => handleViewCustomer(customer)}>
                                                                <span>
                                                                    <Icon icon="RemoveRedEye" className="me-2" /> View
                                                                </span>
                                                            </DropdownItem>
                                                            <DropdownItem onClick={() => setCreateContractModalStatus(true)}>
                                                                <span>
                                                                    <Icon icon="Add" className="me-2" /> Create Contract
                                                                </span>
                                                            </DropdownItem>
                                                            <DropdownItem>
                                                                <Button
                                                                    color="link"
                                                                    className="dropdown-item"
                                                                    onClick={() => {
                                                                        setSelectedCustomer(customer);
                                                                        setEditModalStatus(true);
                                                                    }}
                                                                >
                                                                    <Icon icon="Edit" className="me-2" /> Edit
                                                                </Button>
                                                            </DropdownItem>
                                                            <DropdownItem onClick={() => handleDeleteCustomer(index)}>
                                                                <span>
                                                                    <Icon icon="Delete" className="me-2" /> Delete
                                                                </span>
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </CardBody>
                            <PaginationButtons
                                data={customers}
                                label="Customers"
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                                perPage={perPage}
                                setPerPage={setPerPage}
                            />
                        </Card>
                    </div>
                </div>
            </Page>

            <CustomerEditModal
                setIsOpen={setEditModalStatus}
                isOpen={editModalStatus}
                id="customer-edit-modal"
                onSave={handleSaveCustomer}
                modalTitle={selectedCustomer ? 'Edit Create Contract' : 'Create Contract'}
                selectedCustomer={selectedCustomer} // ✅ Tumne null diya tha, maine correct kar diya
            />

            <CustomerViewModal
                isOpen={viewModalStatus}
                setIsOpen={setViewModalStatus}
                customer={selectedCustomer}
            />

            <CreateContractModal
                isOpen={createContractModalStatus}
                setIsOpen={setCreateContractModalStatus}
                id={''}
            />
        </PageWrapper>
    );
};

export default ContractTemplate;