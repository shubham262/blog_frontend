import React, { useReducer } from 'react';
import reducer from './reducer';
import api from '@/service/apiHandler';
import { message } from 'antd';
import { Actions } from './action';
import { GetServerSideProps } from 'next';
const intialState = {
	allpostsData: null,
	myPostsData: null,
};
const BlogState = () => {
	const [state, dispatch] = useReducer(reducer, intialState);

	const authenticateUser = async (payload: any) => {
		try {
			const response = await api.post('/login', payload);
			const { data } = response?.data;
			if (data?.status == 200) {
				localStorage.setItem('token', data?.token);
				return [true];
			} else {
				return [false, data?.message];
			}
		} catch (error: any) {
			return [false, error?.message || 'something went wrong'];
		}
	};

	const signupUser = async (payload: any) => {
		try {
			const response = await api.post('/signup', payload);
			const { data } = response?.data;
			if (data?.status == 200) {
				localStorage.setItem('token', data?.token);
				return [true];
			} else {
				return [false, data?.message];
			}
		} catch (error: any) {
			return [false, error?.message || 'something went wrong'];
		}
	};

	const getPostData = async (payload = null) => {
		try {
			const url = `/posts` + (payload ? payload : '');
			const response = await api.get(url);
			const { data } = response?.data;
			if (data?.status == 200) {
				const variableSelection = payload
					? 'myPostsData'
					: 'allpostsData';

				dispatch({
					type: Actions.GET_ALL_POSTS_DATA_SUCCESS,
					payload: { value: data?.data, variableSelection },
				});
			} else {
				message.error(data?.message || 'something went wrong');
			}
		} catch (error: any) {
			message.error(error?.message || 'something went wrong');
		}
	};

	const addNewPost = async (payload: any) => {
		try {
			const response = await api.post('/post', payload);
			const { data } = response?.data;
			if (data?.status == 200) {
				return [true];
			} else {
				return [false, data?.message];
			}
		} catch (error: any) {
			return [false, error?.message || 'something went wrong'];
		}
	};
	return {
		...state,
		authenticateUser,
		signupUser,
		getPostData,
		addNewPost,
	};
};

export default BlogState;
