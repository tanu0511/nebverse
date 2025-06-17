import UserImage from '../../assets/img/wanna/wanna1.png';
import UserImageWebp from '../../assets/img/wanna/wanna1.webp';
import UserImage2 from '../../assets/img/wanna/wanna2.png';
import UserImage2Webp from '../../assets/img/wanna/wanna2.webp';
import UserImage3 from '../../assets/img/wanna/wanna3.png';
import UserImage3Webp from '../../assets/img/wanna/wanna3.webp';
import UserImage4 from '../../assets/img/wanna/wanna4.png';
import UserImage4Webp from '../../assets/img/wanna/wanna4.webp';
import UserImage5 from '../../assets/img/wanna/wanna5.png';
import UserImage5Webp from '../../assets/img/wanna/wanna5.webp';
import UserImage6 from '../../assets/img/wanna/wanna6.png';
import UserImage6Webp from '../../assets/img/wanna/wanna6.webp';
import UserImage7 from '../../assets/img/wanna/wanna7.png';
import UserImage7Webp from '../../assets/img/wanna/wanna7.webp';

import User7Landing from '../../assets/img/wanna/landing1.png';
import { TColor } from '../../type/color-type';

export interface IUserProps {
    id: string;
    username: string;
    name: string;
    surname: string;
    position: string;
    email?: string;
    src: string;
    srcSet: string;
    isOnline: boolean;
    isReply?: boolean;
    color: TColor;
    fullImage?: string;
    services?:[];
    password: string;
    category: 'Design',
    department: "all",
}

const arjun: IUserProps = {
    id: '1',
    username: 'Arjun',
    name: 'Arjun',
    surname: 'Singh',
    position: 'CEO, Founder',
    email: 'john@omtanke.studio',
    src: UserImage,
    srcSet: UserImageWebp,
    isOnline: true,
    isReply: true,
    color: 'primary',
    services: [],
    password: '@ABC123',
    category: 'Design',
    department: "all",
};

const akhilesh: IUserProps = {
    id: '2',
    username: 'Akhilesh',
    name: 'Akhilesh',
    surname: 'Singh',
    position: 'Staff',
    email: 'grace@omtanke.studio',
    src: UserImage2,
    srcSet: UserImage2Webp,
    isOnline: true,
    color: 'warning',
    services: [],
    password: '@ABC123',
    category: 'Design',
    department: "all",
};

const ayushi: IUserProps = {
    id: '3',
    username: 'Ayushi',
    name: 'Ayushi',
    surname: 'Singh',
    position: 'Staff',
    email: 'jane@omtanke.studio',
    src: UserImage3,
    srcSet: UserImage3Webp,
    isOnline: true,
    color: 'secondary',
    services: [ ],
    password: '@ABC123',
    category: 'Design',
    department: "all",
};

const ranjana: IUserProps = {
    id: '4',
    username: 'Ranjana',
    name: 'Ranjana',
    surname: 'Singh',
    position: 'Worker',
    email: 'ryan@omtanke.studio',
    src: UserImage4,
    srcSet: UserImage4Webp,
    isOnline: false,
    color: 'info',
    services: [],
    password: '@ABC123',
    category: 'Design',
    department: "all",
};

const nisha: IUserProps = {
    id: '5',
    username: 'nisha',
    name: 'Nisha',
    surname: 'Singh',
    position: 'Admin',
    email: 'ella@omtanke.studio',
    src: UserImage5,
    srcSet: UserImage5Webp,
    isOnline: false,
    color: 'success',
    services: [],
    password: '@ABC123',
    category: 'Design',
    department: "all",
};

const tanushree: IUserProps = {
    id: '6',
    username: 'Tanushree',
    name: 'Tanushree',
    surname: 'Singh',
    position: 'Manager',
    email: 'chloe@omtanke.studio',
    src: UserImage6,
    srcSet: UserImage6Webp,
    isOnline: true,
    color: 'warning',
    services: [],
    password: '@ABC123',
    category: 'Design',
    department: "all",
};

const manthan: IUserProps = {
    id: '7',
    username: 'Manthan',
    name: 'Manthan',
    surname: 'Singh',
    position: 'Worker',
    email: 'sam@omtanke.studio',
    src: UserImage7,
    srcSet: UserImage7Webp,
    isOnline: false,
    color: 'danger',
    fullImage: User7Landing,
    password: '@ABC123',
    category: 'Design',
    department: "all",
};

const USERS: { [key: string]: IUserProps } = {
    ARJUN: arjun,
    AKHILESH: akhilesh,
    AYUSHI: ayushi,
    RANJANA: ranjana,
    NISHA: nisha,
    TANUSHREE: tanushree,
    MANTHAN: manthan
};

export function getUserDataWithUsername(username: string): IUserProps | undefined {
    const key = Object.keys(USERS).find((f) => USERS[f].username === username);
    return key ? USERS[key] : undefined;
}



export function getUserDataWithId(id?: string): IUserProps {
    // @ts-ignore
    return USERS[Object.keys(USERS).filter((f) => USERS[f].id.toString() === id.toString())];
}

export default USERS;