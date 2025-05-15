import React, { FC, ReactNode, useContext } from 'react';
import classNames from 'classnames';
import Content from '../Content/Content';
import WrapperOverlay from './WrapperOverlay';
import FooterRoutes from '../Footer/FooterRoutes';
import ThemeContext from '../../contexts/themeContext';
import DashboardHeader from '../../pages/_layout/_headers/DashboardHeader';

interface IWrapperContainerProps {
	children: ReactNode;
	className?: string;
}
export const WrapperContainer: FC<IWrapperContainerProps> = ({ children, className, ...props }) => {
	const { rightPanel } = useContext(ThemeContext);
	return (
		<div
			className={classNames(
				'wrapper',
				{ 'wrapper-right-panel-active': rightPanel },
				className,
			)}
			{...props}>
			{children}
		</div>
	);
};

const Wrapper = () => {
	return (
		<>
			<WrapperContainer>
				<DashboardHeader />
				<Content />
				<FooterRoutes />
			</WrapperContainer>
			<WrapperOverlay />
		</>
	);
};

export default Wrapper;
