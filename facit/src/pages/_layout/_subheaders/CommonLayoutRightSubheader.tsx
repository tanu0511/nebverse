import React from 'react';
import { NavLink } from 'react-router-dom';
import Button, { ButtonGroup } from '../../../components/bootstrap/Button';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Icon from '../../../components/icon/Icon';
import { SubHeaderRight } from '../../../layout/SubHeader/SubHeader';

type DropdownItemType = {
	label: string;
	path: string;
	icon?: string;
};

type Props = {
	buttonLabel?: string;
	dropdownItems?: DropdownItemType[];
};

const CommonLayoutRightSubheader: React.FC<Props> = ({
	buttonLabel = 'Options',
	dropdownItems = [],
}) => {
	return (
		<SubHeaderRight>
			<ButtonGroup>
				<Dropdown>
					<DropdownToggle>
						<Button color='primary' isLight>
							{buttonLabel}
						</Button>
					</DropdownToggle>
					<DropdownMenu isAlignmentEnd>
						{dropdownItems.map((item, index) => (
							<DropdownItem key={index}>
								<NavLink to={item.path}>
									{item.icon && <Icon icon={item.icon} />}
									{item.label}
								</NavLink>
							</DropdownItem>
						))}
					</DropdownMenu>
				</Dropdown>
			</ButtonGroup>
		</SubHeaderRight>
	);
};

export default CommonLayoutRightSubheader;
