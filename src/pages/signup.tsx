import React, { useCallback, useState } from 'react';
import styles from '@/styles/login.module.css';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import validator from 'validator';
import { useContextStates } from '@/context/context';

const signup = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const data = useContextStates();
	const onFinish = async (values: any) => {
		if (loading) {
			return;
		}
		const { username, password, confirmPassword } = values;

		if (!validator.isEmail(username)) {
			return message.error('Invalid username');
		}
		if (password?.length < 3) {
			return message.error('Password must be at least 3 characters');
		}
		if (confirmPassword !== password) {
			return message.error('Passwords do not match');
		}

		setLoading(true);

		const payload = {
			email: username,
			password,
		};
		const response = await data?.blog?.signupUser(payload);
		setLoading(false);
		if (response?.[0]) {
			message.success('Account created successfully,');
			return router.push('/');
		} else {
			return message.error(response?.[1]);
		}
	};

	const navigateToLogin = useCallback(() => {
		router.push('/login');
	}, []);

	return (
		<div className={styles.parentContainer}>
			<Card className={styles.loginCard} title="SignUp" bordered={false}>
				<Form
					name="login"
					initialValues={{ remember: true }}
					onFinish={onFinish}
				>
					<Form.Item
						name="username"
						rules={[
							{
								required: true,
								message: 'Please input your Username!',
							},
						]}
					>
						<Input
							prefix={<UserOutlined />}
							placeholder="Username"
						/>
					</Form.Item>

					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: 'Please input your Password!',
							},
						]}
					>
						<Input
							prefix={<LockOutlined />}
							type="password"
							placeholder="Password"
						/>
					</Form.Item>
					<Form.Item
						name="confirmPassword"
						rules={[
							{
								required: true,
								message: 'Please input your Password!',
							},
						]}
					>
						<Input
							prefix={<LockOutlined />}
							type="password"
							placeholder="Confirm Password"
						/>
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							block
							loading={loading}
						>
							Sign Up
						</Button>
					</Form.Item>
					<Button type="link" onClick={navigateToLogin}>
						Login
					</Button>
				</Form>
			</Card>
		</div>
	);
};

export default signup;
