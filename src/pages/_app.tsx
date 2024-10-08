import CombineState from '@/context/CombineState';
import ContextStates, { useContextStates } from '@/context/context';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { GetServerSideProps } from 'next';
import api from '@/service/apiHandler';
import axios from 'axios';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ContextStates.Provider value={{ ...CombineState() }}>
			<Component {...pageProps} />;
		</ContextStates.Provider>
	);
}
