import NextTopLoader from 'nextjs-toploader'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import AOSProvider from './context/AOSProvider'
import { GlobalCurrencyContext } from './context/CurrencyContext'
import { GlobalOfferContext } from './context/offerContext'
import './styles/styles.scss'
import Marquee from './components/marquee/Marquee'

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
			<head>
        <meta name="p:domain_verify" content="65adbd7f4d33c93de5031501e501ff09" />
        <title>{metadata.title}</title>
      </head>
			<body>
				<NextTopLoader
					color='#2299DD'
					initialPosition={0.08}
					crawlSpeed={200}
					height={3}
					crawl={true}
					showSpinner={false}
					easing='ease'
					speed={200}
					shadow='0 0 10px #2299DD,0 0 5px #2299DD'
				/>
				<GlobalCurrencyContext>
					<GlobalOfferContext>
						<Header />
						<AOSProvider>{children}</AOSProvider>
						<Marquee />
						<Footer />
					</GlobalOfferContext>
				</GlobalCurrencyContext>
			</body>
		</html>
	)
}
