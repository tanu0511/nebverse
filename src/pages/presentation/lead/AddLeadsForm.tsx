/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Select from '../../../components/bootstrap/forms/Select';
interface IAddLeadsModalProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onAddLead: (values: any) => void;
	onSubmit: (values: any) => void;
	onClose: () => void;
	leadToEdit?: any; // Optional prop for editing
	isCreateDeal: boolean;
	mode: 'lead' | 'deal';
}
  

interface Country {
	name: string;
	code: string;
	flag: string;
}
const AddLeadsForm: FC<IAddLeadsModalProps> = ({
    isOpen,
    setIsOpen,
    onSubmit,
    mode
}) => {
    //Load initial form data from localStorage or use default values
	const defaultFormData = {
		salutation: '',
		name: '',
		email: '',
		leadSource: 'Email',
		addedBy: 'atharvraj singh rana',
		leadOwner: 'atharvraj singh rana',
		createDeal: false,
		dealName: '',
		pipeline: 'Sales Pipeline',
		dealStage: 'Generated',
		dealValue: 0,
		closeDate: '',
		dealCategory: '',
		dealAgent: '',
		products: '',
		dealWatcher: 'atharvraj singh rana',
		companyName: '',
		website: '',
		mobile: '',
		officePhone: '',
		country: '',
		state: '',
		city: '',
		postalCode: '',
		address: '',
	};
	
	const [formData, setFormData] = useState(defaultFormData);
	
	useEffect(() => {
		if (isOpen) {
			setFormData(defaultFormData); // Reset form data when modal is opened
		}
	}, [isOpen]);

    const formik = useFormik({
        initialValues: formData,
        enableReinitialize: true, // Allow form to reinitialize with updated values
        onSubmit: (values) => {
            onSubmit(values);
            setFormData(values); // Update local state
            localStorage.setItem('addLeadsForm', JSON.stringify(values)); // Save to localStorage
            formik.resetForm();
            setIsOpen(false);
        },
    });

	   // Save form data to localStorage whenever it changes
    // useEffect(() => {
    //     localStorage.setItem('addLeadsForm', JSON.stringify(formik.values));
    // }, [formik.values]);

	const handleAddLeadSource = () => {
		if (newLeadSource.trim() !== '') {
			setLeadSources((prev) => [...prev, newLeadSource]);
			formik.setFieldValue('leadSource', newLeadSource);
			setNewLeadSource('');
			setIsAddLeadSourceOpen(false);
		}
	};

	// if (!isOpen) return null;
	const [createDealChecked, setCreateDealChecked] = useState(false);
	const [showCompanyDetails, setShowCompanyDetails] = useState(false);
	const [leadSources, setLeadSources] = useState<string[]>([
		'Email',
		'Google',
		'Facebook',
		'Direct',
		'Friend',
		'TV',
	]);
	const [isAddLeadSourceOpen, setIsAddLeadSourceOpen] = useState(false);
	const [newLeadSource, setNewLeadSource] = useState('');
	const [countries, setCountries] = useState<Country[]>([]);
	const [IsAddDealOpen, setIsAddDealOpen] = useState<boolean>(false);
	const [newDeal, setNewDeal] = useState<string>('');
	const [dealCategory, setDealCategory] = useState<string[]>(['Email']);
	const handleDeal = () => {
		if (newDeal.trim() !== '') {
			setDealCategory((prev) => [...prev, newDeal]);
			formik.setFieldValue('dealCategory', newDeal);
			setNewDeal('');
			setIsAddDealOpen(false);
		}
	};

	const [isDealAgentOpen, setIsDealAgentOpen] = useState(false); // Controls modal visibility
	const [newDealAgent, setNewDealAgent] = useState(''); // Stores the entered agent name
	const [newDealAgentCategory, setNewDealAgentCategory] = useState(''); // Stores the entered deal category
	const [dealAgent, setDealAgent] = useState<string[]>([]); // List of agents shown in select

	const handleAgent = () => {
		if (newDealAgent.trim() && newDealAgentCategory.trim()) {
			const fullAgent = `${newDealAgent} (${newDealAgentCategory})`;
			setDealAgent((prev) => [...prev, fullAgent]);

			// Reset modal values
			setNewDealAgent('');
			setNewDealAgentCategory('');
			setIsDealAgentOpen(false);
		}
	};

	useEffect(() => {
		fetch('https://restcountries.com/v3.1/all')
			.then((res) => res.json())
			.then((data) => {
				const sorted = data
					.map((country: any) => ({
						name: country.name.common,
						code: country.cca2,
						flag: country.flag,
					}))
					.sort((a: Country, b: Country) => a.name.localeCompare(b.name));

				setCountries(sorted);
			});
	}, []);

	if (!isOpen) return null;
	// Example static options
	const agentOptions = ['John Doe', 'Jane Smith', 'Amit Verma'];
	const categoryOptions = ['Residential', 'Commercial', 'Enterprise'];
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='lg' isStaticBackdrop={true} onClose={() => { 
			setIsOpen(false); 
			formik.resetForm(); 
		}}>
		

			<ModalHeader setIsOpen={setIsOpen}>
				{/* <h5 className='modal-title'>Add Lead Contact</h5> */}
				<h2> {mode === 'lead' ? 'Add Lead' : 'Add Deal'}</h2>
			</ModalHeader>
			
			<ModalBody>
			   
				<form onSubmit={formik.handleSubmit} className='row g-4'>
				{mode === 'lead' && (
                  <>
					<FormGroup label='Salutation' className='col-md-4'>
						<Select
							name='salutation'
							ariaLabel='Salutation'
							onChange={formik.handleChange}
							value={formik.values.salutation}>
							<option value=''>--</option>
							<option>Mr.</option>
							<option>Mrs.</option>
							<option>Ms.</option>
							<option>Dr.</option>
						</Select>
					</FormGroup>

					<FormGroup label='Name *' className='col-md-4'>
						<Input
							name='name'
							placeholder='e.g. John Doe'
							onChange={formik.handleChange}
							value={formik.values.name}
							required
						/>
					</FormGroup>

					<FormGroup label='Email' className='col-md-4'>
						<div className='input-group'>
							<Input
								name='email'
								type='email'
								placeholder='e.g. johndoe@example.com'
								onChange={formik.handleChange}
								value={formik.values.email}
							/>
						</div>
					</FormGroup>
					<FormGroup label='Lead Source' className='col-md-4'>
						<div className='input-group'>
							<Select
								name='leadSource'
								ariaLabel='Lead Source'
								onChange={formik.handleChange}
								value={formik.values.leadSource}>
								{leadSources.map((source) => (
									<option key={source}>{source}</option>
								))}
							</Select>
							<Button
								type='button'
								color='light'
								className='input-group-text'
								onClick={() => setIsAddLeadSourceOpen(true)}>
								Add
							</Button>
						</div>
					</FormGroup>
  
					{isAddLeadSourceOpen && (
						// <Modal isOpen={isAddLeadSourceOpen} setIsOpen={setIsAddLeadSourceOpen}>
						<Modal
							isOpen={isAddLeadSourceOpen}
							setIsOpen={setIsAddLeadSourceOpen}
							onClose={() => setIsAddLeadSourceOpen(false)}

							
							isStaticBackdrop={true}>
							<ModalHeader setIsOpen={setIsAddLeadSourceOpen}>
								<h5 className='modal-title'>Add New Lead Source</h5>
							</ModalHeader>
							<ModalBody>
								<FormGroup label='Lead Source Name'>
									<Input
										type='text'
										value={newLeadSource}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											setNewLeadSource(e.target.value)
										}
										placeholder='e.g.Email'
									/>
								</FormGroup>
							</ModalBody>
							<ModalFooter>
								<Button
									color='secondary'
									onClick={() => setIsAddLeadSourceOpen(false)}>
									Cancel
								</Button>
								<Button color='primary' onClick={handleAddLeadSource}>
									Add
								</Button>
							</ModalFooter>
						</Modal>
					)}

					<FormGroup label='Added By' className='col-md-4'>
						<Select
							name='addedBy'
							ariaLabel='Added By'
							onChange={formik.handleChange}
							value={formik.values.addedBy}>
							<option>atharvraj singh rana (It's you)</option>
						</Select>
					</FormGroup>

					<FormGroup label='Lead Owner' className='col-md-4'>
						<Select
							name='leadOwner'
							ariaLabel='Lead Owner'
							onChange={formik.handleChange}
							value={formik.values.leadOwner}>
							<option>atharvraj singh rana (It's you)</option>
						</Select>
					</FormGroup>

					<FormGroup className='col-md-12'>
						<label className='inline-flex items-center gap-2'>
							<input
								type='checkbox'
								name='createDeal'
								checked={createDealChecked}
								onChange={() => {
									setCreateDealChecked(!createDealChecked);
									formik.setFieldValue('createDeal', !createDealChecked);
								}}
								className='form-checkbox h-5 w-5 text-blue-600'
							/>
							<span className='text-gray-800 text-sm font-medium'>Create Deal</span>
						</label>
					</FormGroup>
						</>
					)}
					{(mode === 'deal' || createDealChecked) && (
						<>
							<FormGroup label='Deal Name' className='col-md-6'>
								<Input
									name='dealName'
									placeholder='e.g. Enterprise Deal'
									onChange={formik.handleChange}
									value={formik.values.dealName}
								/>
							</FormGroup>

							<FormGroup label='Pipeline' className='col-md-6'>
								<Select
									name='pipeline'
									ariaLabel='Pipeline'
									onChange={formik.handleChange}
									value={formik.values.pipeline}>
									<option value=''>Select Pipeline</option>
									<option value='Sales Pipeline'>Sales Pipeline</option>
									<option value='pipeline1'>Pipeline 1</option>
									<option value='pipeline2'>Pipeline 2</option>
								</Select>
							</FormGroup>

							<FormGroup label='Deal Stage' className='col-md-6'>
								<Select
									name='dealStage'
									ariaLabel='Deal Stage'
									onChange={formik.handleChange}
									value={formik.values.dealStage}>
									 <option value="">Select Stage</option>
    <option value="generated">🟢 Generated</option>
    <option value="qualified">🔵 Qualified</option>
    <option value="initial">🟡 Initial Contact</option>
    <option value="schedule">🟣 Schedule Appointment</option>
    <option value="win">🟢 Win</option>
    <option value="lost">🔴 Lost</option>
    <option value="inprogress">🟠 In Progress</option>
								<option value='ju'>🔵ju</option>
								</Select>
							</FormGroup>

							<FormGroup label='Deal Value' className='col-md-6'>
								<Input
									type='number'
									name='dealValue'
									onChange={formik.handleChange}
									value={formik.values.dealValue}
								/>
							</FormGroup>

							<FormGroup label='Close Date' className='col-md-6'>
								<Input
									type='date'
									name='closeDate'
									onChange={formik.handleChange}
									value={formik.values.closeDate}
								/>
							</FormGroup>

							<FormGroup label='Deal Category' className='col-md-4'>
								<div className='input-group'>
									<Select
										name='dealCategory'
										ariaLabel='Deal Category'
										onChange={formik.handleChange}
										value={formik.values.dealCategory}>
										{dealCategory.map((Deal) => (
											<option key={Deal}>{Deal}</option>
										))}
									</Select>
									<Button
										type='button'
										color='light'
										className='input-group-text'
										onClick={() => setIsAddDealOpen(true)}>
										Add
									</Button>
								</div>
							</FormGroup>
							{IsAddDealOpen && (
								// <Modal isOpen={isAddLeadSourceOpen} setIsOpen={setIsAddLeadSourceOpen}>
								<Modal
									isOpen={IsAddDealOpen}
									setIsOpen={setIsAddDealOpen}
									onClose={() => setIsAddDealOpen(false)}
									isStaticBackdrop={true}>
									<ModalHeader setIsOpen={setIsAddDealOpen}>
										<h5 className='modal-title'>Add New Lead Source</h5>
									</ModalHeader>
									<ModalBody>
										<FormGroup label='Add New Deal Category'>
											<Input
												type='text'
												value={newDeal}
												onChange={(
													e: React.ChangeEvent<HTMLInputElement>,
												) => setNewDeal(e.target.value)}
												placeholder=''
											/>
										</FormGroup>
									</ModalBody>
									<ModalFooter>
										<Button
											color='secondary'
											onClick={() => setIsAddDealOpen(false)}>
											Cancel
										</Button>
										<Button color='primary' onClick={handleDeal}>
											Add
										</Button>
									</ModalFooter>
								</Modal>
							)}

							<FormGroup label='Deal Agent' className='col-md-4'>
								<div className='input-group'>
									<Select
										name='dealAgent'
										ariaLabel='Deal Agent'
										onChange={formik.handleChange}
										value={formik.values.dealAgent}>
										{dealAgent.map((agent, index) => (
											<option key={index} value={agent}>
												{agent}
											</option>
										))}
									</Select>
									<Button
										type='button'
										color='light'
										className='input-group-text'
										onClick={() => setIsDealAgentOpen(true)}>
										Add
									</Button>
								</div>
							</FormGroup>
							{isDealAgentOpen && (
								// <Modal isOpen={isAddLeadSourceOpen} setIsOpen={setIsAddLeadSourceOpen}>
								<Modal
									isOpen={isDealAgentOpen}
									setIsOpen={setIsDealAgentOpen}
									onClose={() => setIsDealAgentOpen(false)}
									isStaticBackdrop={true}>
									<ModalHeader setIsOpen={setIsDealAgentOpen}>
										<h5 className='modal-title'>Add New Deal Agent</h5>
									</ModalHeader>
									<ModalBody>
										<FormGroup label='Choose Deal Agent'>
											<Select
												name='newDealAgent'
												value={newDealAgent}
												onChange={(
													e: React.ChangeEvent<HTMLSelectElement>,
												) => setNewDealAgent(e.target.value)}
												ariaLabel='Select Agent'>
												<option value='' disabled>
													Select an agent
												</option>
												{agentOptions.map((agent) => (
													<option key={agent} value={agent}>
														{agent}
													</option>
												))}
											</Select>
										</FormGroup>

										<FormGroup label='Deal Category'>
											<Select
												name='newDealAgentCategory'
												value={newDealAgentCategory}
												onChange={(
													e: React.ChangeEvent<HTMLSelectElement>,
												) => setNewDealAgentCategory(e.target.value)}
												ariaLabel='Select Category'>
												<option value='' disabled>
													Select a category
												</option>
												{categoryOptions.map((cat) => (
													<option key={cat} value={cat}>
														{cat}
													</option>
												))}
											</Select>
										</FormGroup>
									</ModalBody>
									<ModalFooter>
										<Button
											color='secondary'
											onClick={() => setIsDealAgentOpen(false)}>
											Cancel
										</Button>
										<Button color='primary' onClick={handleAgent}>
											Add
										</Button>
									</ModalFooter>
								</Modal>
							)}

							<FormGroup label='Products' className='col-md-6'>
								<Input
									name='products'
									placeholder='Enter Products'
									onChange={formik.handleChange}
									value={formik.values.products}
								/>
							</FormGroup>

							<FormGroup label='Deal Watcher' className='col-md-6'>
								<Select
									name='dealWatcher'
									ariaLabel='Deal Watcher'
									onChange={formik.handleChange}
									value={formik.values.dealWatcher}>
									<option value=''>Select Watcher</option>
									<option value='atharvraj singh rana'>
										atharvraj singh rana
									</option>
									<option value='watcher1'>Watcher 1</option>
									<option value='watcher2'>Watcher 2</option>
								</Select>
							</FormGroup>
						</>
					)}

					{/* Company Details Fields */}
					{mode === 'lead' && (
					<div className='col-12 mb-4'>
						<div className='flex items-center space-x-2'>
							<input
								type='checkbox'
								id='toggleCompany'
								checked={showCompanyDetails}
								onChange={() => setShowCompanyDetails(!showCompanyDetails)}
							/>
							<label htmlFor='toggleCompany' className='mb-0'>
								Add Company Details
							</label>
						</div>
					</div>
					)}
				{mode === 'lead' && showCompanyDetails && (
					<>
						<FormGroup label='Company Name' className='col-md-6'>
							<Input
								name='companyName'
								placeholder='e.g. Acme Corporation'
								onChange={formik.handleChange}
								value={formik.values.companyName}
							/>
						</FormGroup>
				
						<FormGroup label='Website' className='col-md-6'>
							<Input
								name='website'
								placeholder='e.g. https://www.example.com'
								onChange={formik.handleChange}
								value={formik.values.website}
							/>
						</FormGroup>
				
						<FormGroup label='Mobile' className='col-md-6'>
							<Input
								name='mobile'
								placeholder='e.g. 1234567890'
								onChange={formik.handleChange}
								value={formik.values.mobile}
							/>
						</FormGroup>
				
						<FormGroup label='Office Phone Number' className='col-md-6'>
							<Input
								name='officePhone'
								placeholder='Enter office number'
								onChange={formik.handleChange}
								value={formik.values.officePhone}
							/>
						</FormGroup>
				
						<FormGroup label='Country' className='col-md-6'>
							<select
								name='country'
								onChange={formik.handleChange}
								value={formik.values.country}
								className='border p-2 rounded w-full'>
								<option value=''>-- Select Country --</option>
								{countries.map((country) => (
									<option key={country.code} value={country.code}>
										{country.flag} {country.name}
									</option>
								))}
							</select>
						</FormGroup>
				
						<FormGroup label='State' className='col-md-6'>
							<Input
								name='state'
								placeholder='e.g. California, Rajasthan, Dubai'
								onChange={formik.handleChange}
								value={formik.values.state}
							/>
						</FormGroup>
				
						<FormGroup label='City' className='col-md-6'>
							<Input
								name='city'
								placeholder='e.g. New York, Jaipur, Dubai'
								onChange={formik.handleChange}
								value={formik.values.city}
							/>
						</FormGroup>
				
						<FormGroup label='Postal Code' className='col-md-6'>
							<Input
								name='postalCode'
								placeholder='e.g. 90250'
								onChange={formik.handleChange}
								value={formik.values.postalCode}
							/>
						</FormGroup>
				
						<FormGroup label='Address' className='col-md-12'>
							<textarea
								className='form-control'
								name='address'
								rows={3}
								placeholder='e.g. 132, My Street, Kingston, New York 12401'
								onChange={formik.handleChange}
								value={formik.values.address}
							/>
						</FormGroup>
					</>
				)}
			
				</form>
				
			  
			</ModalBody>
	
			<ModalFooter>
				<Button color='secondary' onClick={() => setIsOpen(false)}>
					Cancel
				</Button>
				
				<Button type='submit' color='primary' onClick={() => formik.handleSubmit()}>
					Save
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default AddLeadsForm;
