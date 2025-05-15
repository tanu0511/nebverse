
import USERS, { IUserProps } from './usernishadummydata';

export interface IMessages {
	id: number;
	messages: { id: number; message: string }[];
	user: IUserProps;
	isReply?: boolean;
}

const ATHARVA_VS_RANJANA: IMessages[] = [
	{
		id: 1,
		messages: [
			{
				id: 1,
				message: 'Has everyone screened the new edit? Any thoughts?',
			},
		],
		user: USERS.ATHARVA,
	},
	{
		id: 2,
		messages: [
			{
				id: 2,
				message: "Ah, can't wait to hear your notes!",
			},
		],
		user: USERS.RANJANA,
		isReply: true,
	},
];

const RANJANA_VS_TANUSHREE: IMessages[] = [
	{
		id: 1,
		messages: [
			{
				id: 1,
				message: 'Fusce maximus vulputate lorem, non eleifend ex egestas vel',
			},
			{
				id: 2,
				message:
					'Morbi posuere, sapien a convallis auctor, lorem lacus aliquet metus, in laoreet orci nisl quis metus',
			},
		],
		user: USERS.RANJANA,
		isReply: true,
	},
	{
		id: 2,
		messages: [
			{
				id: 3,
				message: 'Praesent pulvinar.',
			},
			{
				id: 4,
				message:
					'Leo sit amet dapibus sodales, metus ex tristique nibh, id elementum mauris dolor vitae enim',
			},
		],
		user: USERS.TANUSHREE,
	},
	{
		id: 3,
		messages: [
			{
				id: 5,
				message: 'Ut auctor odio id ante cursus luctus',
			},
		],
		user: USERS.RANJANA,
		isReply: true,
	},
	{
		id: 4,
		messages: [
			{
				id: 7,
				message: 'Curabitur ornare mattis urna euismod molestie.',
			},
		],
		user: USERS.TANUSHREE,
	},
];

const TANUSHREE_VS_NISHA: IMessages[] = [
	{
		id: 1,
		messages: [
			{
				id: 1,
				message: 'Cras eu lobortis ex, id aliquam sem.',
			},
		],
		user: USERS.TANUSHREE,
	},
	{
		id: 2,
		messages: [
			{
				id: 2,
				message:
					'Maecenas pellentesque turpis vel ex sollicitudin, eget dapibus mi interdum.',
			},
		],
		user: USERS.NISHA,
		isReply: true,
	},
	{
		id: 3,
		messages: [
			{
				id: 3,
				message: 'Mauris id ante commodo eros viverra efficitur vel et elit.',
			},
		],
		user: USERS.TANUSHREE,
	},
	{
		id: 4,
		messages: [
			{
				id: 4,
				message: 'Nullam lobortis cursus purus ornare dignissim.',
			},
		],
		user: USERS.NISHA,
		isReply: true,
	},
	{
		id: 5,
		messages: [
			{
				id: 5,
				message: 'Nunc odio nulla, mattis ac nisl sed, eleifend cursus neque.',
			},
			{
				id: 6,
				message:
					'Nulla sollicitudin consectetur arcu, sit amet rutrum felis tincidunt non.',
			},
		],
		user: USERS.TANUSHREE,
	},
];

const TANUSHREE_VS_AYUSHI: IMessages[] = [
	{
		id: 1,
		messages: [
			{
				id: 1,
				message: 'Nullam faucibus mauris sed fermentum posuere.',
			},
		],
		user: USERS.AYUSHI,
	},
	{
		id: 2,
		messages: [
			{
				id: 2,
				message: 'Quisque efficitur semper sem, ac tempor ex.',
			},
		],
		user: USERS.TANUSHREE,
		isReply: true,
	},
	{
		id: 3,
		messages: [
			{
				id: 3,
				message: 'Aenean erat tellus, pretium sed venenatis ac, pulvinar quis odio.',
			},
			{
				id: 4,
				message: 'Quisque cursus feugiat orci, id aliquet nulla congue et.',
			},
			{
				id: 5,
				message:
					'Nulla facilisi. Nam ac blandit ex, nec dignissim leo. Etiam mauris orci, malesuada ac vehicula in, tempor ac eros. ',
			},
		],
		user: USERS.TANUSHREE,
	},
	{
		id: 4,
		messages: [
			{
				id: 6,
				message:
					'Donec luctus felis justo, eget tempus ipsum fermentum ac. Quisque egestas tincidunt eros id convallis. Sed tincidunt risus odio, a sodales ligula rutrum vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus volutpat magna commodo erat maximus, eget bibendum libero aliquet. Suspendisse nec condimentum sem. Morbi rutrum dictum felis, vitae maximus elit hendrerit viverra.',
			},
		],
		user: USERS.AYUSHI,
		isReply: true,
	},
	{
		id: 5,
		messages: [
			{
				id: 7,
				message: 'Aliquam vulputate dolor quis ipsum mollis rutrum.',
			},
			{
				id: 8,
				message: 'Vivamus fermentum dui sit amet orci interdum pulvinar.',
			},
		],
		user: USERS.TANUSHREE,
	},
];

