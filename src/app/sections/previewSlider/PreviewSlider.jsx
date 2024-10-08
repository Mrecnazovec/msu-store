'use client'

import Flickity from 'react-flickity-component'
import './swiper.scss'
import Image from 'next/image'

const flickityOptions = {
	initialIndex: 0,
	cellAlign: 'left',
	pageDots: true,
	arrowShape: 'M18.3333 11L3.66668 11M18.3333 11L14.6667 7.33334M18.3333 11L14.6667 14.6667 Z',
	autoPlay: 5000,
}

const PreviewSliderItem = ({ data }) => {
	const imgPath = data[0].imgPath

	return (
		<section className='previewSlider'>
			<div className='container container-p0'>
				<Flickity className='Slider' elementType='div' disableImagesLoaded={false} options={flickityOptions} reloadOnUpdate static>
					{imgPath.map((item, index) => (
						<div key={index} className='slider-preview'>
							<Image quality={100} alt='' src={`/jpg/${item}`} width={380} height={490}></Image>
						</div>
					))}
				</Flickity>
			</div>
		</section>
	)
}

export default PreviewSliderItem
