import React, { FC, useState, useEffect, useRef } from 'react';
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
import 'react-quill/dist/quill.snow.css';
import ClientModal from './ClientModal';

interface Project {
	code: string;
	projectName: string;
	startDate: string;
	client: string;
	status: string;
}

interface Client {
	name: string;
	email: string;
	companyName: string;
	loginAllowed: boolean;
}

interface AddRecurringInvoiceProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	onAddProject: (project: Project) => void;
	project?: Project | null;
}

const initialState = {
	code: '',
	projectName: '',
	startDate: '',
	client: '',
	status: 'active',
	pinned: false,
	nextInvoice: '',
	total: '',
};

const AddRecurringInvoice: FC<AddRecurringInvoiceProps> = ({
	isOpen,
	setIsOpen,
	onAddProject,
	project,
}) => {
	const [, setForm] = useState(initialState);

	useEffect(() => {
		if (!isOpen) setForm(initialState); // Reset form when modal closes
	}, [isOpen]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		// Calculate next invoice date
		let nextInvoice = '';
		if (formik.values.startDate && formik.values.billingFrequency) {
			const start = new Date(formik.values.startDate);
			let daysToAdd = 0;
			if (formik.values.billingFrequency.toLowerCase().includes('week')) {
				daysToAdd = 14;
			} else if (formik.values.billingFrequency.toLowerCase().includes('month')) {
				daysToAdd = 28;
			} else if (formik.values.billingFrequency.toLowerCase().includes('day')) {
				daysToAdd = 1;
			}
			const next = new Date(start.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
			nextInvoice = `${next.toDateString()}|${formik.values.billingFrequency}`;
		}

		const newProject = {
    code: formik.values.shortCode || '',
    projectName: formik.values.project || '',
    startDate: formik.values.startDate || '',
    client: formik.values.client || '',
    status: 'active',
    nextInvoice: nextInvoice,
    total: calculateTotal(),
    items: items, // <-- Save items array
    discount: discount,
    discountType: discountType,
    subTotal: calculateSubtotal(),
    note: formik.values.note,
};

		onAddProject(newProject);
		setIsOpen(false);
		setForm(initialState);
		formik.resetForm(); 
		setItems([]); 
		setDiscount(0); 
		setDiscountType('%'); 
	};

	const [isClientModalOpen, setIsClientModalOpen] = useState(false);
	const [clients, setClients] = useState<Client[]>([
		{ name: 'Client X', email: '', companyName: '', loginAllowed: false },
		{ name: 'Client Y', email: '', companyName: '', loginAllowed: false },
	]); // Default clients

	const handleSaveClient = (client: Client) => {
		setClients((prev) => [...prev, client]);
		// Optionally set the new client as selected:
		formik.setFieldValue('client', client.name);
		setIsClientModalOpen(false);
	};
	// Define Item type and items state
	interface Item {
		name: string;
		quantity: number;
		unit: string;
		unitPrice: number;
		tax: string;
		description: string;
		file?: File | null;
	}

	const [items, setItems] = useState<Item[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Add discount state and discount type state
	const [discount, setDiscount] = useState<number>(0);
	const [discountType, setDiscountType] = useState<'%' | 'flat'>('%');

	// Calculate subtotal
	function calculateSubtotal(): number {
		return items.reduce((sum, item) => {
			const quantity = item.quantity || 0;
			const unitPrice = item.unitPrice || 0;
			const taxRate = parseFloat(item.tax) || 0;
			const baseAmount = quantity * unitPrice;
			const taxAmount = (baseAmount * taxRate) / 100;
			const total = baseAmount + taxAmount;
			return sum + total;
		}, 0);
	}

	// Calculate discounted price
	function calculateDiscountedPrice(): number {
		const subtotal = calculateSubtotal();
		if (discountType === '%') {
			return ((subtotal * discount) / 100);
		} else {
			return discount;
		}
	}

	// Calculate total
	function calculateTotal(): number {
		const subtotal = calculateSubtotal();
		const discountValue = calculateDiscountedPrice();
		return subtotal - discountValue;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [formData, setFormData] = useState<Project>({
		code: '',
		projectName: '',
		startDate: '',
		client: '',
		status: 'not started',
	});

	useEffect(() => {
		if (project) {
			setFormData({ ...project }); 
		} else {
			setFormData({
				code: '',
				projectName: '',
				startDate: '',
				client: '',
				status: 'not started',
			});
		}
	}, [project]);

	const formik = useFormik({
		initialValues: {
			shortCode: '',
			projectName: '',
			project: '', 
			startDate: '',
			projectCategory: '',
			client: '',
			currency: 'INR',
			calculateTax: '', 
			bankAccount: '', 
			shippingAddress: '', 
			Clientcanstoprecurring: false, 
			billingFrequency: '', 
			immediateStart: false, 
			totalCount: '', 
			note: '', 
			paymentGateway: '', 
			transactionId: '', 
		},
		onSubmit: () => {
			setIsOpen(false);
		},
	});

	useEffect(() => {
		if (project) {
			// Set form fields to project values
			formik.setValues({
				...formik.initialValues,
				...project,
				project: project.projectName, // If you use a separate field for project name
			});
		} else {
			formik.resetForm();
		}
		// eslint-disable-next-line
	}, [project, isOpen]);

	if (!isOpen) return null;

	function handleItemChange(index: number, key: keyof Item, value: any) {
		setItems((prevItems) => {
			const updatedItems = [...prevItems];
			updatedItems[index] = {
				...updatedItems[index],
				[key]: value,
			};
			return updatedItems;
		});
	}

	function calculateAmount(item: Item): React.ReactNode | Iterable<React.ReactNode> {
		const quantity = item.quantity || 0;
		const unitPrice = item.unitPrice || 0;
		const taxRate = parseFloat(item.tax) || 0;
		const baseAmount = quantity * unitPrice;
		const taxAmount = (baseAmount * taxRate) / 100;
		const total = baseAmount + taxAmount;
		return total.toFixed(2);
	}

	function handleAddItem() {
		setItems((prevItems) => [
			...prevItems,
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
	}

	  return (
    <>
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl' isStaticBackdrop>
			<ModalHeader setIsOpen={setIsOpen}>
				<ModalTitle id='invoice-details-title'>Invoice Details</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<form onSubmit={handleSubmit}>
					<div className='row g-3'>
                        {/* Client */}
						<FormGroup label="Client" className="col-md-4">
							<div className="input-group">
								<Select
									name="client"
									value={formik.values.client}
									onChange={formik.handleChange}
									ariaLabel="Select Client"
								>
									<option value="">-- Select Client --</option>
									{clients.map((c, idx) => (
										<option key={idx} value={c.name}>
											{c.name}
										</option>
									))}
								</Select>
								<Button
									color="light"
									className="input-group-text"
									onClick={() => setIsClientModalOpen(true)}
								>
									Add
								</Button>
							</div>
							{formik.errors.client ? (
								<small className="text-danger">{formik.errors.client}</small>
							) : <></>}
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
								<small className='text-danger'>{formik.errors.project}</small>
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
						<FormGroup label='Calculate Tax' className='col-md-4'>
							<Select
								name='calculateTax'
								value={formik.values.calculateTax}
								onChange={formik.handleChange}
								ariaLabel='Calculate Tax'>
								<option value=''>-- Calculate Tax --</option>
								<option value='After Discount'>After Discount</option>
								<option value='Before Discount'>Before Discount</option>
							</Select>
							{formik.errors.calculateTax ? (
								<small className='text-danger'>{formik.errors.calculateTax}</small>
							) : (
								<></>
							)}
						</FormGroup>
						<FormGroup label='Bank Account' className='col-md-4'>
							<Select
								name='bankAccount'
								value={formik.values.bankAccount}
								onChange={formik.handleChange}
								ariaLabel='Select Bank Account'>
								<option value=''>-- Bank Account --</option>
							</Select>
							{formik.errors.bankAccount ? (
								<small className='text-danger'>{formik.errors.bankAccount}</small>
							) : (
								<></>
							)}
						</FormGroup>

						<FormGroup label='Shipping Address' className='col-md-4'>
							<Input
								name='shippingAddress'
								value={formik.values.shippingAddress}
								onChange={formik.handleChange}
								placeholder='e.g. 132, My Street, Kingston, NY 12401'
							/>
						</FormGroup>

						<div className="form-check ms-3">
									<input
										type="checkbox"
										className="form-check-input"
										id="Clientcanstoprecurring"
										checked={formik.values.Clientcanstoprecurring|| false}
										onChange={(e) =>
											formik.setFieldValue('Clientcanstoprecurring', e.target.checked)
										}
									/>
									<label className="form-check-label" htmlFor="Clientcanstoprecurring">
										Client can stop recurring
									</label>
								</div>

						<FormGroup label='Billing Frequency' className='col-md-4'>
							<Select
								name='billingFrequency'
								value={formik.values.billingFrequency || ''}
								onChange={formik.handleChange}
								ariaLabel='billing Frequency'>
								<option value=''>--</option>
								<option value='Daily'>Daily</option>
								<option value='Weekly'>Weekly</option>
								<option value='Bi-Weekly'>Bi-Weekly</option>
								<option value='Monthly'>Monthly</option>
								<option value='Quarterly'>Quarterly</option>
								<option value='Half-Yearly'>Half-Yearly</option>
								<option value='Annually'>Annually</option>
							</Select>
							{formik.errors.calculateTax ? (
								<small className='text-danger'>{formik.errors.calculateTax}</small>
							) : (
								<></>
							)}
						</FormGroup>

						<FormGroup label="Start Date" className="col-md-4">
							<div className="d-flex align-items-center">
								<Input
									type="date"
									name="startDate"
									value={formik.values.startDate || ''}
									onChange={formik.handleChange}
								/>
								<div className="form-check ms-3">
									<input
										type="checkbox"
										className="form-check-input"
										id="immediateStart"
										checked={formik.values.immediateStart || false}
										onChange={(e) =>
											formik.setFieldValue('immediateStart', e.target.checked)
										}
									/>
									<label className="form-check-label" htmlFor="immediateStart">
										Immediate start (Invoice will generate from now)
									</label>
								</div>
							</div>
						</FormGroup>

						<FormGroup label="Total Count" className="col-md-4">
							<Input
								type="number"
								name="totalCount"
								value={formik.values.totalCount || ''}
								onChange={formik.handleChange}
								placeholder="e.g. -1 for infinite cycles"
							/>
						</FormGroup>

						<div className="col-md-4">
							<div className="border p-3 rounded bg-light">
								<p>
									<strong>Customer will be charged:</strong> {formik.values.billingFrequency || 'N/A'}
								</p>
								<p>
									<strong>First Invoice will be generated on:</strong>{' '}
									{formik.values.startDate || 'N/A'}
								</p>
								<p>
									<strong>Next Invoice Date will be:</strong>{' '}
									{formik.values.startDate
										? new Date(
												new Date(formik.values.startDate).getTime() + 24 * 60 * 60 * 1000
											).toDateString()
										: 'N/A'}
								</p>
								<p>And so on...</p>
							</div>
						</div>

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
													onClick={() => fileInputRef.current?.click()} // Trigger file input click
												>
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
							<Button icon='plus' color='link' onClick={handleAddItem}>
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
											setDiscountType(e.target.value as '%' | 'flat')
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
						<FormGroup label='Upload File' className='col-12'>
							{items.map((item, index) => (
								<div key={index}>
									<div
										className='border rounded d-flex flex-column justify-content-center align-items-center p-3'
										style={{ height: '100%', cursor: 'pointer' }}
										onClick={() => fileInputRef.current?.click()} // Trigger file input click
									>
										<i className='bi bi-cloud-upload fs-4 mb-2' />
										<small>Choose a file</small>
									</div>
									<input
										type='file'
										ref={fileInputRef}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
											const file = e.target.files ? e.target.files[0] : null;
											if (file) {
												console.log('File selected:', file.name);
												// Update the file in the corresponding item
												handleItemChange(index, 'file', file);
											}
										}}
										style={{ display: 'none' }} // Hide the file input
									/>
								</div>
							))}
						</FormGroup>
						<FormGroup label='Payment Gateway' className='col-md-6'>
							<Select
								name='paymentGateway'
								value={formik.values.paymentGateway}
								onChange={formik.handleChange}
								ariaLabel='Select Payment Gateway'>
								<option value=''>-- Select Gateway --</option>
								<option value='Gateway A'>Gateway A</option>
								<option value='Gateway B'>Gateway B</option>
							</Select>
						</FormGroup>
						<FormGroup label='Transaction ID' className='col-md-6'>
							<Input
								name='transactionId'
								value={formik.values.transactionId}
								onChange={formik.handleChange}
							/>
						</FormGroup>
					</div>
				</form>
			</ModalBody>
			<ModalFooter>
				<Button color='secondary' onClick={() => setIsOpen(false)}>
					Cancel
				</Button>
				<Button color="primary" onClick={handleSubmit}>
					Save
				</Button>
			</ModalFooter>
		</Modal>
        {/* Client Modal */}
            <ClientModal
                isOpen={isClientModalOpen}
                setIsOpen={setIsClientModalOpen}
                onSave={handleSaveClient}
        />
    </>
  );
};

export default AddRecurringInvoice;