import React, { useState } from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../../components/bootstrap/Modal';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';

interface AddVendorFormProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
    onSubmit: (vendorData: VendorData) => void;
    defaultValues?: { id: number; primaryName: string; companyName: string; email: string; phone: string } | null;

}

interface VendorData {
    primaryName: string;
    companyName: string;
    email: string;
    phone: string;
    website: string;
    openingBalance: string;
    currency: string;
    billingAddress: string;
    shippingAddress: string;
}

const AddVendorForm: React.FC<AddVendorFormProps> = ({ isOpen, setIsOpen, onClose, onSubmit }) => {
    const [vendorData, setVendorData] = useState<VendorData>({
        primaryName: '',
        companyName: '',
        email: '',
        phone: '',
        website: '',
        openingBalance: '',
        currency: 'INR',
        billingAddress: '',
        shippingAddress: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setVendorData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(vendorData); // Pass the vendor data to the parent component
        setIsOpen(false); // Close the modal
        setVendorData({
            primaryName: '',
            companyName: '',
            email: '',
            phone: '',
            website: '',
            openingBalance: '',
            currency: 'INR',
            billingAddress: '',
            shippingAddress: '',
        });// Reset the form
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} onClose={onClose}>
            <ModalHeader>
                <h5>Add Vendor</h5>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleFormSubmit}>
                    {/* Account Details Section */}
                    <h6>Account Details</h6>
                    <div className="form-group">
                        <label>Primary Contact Name *</label>
                        <Input
                            type="text"
                            name="primaryName"
                            value={vendorData.primaryName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Company Name</label>
                        <Input
                            type="text"
                            name="companyName"
                            value={vendorData.companyName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <Input
                            type="email"
                            name="email"
                            value={vendorData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <Input
                            type="text"
                            name="phone"
                            value={vendorData.phone}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Other Details Section */}
                    <h6>Other Details</h6>
                    <div className="form-group">
                        <label>Official Website</label>
                        <Input
                            type="text"
                            name="website"
                            value={vendorData.website}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Opening Balance</label>
                        <Input
                            type="number"
                            name="openingBalance"
                            value={vendorData.openingBalance}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Currency</label>
                        <select
                            name="currency"
                            value={vendorData.currency}
                            onChange={handleInputChange}
                            className="form-control"
                        >
                            <option value="INR">INR (₹)</option>
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                        </select>
                    </div>

                    {/* Address Section */}
                    <h6>Address</h6>
                    <div className="form-group">
                        <label>Billing Address</label>
                        <textarea
                            name="billingAddress"
                            value={vendorData.billingAddress}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Shipping Address</label>
                        <textarea
                            name="shippingAddress"
                            value={vendorData.shippingAddress}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button type="submit" color="primary" onClick={handleFormSubmit}>
                    Save
                </Button>
                <Button color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default AddVendorForm;