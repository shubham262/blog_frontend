import CombineState from '@/context/CombineState';
import ContextStates, { useContextStates } from '@/context/context';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { GetServerSideProps } from 'next';
import api from '@/service/apiHandler';
import axios from 'axios';
const baseURL = 'http://localhost:8000';

export default function App({ Component, pageProps }: AppProps) {
	console.log('pageProps', pageProps);
	return (
		<ContextStates.Provider value={{ ...CombineState() }}>
			<Component {...pageProps} />;
		</ContextStates.Provider>
	);
}

// App.getInitialProps = async () => {
// 	const response = await axios.get(baseURL + '/posts');
// 	const { data } = response?.data;
// 	if (data?.status == 200) {
// 		console.log('data', data);
// 		return {
// 			props: {
// 				posts: data?.data || [],
// 			},
// 		};
// 	}
// 	return { props: {} };
// };
