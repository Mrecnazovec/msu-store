'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCurrencyContext } from '../context/CurrencyContext'
import { useOfferContext } from '../context/offerContext'
import './page.scss'

const page = () => {
	const { currency } = useCurrencyContext()
	const { offerData } = useOfferContext()
	const [comment, setComment] = useState('')
	const [name, setName] = useState('')
	const [user, setUser] = useState('')
	const [price, setPrice] = useState('')
	const [ready, setReady] = useState(false)
	const [error, setError] = useState('')

	const sendToTelegram = async (data) => {
		const token = '7526799764:AAFmZWYKs_Nw55qE8b9F70O5dbtGwpSDW3M'
		const chatId = '-1002453789209'
		const message = `Новый заказ:\n${data[8] + ' ' + data[0]}\nИмя: ${data[4]}\nРазмер: ${data[1]}\nЦвет: ${data[2]}\nКоличество: ${data[7]}\nЦена: ${
			data[5]
		}\nНомер телефона: ${data[3]}\nЮзер: ${data[6]}`

		const url = `https://api.telegram.org/bot${token}/sendMessage`

		const requestData = {
			chat_id: chatId,
			text: message,
		}

		try {
			if (!name || !user || !comment) return setError('Все поля должны быть заполнены!')

			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestData),
			})

			const result = await response.json()
			if (result.ok) {
				console.log('Сообщение успешно отправлено:', result)
			} else {
				setError('Ошибка при отправке сообщения:', result)
			}

			setComment('')
			setUser('')
			setName('')
			setReady(true)

			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
		} catch (error) {
			setError('Ошибка:', error)
		}
	}

	const data = [offerData[0], offerData[2], offerData[3], comment, name, price, user, offerData[5], offerData[6]]

	useEffect(() => {
		if (offerData.length > 0) {
			const newPrice =
				// currency === 'Uzb'
				// 	? offerData[4][0].price + ' ' + offerData[4][0].currency
				// 	: currency === 'Ru'
				// 	? offerData[4][1].price + ' ' + offerData[4][1].currency
				// 	: offerData[4][2].price + ' ' + '$'

				currency == 'Uzb'
					? String((Math.round((Number(offerData[4][0].price.replace('.', '')) * 0.85) / 1000) * 1000).toLocaleString('de-DE')) +
					  ' ' +
					  offerData[4][0].currency
					: currency == 'Ru'
					? String(Number(offerData[4][1].price.replace('.', '') * 0.85).toLocaleString('de-DE')) + ' ' + offerData[4][1].currency
					: String(
							Number(offerData[4][2].price.replace(',', '.') * 0.85)
								.toFixed(1)
								.toLocaleString('de-DE')
					  ) +
					  ' ' +
					  '$'

			setPrice(newPrice)
		}
	}, [currency, offerData])

	if (ready) {
		return (
			<main className='nullOffer'>
				<div className='container'>
					<h2>Заявка принята!</h2>
					<p>
						В ближайшее время с Вами свяжется наш менеджер для завершения заказа! Если этого не произошло, пожалуйста, свяжитесь с{' '}
						<Link target='_blank' href='https://t.me/msustoremanager'>
							t.me/msustoremanager
						</Link>
					</p>
					<Link className='toShop' href='/#shop'>
						Вернуться к каталогу
					</Link>
				</div>
			</main>
		)
	}

	if (offerData.length !== 0) {
		return (
			<main className='offerMain'>
				<div className='container'>
					<div className='offer-box'>
						<article className='offer-details'>
							<Image src={offerData[1]} width={400} height={400} alt='' />
							<p><span>{offerData[6] + ' ' + offerData[0]}</span></p>
							<p><span>Размер:</span> {offerData[2]}</p>
							<p><span>Цвет:</span> {offerData[3]}</p>
							<p><span>Цена:</span> {price}</p>
							<p><span>Количество:</span> {offerData[5]}</p>

							<label>
								Имя:
								<input type='text' value={name} onChange={(e) => setName(e.target.value)} />
							</label>
							<label>
								Номер телефона:
								<input type='text' value={comment} onChange={(e) => setComment(e.target.value)} />
							</label>
							<label>
								Юзер в Telegram:
								<input type='text' value={user} onChange={(e) => setUser(e.target.value)} />
							</label>
							<button className='btnSubmit' onClick={() => sendToTelegram(data)}>
								Отправить заявку
							</button>
							<p className='errorMessage'>{error}</p>
						</article>
					</div>
				</div>
			</main>
		)
	}

	return (
		<main className='nullOffer'>
			<Link href='/#shop'>Перейти к каталогу товаров</Link>
		</main>
	)
}

export default page
