/* eslint-disable no-empty-pattern */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import Input from '../../../components/bootstrap/forms/Input';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Dropdown, {
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import { IChartOptions } from '../../../components/extras/Chart';
import COLORS from '../../../common/data/enumColors';
import useDarkMode from '../../../hooks/useDarkMode';
import useTourStep from '../../../hooks/useTourStep';
import CommonUpcomingEvents from '../../_common/CommonUpcomingEvents';
import PAYMENTS from '../../../common/data/enumPaymentMethod';


const TaskPage = () => {
	useTourStep(19);
	useDarkMode();

	useParams();
	

	const [] = useState<IChartOptions>({
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
		 
		onSubmit: () => {
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
											aria-label='Filter' />
									</DropdownToggle>
									<DropdownMenu >
										<div className='container py-2'>
											<div className='row g-3' />
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

export default TaskPage;