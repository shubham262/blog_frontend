import { useContextStates } from '@/context/context';
import styles from '@/styles/Home.module.css';
import { Button, Card, List, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import moment from 'moment';
const { Title, Text } = Typography;
const baseURL = 'https://blog-backend-pgif.onrender.com';
export default function Home(props: any) {
	const router = useRouter();
	const data = useContextStates();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		if (props?.posts) {
			setPosts(props?.posts);
		}
	}, [props?.posts]);

	return (
		<div className={styles.homePageParentContainer}>
			<div className={styles.BlogHeader}>
				<Title level={2}>Blog Posts</Title>
				<div className={styles.btContainer}>
					<Button
						onClick={() => router.push('/dashboard')}
						type="primary"
					>
						Dashboard
					</Button>
					<Button onClick={() => router.push('/login')}>
						Sign In
					</Button>
				</div>
			</div>

			<List
				grid={{ gutter: 16, column: 1 }}
				dataSource={posts}
				renderItem={(post: any) => (
					<List.Item>
						<Card
							title={post.title}
							extra={
								<Text type="secondary">
									{moment(post?.createdAt)?.format('DD MMM')}
								</Text>
							}
						>
							<Text>{post?.content}</Text>
							<br />
							<Text type="secondary">
								{' '}
								By {post.authorId?.email}
							</Text>
						</Card>
					</List.Item>
				)}
			/>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	try {
		const response = await axios.get(baseURL + '/posts');
		const { data } = response?.data;

		if (data.status === 200) {
			return {
				props: {
					posts: data.data || [],
				},
			};
		}
		return {
			props: {
				posts: [],
			},
		};
	} catch (error) {
		console.error('Failed to fetch posts:', error);
		return {
			props: {
				posts: [],
			},
		};
	}
};
