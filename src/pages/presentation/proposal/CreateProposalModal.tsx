import React, { useState } from 'react';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';

interface CreateProposalModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSave: (formData: any) => void;
    isEdit: boolean;
    defaultValues?: any; // Add this property to match the usage in Proposal.tsx
}

const CreateProposalModal: React.FC<CreateProposalModalProps> = ({ isOpen, setIsOpen, onSave }) => {
    const [formData, setFormData] = useState({
        leadContacts: '',
        deal: '',
        validTill: '',
        currency: 'INR (₹)',
        calculateTax: 'After Discount',
        description: '',
        requireSignature: false,
        discount: 0,
        discountType: '%',
        terms: 'Thank you for your business.',
        note: '',
    });

    const [items, setItems] = useState([
        { description: '', quantity: 1, unitPrice: 0, tax: '', amount: 0 },
    ]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleItemChange = (index: number, field: string, value: any) => {
        setItems((prevItems) =>
            prevItems.map((item, i) =>
                i === index ? { ...item, [field]: value, amount: item.quantity * item.unitPrice } : item
            )
        );
    };

    const addItem = () => {
        setItems([...items, { description: '', quantity: 1, unitPrice: 0, tax: '', amount: 0 }]);
    };

    const removeItem = (index: number) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

  const calculateSummary = () => {
    // Calculate the subtotal by summing up the amount for all items
    const subTotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

    // Calculate the discount based on the discount type
    const discount =
        formData.discountType === '%'
            ? (formData.discount / 100) * subTotal
            : formData.discount;

    // Add logic for tax if needed (currently set to 0)
    const tax = 0;

    // Calculate the final total after applying the discount and tax
    const total = subTotal - discount + tax;

    return { subTotal, discount, tax, total };
};
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { total } = calculateSummary();
        onSave({ ...formData, items,total });
        setIsOpen(false);
        setFormData({
            leadContacts: '',
            deal: '',
            validTill: '',
            currency: 'INR (₹)',
            calculateTax: 'After Discount',
            description: '',
            requireSignature: false,
            discount: 0,
            discountType: '%',
            terms: 'Thank you for your business.',
            note: '',
        });
        setItems([{ description: '', quantity: 1, unitPrice: 0, tax: '', amount: 0 }]);
    };

    const { subTotal, tax, total } = calculateSummary();

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="lg">
            <ModalHeader setIsOpen={setIsOpen}>
                <ModalTitle id="create-proposal-title">Proposal Details</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleFormSubmit}>
                    {/* Lead Contacts */}
                    <div className='row'>
                    <div className="mb-3 col-md-4">
                        <label htmlFor="leadContacts" className="form-label">
                            Lead Contacts
                        </label>
                        <select
                            id="leadContacts"
                            name="leadContacts"
                            className="form-control"
                            value={formData.leadContacts}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">--</option>
                            <option value="Contact1">Contact 1</option>
                            <option value="Contact2">Contact 2</option>
                        </select>
                    </div>

                    {/* Deal */}
                    <div className="mb-3 col-md-4" >
                        <label htmlFor="deal" className="form-label">
                            Deal
                        </label>
                        <select
                            id="deal"
                            name="deal"
                            className="form-control"
                            value={formData.deal}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">--</option>
                            <option value="Deal1">Deal 1</option>
                            <option value="Deal2">Deal 2</option>
                        </select>
                    </div>

                    {/* Valid Till */}
                    <div className="mb-3 col-md-4">
                        <label htmlFor="validTill" className="form-label">
                            Valid Till
                        </label>
                        <input
                            type="date"
                            id="validTill"
                            name="validTill"
                            className="form-control"
                            value={formData.validTill}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    </div>
                    <div className='row'>
                    <div className="mb-3 col-md-6">
            <label htmlFor="currency" className="form-label">
                Currency
            </label>
            <select
                id="currency"
                name="currency"
                className="form-control"
                value={formData.currency}
                onChange={handleInputChange}
            >
                <option value="INR (₹)">INR (₹)</option>
                <option value="USD ($)">USD ($)</option>
            </select>
        </div>

        {/* Calculate Tax */}
        <div className="mb-3 col-md-6">
            <label htmlFor="calculateTax" className="form-label">
                Calculate Tax
            </label>
            <select
                id="calculateTax"
                name="calculateTax"
                className="form-control"
                value={formData.calculateTax}
                onChange={handleInputChange}
            >
                <option value="After Discount">After Discount</option>
                <option value="Before Discount">Before Discount</option>
            </select>
        </div>
        </div>
        {/* Description */}
        <div className="mb-3">
            <label htmlFor="description" className="form-label">
                Description
            </label>
            <textarea
                id="description"
                name="description"
                className="form-control"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleInputChange}
            />
        </div>

        {/* Require Customer Signature */}
        <div className="mb-3 form-check">
            <input
                type="checkbox"
                id="requireSignature"
                name="requireSignature"
                className="form-check-input"
                checked={formData.requireSignature}
                onChange={handleInputChange}
            />
            <label htmlFor="requireSignature" className="form-check-label">
                Require customer signature for approval
            </label>
        </div>

                    {/* Items Section */}
                    <div className="mt-4">
    <h5>Items</h5>
    {items.map((item, index) => (
        <div key={index} className="d-flex align-items-center mb-3">
            <input
                type="text"
                placeholder="Item Name"
                className="form-control me-2"
                value={item.description}
                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
            />
            <input
                type="number"
                placeholder="Quantity"
                className="form-control me-2"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
            />
            <input
                type="number"
                placeholder="Unit Price"
                className="form-control me-2"
                value={item.unitPrice}
                onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value))}
            />
            <span className="me-2">
                {`Amount: ${(item.quantity * item.unitPrice).toFixed(2)}`}
            </span>
            <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeItem(index)}
            >
                Remove
            </button>
        </div>
    ))}
    <button type="button" className="btn btn-primary mb-3" onClick={addItem}>
        Add Item
    </button>
     {/* Total Amount Section */}
     <div className="d-flex justify-content-between align-items-center mt-3">
        <strong>Total Amount:</strong>
        <strong>
            {items.reduce((total, item) => total + item.quantity * item.unitPrice, 0).toFixed(2)}
        </strong>
    </div>

    {/* Summary Section */}
    <div className="mt-4">
    <h5>Summary</h5>
    <div className="d-flex justify-content-between align-items-center mb-2">
        <span>Sub Total:</span>
        <span>{subTotal.toFixed(2)}</span>
    </div>
    <div className="d-flex justify-content-between align-items-center mb-2">
        <span>Discount:</span>
        <div className="d-flex align-items-center">
            <input
                type="number"
                placeholder="Discount"
                className="form-control me-2"
                value={formData.discount || 0}
                onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) || 0 })}
            />
            <select
                className="form-control"
                value={formData.discountType || '%'}
                onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
            >
                <option value="%">%</option>
                <option value="flat">Flat</option>
            </select>
        </div>
    </div>
    <div className="d-flex justify-content-between align-items-center mb-2">
        <span>Tax:</span>
        <span>{tax.toFixed(2)}</span>
    </div>
    <div className="d-flex justify-content-between align-items-center">
        <strong>Total:</strong>
        <strong>{total.toFixed(2)}</strong>
    </div>
    </div>
</div>

                    {/* Note and Terms */}
                    <div className="mt-4">
                        <div className="mb-3">
                            <label htmlFor="note" className="form-label">
                                Note for the recipient
                            </label>
                            <textarea
                                id="note"
                                name="note"
                                className="form-control"
                                placeholder="e.g. Thank you for your business"
                                value={formData.note}
                                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="terms" className="form-label">
                                Terms and Conditions
                            </label>
                            <textarea
                                id="terms"
                                name="terms"
                                className="form-control"
                                placeholder="e.g. Thank you for your business."
                                value={formData.terms}
                                onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                            />
                        </div>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => setIsOpen(false)}>
                    Cancel
                </Button>
                <Button color="primary" onClick={handleFormSubmit}>
                    Save
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default CreateProposalModal;
