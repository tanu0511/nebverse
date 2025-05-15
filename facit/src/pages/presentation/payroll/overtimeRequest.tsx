import React, { useState } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPagesMenu } from '../../../menu';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import { getFirstLetter, priceFormat } from '../../../helpers/helpers';
import data from '../../../common/data/dummyCustomerData';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import PAYMENTS from '../../../common/data/enumPaymentMethod';
import useSortableData from '../../../hooks/useSortableData';
import InputGroup, { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';
import Popovers from '../../../components/bootstrap/Popovers';
import CustomerEditModal from '../../presentation/payroll/customerEditModal';
import { getColorNameWithIndex } from '../../../common/data/enumColors';
import useDarkMode from '../../../hooks/useDarkMode';


interface Award {
	id: number;
	name: string;
	parentDepartment?: string;
	date?: string;
	summary?: string;
  }

const overtimeRequest = () => {

	const { darkModeStatus } = useDarkMode();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);

	const formik = useFormik({
		initialValues: {
			searchInput: '',
			payment: Object.keys(PAYMENTS).map((i) => PAYMENTS[i].name),
			minPrice: '',
			maxPrice: '',
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
		},
	});

	const filteredData = data.filter(
		(f) =>
			// Name
			f.name.toLowerCase().includes(formik.values.searchInput.toLowerCase()) &&
			// Price
			(formik.values.minPrice === '' || f.balance > Number(formik.values.minPrice)) &&
			(formik.values.maxPrice === '' || f.balance < Number(formik.values.maxPrice)) &&
			// Payment Type
			formik.values.payment.includes(f.payout),
	);

	 const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toLowerCase();
		const filtered = awards.filter((award) =>
		  award.name.toLowerCase().includes(value) || // Search by name
		  (award.parentDepartment && award.parentDepartment.toLowerCase().includes(value)) // Search by category
		);
		setFilteredAwards(filtered); // Update filteredAwards dynamically
	  };
	  const handleDelete = (id: number) => {
		setAwards((prev) => prev.filter((award) => award.id !== id));
		setFilteredAwards((prev) => prev.filter((award) => award.id !== id)); // Update filteredAwards
	  };

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);
	const [selectedAward, setSelectedAward] = useState<Award | undefined>(undefined);
	const [awards, setAwards] = useState<Award[]>([]);
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [filteredAwards, setFilteredAwards] = useState<Award[]>(awards); // New state for filtered awards
	  
	return (
		<PageWrapper title={demoPagesMenu.crm.subMenu.customersList.text}>
			<SubHeader>
				<SubHeaderLeft>
					<label
						className='border-0 bg-transparent cursor-pointer me-0'
						htmlFor='searchInput'>
						<Icon icon='Search' size='2x' color='primary' />
					</label>
					<Input
						id='searchInput'
						type='search'
						className='border-0 shadow-none bg-transparent'
						placeholder='Search customer...'
						onChange={formik.handleChange}
						value={formik.values.searchInput}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Dropdown>
						<DropdownToggle hasIcon={false}>
							<Button
								icon='FilterAlt'
								color='dark'
								isLight
								className='btn-only-icon position-relative'
								aria-label='Filter'>
								{data.length !== filteredData.length && (
									<Popovers desc='Filtering applied' trigger='hover'>
										<span className='position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2'>
											<span className='visually-hidden'>
												there is filtering
											</span>
										</span>
									</Popovers>
								)}
							</Button>
						</DropdownToggle>
						<DropdownMenu isAlignmentEnd size='lg'>
							<div className='container py-2'>
								<div className='row g-3'>
									<FormGroup label='Balance' className='col-12'>
										<InputGroup>
											<Input
												id='minPrice'
												ariaLabel='Minimum price'
												placeholder='Min.'
												onChange={formik.handleChange}
												value={formik.values.minPrice}
											/>
											<InputGroupText>to</InputGroupText>
											<Input
												id='maxPrice'
												ariaLabel='Maximum price'
												placeholder='Max.'
												onChange={formik.handleChange}
												value={formik.values.maxPrice}
											/>
										</InputGroup>
									</FormGroup>
									<FormGroup label='Payments' className='col-12'>
										<ChecksGroup>
											{Object.keys(PAYMENTS).map((payment) => (
												<Checks
													key={PAYMENTS[payment].name}
													id={PAYMENTS[payment].name}
													label={PAYMENTS[payment].name}
													name='payment'
													value={PAYMENTS[payment].name}
													onChange={formik.handleChange}
													checked={formik.values.payment.includes(
														PAYMENTS[payment].name,
													)}
												/>
											))}
										</ChecksGroup>
									</FormGroup>
								</div>
							</div>
						</DropdownMenu>
					</Dropdown>
					
					
				</SubHeaderRight>
				
			</SubHeader>
			<Page>
			<div className="row g-3 w-100 mt-3">
        <div className="col-md-6">
            <div className="card p-3">
                <h6 className="fw-bold">Approved Status</h6>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="text-center">
                        <h5 className="text-primary mb-0">0</h5>
                        <small>Requested</small>
                    </div>
                    <div className="text-center">
                        <h5 className="text-success mb-0">0</h5>
                        <small>Approved</small>
                    </div>
                    <div className="text-center">
                        <h5 className="text-danger mb-0">0</h5>
                        <small>Rejected</small>
                    </div>
                    <div className="text-center">
                        <h5 className="text-warning mb-0">0</h5>
                        <small>Pending</small>
                    </div>
                    <div className="text-center">
                        <i className="bi bi-hand-thumbs-up fs-4 text-muted"></i>
                    </div>
                </div>
            </div>
        </div>
		  <div className="col-md-6">
            <div className="card p-3">
                <h6 className="fw-bold">Overtime Hours Summary</h6>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="text-center">
                        <h5 className="mb-0">0 hrs</h5>
                        <small>Overtime Hours</small>
                    </div>
                    <div className="text-center">
                        <h5 className="mb-0">₹0.00</h5>
                        <small>Compensation</small>
                    </div>
                    <div className="text-center">
                        <i className="bi bi-hourglass fs-4 text-muted"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
				<div className='d-flex justify-content-between align-items-center mb-3'>
					<Button
						icon='Add'
						color='primary'
						onClick={() => setEditModalStatus(true)}
						className='btn-icon-only'>
						Add Request
					</Button>
				</div>
				<div className='row h-100'>
          <div className='col-12'>
            <Card stretch>
              <CardBody isScrollable className='table-responsive'>
                <table className='table table-modern table-hover'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Net Salary</th>
                      <th>CTC</th>
                      <th>Duration</th>
                      <th>Paid On</th>
                      <th>Status</th>
                      <th>Action</th>

                    </tr>
                  </thead>
                  <tbody>

					</tbody>
                    
                </table>
              </CardBody>
              <PaginationButtons
                data={filteredAwards} // Use filteredAwards for pagination
                label='Payroll'
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>
          </div>
        </div>
			</Page>
			<CustomerEditModal setIsOpen={setEditModalStatus} isOpen={editModalStatus} id='0' />
		</PageWrapper>
	);
};

export default overtimeRequest;
