
/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useState, useRef, useEffect } from 'react';
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

interface CreateInvoiceModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSave?: (values: any) => void;
  defaultValues?: any;
}

const emptyInvoice = {
  invoiceNumber: '',
  invoiceDate: '',
  dueDate: '',
  client: '',
  project: '',
  total: '',
  paymentGateway: '',
  transactionId: '',
  status: '',
};

const CreateInvoiceModal: React.FC<CreateInvoiceModalProps> = ({ isOpen, setIsOpen, onSave, defaultValues }) => {
  const [items, setItems] = useState([
    { name: '', quantity: 1, unit: 'Pcs', unitPrice: 0, tax: '', description: '', file: null },
  ]);
  const [clients, setClients] = useState([
    { value: 'Client X', label: 'Client X' },
    { value: 'Client Y', label: 'Client Y' },
  ]);
  const [addClientOpen, setAddClientOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      invoiceNumber: defaultValues?.invoiceNumber || '',
      invoiceDate: defaultValues?.invoiceDate || '',
      dueDate: defaultValues?.dueDate || '',
      currency: defaultValues?.currency || 'INR (₹)',
      exchangeRate: '1',
      client: defaultValues?.client || '',
      project: defaultValues?.project || '',
      CalculateTax: '',
      BankAccount: '',
      PaymentDetails: '',
      shippingAddress: '',
      generatedBy: '',
      note: '',
      paymentGateway: defaultValues?.paymentGateway || '',
      transactionId: defaultValues?.transactionId || '',
    },
    validate: (values) => {
      const errors: { [key: string]: string } = {};
      if (!values.invoiceNumber) errors.invoiceNumber = 'Invoice Number is required';
      if (!values.invoiceDate) errors.invoiceDate = 'Invoice Date is required';
      if (!values.dueDate) errors.dueDate = 'Due Date is required';
      if (!values.client) errors.client = 'Client is required';
      if (!values.project) errors.project = 'Project is required';
      return errors;
    },
	onSubmit: (values) => {
		const invoiceData = {
		  ...values,
		  items,
		  total: calculateTotal(), 
		};
		if (onSave) {
		  onSave(invoiceData); 
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
    setItems([...items, { name: '', quantity: 1, unit: 'Pcs', unitPrice: 0, tax: '', description: '', file: null }]);
  };

  const calculateAmount = (item: any) => {
    const taxRate = item.tax ? parseFloat(item.tax) : 0;
    return ((item.quantity * item.unitPrice) * (1 + taxRate / 100)).toFixed(2);
  };

  // Add this function to calculate the subtotal
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => {
      const taxRate = item.tax ? parseFloat(item.tax) : 0;
      const itemTotal = item.quantity * item.unitPrice * (1 + taxRate / 100);
      return sum + itemTotal;
    }, 0).toFixed(2);
  };

  // Add this function to calculate the total after applying the discount
  const calculateTotal = () => {
  const subtotal = items.reduce((sum, item) => {
    const taxRate = item.tax ? parseFloat(item.tax) : 0;
    const itemTotal = item.quantity * item.unitPrice * (1 + taxRate / 100);
    return sum + itemTotal;
  }, 0);

  const discountValue = discountType === '%'
    ? (subtotal * discount) / 100
    : discount;

  return (subtotal - discountValue).toFixed(2);
};

  // Add state for discount and discount type
  const [discount, setDiscount] = useState(0); // Discount value
  const [discountType, setDiscountType] = useState('%'); // '%' or 'flat'

  // Add this function to calculate the discounted price
  const calculateDiscountedPrice = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const discountValue = discountType === '%'
      ? (subtotal * discount) / 100
      : discount;
    return (subtotal - discountValue).toFixed(2);
  };

  useEffect(() => {
    // Reset form to empty if defaultValues is null, otherwise use defaultValues
    formik.setValues(defaultValues || emptyInvoice);

    // Reset items to a single empty item if creating a new invoice
    if (!defaultValues) {
      setItems([{ name: '', quantity: 1, unit: 'Pcs', unitPrice: 0, tax: '', description: '', file: null }]);
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
    if (clientName && !clients.some(c => c.value === clientName)) {
      setClients(prev => [...prev, { value: clientName, label: clientName }]);
    }
    setAddClientOpen(false);
    // Optionally, set the new client as selected:
    formik.setFieldValue('client', clientName);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl' isStaticBackdrop>
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id='invoice-details-title'>Invoice Details</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={formik.handleSubmit}>
          <div className='row g-3'>
            {/* Invoice Information Fields */}
            <FormGroup label='Invoice Number' className='col-md-4'>
							<Input
								name='invoiceNumber'
								value={formik.values.invoiceNumber}
								onChange={formik.handleChange}
								placeholder='Enter Invoice Number'
							/>
							{formik.errors.invoiceNumber ? (
								<small className='text-danger'>
									{typeof formik.errors.invoiceNumber === 'string' ? formik.errors.invoiceNumber : ''}
								</small>
							) : (
								<></>
							)}
						</FormGroup>
						<FormGroup label='Invoice Date' className='col-md-4'>
							<Input
								type='date'
								name='invoiceDate'
								value={formik.values.invoiceDate}
								onChange={formik.handleChange}
							/>
							{formik.errors.invoiceDate ? (
								<small className='text-danger'>
									{typeof formik.errors.invoiceDate === 'string' ? formik.errors.invoiceDate : ''}
								</small>
							) : (
								<></>
							)}
						</FormGroup>
						<FormGroup label='Due Date' className='col-md-4'>
							<Input
								type='date'
								name='dueDate'
								value={formik.values.dueDate}
								onChange={formik.handleChange}
							/>
							{formik.errors.dueDate ? (
								<small className='text-danger'>
									{typeof formik.errors.dueDate === 'string' ? formik.errors.dueDate : ''}
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
						<FormGroup label='Exchange Rate' className='col-md-4'>
							<Input
								name='exchangeRate'
								value={formik.values.exchangeRate}
								onChange={formik.handleChange}
							/>
						</FormGroup>
						<FormGroup label='Client' className='col-md-4'>
  <div className="input-group">
    <Select
      name='client'
      value={formik.values.client}
      onChange={formik.handleChange}
      ariaLabel='Select Client'
      className="form-select"
    >
      <option value=''>--</option>
      {clients.map((client) => (
        <option key={client.value} value={client.value}>
          {client.label}
        </option>
      ))}
    </Select>
    <Button
      color="light"
      type="button"
      className="input-group-text"
      onClick={() => setAddClientOpen(true)}
    >
      Add
    </Button>
  </div>
  {formik.errors.client ? (
	<small className='text-danger'>{typeof formik.errors.client === 'string' ? formik.errors.client : ''}</small>
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
								<small className='text-danger'>
									{typeof formik.errors.project === 'string' ? formik.errors.project : ''}
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

						<FormGroup label='Bank Account' className='col-md-4'>
							<Select
								name='Bank Account'
								value={formik.values.BankAccount}
								onChange={formik.handleChange}
								ariaLabel='Select Bank Account'>
								<option value=''>-- Bank Account --</option>
							</Select>
							{formik.errors.BankAccount ? (
								<small className='text-danger'>{formik.errors.BankAccount}</small>
							) : (
								<></>
							)}
						</FormGroup>

						<FormGroup label='Payment Details' className='col-md-4'>
							<Select
								name='Payment Details'
								value={formik.values.PaymentDetails}
								onChange={formik.handleChange}
								ariaLabel='Select Payment Details'>
								<option value=''>-- Payment Details --</option>
							</Select>
							{formik.errors.PaymentDetails ? (
								<small className='text-danger'>
									{formik.errors.PaymentDetails}
								</small>
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

						<FormGroup label='Generated By' className='col-md-4'>
							<Input
								name='generatedBy'
								value={formik.values.generatedBy}
								onChange={formik.handleChange}
							/>
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
				<Button color='primary' onClick={formik.handleSubmit}>
					Save
				</Button>
			</ModalFooter>
			<AddClientModal
        isOpen={addClientOpen}
        setIsOpen={setAddClientOpen}
        onSave={handleAddClient}
      />
		</Modal>
  );
};

export default CreateInvoiceModal;