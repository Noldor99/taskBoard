import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from "react-redux";
import store from "../store/store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div className='py-7 px-5'>
			<ToastContainer />
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</div>
	)
}

export default MyApp
