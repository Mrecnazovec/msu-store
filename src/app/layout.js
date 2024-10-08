import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import AOSProvider from './context/AOSprovider'
import { GlobalCurrencyContext } from './context/CurrencyContext'
import { GlobalOfferContext } from './context/offerContext'
import './styles/styles.scss'

export const metadata = {
	title: 'MSU STORE',
	authors: [{ name: 'Aleksandr A. Salnikov', url: 'https://t.me/AlexITdrom' }],
	description:
		'Официальная одежда, аксессуары и сувениры МГУ по самым доступным ценам. Полностью студенческий бизнес в Московском университете. Покупайте широкий выбор одежды и многого другого с символикой МГУ.',
	keywords: [
		'МГУ',
		'ТФ МГУ',
		'Мерч МГУ',
		'Одежда МГУ',
		'Аксессуары МГУ',
		'Канцтовары МГУ',
		'Худи МГУ',
		'Футболки МГУ',
		'Официальный магазин МГУ',
		'От студентов студентам',
		'From students for students',
		'Маркетплейс МГУ',
		'МГУ магазин',
		'МГУ Ташкент магазин',
		'ТФ МГУ магазин',
		'Студенческий магазин',
		'Студенческий магазин МГУ',
	],
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<GlobalCurrencyContext>
					<GlobalOfferContext>
						<Header />
						<AOSProvider>{children}</AOSProvider>
						<Footer />
					</GlobalOfferContext>
				</GlobalCurrencyContext>
			</body>
		</html>
	)
}
