/* eslint-disable no-undef */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import Input from '../../../components/bootstrap/forms/Input';
import Popovers from '../../../components/bootstrap/Popovers';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import { getUserDataWithId } from '../../../common/data/userDummyData';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Avatar from '../../../components/Avatar';
import Icon from '../../../components/icon/Icon';
import { demoPagesMenu } from '../../../menu';
import Badge from '../../../components/bootstrap/Badge';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Chart, { IChartOptions } from '../../../components/extras/Chart';
import dummyEventsData from '../../../common/data/dummyEventsData';
import { priceFormat } from '../../../helpers/helpers';
import EVENT_STATUS from '../../../common/data/enumEventStatus';
import Alert from '../../../components/bootstrap/Alert';
import CommonAvatarTeam from '../../../common/other/CommonAvatarTeam';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import COLORS from '../../../common/data/enumColors';
import useDarkMode from '../../../hooks/useDarkMode';
import useTourStep from '../../../hooks/useTourStep';
import CommonUpcomingEvents from '../../_common/CommonUpcomingEvents';
import PAYMENTS from '../../../common/data/enumPaymentMethod';
import InputGroup, { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';


const Task = () => {
	useTourStep(19);
	const { darkModeStatus } = useDarkMode();

	const { id } = useParams();
	

	const [dayHours] = useState<IChartOptions>({
		series: [
			{
				data: [8, 12, 15, 20, 15, 22, 9],
			},
		],
		options: {
			colors: [process.env.REACT_APP_SUCCESS_COLOR],
			chart: {
				type: 'radar',
				width: 200,
				height: 200,
				sparkline: {
					enabled: true,
				},
			},
			xaxis: {
				categories: [
					'Monday',
					'Tuesday',
					'Wednesday',
					'Thursday',
					'Friday',
					'Saturday',
					'Sunday',
				],
				// convertedCatToNumeric: false,
			},
			tooltip: {
				theme: 'dark',
				fixed: {
					enabled: false,
				},
				x: {
					show: true,
				},
				y: {
					title: {
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						formatter(seriesName) {
							return 'Hours';
						},
					},
				},
			},
			stroke: {
				curve: 'smooth',
				width: 2,
			},
			plotOptions: {
				radar: {
					polygons: {
						strokeColors: `${COLORS.SUCCESS.code}50`,
						strokeWidth: '1',
						connectorColors: `${COLORS.SUCCESS.code}50`,
					},
				},
			},
		},
	});
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
	


	return (
		<PageWrapper>
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
											
										</Button>
									</DropdownToggle>
									<DropdownMenu >
										<div className='container py-2'>
											<div className='row g-3'>
						
								
											</div>
										</div>
									</DropdownMenu>
								</Dropdown>
								<SubheaderSeparator />
								
							</SubHeaderRight>
						</SubHeader>
			<Page>
				
				<div className='row'>
					
					<div className='col-lg-12'>
					<Page container='fluid'>
				       <CommonUpcomingEvents isFluid />
			        </Page>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Task;