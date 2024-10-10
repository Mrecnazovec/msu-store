'use client'

import { useCurrencyContext } from '@/app/context/CurrencyContext'
import { useOfferContext } from '@/app/context/offerContext'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Flickity from 'react-flickity-component'
import './articleProduct.scss'
import './sliderConfig.scss'

const ArticleProduct = ({ item, index }) => {
	const { currency, setCurrency } = useCurrencyContext()
	const { offerData, setOfferData } = useOfferContext()
	const [imgPath, setImgPath] = useState(item.details[item.active].imgPath[0])
	const [picPath, setPicPath] = useState(item.details[item.active].imgPath[0])
	const [isOpen, setIsOpen] = useState(false)
	const [sizeIndex, setSizeIndex] = useState(item.active)
	const [ddIsOpen, setDdIsOpen] = useState(false)
	const [sizeModal, setSizeModal] = useState(false)
	const [count, setCount] = useState(1)

	const [indexInfo, setIndexInfo] = useState(item.active)
	const [indexPic, setIndexPic] = useState(item.active)

	const offerDataItem = [item.title, imgPath, item.details[indexInfo].size[sizeIndex].title, item.details[indexInfo].color, item.price, count, item.subCategories]

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
		<>
			<article className='product-article' data-aos='fade-down'>
				<div onClick={() => setIsOpen(true)} className='product-content'>
					<Image alt='' src={imgPath} height={380} width={380}></Image>
					<div className='product-article-body'>
						<div className='title-modal-box'>
							<h3 className='p'>{item.subCategories}</h3>
							<h3 className='p'>{item.title}</h3>
						</div>
						<div className='choose-color-pic'>
							{item.details.map((item, index) => (
								<div
									title={item.color}
									onMouseEnter={() => handleColor(index)}
									key={index}
									className={`color-box circle-pic ${indexInfo == index ? 'active' : ''}`}
								>
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
									? String((Math.round((Number(item.price[0].price.replace('.', '')) * 0.85) / 1000) * 1000).toLocaleString('de-DE')) +
									  ' ' +
									  item?.price[0].currency
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
			</article>

			<div className='product-article modal-article'>
				<div id='modalWindow' onClick={handleOverlayClick} className={`modalOverlay ${isOpen ? 'open' : ''} ${sizeModal ? 'openSub' : ''}`}>
					<div data-aos='fade-down' className='modalContent'>
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
							<div className='title-modal-box'>
								<h2 className='modal-text-title'>{item.subCategories}</h2>
								<h2 className='modal-text-title'>{item.title}</h2>
							</div>

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
										? String((Math.round((Number(item.price[0].price.replace('.', '')) * 0.85) / 1000) * 1000).toLocaleString('de-DE')) +
										  ' ' +
										  item?.price[0].currency
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
										<Image alt='' className='modal-icon' src='/svg/wash.svg' width={30} height={30}></Image>Стирать, вывернув наизнанку, в деликатном
										режиме при температуре 30°C
									</p>
									<p className='modal-text-pluses'>
										<Image alt='' className='modal-icon' src='/svg/bleach.svg' width={30} height={30}></Image>Не использовать отбеливающие средства
										при стирке
									</p>
									<p className='modal-text-pluses'>
										<Image alt='' className='modal-icon' src='/svg/delicate.svg' width={30} height={30}></Image>Деликатный отжим не более 400 оборотов
									</p>
									<p className='modal-text-pluses'>
										<Image alt='' className='modal-icon' src='/svg/iron.svg' width={30} height={30}></Image>Гладить утюгом не выше 100°C, с внутренней
										стороны изделия
									</p>
								</div>
							</div>
							<p className='modal-text-size'>
								<span>Размер:</span>{' '}
								{item.details[indexInfo].size[sizeIndex]?.title ? item.details[indexInfo].size[sizeIndex].title : setSizeIndex(0)}
							</p>
							<div className='modal-text-size-box'>
								{item.details[indexInfo].size.map((item, index) => (
									<div onClick={() => setSizeIndex(index)} className={`size-box ${sizeIndex == index ? 'active' : ''}`} key={index}>
										{item?.title}
									</div>
								))}
								<p onClick={() => setSizeModal(true)} className='modal-text-pluses'>
									<Image alt='' className='modal-icon' src='/svg/sizeline.svg' width={30} height={30}></Image>Размерная сетка
								</p>
							</div>
							<div onClick={handleSizeOverlayClick} className={`sizeModalOverlay ${sizeModal ? 'open' : ''}`}>
								<Image alt='' src='/png/sizeparam.png' width={400} height={400}></Image>
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
							<div className='count-box'>
								{count == 1 ? (
									<p className='disabled countCalc'>
										<svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
											<path
												d='M13.4092 9H1.59091C1.26473 9 1 8.328 1 7.49999C1 6.672 1.26473 6 1.59091 6H13.4092C13.7353 6 14 6.672 14 7.49999C14 8.328 13.7353 9 13.4092 9Z'
												fill='black'
											/>
										</svg>
									</p>
								) : (
									<p className='countCalc' onClick={() => setCount(count - 1)}>
										<svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
											<path
												d='M13.4092 9H1.59091C1.26473 9 1 8.328 1 7.49999C1 6.672 1.26473 6 1.59091 6H13.4092C13.7353 6 14 6.672 14 7.49999C14 8.328 13.7353 9 13.4092 9Z'
												fill='black'
											/>
										</svg>
									</p>
								)}
								<p>{count}</p>
								<p className='countCalc' onClick={() => setCount(count + 1)}>
									<svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
										<g clipPath='url(#clip0_130_36)'>
											<path
												d='M13.6339 6.1309H8.86481V1.3658C8.86481 0.611537 8.25625 0 7.50198 0C6.74772 0 6.13949 0.611537 6.13949 1.36613V6.1342H1.36811C0.613851 6.1342 0.000661976 6.74574 0.000992358 7.50033C0.000661976 7.8773 0.152968 8.22288 0.399763 8.46967C0.646889 8.71713 0.987843 8.8734 1.36448 8.8734H6.13949V13.6349C6.13949 14.0122 6.28915 14.3538 6.53628 14.6002C6.7834 14.8474 7.12337 15.0003 7.50066 15.0003C8.25459 15.0003 8.86481 14.3888 8.86481 13.6349V8.87307H13.6339C14.3881 8.87307 14.9997 8.25624 14.9993 7.50198C14.999 6.74805 14.3875 6.1309 13.6339 6.1309Z'
												fill='black'
											/>
										</g>
										<defs>
											<clipPath id='clip0_130_36'>
												<rect width='15' height='15' fill='white' />
											</clipPath>
										</defs>
									</svg>
								</p>
							</div>
							<p className='modal-text-pluses border'>
								<Image alt='' className='modal-icon' src='/svg/warm.svg' width={30} height={30}></Image>Теплая и мягкая ткань из высококачественного
								хлопка
							</p>
							<p className='modal-text-pluses'>
								<Image alt='' className='modal-icon' src='/svg/oversize.svg' width={30} height={30}></Image>Оверсайз крой
							</p>
							<p className='modal-text-pluses'>
								<Image alt='' className='modal-icon' src='/svg/embroidery.svg' width={30} height={30}></Image>Вышивка на передней и задней стороне
							</p>
							<p className='modal-text-pluses'>
								<Image alt='' className='modal-icon' src='/svg/production.svg' width={30} height={30}></Image>Изготовление в течение 3-7 дней
							</p>

							<p className='modal-text-pluses'>
								<Image alt='' className='modal-icon' src='/svg/discounttwo.svg' width={30} height={30}></Image>Скидка 15% на первый заказ всем
								студентам МГУ
							</p>
							<p className='modal-text-pluses'>
								<Image alt='' className='modal-icon' src='/svg/bystudents.svg' width={30} height={30}></Image>Создано студентами МГУ
							</p>
							<p className='modal-text-pluses'>
								<Image alt='' className='modal-icon' src='/svg/tr.svg' width={30} height={30}></Image>Вся прибыль реинвестируется в зарплаты
								студентов, финансовую помощь и развитие проекта
							</p>
							<p className='modal-text-pluses'>
								<Image alt='' className='modal-icon' src='/svg/delivertwo.svg' width={30} height={30}></Image>Доставка по всему миру
							</p>

							<Link onClick={() => setOfferData(offerDataItem)} className='offerBtn' href='/offer'>
								Заказать
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ArticleProduct
