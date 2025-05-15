/* eslint-disable prettier/prettier */
import React from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import CommonLayoutRightSubheader from '../../_layout/_subheaders/CommonLayoutRightSubheader';

const layoutItems = [
	{
		label: 'Employee',
		path: '#',
		icon: 'LayoutRightPanel2',
	},
	{
		label: 'HR',
		path: '/page-layouts/header-and-subheader',
		icon: 'LayoutTopPanel5',
	},
	{
		label: 'Manager',
		path: '#',
		icon: 'LayoutBottom',
	},
];

const OnlySubheader = () => {
	return (
		<PageWrapper>
			<SubHeader>
				<SubHeaderLeft>
					{/* Left dropdown */}
					<CommonLayoutRightSubheader
						buttonLabel="Designation"
						dropdownItems={layoutItems}
					/>
				</SubHeaderLeft>

				{/* Right dropdown */}
				<CommonLayoutRightSubheader
					buttonLabel="kjdshjkcfhndksnj"
					dropdownItems={[
						{
							label: 'Only Subheader',
							path: '#',
							icon: 'LayoutRightPanel2',
						},
						{
							label: 'Header & Subheader',
							path: '#',
							icon: 'LayoutTopPanel2',
						},
						{
							label: 'Header & Subheader',
							path: '#',
							icon: 'LayoutTopPanel2',
						},
						{
							label: 'Header & Subheader',
							path: '#',
							icon: 'LayoutTopPanel2',
						},
						{
							label: 'Header & Subheader',
							path: '#',
							icon: 'LayoutTopPanel2',
						},
						{
							label: 'Header & Subheader',
							path: '#',
							icon: 'LayoutTopPanel2',
						},
					]}
				/>
			</SubHeader>
		</PageWrapper>
	);
};

export default OnlySubheader;
