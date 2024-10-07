'use client'

import { useState } from 'react'
import './articleProduct.scss'
import './sliderConfig.scss'
import Image from 'next/image'
import { useCurrencyContext } from '@/app/context/CurrencyContext'
import Flickity from 'react-flickity-component'
import Link from 'next/link'
import { useOfferContext } from '@/app/context/offerContext'

const ArticleProduct = ({ item, index }) => {
	const { currency, setCurrency } = useCurrencyContext()
	const { offerData, setOfferData } = useOfferContext()
	const [imgPath, setImgPath] = useState(item.details[index].imgPath[0])
	const [picPath, setPicPath] = useState(item.details[index].imgPath[0])
	const [isOpen, setIsOpen] = useState(false)
	const [sizeIndex, setSizeIndex] = useState(index)

	const [indexInfo, setIndexInfo] = useState(index)
	const [indexPic, setIndexPic] = useState(index)

	const offerDataItem = [item.title, imgPath, item.details[indexInfo].size[sizeIndex].title, item.details[indexInfo].color, item.price]

	const handleColor = (index) => {
		setImgPath(item.details[index].imgPath[0])
		setIndexInfo(index)
	}

	const handlePic = (index) => {
		setImgPath(item.details[indexInfo].imgPath[index])
		setIndexPic(index)
	}

	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			setIsOpen(false)
		}
	}

	const flickityOptions = {
		initialIndex: 0,
		cellAlign: 'left',
		pageDots: false,
		draggable: false,
		arrowShape: 'M18.3333 11L3.66668 11M18.3333 11L14.6667 7.33334M18.3333 11L14.6667 14.6667 Z',
	}

	return (
		<article className='product-article'>
			<div onClick={() => setIsOpen(true)} className='product-content'>
				<Image alt='' src={imgPath} height={380} width={380}></Image>
				<p>{item.title}</p>

				<div className='choose-color-pic'>
					{item.details.map((item, index) => (
						<div key={index} className={`color-box circle-pic ${indexInfo == index ? 'active' : ''}`}>
							<Image alt='' width={30} height={30} src={item.imgPath[0]}></Image>
						</div>
					))}
				</div>

				{/* <div className='choose-color'>
					{item.details.map((item, index) => (
						<div
							onClick={() => handleColor(index)}
							key={index}
							style={{ backgroundColor: item.colorHex }}
							className={`color-box ${indexInfo == index ? 'active' : ''}`}
						></div>
					))}
				</div> */}
				<div className='price-box'>
					<p className='product-price'>
						{currency == 'Uzb'
							? item.price[0].price + ' ' + item?.price[0].currency
							: currency == 'Ru'
							? item.price[1].price + ' ' + item?.price[1].currency
							: item.price[2].price + ' ' + '$'}
					</p>
					<p className='product-price'>
						{currency == 'Uzb'
							? String(Number(item.price[0].price.replace('.', '') * 0.85).toLocaleString('de-DE')) + ' ' + item?.price[0].currency
							: currency == 'Ru'
							? String(Number(item.price[1].price.replace('.', '') * 0.85).toLocaleString('de-DE')) + ' ' + item?.price[1].currency
							: String(Number(item.price[2].price.replace(',', '.') * 0.85).toLocaleString('de-DE')) + ' ' + '$'}
					</p>
				</div>
				<p className='discount-text'>Скидка 15% на первый заказ всем студентам МГУ</p>
				<div className='discount-banner'>
					<p>-15%</p>
				</div>
			</div>
			<div onClick={handleOverlayClick} className={`modalOverlay ${isOpen ? 'open' : ''}`}>
				<div className='modalContent'>
					<button onClick={() => setIsOpen(false)} className='closeButtonModal'>
						<Image alt='' width={30} height={30} src='/svg/close.svg'></Image>
					</button>
					<div className='modal-picture'>
						<div className='modal-picture-main'>
							<Image alt='' src={imgPath} height={380} width={380}></Image>
							<Flickity className='Slider' elementType='div' disableImagesLoaded={false} options={flickityOptions} reloadOnUpdate static>
								{item.details[indexInfo].imgPath.map((item, index) => (
									<Image
										alt=''
										width={150}
										height={200}
										src={item}
										onClick={() => handlePic(index)}
										className={indexPic == index ? 'active' : ''}
										key={index}
									></Image>
								))}
							</Flickity>
						</div>
					</div>
					<div className='modal-text'>
						<h3 className='modal-text-title'>{item.title}</h3>

						<div className='price-box'>
							<h3 className='modal-text-price'>
								{currency == 'Uzb'
									? item.price[0].price + ' ' + item?.price[0].currency
									: currency == 'Ru'
									? item.price[1].price + ' ' + item?.price[1].currency
									: item.price[2].price + ' ' + '$'}
							</h3>
							<h3 className='modal-text-price'>
								{currency == 'Uzb'
									? String(Number(item.price[0].price.replace('.', '') * 0.85).toLocaleString('de-DE')) + ' ' + item?.price[0].currency
									: currency == 'Ru'
									? String(Number(item.price[1].price.replace('.', '') * 0.85).toLocaleString('de-DE')) + ' ' + item?.price[1].currency
									: String(Number(item.price[2].price.replace(',', '.') * 0.85).toLocaleString('de-DE')) + ' ' + '$'}
							</h3>
						</div>
						<p className='modal-text-description'>{item.description}</p>
						<p className='modal-text-size'>
							<span>Размер:</span> {item.details[indexInfo].size[sizeIndex]?.title ? item.details[indexInfo].size[sizeIndex].title : setSizeIndex(0)}
						</p>
						<div className='modal-text-size-box'>
							{item.details[indexInfo].size.map((item, index) => (
								<div onClick={() => setSizeIndex(index)} className={`size-box ${sizeIndex == index ? 'active' : ''}`} key={index}>
									{item?.title}
								</div>
							))}
						</div>
						<p className='modal-text-color'>
							<span>Цвет:</span> {item.details[indexInfo].color}
						</p>

						{/* <div className='modal-text-choose-color choose-color'>
							{item.details.map((item, index) => (
								<div
									onClick={() => handleColor(index)}
									key={index}
									style={{ backgroundColor: item.colorHex }}
									className={`color-box ${indexInfo == index ? 'active' : ''}`}
								></div>
							))}
						</div> */}
						<div className='choose-color-pic'>
							{item.details.map((item, index) => (
								<div onClick={() => handleColor(index)} key={index} className={`color-box circle-pic ${indexInfo == index ? 'active' : ''}`}>
									<Image alt='' width={30} height={30} src={item.imgPath[0]}></Image>
								</div>
							))}
						</div>

						<p className='modal-text-pluses'><Image alt='' className='modal-icon' src='/svg/discount.svg' width={30} height={30}></Image>Скидка 15% на первый заказ всем студентам МГУ</p>
						<p className='modal-text-pluses'><Image alt='' className='modal-icon' src='/svg/discount.svg' width={30} height={30}></Image>Создано студентами МГУ</p>
						<p className='modal-text-pluses'><Image alt='' className='modal-icon' src='/svg/discount.svg' width={30} height={30}></Image>Вся прибыль реинвестируется в зарплаты студентов, финансовую помощь, и развитие проекта</p>
						<p className='modal-text-pluses'><Image alt='' className='modal-icon' src='/svg/discount.svg' width={30} height={30}></Image>Доставка по всему миру</p>
						<p className='modal-text-pluses'><Image alt='' className='modal-icon' src='/svg/discount.svg' width={30} height={30}></Image>Вышивка на передней и задней стороне</p>
						<p className='modal-text-pluses'><Image alt='' className='modal-icon' src='/svg/discount.svg' width={30} height={30}></Image>Изготовление в течение 3-7 дней</p>
						<p className='modal-text-pluses'><Image alt='' className='modal-icon' src='/svg/discount.svg' width={30} height={30}></Image>100% хлопок</p>
						<p className='modal-text-pluses'><Image alt='' className='modal-icon' src='/svg/discount.svg' width={30} height={30}></Image>Оверсайз крой</p>

						<Link onClick={() => setOfferData(offerDataItem)} className='offerBtn' href='/offer'>
							Заказать
						</Link>
					</div>
				</div>
			</div>
		</article>
	)
}

export default ArticleProduct
