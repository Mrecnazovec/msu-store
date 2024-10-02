import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import { GlobalCurrencyContext } from './context/CurrencyContext'
import './styles/styles.scss'

export const metadata = {
	title: 'MSU-store',
	description: '',
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<GlobalCurrencyContext>
					<Header />
					{children}
					<Footer />
				</GlobalCurrencyContext>
			</body>
		</html>
	)
}
