'use client'

import { useState } from 'react'
import './articleProduct.scss'
import './sliderConfig.scss'
import Image from 'next/image'
import { useCurrencyContext } from '@/app/context/CurrencyContext'
import Flickity from 'react-flickity-component'

const ArticleProduct = ({ item }) => {
	const { currency, setCurrency } = useCurrencyContext()
	const [imgPath, setImgPath] = useState(item.details[0].imgPath[0])
	const [picPath, setPicPath] = useState(item.details[0].imgPath[0])
	const [isOpen, setIsOpen] = useState(false)
	const [sizeIndex, setSizeIndex] = useState(0)

	const [indexInfo, setIndexInfo] = useState(0)
	const [indexPic, setIndexPic] = useState(0)
	console.log(item)

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
			<Image alt='' src={imgPath} height={380} width={380}></Image>
			<p>{item.title}</p>
			<div className='choose-color'>
				{item.details.map((item, index) => (
					<div
						onClick={() => handleColor(index)}
						key={index}
						style={{ backgroundColor: item.colorHex }}
						className={`color-box ${indexInfo == index && 'active'}`}
					></div>
				))}
			</div>
			<div className='product-price'>
				{currency == 'Uzb'
					? item.price[0].price + ' ' + item?.price[0].currency
					: currency == 'Ru'
					? item.price[1].price + ' ' + item?.price[1].currency
					: item.price[2].price + ' ' + '$'}
			</div>
			<button type='button' onClick={() => setIsOpen(true)} className='modalOpen-btn'>
				Подробнее
			</button>
			<div onClick={handleOverlayClick} className={`modalOverlay ${isOpen && 'open'}`}>
				<div className='modalContent'>
					<div className='modal-picture'>
						{/* <div className='modal-picture-nav'>
							{item.details[indexInfo].imgPath.map((item, index) => (
								<Image width={150} height={150} src={item} onClick={() => handleColor(index)} key={index}></Image>
							))}
							{item.details[indexInfo].imgPath.map((item, index) => (
								<Image width={150} height={150} src={item} onClick={() => handleColor(index)} key={index}></Image>
							))}
						</div> */}
						<div className='modal-picture-main'>
							<Image alt='' src={imgPath} height={380} width={380}></Image>
							<Flickity className='Slider' elementType='div' disableImagesLoaded={false} options={flickityOptions} reloadOnUpdate static>
								{item.details[indexInfo].imgPath.map((item, index) => (
									<Image alt='' width={150} height={150} src={item} onClick={() => handlePic(index)} className={indexPic == index && 'active'} key={index}></Image>
								))}
							</Flickity>
						</div>
					</div>
					<div className='modal-text'>
						<h3 className='modal-text-title'>{item.title}</h3>
						<h3 className='modal-text-price'>
							{currency == 'Uzb'
								? item.price[0].price + ' ' + item?.price[0].currency
								: currency == 'Ru'
								? item.price[1].price + ' ' + item?.price[1].currency
								: item.price[2].price + ' ' + '$'}
						</h3>
						<p className='modal-text-description'>{item.description}</p>
						<p className='modal-text-size'>Размер: {item.details[indexInfo].size[sizeIndex]?.title ? item.details[indexInfo].size[sizeIndex].title : setSizeIndex(0)}</p>
						<div className='modal-text-size-box'>
							{item.details[indexInfo].size.map((item, index) => (
								<p onClick={()=>setSizeIndex(index)} className={sizeIndex == index && 'active'} key={index}>{item?.title}</p>
							))}
						</div>
						<p className='modal-text-color'>Цвет: {item.details[indexInfo].color}</p>
						<div className='modal-text-choose-color choose-color'>
							{item.details.map((item, index) => (
								<div
									onClick={() => handleColor(index)}
									key={index}
									style={{ backgroundColor: item.colorHex }}
									className={`color-box ${indexInfo == index && 'active'}`}
								></div>
							))}
						</div>
					</div>
				</div>
			</div>
		</article>
	)
}

export default ArticleProduct
