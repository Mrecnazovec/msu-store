'use client'

import Image from 'next/image'
import { useOfferContext } from '../context/offerContext'
import './page.scss'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCurrencyContext } from '../context/CurrencyContext'

const page = () => {
	const { currency } = useCurrencyContext()
	const { offerData } = useOfferContext()
	const [comment, setComment] = useState('')
	const [name, setName] = useState('')
	const [user, setUser] = useState('')
	const [price, setPrice] = useState('')

	const sendToTelegram = async (data) => {
		const token = '7526799764:AAFmZWYKs_Nw55qE8b9F70O5dbtGwpSDW3M'
		const chatId = '-1002453789209'
		const message = `Новый заказ:\n${data[0]}\nИмя: ${data[4]}\nРазмер: ${data[1]}\nЦвет: ${data[2]}\nЦена: ${data[5]}\nНомер телефона: ${data[3]}\nЮзер: ${data[6]}`

		const url = `https://api.telegram.org/bot${token}/sendMessage`

		const requestData = {
			chat_id: chatId,
			text: message,
		}

		try {
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
				console.error('Ошибка при отправке сообщения:', result)
			}

			setComment('')
			setUser('')
			setName('')
		} catch (error) {
			console.error('Ошибка:', error)
		}
	}

	const data = [offerData[0], offerData[2], offerData[3], comment, name, price, user]

	useEffect(() => {
		if (offerData.length > 0) {
			const newPrice =
				currency === 'Uzb'
					? offerData[4][0].price + ' ' + offerData[4][0].currency
					: currency === 'Ru'
					? offerData[4][1].price + ' ' + offerData[4][1].currency
					: offerData[4][2].price + ' ' + '$'

			setPrice(newPrice)
		}
	}, [currency, offerData])

	if (offerData.length !== 0) {
		return (
			<main className='offerMain'>
				<div className='container'>
					<div className='offer-box'>
						<article className='offer-details'>
							<Image src={offerData[1]} width={400} height={400} alt='' />
							<p>{offerData[0]}</p>
							<p>Размер: {offerData[2]}</p>
							<p>Цвет: {offerData[3]}</p>
							<p>Цена: {price}</p>

							<label>
								Имя
								<input type='text' value={name} onChange={(e) => setName(e.target.value)} />
							</label>
							<label>
								Номер телефона:
								<input type='text' value={comment} onChange={(e) => setComment(e.target.value)} />
							</label>
							<label>
								Телеграм юзер:
								<input type='text' value={user} onChange={(e) => setUser(e.target.value)} />
							</label>
							<button className='btnSubmit' onClick={() => sendToTelegram(data)}>
								Отправить заявку
							</button>
						</article>
					</div>
				</div>
			</main>
		)
	}

	return (
		<main className='nullOffer'>
			<Link href='/'>Перейти к выбору товара</Link>
		</main>
	)
}

export default page
