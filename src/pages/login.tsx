import React, { useCallback, useState } from 'react';
import styles from '@/styles/login.module.css';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useContextStates } from '@/context/context';
import validator from 'validator';
const login = ({}) => {
	const router = useRouter();

	const data = useContextStates();
	const [loading, setLoading] = useState(false);

	const onFinish = async (values: any) => {
		if (loading) {
			return;
		}
		const { username, password } = values;

		if (!validator.isEmail(username)) {
			return message.error('Invalid username');
		}
		if (password?.length < 3) {
			return message.error('Password must be at least 3 characters');
		}
		setLoading(true);

		const payload = {
			email: username,
			password,
		};
		const response = await data?.blog?.authenticateUser(payload);
		setLoading(false);
		if (response?.[0]) {
			return router.push('/');
		} else {
			return message.error(response?.[1]);
		}
	};
	const navigateToSignUp = useCallback(() => {
		router.push('/signup');
	}, []);
	return (
		<div className={styles.parentContainer}>
			<Card className={styles.loginCard} title="Login" bordered={false}>
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

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							block
							loading={loading}
						>
							Log in
						</Button>
					</Form.Item>
					<Button type="link" onClick={navigateToSignUp}>
						Sign Up
					</Button>
				</Form>
			</Card>
		</div>
	);
};

export default login;
