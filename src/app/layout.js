import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import { GlobalCurrencyContext } from './context/CurrencyContext'
import { GlobalOfferContext } from './context/offerContext'
import './styles/styles.scss'

export const metadata = {
	title: 'MSU STORE',
	authors: [{ name: 'Aleksandr A. Salnikov', url: 'https://t.me/AlexITdrom' }],
	description: '',
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<GlobalCurrencyContext>
					<GlobalOfferContext>
						<Header />
						{children}
						<Footer />
					</GlobalOfferContext>
				</GlobalCurrencyContext>
			</body>
		</html>
	)
}
