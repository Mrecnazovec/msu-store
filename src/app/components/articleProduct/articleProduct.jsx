'use client'

import { useState, useEffect } from 'react'
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
	const [imgPath, setImgPath] = useState(item.details[item.active].imgPath[0])
	const [picPath, setPicPath] = useState(item.details[item.active].imgPath[0])
	const [isOpen, setIsOpen] = useState(false)
	const [sizeIndex, setSizeIndex] = useState(item.active)
	const [ddIsOpen, setDdIsOpen] = useState(false)
	const [sizeModal, setSizeModal] = useState(false)

	const [indexInfo, setIndexInfo] = useState(item.active)
	const [indexPic, setIndexPic] = useState(item.active)

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
	const handleSizeOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			setSizeModal(false)
		}
	}

	const handleDropDown = () => {
		setDdIsOpen(!ddIsOpen)
	}

	const flickityOptions = {
		initialIndex: 0,
		cellAlign: 'left',
		pageDots: false,
		draggable: false,
		arrowShape: 'M18.3333 11L3.66668 11M18.3333 11L14.6667 7.33334M18.3333 11L14.6667 14.6667 Z',
	}

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}

		// Возвращаем скролл при размонтировании компонента
		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	return (
		<article className='product-article'>
			<div onClick={() => setIsOpen(true)} className='product-content'>
				<Image alt='' src={imgPath} height={380} width={380}></Image>
				<div className='product-article-body'>
					<h3 className='h3'>{item.title}</h3>
					<div className='choose-color-pic'>
						{item.details.map((item, index) => (
							<div onMouseEnter={() => handleColor(index)} key={index} className={`color-box circle-pic ${indexInfo == index ? 'active' : ''}`}>
								<Image alt='' width={30} height={30} src={item.imgPath[0]}></Image>
							</div>
						))}
					</div>
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
								: String(
										Number(item.price[2].price.replace(',', '.') * 0.85)
											.toFixed(1)
											.toLocaleString('de-DE')
								  ) +
								  ' ' +
								  '$'}
						</p>
					</div>
					<p className='discount-text'>Скидка 15% на первый заказ всем студентам МГУ</p>
				</div>
				<div className='discount-banner'>
					<p>-15%</p>
				</div>
			</div>
			<div id='modalWindow' onClick={handleOverlayClick} className={`modalOverlay ${isOpen ? 'open' : ''} ${sizeModal ? 'openSub' : ''}`}>
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
						<h2 className='modal-text-title'>{item.title}</h2>

						<div className='price-box'>
							<p className='modal-text-price'>
								{currency == 'Uzb'
									? item.price[0].price + ' ' + item?.price[0].currency
									: currency == 'Ru'
									? item.price[1].price + ' ' + item?.price[1].currency
									: item.price[2].price + ' ' + '$'}
							</p>
							<p className='modal-text-price'>
								{currency == 'Uzb'
									? String(Number(item.price[0].price.replace('.', '') * 0.85).toLocaleString('de-DE')) + ' ' + item?.price[0].currency
									: currency == 'Ru'
									? String(Number(item.price[1].price.replace('.', '') * 0.85).toLocaleString('de-DE')) + ' ' + item?.price[1].currency
									: String(
											Number(item.price[2].price.replace(',', '.') * 0.85)
												.toFixed(1)
												.toLocaleString('de-DE')
									  ) +
									  ' ' +
									  '$'}
							</p>
						</div>
						<p className='modal-text-description'>{item.description}</p>
						<div onClick={handleDropDown} className={`dropDownDesc ${ddIsOpen ? 'open' : ''}`}>
							<p>
								Инструкция по уходу за изделием{' '}
								<span>
									<svg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
										<path
											fillRule='evenodd'
											clipRule='evenodd'
											d='M10.637 12.7022C10.3144 13.0396 9.78676 13.044 9.45856 12.712L5.25627 8.46119C4.92806 8.12917 4.92353 7.58648 5.24616 7.24903C5.5688 6.9116 6.09641 6.9072 6.42464 7.2392L10.0326 10.8889L13.5792 7.17951C13.9018 6.84207 14.4295 6.83767 14.7577 7.16968C15.0859 7.50169 15.0904 8.04438 14.7678 8.38183L10.637 12.7022Z'
											fill='white'
										/>
									</svg>
								</span>
							</p>
							<div className='dropDownDesc-content'>
								<p className='modal-text-pluses'>
									<Image alt='' className='modal-icon' src='/svg/стирать.svg' width={30} height={30}></Image>Стирать, вывернув наизнанку, в деликатном
									режиме при температуре 30°C
								</p>
								<p className='modal-text-pluses'>
									<Image alt='' className='modal-icon' src='/svg/обеливатели.svg' width={30} height={30}></Image>Не использовать отбеливающие средства
									при стирке
								</p>
								<p className='modal-text-pluses'>
									<Image alt='' className='modal-icon' src='/svg/деликатный режим.svg' width={30} height={30}></Image>Деликатный отжим не более 400
									оборотов
								</p>
								<p className='modal-text-pluses'>
									<Image alt='' className='modal-icon' src='/svg/гладить утюгом.svg' width={30} height={30}></Image>Гладить утюгом не выше 100°C, с
									внутренней стороны изделия
								</p>
							</div>
						</div>
						<p className='modal-text-size'>
							<span>Размер:</span> {item.details[indexInfo].size[sizeIndex]?.title ? item.details[indexInfo].size[sizeIndex].title : setSizeIndex(0)}
						</p>
						<div className='modal-text-size-box'>
							{item.details[indexInfo].size.map((item, index) => (
								<div onClick={() => setSizeIndex(index)} className={`size-box ${sizeIndex == index ? 'active' : ''}`} key={index}>
									{item?.title}
								</div>
							))}
							<p onClick={() => setSizeModal(true)} className='modal-text-pluses'>
								<Image alt='' className='modal-icon' src='/svg/линейка.svg' width={30} height={30}></Image>Размерная сетка
							</p>
						</div>
						<div onClick={handleSizeOverlayClick} className={`sizeModalOverlay ${sizeModal ? 'open' : ''}`}>
							<Image alt='' src='/png/Размерная сетка.png' width={400} height={400}></Image>
						</div>
						<p className='modal-text-color'>
							<span>Цвет:</span> {item.details[indexInfo].color}
						</p>

						<div className='choose-color-pic'>
							{item.details.map((item, index) => (
								<div onClick={() => handleColor(index)} key={index} className={`color-box circle-pic ${indexInfo == index ? 'active' : ''}`}>
									<Image alt='' width={30} height={30} src={item.imgPath[0]}></Image>
								</div>
							))}
						</div>
						<p className='modal-text-pluses border'>
							<Image alt='' className='modal-icon' src='/svg/теплая ткань.svg' width={30} height={30}></Image>Теплая и мягкая ткань из
							высококачественного хлопка
						</p>
						<p className='modal-text-pluses'>
							<Image alt='' className='modal-icon' src='/svg/оверсайз.svg' width={30} height={30}></Image>Оверсайз крой
						</p>
						<p className='modal-text-pluses'>
							<Image alt='' className='modal-icon' src='/svg/вышивка.svg' width={30} height={30}></Image>Вышивка на передней и задней стороне
						</p>
						<p className='modal-text-pluses'>
							<Image alt='' className='modal-icon' src='/svg/изготовление.svg' width={30} height={30}></Image>Изготовление в течение 3-7 дней
						</p>

						<p className='modal-text-pluses'>
							<Image alt='' className='modal-icon' src='/svg/скидка (2).svg' width={30} height={30}></Image>Скидка 15% на первый заказ всем студентам
							МГУ
						</p>
						<p className='modal-text-pluses'>
							<Image alt='' className='modal-icon' src='/svg/создано студентами (2).svg' width={30} height={30}></Image>Создано студентами МГУ
						</p>
						<p className='modal-text-pluses'>
							<Image alt='' className='modal-icon' src='/svg/вся прибыль.svg' width={30} height={30}></Image>Вся прибыль реинвестируется в зарплаты
							студентов, финансовую помощь и развитие проекта
						</p>
						<p className='modal-text-pluses'>
							<Image alt='' className='modal-icon' src='/svg/доставка (2).svg' width={30} height={30}></Image>Доставка по всему миру
						</p>

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
