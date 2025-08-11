/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from '../../../components/bootstrap/Modal';
import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Select from '../../../components/bootstrap/forms/Select';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import AddProductModal from './AddProductModal'; 

interface EstimateTemplateModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    onSave?: (values: any) => void;
    defaultValues?: any;
}

const emptyEstimate = {
    name: '',
    total: '',
    status: '',
};

const EstimateTemplateModal: React.FC<EstimateTemplateModalProps> = ({
    isOpen,
    setIsOpen,
    onSave,
    defaultValues,
}) => {
    const [items, setItems] = useState([
        { name: '', quantity: 1, unit: 'Pcs', unitPrice: 0, tax: '', description: '', file: null },
    ]);
    
    const [addProductOpen, setAddProductOpen] = useState(false); 

    const fileInputRef = useRef<HTMLInputElement>(null);

    const formik = useFormik({
        initialValues: {
            name: defaultValues?.name || '',
            currency: defaultValues?.currency || 'INR (₹)',
            product: defaultValues?.product || '',
            CalculateTax: '',
            note: '',
            description: defaultValues?.description || '',
        },
        validate: (values) => {
            const errors: { [key: string]: string } = {};
            if (!values.name) errors.name = 'Name is required';
            return errors;
        },
        onSubmit: (values) => {
            const estimateData = {
                ...values,
                items,
                total: calculateTotal(),
            };
            if (onSave) {
                onSave(estimateData);
            }
            setIsOpen(false);
        },
    });

    const handleItemChange = (index: number, field: keyof (typeof items)[number], value: any) => {
        const updatedItems = [...items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setItems(updatedItems);
    };

    const handleAddItem = () => {
        setItems([
            ...items,
            {
                name: '',
                quantity: 1,
                unit: 'Pcs',
                unitPrice: 0,
                tax: '',
                description: '',
                file: null,
            },
        ]);
    };

    const calculateAmount = (item: any) => {
        const taxRate = item.tax ? parseFloat(item.tax) : 0;
        return (item.quantity * item.unitPrice * (1 + taxRate / 100)).toFixed(2);
    };

    // Add this function to calculate the subtotal
    const calculateSubtotal = () => {
        return items
            .reduce((sum, item) => {
                const taxRate = item.tax ? parseFloat(item.tax) : 0;
                const itemTotal = item.quantity * item.unitPrice * (1 + taxRate / 100);
                return sum + itemTotal;
            }, 0)
            .toFixed(2);
    };

    // Add this function to calculate the total after applying the discount
    const calculateTotal = () => {
        const subtotal = items.reduce((sum, item) => {
            const taxRate = item.tax ? parseFloat(item.tax) : 0;
            const itemTotal = item.quantity * item.unitPrice * (1 + taxRate / 100);
            return sum + itemTotal;
        }, 0);

        const discountValue = discountType === '%' ? (subtotal * discount) / 100 : discount;

        return (subtotal - discountValue).toFixed(2);
    };

    // Add state for discount and discount type
    const [discount, setDiscount] = useState(0); // Discount value
    const [discountType, setDiscountType] = useState('%'); // '%' or 'flat'

    // Add this function to calculate the discounted price
    const calculateDiscountedPrice = () => {
        const subtotal = parseFloat(calculateSubtotal());
        const discountValue = discountType === '%' ? (subtotal * discount) / 100 : discount;
        return (subtotal - discountValue).toFixed(2);
    };

    // Add this state at the top of your component
    const [products, setProducts] = useState<{ value: string; label: string }[]>([]);

    const handleAddProduct = (productName: string) => {
        if (productName && !products.some((p) => p.value === productName)) {
            setProducts((prev) => [...prev, { value: productName, label: productName }]);
        }
        setAddProductOpen(false);
        // Optionally, set the new product as selected:
        formik.setFieldValue('product', productName);
    };

    useEffect(() => {
        if (defaultValues) {
            formik.setValues(defaultValues);
        }
    }, [defaultValues]);

    useEffect(() => {
        // Reset form to empty if defaultValues is null, otherwise use defaultValues
        formik.setValues(defaultValues || emptyEstimate);

        // Reset items to a single empty item if creating a new invoice
        if (!defaultValues) {
            setItems([
                {
                    name: '',
                    quantity: 1,
                    unit: 'Pcs',
                    unitPrice: 0,
                    tax: '',
                    description: '',
                    file: null,
                },
            ]);
            setDiscount(0);
            setDiscountType('%');
        } else if (defaultValues.items) {
            setItems(defaultValues.items);
            setDiscount(defaultValues.discount || 0);
            setDiscountType(defaultValues.discountType || '%');
        }
    }, [defaultValues, isOpen]);


    // Add this useEffect to update form values when defaultValues change
    useEffect(() => {
        if (defaultValues && isOpen) {
            formik.setValues({
                ...formik.initialValues,
                ...defaultValues,
            });
        }
        // Optionally, reset form when modal closes
        if (!isOpen) {
            formik.resetForm();
        }
        // eslint-disable-next-line
    }, [defaultValues, isOpen]);

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl' isStaticBackdrop>
            <ModalHeader setIsOpen={setIsOpen}>
                <ModalTitle id='estimate-details-title'>Estimate Details</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={formik.handleSubmit}>
                    <div className='row g-3'>
                        {/* Invoice Information Fields */}
                        <FormGroup label='Name' className='col-md-4'>
                            <Input
                                name='name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                placeholder='e.g. John Doe'
                            />
                            {formik.errors.name ? (
                                <small className='text-danger'>
                                    {typeof formik.errors.name === 'string'
                                        ? formik.errors.name
                                        : ''}
                                </small>
                            ) : (
                                <></>
                            )}
                        </FormGroup>

                        <FormGroup label='Currency' className='col-md-4'>
                            <Select
                                name='currency'
                                value={formik.values.currency}
                                onChange={formik.handleChange}
                                ariaLabel='Select Currency'>
                                <option value='INR (₹)'>INR (₹)</option>
                                <option value='USD ($)'>USD ($)</option>
                            </Select>
                        </FormGroup>
                        

                        
                        {/* Place this after the Client FormGroup, before Project FormGroup */}
                        <div className='col-12 mb-3'>
                            <label
                                className='form-label fw-semibold'
                                htmlFor='estimate-description'>
                                Description
                            </label>
                            {/* Replace this textarea with your WYSIWYG editor if available */}
                            <textarea
                                id='estimate-description'
                                className='form-control'
                                rows={4}
                                placeholder='Enter description...'
                                style={{ minHeight: 100 }}
                                value={formik.values.description || ''}
                                onChange={(e) =>
                                    formik.setFieldValue('description', e.target.value)
                                }
                            />
                        </div>

                        <FormGroup label='Product' className='col-md-4'>
                            <div className='input-group'>
                                <Select
                                    name='product'
                                    value={formik.values.product}
                                    onChange={formik.handleChange}
                                    ariaLabel='Select Product'
                                    className='form-select'>
                                    <option value=''>--</option>
                                    {products.map((product) => (
                                        <option key={product.value} value={product.value}>
                                          {product.label}
                                        </option>
                                      ))}
                                </Select>
                                <Button color='light' type='button' className='input-group-text'>
                                    <i className='bi bi-funnel' />
                                </Button>
                                <Button
                                    color='light'
                                    type='button'
                                    className='input-group-text'
                                    onClick={() => setAddProductOpen(true)} // 3. Open modal on click
                                >
                                    Add
                                </Button>
                            </div>
                        </FormGroup>
                        {/* Item Section */}
                        <div className='col-12'>
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    className='border p-3 rounded mb-3 shadow-sm bg-light'>
                                    <div className='row g-2 align-items-center'>
                                        <div className='col-md-4'>
                                            <Input
                                                placeholder='Item Name'
                                                value={item.name}
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>,
                                                ) =>
                                                    handleItemChange(index, 'name', e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className='col-md-2 d-flex'>
                                            <Input
                                                type='number'
                                                min={1}
                                                value={item.quantity}
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>,
                                                ) =>
                                                    handleItemChange(
                                                        index,
                                                        'quantity',
                                                        parseInt(e.target.value),
                                                    )
                                                }
                                            />
                                            <Select
                                                className='ms-1'
                                                value={item.unit}
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLSelectElement>,
                                                ) =>
                                                    handleItemChange(index, 'unit', e.target.value)
                                                }
                                                ariaLabel='Select Unit'>
                                                <option value='Pcs'>Pcs</option>
                                                <option value='Kg'>Kg</option>
                                                <option value='Liters'>Liters</option>
                                            </Select>
                                        </div>
                                        <div className='col-md-2'>
                                            <Input
                                                type='number'
                                                min={0}
                                                value={item.unitPrice}
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>,
                                                ) =>
                                                    handleItemChange(
                                                        index,
                                                        'unitPrice',
                                                        parseFloat(e.target.value),
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className='col-md-2'>
                                            <Select
                                                value={item.tax}
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLSelectElement>,
                                                ) => handleItemChange(index, 'tax', e.target.value)}
                                                ariaLabel='Select Tax Rate'>
                                                <option value=''>Nothing selected</option>
                                                <option value='5'>GST 5%</option>
                                                <option value='12'>GST 12%</option>
                                                <option value='18'>GST 18%</option>
                                            </Select>
                                        </div>
                                        <div className='col-md-1 text-end fw-bold'>
                                            ₹ {calculateAmount(item)}
                                        </div>
                                        <div className='col-md-1 text-end'>
                                            <button
                                                type='button'
                                                className='btn btn-primary btn-sm'
                                                onClick={() => {
                                                    const updatedItems = items.filter(
                                                        (_, i) => i !== index,
                                                    );
                                                    setItems(updatedItems);
                                                }}>
                                                <i className='bi bi-x' />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-md-8'>
                                            <Textarea
                                                placeholder='Enter Description (optional)'
                                                value={item.description}
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLTextAreaElement>,
                                                ) =>
                                                    handleItemChange(
                                                        index,
                                                        'description',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        {items.map((item, index) => (
                                            <div key={index} className='col-md-3 mt-2'>
                                                <div
                                                    className='border rounded d-flex flex-column justify-content-center align-items-center p-3'
                                                    style={{ height: '100%', cursor: 'pointer' }}
                                                    onClick={() => fileInputRef.current?.click()}>
                                                    <i className='bi bi-cloud-upload fs-4 mb-2' />
                                                    <small>Choose a file</small>
                                                </div>
                                                <input
                                                    type='file'
                                                    ref={fileInputRef}
                                                    onChange={(
                                                        e: React.ChangeEvent<HTMLInputElement>,
                                                    ) => {
                                                        const file = e.target.files
                                                            ? e.target.files[0]
                                                            : null;
                                                        if (file) {
                                                            console.log(
                                                                'File selected:',
                                                                file.name,
                                                            );
                                                            handleItemChange(index, 'file', file);
                                                        }
                                                    }}
                                                    style={{ display: 'none' }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <Button icon='Add' color='light' onClick={handleAddItem}>
                                Add Item
                            </Button>
                        </div>

                        <div className='mt-4 border rounded'>
                            <div className='d-flex justify-content-end border-bottom p-2'>
                                <div className='w-25 text-end pe-3 text-muted'>Sub Total</div>
                                <div className='w-25 text-end fw-semibold'>
                                    ₹ {calculateSubtotal()}
                                </div>
                            </div>

                            <div
                                className='d-flex justify-content-end border-bottom p-2 align-items-center'
                                style={{ marginRight: '0%' }}>
                                <div className='w-25 text-end pe-3 text-muted'>Discount</div>
                                <div className='w-25 d-flex justify-content-end align-items-center'>
                                    <Input
                                        type='number'
                                        min={0}
                                        className='w-50 me-2'
                                        value={discount}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setDiscount(parseFloat(e.target.value) || 0)
                                        }
                                    />
                                    <Select
                                        className='w-25'
                                        value={discountType}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                            setDiscountType(e.target.value)
                                        }
                                        ariaLabel='Select Discount Type'>
                                        <option value='%'>%</option>
                                        <option value='flat'>Amount</option>
                                    </Select>
                                    <div className='w-25 text-end fw-semibold'>
                                        ₹ {calculateDiscountedPrice()}{' '}
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-end border-bottom p-2'>
                                <div className='w-25 text-end pe-3 text-muted'>Tax</div>
                                <div className='w-25 text-end fw-semibold'>0.00</div>
                            </div>

                            <div className='d-flex justify-content-end p-2 bg-light'>
                                <div className='w-25 text-end pe-3 fw-bold'>Total</div>
                                <div className='w-25 text-end fw-bold fs-5'>
                                    ₹ {calculateTotal()}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color='light' onClick={() => setIsOpen(false)}>
                    Cancel
                </Button>
                <Button color='primary' onClick={formik.handleSubmit}>
                    Save
                </Button>
            </ModalFooter>
            <AddProductModal
                isOpen={addProductOpen}
                setIsOpen={setAddProductOpen}
                onSave={handleAddProduct}
            />
        </Modal>
    );
};

export default EstimateTemplateModal;