import AuthStorage from 'src/utils/auth-storage';

import { SINGLE_API/* , REQUEST_ERROR */ } from './types';

export const actionUpdateProfile = async (payload = {}, next = f => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: '/admin/' + AuthStorage.userId,
			payload,
			successType: 'EDIT_PROFILE_SUCCESS',
			options: {
				method: 'PATCH',
			},
			next,
		},
	};
};

export const actionLogin = async (payload = {}, next = f => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: '/admin/login',
			options: { method: 'POST' },
			payload,
			successType: 'LOGIN_SUCCESS',
			next: async (err, response = {}) => {
				// console.log(666);
				// console.log(response);
				// console.log(err);
				if (!err) {
					AuthStorage.value = {
						token: response.id,
						userId: response.userId,
						role: response.user.role,
					};
				}

				// if (!err) {
				// 	AuthStorage.value = {
				// 		token: response.accessToken.token,
				// 		userId: response.user,
				// 		role: response.user.role,
				// 	};
				// }

				next(err, response);
			},
		},
	};
};

export const actionLogout = async (next = f => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: '/users/logout',
			options: { method: 'POST' },
			successType: 'LOGOUT_SUCCESS',
			next: async () => {
				AuthStorage.destroy();
				next();
			},
		},
	};
};

export const actionGetUserAuth = async (next = f => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: '/users/' + AuthStorage.userId,
			successType: 'GET_USER_AUTH_SUCCESS',
			next,
		},
	};
};

export const actionForgotPassword = async (payload = {}, next = f => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: '/users/reset',
			payload,
			options: { method: 'POST' },
			next,
		},
	};
};

export const actionResetPassword = async (payload = {}, next = f => f) => {
	const { token, ...params } = payload;

	return {
		type: SINGLE_API,
		payload: {
			url: '/users/reset-password?access_token=' + token,
			payload: params,
			options: { method: 'POST' },
			next,
		},
	};
};

export const actionChangePassword = async (payload = {}, next = f => f) => {
	const { oldPassword, newPassword } = payload;

	return {
		type: SINGLE_API,
		payload: {
			url: '/users/change-password',
			payload: { oldPassword, newPassword },
			options: { method: 'POST' },
			successType: 'CHANGE_PASSWORD_SUCCESS',
			next,
		},
	};
};