const AYUSHI_VS_ATHARVA: IMessages[] = [
	{
		id: 1,
		messages: [
			{
				id: 1,
				message:
					'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
			},
		],
		user: USERS.AYUSHI,
	},
	{
		id: 2,
		messages: [
			{
				id: 2,
				message:
					'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer lorem erat, pharetra eget tempor sit amet, ullamcorper sed urna. Pellentesque lacinia euismod tellus, eu eleifend felis. Nunc suscipit, nisl ac fringilla vestibulum, lectus erat elementum odio, quis tristique urna est a nunc.',
			},
		],
		user: USERS.ATHARVA,
		isReply: true,
	},
	{
		id: 3,
		messages: [
			{
				id: 3,
				message:
					'Cras at libero et nunc aliquam fermentum vel sed mauris. Cras id nisl vitae purus tincidunt suscipit. Quisque sagittis, enim quis volutpat luctus, eros leo commodo arcu, sit amet faucibus massa nunc at nisl. Praesent fringilla malesuada porttitor. Proin vehicula velit sem, ut consequat eros gravida quis.',
			},
			{
				id: 4,
				message: 'Pellentesque a mauris magna.',
			},
			{
				id: 5,
				message: 'In lectus dolor, hendrerit dictum viverra vel, consectetur eu arcu.',
			},
		],
		user: USERS.AYUSHI,
	},
	{
		id: 4,
		messages: [
			{
				id: 6,
				message: 'Donec gravida.',
			},
		],
		user: USERS.ATHARVA,
		isReply: true,
	},
	{
		id: 5,
		messages: [
			{
				id: 7,
				message: 'Velit nec.',
			},
			{
				id: 8,
				message: 'Eleifend sagittis!',
			},
		],
		user: USERS.AYUSHI,
	},
];

const AYUSHI_VS_RANJANA: IMessages[] = [
	{
		id: 1,
		messages: [
			{
				id: 1,
				message: 'Fusce sed efficitur ligula, vel iaculis ipsum.',
			},
		],
		user: USERS.AYUSHI,
	},
	{
		id: 2,
		messages: [
			{
				id: 2,
				message:
					'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
			},
		],
		user: USERS.RANJANA,
		isReply: true,
	},
	{
		id: 3,
		messages: [
			{
				id: 3,
				message: 'Aenean nec magna non eros tempor ornare ac a dolor.',
			},
			{
				id: 4,
				message: 'Integer scelerisque a libero ac convallis.',
			},
			{
				id: 5,
				message: 'Morbi hendrerit nibh eget semper malesuada.',
			},
		],
		user: USERS.AYUSHI,
	},
	{
		id: 4,
		messages: [
			{
				id: 6,
				message: 'Nullam viverra mauris in viverra semper.',
			},
			{
				id: 7,
				message: 'Donec sodales justo orci, at iaculis lacus maximus nec.',
			},
			{
				id: 8,
				message: 'Pellentesque sollicitudin urna at tortor egestas facilisis.',
			},
		],
		user: USERS.RANJANA,
		isReply: true,
	},
	{
		id: 5,
		messages: [
			{
				id: 9,
				message: 'Pellentesque a massa at magna laoreet luctus sed dignissim erat.',
			},
		],
		user: USERS.AYUSHI,
	},
];

const CHATS: { [key: string]: IMessages[] } = {
	AYUSHI_VS_ATHARVA,
	RANJANA_VS_TANUSHREE,
	TANUSHREE_VS_NISHA,
	TANUSHREE_VS_AYUSHI,
	ATHARVA_VS_RANJANA,
	AYUSHI_VS_RANJANA
};

export default CHATS;