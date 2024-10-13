import Script from 'next/script'
import NextTopLoader from 'nextjs-toploader'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Marquee from './components/marquee/Marquee'
import AOSProvider from './context/AOSProvider'
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
			<head>
				<meta name='p:domain_verify' content='65adbd7f4d33c93de5031501e501ff09' />

				{/* Google Analytics */}
				<Script async src='https://www.googletagmanager.com/gtag/js?id=G-FC0FZ413SE'></Script>
				<Script
					id='google-analytics'
					strategy='afterInteractive'
					dangerouslySetInnerHTML={{
						__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FC0FZ413SE');
            `,
					}}
				/>

				{/* Yandex.Metrika */}
				<Script
					id='yandex-metrika'
					type='text/javascript'
					strategy='afterInteractive'
					dangerouslySetInnerHTML={{
						__html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {
                  if (document.scripts[j].src === r) { return; }
                }
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(98612225, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `,
					}}
				/>
				<noscript>
					<div>
						<img src='https://mc.yandex.ru/watch/98612225' style={{ position: 'absolute', left: '-9999px' }} alt='' />
					</div>
				</noscript>
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
