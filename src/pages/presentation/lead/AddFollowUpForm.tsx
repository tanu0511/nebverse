import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../components/bootstrap/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';


interface AddFollowUpFormProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (data: FollowUpData) => void;
	leadName: string;
    lead: string;
	
}

interface FollowUpData {
	followUpNext: string;
	startTime: string;
	sendReminder: boolean;
	remark: string;
}

// Validation Schema
const validationSchema = Yup.object().shape({
	followUpNext: Yup.string().required('Follow Up Next date is required'),
	startTime: Yup.string().required('Start Time is required'),
});

const AddFollowUpForm: React.FC<AddFollowUpFormProps> = ({ isOpen, onClose, onSave, leadName  }) => {
	const initialValues: FollowUpData = {
		followUpNext: '',
		startTime: '',
		sendReminder: false,
		remark: '',
	};

	const handleSubmit = (values: FollowUpData) => {
		onSave(values);
		onClose();
	};

	return (
		<Modal isOpen={isOpen} setIsOpen={onClose} size='lg'>
			<ModalHeader setIsOpen={onClose}>
				<h5 className='modal-title'>Add Follow Up</h5>
			</ModalHeader>

			<ModalBody>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}>
					{({ values, handleChange, handleBlur, setFieldValue }) => (
						<Form className='row g-4'>
							{/* Lead Name */}
							<FormGroup label='Lead Name' className='col-md-6'>
								<div>{leadName}</div>
							</FormGroup>

							{/* Follow Up Next Date */}
							<FormGroup label='Follow Up Next *' className='col-md-6'>
								<Input
									type='date'
									name='followUpNext'
									value={values.followUpNext}
									onChange={handleChange}
									onBlur={handleBlur}
									required
								/>
								<ErrorMessage
									name='followUpNext'
									component='div'
									className='text-danger small mt-1'
								/>
							</FormGroup>

							{/* Start Time */}
							<FormGroup label='Start Time *' className='col-md-6'>
								<Input
									type='time'
									name='startTime'
									value={values.startTime}
									onChange={handleChange}
									onBlur={handleBlur}
									required
								/>
								<ErrorMessage
									name='startTime'
									component='div'
									className='text-danger small mt-1'
								/>
							</FormGroup>

							{/* Send Reminder */}
							<FormGroup label='Send Reminder' className='col-md-6'>
								<div className='form-check'>
									<input
										type='checkbox'
										name='sendReminder'
										checked={values.sendReminder}
										onChange={(e) =>
											setFieldValue('sendReminder', e.target.checked)
										}
										onBlur={handleBlur}
										className='form-check-input'
									/>

									{/* <label className='form-check-label' >
										Yes, send a reminder
									</label> */}
								</div>
							</FormGroup>

							{/* Remark */}
							<FormGroup label='Remark' className='col-md-12'>
								<textarea
									name='remark'
									value={values.remark}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='Enter your remark...'
									rows={3}
									className='form-control'
								/>
							</FormGroup>

							{/* Footer Buttons */}
							<div className='col-12 d-flex justify-content-end gap-2'>
								<Button type='button' color='secondary' onClick={onClose}>
									Close
								</Button>
								<Button type='submit' color ='primary'>Save</Button>
							</div>
						</Form>
					)}
				</Formik>
			</ModalBody>
		</Modal>
	);
};

export default AddFollowUpForm;
