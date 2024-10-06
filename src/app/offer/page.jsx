'use client'

import Image from 'next/image'
import { useOfferContext } from '../context/offerContext'
import './page.scss'
import { useState } from 'react'
import Link from 'next/link'
import { useCurrencyContext } from '../context/CurrencyContext'

const page = () => {
	const { currency, setCurrency } = useCurrencyContext()
	const { offerData } = useOfferContext()
	const [comment, setComment] = useState('')
	const [name, setName] = useState('')
	const [user, setUser] = useState('')

	// Функция для отправки данных в Telegram
	const sendToTelegram = async (data) => {
		const token = '7526799764:AAFmZWYKs_Nw55qE8b9F70O5dbtGwpSDW3M' // Замените на токен вашего бота
		const chatId = '-1002453789209' // Замените на chat_id вашего канала
		const message = `Новый заказ:\n${data[0]}\nИмя: ${data[4]}\nРазмер: ${data[1]}\nЦвет: ${data[2]}\nНомер телефона: ${data[3]}\nЮзер: ${data[5]}`

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

	const data = [offerData[0], offerData[2], offerData[3], comment, name, user] // Формируем данные для отправки

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
							<p>Цена: {' '}
								{currency == 'Uzb' ? offerData[4][0].price + ' ' + offerData[4][0].currency : currency == 'Ru' ? offerData[4][1].price + ' ' + offerData[4][1].currency : offerData[4][2].price + ' ' + offerData[4][2].currency}
							</p>

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
