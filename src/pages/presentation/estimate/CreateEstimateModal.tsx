/* eslint-disable @typescript-eslint/no-unused-vars */
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
import AddClientModal from './AddClientModal';
import AddProductModal from './AddProductModal'; 

interface CreateEstimateModalProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	onSave?: (values: any) => void;
	defaultValues?: any;
}

const emptyEstimate = {
	estimateNumber: '',
	validTill: '',
	client: '',
	project: '',
	total: '',
	status: '',
};

type EstimateFormValues = {
  estimateNumber: any;
  validTill: any;
  currency: any;
  client: any;
  project: any;
  product: any;
  CalculateTax: string;
  note: string;
  description: any;
  status?: string; // <-- Add this
};

const CreateEstimateModal: React.FC<CreateEstimateModalProps> = ({
	isOpen,
	setIsOpen,
	onSave,
	defaultValues,
}) => {
	const [items, setItems] = useState<{ name: string; quantity: number; unit: string; unitPrice: number; tax: string; description: string; file: File | null; preview?: string }[]>([
		{ name: '', quantity: 1, unit: 'Pcs', unitPrice: 0, tax: '', description: '', file: null },
	]);
	const [clients, setClients] = useState([
		{ value: 'Client X', label: 'Client X' },
		{ value: 'Client Y', label: 'Client Y' },
	]);
	const [products, setProducts] = useState<{ value: string; label: string }[]>([]);
	const [addClientOpen, setAddClientOpen] = useState(false);
	const [addProductOpen, setAddProductOpen] = useState(false); 

	const fileInputRef = useRef<HTMLInputElement>(null);

	const formik = useFormik<EstimateFormValues>({
		initialValues: {
			estimateNumber: '',
			validTill: '',
			currency: '',
			client: '',
			project: '',
			product: '',
			CalculateTax: '',
			note: '',
			description: '',
			status: 'Waiting', // <-- Add this
		},
		validate: (values) => {
			const errors: { [key: string]: string } = {};
			if (!values.estimateNumber) errors.invoiceNumber = 'Estimate Number is required';
			if (!values.validTill) errors.invoiceDate = 'Valid Till is required';
			if (!values.client) errors.client = 'Client is required';
			if (!values.project) errors.project = 'Project is required';
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


//

	// Add state for discount and discount type
	const [discount, setDiscount] = useState(0); // Discount value
	const [discountType, setDiscountType] = useState('%'); // '%' or 'flat'

	// Add this function to calculate the discounted price
	const calculateDiscountedPrice = () => {
		const subtotal = parseFloat(calculateSubtotal());
		const discountValue = discountType === '%' ? (subtotal * discount) / 100 : discount;
		return (subtotal - discountValue).toFixed(2);
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

	// Add this handler to receive new client from AddClientModal
	const handleAddClient = (clientName: string) => {
		if (clientName && !clients.some((c) => c.value === clientName)) {
			setClients((prev) => [...prev, { value: clientName, label: clientName }]);
		}
		setAddClientOpen(false);
		// Optionally, set the new client as selected:
		formik.setFieldValue('client', clientName);
	};

	// Add this handler to add a new product
	const handleAddProduct = (productName: string) => {
		if (productName && !products.some((p) => p.value === productName)) {
			setProducts((prev) => [...prev, { value: productName, label: productName }]);
		}
		setAddProductOpen(false);
		// Optionally, set the new product as selected:
		formik.setFieldValue('product', productName);
	};

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

	const handleFileChange = (index: number, file: File | null) => {
		if (!file) return;
		const preview = URL.createObjectURL(file);
		const updatedItems = [...items];
		updatedItems[index] = { ...updatedItems[index], file, preview };
		setItems(updatedItems);
	};

	useEffect(() => {
		return () => {
			items.forEach(item => {
				if (item.preview) URL.revokeObjectURL(item.preview);
			});
		};
	}, [items]);

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl' isStaticBackdrop>
			<ModalHeader setIsOpen={setIsOpen}>
				<ModalTitle id='estimate-details-title'>Estimate Details</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<form onSubmit={formik.handleSubmit}>
					<div className='row g-3'>
						{/* Invoice Information Fields */}
						<FormGroup label='Estimate Number' className='col-md-4'>
							<Input
								name='estimateNumber'
								value={formik.values.estimateNumber}
								onChange={formik.handleChange}
								placeholder='Enter Estimate Number'
							/>
							{formik.errors.estimateNumber ? (
								<small className='text-danger'>
									{typeof formik.errors.estimateNumber === 'string'
										? formik.errors.estimateNumber
										: ''}
								</small>
							) : (
								<></>
							)}
						</FormGroup>
						<FormGroup label='Valid Till' className='col-md-4'>
							<Input
								type='date'
								name='validTill'
								value={formik.values.validTill}
								onChange={formik.handleChange}
							/>
							{formik.errors.validTill ? (
								<small className='text-danger'>
									{typeof formik.errors.validTill === 'string'
										? formik.errors.validTill
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
						<FormGroup label='Client' className='col-md-4'>
							<div className='input-group'>
								<Select
									name='client'
									value={formik.values.client}
									onChange={formik.handleChange}
									ariaLabel='Select Client'
									className='form-select'>
									<option value=''>--</option>
									{clients.map((client) => (
										<option key={client.value} value={client.value}>
											{client.label}
										</option>
									))}
								</Select>
								<Button
									color='light'
									type='button'
									className='input-group-text'
									onClick={() => setAddClientOpen(true)}>
									Add
								</Button>
							</div>
							{formik.errors.client ? (
								<small className='text-danger'>
									{typeof formik.errors.client === 'string'
										? formik.errors.client
										: ''}
								</small>
							) : (
								<></>
							)}
						</FormGroup>
						<FormGroup label='Project' className='col-md-4'>
							<Select
								name='project'
								value={formik.values.project}
								onChange={formik.handleChange}
								ariaLabel='Select Project'>
								<option value=''>-- Select Project --</option>
								<option value='Project A'>Project A</option>
								<option value='Project B'>Project B</option>
							</Select>
							{formik.errors.project ? (
								<small className='text-danger'>
									{typeof formik.errors.project === 'string'
										? formik.errors.project
										: ''}
								</small>
							) : (
								<></>
							)}
						</FormGroup>

						<FormGroup label='Calculate Tax' className='col-md-4'>
							<Select
								name='Calculate Tax'
								value={formik.values.CalculateTax}
								onChange={formik.handleChange}
								ariaLabel='Calculate Tax'>
								<option value=''>-- Calculate Tax --</option>
								<option value='After Discount'>After Discount</option>
								<option value='Before Discount'>Before Discount</option>
							</Select>
							{formik.errors.CalculateTax ? (
								<small className='text-danger'>{formik.errors.CalculateTax}</small>
							) : (
								<></>
							)}
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
													style={{ height: '100%', cursor: 'pointer', minHeight: 120 }}
													onClick={() => document.getElementById(`file-input-${index}`)?.click()}
												>
													{item.preview ? (
														<img
															src={item.preview}
															alt="Preview"
															style={{ maxWidth: '100%', maxHeight: 100, objectFit: 'contain' }}
														/>
													) : (
														<>
															<i className='bi bi-cloud-upload fs-4 mb-2' />
															<small>Choose a file</small>
														</>
													)}
												</div>
												<input
													id={`file-input-${index}`}
													type='file'
													accept="image/*"
													style={{ display: 'none' }}
													onChange={e => {
														const file = e.target.files ? e.target.files[0] : null;
														if (file) handleFileChange(index, file);
													}}
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

						<FormGroup label='Note for Recipient' className='col-12'>
							<Textarea
								name='note'
								value={formik.values.note}
								onChange={formik.handleChange}
								placeholder='e.g. Thank you for your business'
							/>
						</FormGroup>

						{/* Status field: show only when editing */}
						{defaultValues && defaultValues.id && (
							<FormGroup label="Status" className="col-md-4">
								<Select
									name="status"
									value={formik.values.status || defaultValues.status || 'Waiting'}
									onChange={formik.handleChange}
									ariaLabel="Select Status"
								>
									<option value="Waiting">Waiting</option>
									<option value="Accepted">Accepted</option>
									<option value="Rejected">Rejected</option>
								</Select>
							</FormGroup>
						)}
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
			<AddClientModal
				isOpen={addClientOpen}
				setIsOpen={setAddClientOpen}
				onSave={handleAddClient}
			/>
			<AddProductModal // 4. Render the modal
				isOpen={addProductOpen}
				setIsOpen={setAddProductOpen}
				onSave={handleAddProduct}
			/>
		</Modal>
	);
};

export default CreateEstimateModal;