import React, { createContext, FC, ReactNode, useEffect, useMemo, useState } from 'react';
import USERS, { getUserDataWithUsername } from '../common/data/usernishadummydata';

// Define or import the IUserProps interface
export interface IUserProps {
	// Add the properties that represent a user, for example:
	id: string;
	username: string;
	email?: string;
	// Add other fields as needed
}

export interface IAuthContextProps {
	user: string;
	setUser?(...args: unknown[]): unknown;
	userData: Partial<IUserProps>;
}
const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

interface IAuthContextProviderProps {
	children: ReactNode;
}
export const AuthContextProvider: FC<IAuthContextProviderProps> = ({ children }) => {
	const [user, setUser] = useState<string>(localStorage.getItem('facit_authUsername') || '');
	const [userData, setUserData] = useState<Partial<IUserProps>>({});

	useEffect(() => {
		localStorage.setItem('facit_authUsername', user);
	}, [user]);

	useEffect(() => {
		if (user) {
			const data = getUserDataWithUsername(user);
			setUserData(data || {});
		} else {
			setUserData({});
		}
	}, [user]);

	const value = useMemo(
		() => ({
			user,
			setUser,
			userData,
		}),
		[user, userData],
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
