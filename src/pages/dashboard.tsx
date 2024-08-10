import styles from '@/styles/Home.module.css';
import { Button, Card, List, Typography, message } from 'antd';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import jwt_decode, { jwtDecode } from 'jwt-decode';
import { useContextStates } from '@/context/context';
import ProtectedRoute from '../helper/ProtectedRouteWrapper';
import CreatePostModal from '@/component/CreatePostModal';
import moment from 'moment';
const { Title, Text } = Typography;

const posts = [
	{
		id: 1,
		title: 'First Blog Post',
		excerpt: 'This is the first blog post.',
		publishedAt: '2024-08-10',
		author: 'John Doe',
	},
	{
		id: 2,
		title: 'Second Blog Post',
		excerpt: 'This is the second blog post.',
		publishedAt: '2024-08-09',
		author: 'Jane Smith',
	},
];
const dashboard = () => {
	const router = useRouter();
	const data = useContextStates();
	const [open, setOpen] = useState(false);
	const [myBlog, setMyBlog] = useState();

	useEffect(() => {
		getMyBlogData();
	}, []);

	useEffect(() => {
		if (data?.blog?.myPostsData) {
			setMyBlog(data?.blog?.myPostsData);
		}
	}, [data?.blog?.myPostsData]);

	const getMyBlogData = useCallback(async () => {
		if (typeof window !== 'undefined') {
			const token: string = localStorage.getItem('token') || '';
			if (!token?.length) {
				return router.push('/login');
			}
			const decoded: any = jwtDecode(token);
			const url = `?author=${decoded?.id}`;
			data?.blog?.getPostData(url);
		}
	}, []);

	const addNewPost: any = useCallback(async (postData: any) => {
		const response = await data?.blog?.addNewPost(postData);
		if (response?.[0]) {
			getMyBlogData();
		} else {
			message.error(response?.[1]);
		}
	}, []);

	return (
		<ProtectedRoute>
			<div className={styles.homePageParentContainer}>
				<div className={styles.BlogHeader}>
					<Title level={2}> Your Blog Posts</Title>
					<div className={styles.btContainer}>
						<Button onClick={() => setOpen(true)} type="primary">
							Add Post
						</Button>
					</div>
				</div>

				<List
					grid={{ gutter: 16, column: 1 }}
					dataSource={myBlog}
					renderItem={(post: any) => (
						<List.Item>
							<Card
								title={post.title}
								extra={
									<Text type="secondary">
										{moment(post?.createdAt)?.format(
											'DD MMM'
										)}
									</Text>
								}
							>
								<Text>{post?.content}</Text>
								<br />
								<Text type="secondary">
									By {post.authorId?.email}
								</Text>
							</Card>
						</List.Item>
					)}
				/>
			</div>
			<CreatePostModal
				open={open}
				closeModal={() => setOpen(false)}
				addNewPost={addNewPost}
			/>
		</ProtectedRoute>
	);
};

export default dashboard;
