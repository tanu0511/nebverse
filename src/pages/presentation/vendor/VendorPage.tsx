/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddVendorForm from './AddVendorForm';
import Button from '../../../components/bootstrap/Button';
import Dropdown, { DropdownToggle, DropdownMenu } from '../../../components/bootstrap/Dropdown';
import Icon from '../../../components/icon/Icon';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody, CardFooter, CardHeader } from '../../../components/bootstrap/Card';
import Input from '../../../components/bootstrap/forms/Input';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';

const PER_COUNT = { '10': 10, '20': 20, '50': 50 };

const VendorPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [vendors, setVendors] = useState<{ id: number; primaryName: string; companyName: string; email: string; phone: string }[]>([]);
    const [editingVendor, setEditingVendor] = useState<{ id: number; primaryName: string; companyName: string; email: string; phone: string } | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);

    const navigate = useNavigate();

    // Dynamic search filter for all relevant fields
    const filteredData = vendors.filter((vendor) =>
        vendor.primaryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedData = filteredData.slice((currentPage - 1) * perPage, currentPage * perPage);

    const handleViewVendor = (vendor: any) => {
        navigate('/vendor-details', { state: { vendor } });
    };

    const handleAddVendor = () => {
        setEditingVendor(null);
        setIsModalOpen(true);
    };

    const handleVendorSubmit = (vendorData: any) => {
        if (editingVendor) {
            setVendors((prevVendors) =>
                prevVendors.map((vendor) =>
                    vendor.id === editingVendor.id ? { ...vendor, ...vendorData } : vendor
                )
            );
        } else {
            setVendors((prevVendors) => [
                ...prevVendors,
                { id: prevVendors.length + 1, ...vendorData },
            ]);
        }
        setIsModalOpen(false);
        setEditingVendor(null);
    };

    const handleEditVendor = (vendor: any) => {
        setEditingVendor(vendor);
        setIsModalOpen(true);
    };

    const handleDeleteVendor = (id: number) => {
        setVendors((prevVendors) => prevVendors.filter((vendor) => vendor.id !== id));
    };

    return (
        <PageWrapper title="Vendor List">
            <SubHeader>
                <SubHeaderLeft>
                    <label className="border-0 bg-transparent cursor-pointer me-0" htmlFor="searchInput">
                        <Icon icon="Search" size="2x" color="primary" />
                    </label>
                    <Input
                        id="searchInput"
                        type="search"
                        className="border-0 shadow-none bg-transparent"
                        placeholder="Search vendor..."
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    />
                </SubHeaderLeft>
                <SubHeaderRight>
                    <Button color="primary" icon="Add" isLight onClick={handleAddVendor}>
                        Add Vendor
                    </Button>
                    <Button
                        color="info"
                        icon="CloudDownload"
                        isLight
                        tag="a"
                        to="/vendors-export.txt"
                        target="_blank"
                        download
                    >
                        Export
                    </Button>
                </SubHeaderRight>
            </SubHeader>
            <Page container="fluid">
                <Card stretch>
                    {/* <CardHeader>
                        <span className="fw-bold">Vendors</span>
                    </CardHeader> */}
                    <CardBody className="table-responsive">
                        <table className="table table-modern table-hover">
                            <thead>
                                <tr>
                                    <th>Primary Name</th>
                                    <th>Company Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center bg-light">
                                            No data available in table
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedData.map((vendor) => (
                                        <tr key={vendor.id}>
                                            <td>{vendor.primaryName}</td>
                                            <td>{vendor.companyName}</td>
                                            <td>{vendor.email}</td>
                                            <td>{vendor.phone}</td>
                                            <td>
                                                <Dropdown>
                                                    <DropdownToggle hasIcon={false}>
                                                        <Button icon="MoreVert" color="primary" isLight className="btn-icon" />
                                                    </DropdownToggle>
                                                    <DropdownMenu isAlignmentEnd>
                                                        <Button
                                                            color="link"
                                                            className="dropdown-item"
                                                            onClick={() => handleViewVendor(vendor)}
                                                        >
                                                            <Icon icon="RemoveRedEye" className="me-2" /> View
                                                        </Button>
                                                        <Button
                                                            color="link"
                                                            className="dropdown-item"
                                                            onClick={() => handleEditVendor(vendor)}
                                                        >
                                                            <Icon icon="Edit" className="me-2" /> Edit
                                                        </Button>
                                                        <Button
                                                            color="link"
                                                            className="dropdown-item text-danger"
                                                            onClick={() => handleDeleteVendor(vendor.id)}
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
                    </CardBody>
                    <CardFooter>
                        <p>Showing {vendors.length} entries</p>
                    </CardFooter>
                </Card>
            </Page>
            <AddVendorForm
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleVendorSubmit}
                defaultValues={editingVendor}
            />
        </PageWrapper>
    );
};

export default VendorPage;