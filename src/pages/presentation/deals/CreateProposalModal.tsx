import React, { useState } from 'react';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import AddEmployeeData from '../hr/AddEmployee.json'; // Adjust path if needed
import AddSatgeData from './AddStage.json'; // Adjust path if needed
import Select from 'react-select';

interface CreateProposalModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onSave: (formData: any) => void;
    proposalData?: any | null; // Replace TableRow with 'any' or the correct type
}

const CreateProposalModal: React.FC<CreateProposalModalProps> = ({
    isOpen,
    setIsOpen,
    onSave,
    proposalData,
}) => {
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
        dealValue: 0,
        pipeline: 'Sales Pipeline',
        dealStages: '',
        dealCategory: '',
        dealAgent: '',
        products: '',
        dealWatcher: '',
        email: '', // <-- Add this
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


    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dealData = { ...formData, items };

        // Send data to backend API
        try {
            await fetch('http://localhost:4000/AddDeal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dealData),
            });
            onSave(dealData);
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
                dealValue: 0,
                pipeline: 'Sales Pipeline',
                dealStages: 'Generated',
                dealCategory: '',
                dealAgent: '',
                products: '',
                dealWatcher: '',
                email: '',
            });
            setItems([{ description: '', quantity: 1, unitPrice: 0, tax: '', amount: 0 }]);
        } catch (error) {
            alert('Failed to save deal!');
            console.error(error);
        }
    };


    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [dealCategories, setDealCategories] = useState(['Category1', 'Category2']);

    const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
    const [newAgent, setNewAgent] = useState('');
    const [dealAgents, setDealAgents] = useState(['Agent1', 'Agent2']);

    const handleAddCategory = () => {
        if (newCategory.trim()) {
            setDealCategories((prev) => [...prev, newCategory]);
            setNewCategory('');
            setIsCategoryModalOpen(false);
        }
    };

    // Prefill form when editing
    React.useEffect(() => {
        if (isOpen && proposalData) {
            // If your data is nested, adjust accordingly
            setFormData({
                ...formData,
                ...proposalData.proposalData, // If you store the original formData in proposalData
                // or ...proposalData if you store fields directly
            });
        } else if (isOpen && !proposalData) {
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
                dealValue: 0,
                pipeline: 'Sales Pipeline',
                dealStages: 'Generated',
                dealCategory: '',
                dealAgent: '',
                products: '',
                dealWatcher: '',
                email: '', // <-- Add this
            });
        }
        // eslint-disable-next-line
    }, [isOpen, proposalData]);

    // Extract employee names for Deal Watcher
    const employeeNames = AddEmployeeData.AddEmployee
        .map(emp => emp.name)
        .filter(Boolean); // removes empty names

    // Extract deal stages from JSON
    const dealStages = AddSatgeData.AddStage.map(stage => ({
        title: stage.title,
        color: stage.color,
    }));

    return (
        <>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} isStaticBackdrop={true} size="lg">
                <ModalHeader setIsOpen={setIsOpen}>
                    <ModalTitle id="create-proposal-title">Deal Details</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleFormSubmit}>
                        <div className="row">
                            {/* Lead Contacts */}
                            <div className="mb-3 col-md-4">
                                <label htmlFor="leadContacts" className="form-label">
                                    Lead Contacts <span className="text-danger">*</span>
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

                            {/* Deal Name */}
                            <div className="mb-3 col-md-4">
                                <label htmlFor="dealName" className="form-label">
                                    Deal Name <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="dealName"
                                    name="deal"
                                    className="form-control"
                                    placeholder="e.g. John Doe"
                                    value={formData.deal}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            {/* Pipeline */}
                            <div className="mb-3 col-md-4">
                                <label htmlFor="pipeline" className="form-label">
                                    Pipeline <i className="bi bi-question-circle ms-1" />
                                </label>
                                <select
                                    id="pipeline"
                                    name="pipeline"
                                    className="form-control"
                                    value={formData.pipeline || 'Sales Pipeline'}
                                    onChange={handleInputChange}
                                >
                                    <option value="Sales Pipeline">Sales Pipeline</option>
                                    <option value="Marketing Pipeline">Marketing Pipeline</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            {/* Deal Stages */}
                            <div className="mb-3 col-md-4" style={{ position: 'relative' }}>
                                <label htmlFor="dealStages" className="form-label">
                                    Deal Stages <span className="text-danger">*</span>
                                </label>
                                <Select
                                    id="dealStages"
                                    name="dealStages"
                                    value={dealStages
                                        .filter(stage => stage.title)
                                        .map(stage => ({
                                            value: stage.title,
                                            label: stage.title,
                                            color: stage.color,
                                        }))
                                        .find(option => option.value === formData.dealStages) || null}
                                    onChange={option => {
                                        setFormData(prev => ({
                                            ...prev,
                                            dealStages: option?.value || '',
                                        }));
                                    }}
                                    options={dealStages
                                        .filter(stage => stage.title)
                                        .map(stage => ({
                                            value: stage.title,
                                            label: stage.title,
                                            color: stage.color,
                                        }))}
                                    isSearchable={false}
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            minHeight: '38px',
                                            borderColor: '#ced4da',
                                            borderRadius: '45px',
                                            boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0,123,255,.25)' : provided.boxShadow,
                                            '&:hover': { borderColor: '#86b7fe' },
                                        }),
                                        option: (provided) => ({
                                            ...provided,
                                            display: 'flex',
                                            alignItems: 'center',
                                        }),
                                        singleValue: (provided) => ({
                                            ...provided,
                                            display: 'flex',
                                            alignItems: 'center',
                                        }),
                                        menu: (provided) => ({
                                            ...provided,
                                            zIndex: 9999,
                                        }),
                                    }}
                                    formatOptionLabel={option => (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span
                                                style={{
                                                    display: 'inline-block',
                                                    width: 14,
                                                    height: 14,
                                                    borderRadius: '50%',
                                                    background: option.color,
                                                    marginRight: 8,
                                                    border: '1px solid #888',
                                                }}
                                            />
                                            {option.label}
                                        </div>
                                    )}
                                    placeholder="Select Stage"
                                    required
                                />
                            </div>

                            {/* Deal Value */}
                            <div className="mb-3 col-md-4">
                                <label htmlFor="dealValue" className="form-label">
                                    Deal Value <span className="text-danger">*</span>
                                </label>
                                <div className="input-group">
                                    <select
                                        id="currency"
                                        name="currency"
                                        className="form-select"
                                        value={formData.currency}
                                        onChange={handleInputChange}
                                    >
                                        <option value="INR (₹)">INR (₹)</option>
                                        <option value="USD ($)">USD ($)</option>
                                    </select>
                                    <input
                                        type="number"
                                        id="dealValue"
                                        name="dealValue"
                                        className="form-control"
                                        placeholder="0"
                                        value={formData.dealValue || 0}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Close Date */}
                            <div className="mb-3 col-md-4">
                                <label htmlFor="closeDate" className="form-label">
                                    Close Date <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="date"
                                    id="closeDate"
                                    name="validTill"
                                    className="form-control"
                                    value={formData.validTill}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-4">
                                <label htmlFor="dealCategory" className="form-label">
                                    Deal Category
                                </label>
                                <div className="input-group">
                                    <select
                                        id="dealCategory"
                                        name="dealCategory"
                                        className="form-control"
                                        value={formData.dealCategory || ''}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Nothing selected</option>
                                        {dealCategories.map((category, index) => (
                                            <option key={index} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        onClick={() => setIsCategoryModalOpen(true)}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>

                            {/* Deal Agent */}
                            <div className="mb-3 col-md-4">
                                <label htmlFor="dealAgent" className="form-label">
                                    Deal Agent
                                </label>
                                <div className="input-group">
                                    <select
                                        id="dealAgent"
                                        name="dealAgent"
                                        className="form-control"
                                        value={formData.dealAgent || ''}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">--</option>
                                        {dealAgents.map((agent, idx) => (
                                            <option key={idx} value={agent}>{agent}</option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        onClick={() => setIsAgentModalOpen(true)}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>

                            {/* Products */}
                            <div className="mb-3 col-md-4">
                                <label htmlFor="products" className="form-label">
                                    Products
                                </label>
                                <select
                                    id="products"
                                    name="products"
                                    className="form-control"
                                    value={formData.products || ''}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Product</option>
                                    <option value="Product1">Product 1</option>
                                    <option value="Product2">Product 2</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            {/* Deal Watcher */}
                            <div className="mb-3 col-md-4">
                                <label htmlFor="dealWatcher" className="form-label">
                                    Deal Watcher
                                </label>
                                <select
                                    id="dealWatcher"
                                    name="dealWatcher"
                                    className="form-control"
                                    value={formData.dealWatcher || ''}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Watcher</option>
                                    {employeeNames.map((name, idx) => (
                                        <option key={idx} value={name}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <ModalFooter>
                            <Button color="primary" type="submit">
                                Save
                            </Button>
                            {/* <Button color="primary" type="button">
                      Save & Add More
                  </Button> */}
                            <Button color="secondary" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalBody>


            </Modal>

            {isCategoryModalOpen && (
                <Modal
                    isOpen={isCategoryModalOpen}
                    setIsOpen={setIsCategoryModalOpen}
                >
                    <ModalHeader setIsOpen={setIsCategoryModalOpen}>
                        <ModalTitle id="add-category-title">Add Deal Category</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter new category"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleAddCategory}>
                            Add
                        </Button>
                        <Button color="secondary" onClick={() => setIsCategoryModalOpen(false)}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            )}

            {isAgentModalOpen && (
                <Modal isOpen={isAgentModalOpen} setIsOpen={setIsAgentModalOpen}>
                    <ModalHeader setIsOpen={setIsAgentModalOpen}>
                        <ModalTitle id="add-category-title">Add New Deal Agent</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter agent name"
                            value={newAgent}
                            onChange={(e) => setNewAgent(e.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => {
                                if (newAgent.trim()) {
                                    setDealAgents((prev) => [...prev, newAgent]);
                                    setFormData((prev) => ({ ...prev, dealAgent: newAgent }));
                                    setNewAgent('');
                                    setIsAgentModalOpen(false);
                                }
                            }}
                        >
                            Save
                        </Button>
                        <Button color="secondary" onClick={() => setIsAgentModalOpen(false)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            )}
        </>
    );
};

export default CreateProposalModal;