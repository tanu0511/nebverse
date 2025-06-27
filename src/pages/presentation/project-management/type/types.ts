/* eslint-disable @typescript-eslint/no-unused-vars */
import { TColor } from '../../../../type/color-type';
import { TIcons } from '../../../../type/icons-type';

export type TColumnData = {
    id: string;
    title: string;
    color: TColor | string; // Allow hex code or TColor
    icon: string;
};
export type TColumnsData = {
	[key: string]: TColumnData;
};
export type TCard = {
    deals: any;
    leadContacts: any;
	id: string;
	title: string;
	subtitle: string;
	description: string;
	label: string;
	img?: string;
	user: {
		username: string;
		src: string;
		srcSet: string;
		color: TColor | 'link' | 'brand' | 'brand-two' | 'storybook';
		name: string;
		surname: string;
	};
	tasks: { status: boolean; id: string | number; text: string }[];
	tags: {
		id: string;
		title: string;
		color?: TColor;
	}[];
	attachments?: { id: string | number; file: string; path: string }[];
};
export type TCards = {
	[key: string]: TCard[];
};
